// MeuNutri - Lógica Principal do App

const App = {
  // Estado do app
  state: {
    tmbRange: null,
    selectedMealTypes: [],
    currentMealIndex: 0,
    selectedMeals: {},
    currentScreen: 'welcome'
  },

  // Inicialização
  init() {
    this.bindEvents();
    this.renderTMBOptions();
    this.showScreen('welcome');
  },

  // ==========================================
  // NAVEGAÇÃO ENTRE TELAS
  // ==========================================

  showScreen(screenId, direction = 'forward') {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(`screen-${screenId}`);

    if (!nextScreen) return;

    if (currentScreen && currentScreen !== nextScreen) {
      const outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
      const inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';

      currentScreen.classList.add(outClass);
      nextScreen.classList.add(inClass, 'active');

      setTimeout(() => {
        currentScreen.classList.remove('active', outClass);
        nextScreen.classList.remove(inClass);
      }, 400);
    } else {
      nextScreen.classList.add('active');
    }

    this.state.currentScreen = screenId;
    nextScreen.scrollTop = 0;
  },

  // ==========================================
  // TELA DE CONFIGURAÇÃO
  // ==========================================

  renderTMBOptions() {
    const container = document.getElementById('tmb-options');
    container.innerHTML = TMB_RANGES.map((range, idx) => `
      <button class="tmb-option" data-index="${idx}" onclick="App.selectTMB(${idx})">
        <span class="tmb-label">${range.label}</span>
        <span class="tmb-target">Meta: ${formatNumber(range.target)} kcal/dia</span>
      </button>
    `).join('');
  },

  selectTMB(index) {
    this.state.tmbRange = TMB_RANGES[index];

    // Update UI
    document.querySelectorAll('.tmb-option').forEach((btn, i) => {
      btn.classList.toggle('selected', i === index);
    });

    this.updateStartButton();
  },

  toggleMealType(type) {
    const idx = this.state.selectedMealTypes.indexOf(type);
    if (idx > -1) {
      this.state.selectedMealTypes.splice(idx, 1);
    } else {
      this.state.selectedMealTypes.push(type);
    }

    // Maintain order
    this.state.selectedMealTypes.sort((a, b) =>
      MEAL_ORDER.indexOf(a) - MEAL_ORDER.indexOf(b)
    );

    // Update UI
    const toggle = document.querySelector(`[data-meal-type="${type}"]`);
    if (toggle) {
      toggle.classList.toggle('active', this.state.selectedMealTypes.includes(type));
    }

    this.updateStartButton();
  },

  updateStartButton() {
    const btn = document.getElementById('btn-start');
    const canStart = this.state.tmbRange && this.state.selectedMealTypes.length > 0;
    btn.disabled = !canStart;
  },

  // ==========================================
  // TELA DE SELEÇÃO DE REFEIÇÕES
  // ==========================================

  startSelection() {
    if (!this.state.tmbRange || this.state.selectedMealTypes.length === 0) return;

    this.state.currentMealIndex = 0;
    this.state.selectedMeals = {};

    this.showMealSelection();
  },

  showMealSelection() {
    const mealTypes = this.state.selectedMealTypes;
    const currentType = mealTypes[this.state.currentMealIndex];
    const mealData = MEALS[currentType];

    // Calculate budgets
    const remaining = calculateRemainingCalories(
      this.state.tmbRange.target,
      this.state.selectedMeals
    );
    const remainingMealsCount = mealTypes.length - this.state.currentMealIndex;
    const maxBudget = calculateMaxBudget(remaining, remainingMealsCount);
    const idealBudget = calculateIdealBudget(remaining, remainingMealsCount);

    // Update header
    const consumed = this.state.tmbRange.target - remaining;
    const percentage = calculatePercentage(consumed, this.state.tmbRange.target);

    document.getElementById('meal-screen-icon').textContent = mealData.icon;
    document.getElementById('meal-screen-title').textContent = mealData.label;
    document.getElementById('meal-step-indicator').textContent =
      `Refeição ${this.state.currentMealIndex + 1} de ${mealTypes.length}`;

    document.getElementById('calories-remaining').textContent = formatNumber(remaining);
    document.getElementById('calories-target').textContent = formatNumber(this.state.tmbRange.target);
    document.getElementById('calories-consumed').textContent = formatNumber(consumed);
    document.getElementById('ideal-budget').textContent = formatNumber(idealBudget);

    const progressBar = document.getElementById('progress-fill');
    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = getProgressColor(percentage);

    // Show previous meals summary if any
    this.renderPreviousMeals();

    // Render meal cards
    const sortedMeals = filterAndSortMeals(mealData.items, maxBudget, idealBudget);
    const grid = document.getElementById('meal-grid');

    grid.innerHTML = sortedMeals.map((meal, idx) => `
      <div class="meal-card ${meal.available ? '' : 'disabled'}"
           data-meal-id="${meal.id}"
           onclick="${meal.available ? `App.selectMeal('${currentType}', '${meal.id}')` : ''}"
           style="animation-delay: ${idx * 0.05}s">
        <div class="meal-card-header">
          <h3 class="meal-name">${meal.name}</h3>
          ${!meal.available ? '<span class="meal-badge exceeded">Excede</span>' : ''}
          ${meal.available && meal.deviation < 50 ? '<span class="meal-badge ideal">Ideal</span>' : ''}
        </div>
        <p class="meal-description">${meal.description}</p>
        <div class="meal-nutrients">
          <div class="nutrient">
            <span class="nutrient-icon">🔥</span>
            <span class="nutrient-value">${meal.calories}</span>
            <span class="nutrient-label">kcal</span>
          </div>
          <div class="nutrient">
            <span class="nutrient-icon">💪</span>
            <span class="nutrient-value">${meal.protein}g</span>
            <span class="nutrient-label">proteína</span>
          </div>
        </div>
        <div class="meal-ingredients">
          ${meal.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Reset confirm button
    document.getElementById('btn-confirm-meal').disabled = true;
    document.getElementById('btn-confirm-meal').textContent =
      this.state.currentMealIndex < mealTypes.length - 1 ? 'Confirmar e Próxima ➜' : 'Ver Resumo ✓';

    // Always show back button
    document.getElementById('btn-meal-back').style.display = 'flex';

    this.showScreen('meal', 'forward');
  },

  renderPreviousMeals() {
    const container = document.getElementById('previous-meals');
    const entries = Object.entries(this.state.selectedMeals);

    if (entries.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = `
      <div class="previous-meals-label">Já selecionadas:</div>
      ${entries.map(([type, meal]) => `
        <div class="previous-meal-chip">
          <span>${MEALS[type].icon}</span>
          <span>${meal.name}</span>
          <span class="chip-calories">${meal.calories} kcal</span>
        </div>
      `).join('')}
    `;
  },

  selectMeal(mealType, mealId) {
    const meal = MEALS[mealType].items.find(m => m.id === mealId);
    if (!meal) return;

    // Store temporary selection
    this._tempSelection = { type: mealType, meal };

    // Update UI - highlight selected card
    document.querySelectorAll('.meal-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.mealId === mealId);
    });

    // Enable confirm button
    document.getElementById('btn-confirm-meal').disabled = false;
  },

  confirmMeal() {
    if (!this._tempSelection) return;

    const { type, meal } = this._tempSelection;
    this.state.selectedMeals[type] = meal;
    this._tempSelection = null;

    // Check if there are more meals to select
    if (this.state.currentMealIndex < this.state.selectedMealTypes.length - 1) {
      this.state.currentMealIndex++;
      this.showMealSelection();
    } else {
      this.showSummary();
    }
  },

  goBackMeal() {
    if (this.state.currentMealIndex === 0) {
      // First meal - go back to config
      this.goBackToConfig();
      return;
    }

    if (this.state.currentMealIndex > 0) {
      // Remove the previously selected meal for the current type being shown
      const currentType = this.state.selectedMealTypes[this.state.currentMealIndex];
      delete this.state.selectedMeals[currentType];

      this.state.currentMealIndex--;
      const prevType = this.state.selectedMealTypes[this.state.currentMealIndex];
      delete this.state.selectedMeals[prevType];

      // Re-render previous meal selection
      const mealData = MEALS[prevType];
      const remaining = calculateRemainingCalories(
        this.state.tmbRange.target,
        this.state.selectedMeals
      );
      const remainingMealsCount = this.state.selectedMealTypes.length - this.state.currentMealIndex;
      const maxBudget = calculateMaxBudget(remaining, remainingMealsCount);
      const idealBudget = calculateIdealBudget(remaining, remainingMealsCount);

      const consumed = this.state.tmbRange.target - remaining;
      const percentage = calculatePercentage(consumed, this.state.tmbRange.target);

      document.getElementById('meal-screen-icon').textContent = mealData.icon;
      document.getElementById('meal-screen-title').textContent = mealData.label;
      document.getElementById('meal-step-indicator').textContent =
        `Refeição ${this.state.currentMealIndex + 1} de ${this.state.selectedMealTypes.length}`;

      document.getElementById('calories-remaining').textContent = formatNumber(remaining);
      document.getElementById('calories-target').textContent = formatNumber(this.state.tmbRange.target);
      document.getElementById('calories-consumed').textContent = formatNumber(consumed);
      document.getElementById('ideal-budget').textContent = formatNumber(idealBudget);

      const progressBar = document.getElementById('progress-fill');
      progressBar.style.width = `${percentage}%`;
      progressBar.style.backgroundColor = getProgressColor(percentage);

      this.renderPreviousMeals();

      const sortedMeals = filterAndSortMeals(mealData.items, maxBudget, idealBudget);
      const grid = document.getElementById('meal-grid');

      grid.innerHTML = sortedMeals.map((meal, idx) => `
        <div class="meal-card ${meal.available ? '' : 'disabled'}"
             data-meal-id="${meal.id}"
             onclick="${meal.available ? `App.selectMeal('${prevType}', '${meal.id}')` : ''}"
             style="animation-delay: ${idx * 0.05}s">
          <div class="meal-card-header">
            <h3 class="meal-name">${meal.name}</h3>
            ${!meal.available ? '<span class="meal-badge exceeded">Excede</span>' : ''}
            ${meal.available && meal.deviation < 50 ? '<span class="meal-badge ideal">Ideal</span>' : ''}
          </div>
          <p class="meal-description">${meal.description}</p>
          <div class="meal-nutrients">
            <div class="nutrient">
              <span class="nutrient-icon">🔥</span>
              <span class="nutrient-value">${meal.calories}</span>
              <span class="nutrient-label">kcal</span>
            </div>
            <div class="nutrient">
              <span class="nutrient-icon">💪</span>
              <span class="nutrient-value">${meal.protein}g</span>
              <span class="nutrient-label">proteína</span>
            </div>
          </div>
          <div class="meal-ingredients">
            ${meal.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join('')}
          </div>
        </div>
      `).join('');

      document.getElementById('btn-confirm-meal').disabled = true;
      document.getElementById('btn-confirm-meal').textContent = 'Confirmar e Próxima ➜';

      document.getElementById('btn-meal-back').style.display = 'flex';
    }
  },

  // ==========================================
  // TELA DE RESUMO
  // ==========================================

  showSummary() {
    const totalCalories = Object.values(this.state.selectedMeals)
      .reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = Object.values(this.state.selectedMeals)
      .reduce((sum, m) => sum + m.protein, 0);
    const target = this.state.tmbRange.target;
    const diff = target - totalCalories;
    const percentage = calculatePercentage(totalCalories, target);

    // Summary header
    document.getElementById('summary-total-cal').textContent = formatNumber(totalCalories);
    document.getElementById('summary-target-cal').textContent = formatNumber(target);
    document.getElementById('summary-total-prot').textContent = totalProtein;

    const diffEl = document.getElementById('summary-diff');
    if (diff >= 0) {
      diffEl.textContent = `${formatNumber(diff)} kcal abaixo da meta`;
      diffEl.className = 'summary-diff under';
    } else {
      diffEl.textContent = `${formatNumber(Math.abs(diff))} kcal acima da meta`;
      diffEl.className = 'summary-diff over';
    }

    // Summary progress ring
    const circle = document.getElementById('summary-progress-circle');
    const circumference = 2 * Math.PI * 54;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percentage / 100) * circumference;

    document.getElementById('summary-percentage').textContent = `${percentage}%`;

    // Meal cards list
    const list = document.getElementById('summary-meals-list');
    list.innerHTML = this.state.selectedMealTypes.map(type => {
      const meal = this.state.selectedMeals[type];
      const data = MEALS[type];
      return `
        <div class="summary-meal-card fade-in-up">
          <div class="summary-meal-type">
            <span class="summary-meal-icon">${data.icon}</span>
            <span>${data.label}</span>
          </div>
          <h3>${meal.name}</h3>
          <p>${meal.description}</p>
          <div class="summary-meal-nutrients">
            <span>🔥 ${meal.calories} kcal</span>
            <span>💪 ${meal.protein}g prot</span>
          </div>
        </div>
      `;
    }).join('');

    this.showScreen('summary', 'forward');
  },

  // ==========================================
  // AÇÕES GERAIS
  // ==========================================

  goToConfig() {
    this.showScreen('config', 'forward');
  },

  goBackToConfig() {
    this.state.currentMealIndex = 0;
    this.state.selectedMeals = {};
    this.showScreen('config', 'back');
  },

  restart() {
    this.state = {
      tmbRange: null,
      selectedMealTypes: [],
      currentMealIndex: 0,
      selectedMeals: {},
      currentScreen: 'welcome'
    };

    // Reset UI
    document.querySelectorAll('.tmb-option').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.meal-toggle').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-start').disabled = true;

    this.showScreen('welcome', 'back');
  },

  // Event bindings
  bindEvents() {
    // Meal type toggles
    document.querySelectorAll('.meal-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const type = toggle.dataset.mealType;
        this.toggleMealType(type);
      });
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
