// MeuNutri - Funções Utilitárias

/**
 * Calcula calorias restantes para a refeição atual
 */
function calculateRemainingCalories(targetCalories, selectedMeals) {
  const consumed = Object.values(selectedMeals).reduce((sum, meal) => sum + meal.calories, 0);
  return targetCalories - consumed;
}

/**
 * Calcula proteínas totais consumidas
 */
function calculateTotalProtein(selectedMeals) {
  return Object.values(selectedMeals).reduce((sum, meal) => sum + meal.protein, 0);
}

/**
 * Calcula o orçamento máximo para a refeição atual,
 * reservando um mínimo para as refeições restantes
 */
function calculateMaxBudget(remainingCalories, remainingMealsCount) {
  if (remainingMealsCount <= 1) return remainingCalories;
  return remainingCalories - ((remainingMealsCount - 1) * MIN_CALORIES_PER_MEAL);
}

/**
 * Calcula o orçamento ideal (sugerido) para esta refeição
 */
function calculateIdealBudget(remainingCalories, remainingMealsCount) {
  if (remainingMealsCount <= 0) return 0;
  return Math.round(remainingCalories / remainingMealsCount);
}

/**
 * Filtra e ordena refeições por adequação ao orçamento
 */
function filterAndSortMeals(meals, maxBudget, idealBudget) {
  return meals
    .map(meal => ({
      ...meal,
      available: meal.calories <= maxBudget,
      deviation: Math.abs(meal.calories - idealBudget)
    }))
    .sort((a, b) => {
      // Available first, then by closest to ideal
      if (a.available && !b.available) return -1;
      if (!a.available && b.available) return 1;
      return a.deviation - b.deviation;
    });
}

/**
 * Formata número com separador de milhar
 */
function formatNumber(num) {
  return num.toLocaleString('pt-BR');
}

/**
 * Calcula a porcentagem consumida
 */
function calculatePercentage(consumed, total) {
  return Math.min(Math.round((consumed / total) * 100), 100);
}

/**
 * Retorna a cor baseada na porcentagem de consumo
 */
function getProgressColor(percentage) {
  if (percentage <= 60) return 'var(--primary)';
  if (percentage <= 85) return 'var(--warning)';
  return 'var(--danger)';
}

/**
 * Anima um elemento com uma classe CSS
 */
function animateElement(element, animationClass, duration = 400) {
  return new Promise(resolve => {
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
      resolve();
    }, duration);
  });
}
