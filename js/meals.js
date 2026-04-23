// MeuNutri - Banco de Dados de Refeições
// Refeições montadas com foco em praticidade, nutrição e emagrecimento/ganho de massa

const MEALS = {
  breakfast: {
    label: "Café da Manhã",
    icon: "☕",
    items: [
      {
        id: "b1",
        name: "Omelete de Claras com Espinafre",
        description: "2 claras + 1 ovo inteiro, espinafre refogado e tomate",
        ingredients: ["2 claras de ovo", "1 ovo inteiro", "Espinafre", "Tomate", "Sal e pimenta"],
        calories: 220,
        protein: 20
      },
      {
        id: "b2",
        name: "Pão Integral com Ovo e Ricota",
        description: "2 fatias de pão integral, ovo mexido e ricota",
        ingredients: ["2 fatias pão integral", "1 ovo", "30g ricota", "Azeite"],
        calories: 310,
        protein: 18
      },
      {
        id: "b3",
        name: "Iogurte Natural com Granola e Frutas",
        description: "Iogurte desnatado com granola sem açúcar e frutas frescas",
        ingredients: ["200ml iogurte natural", "30g granola", "1 banana", "5 morangos"],
        calories: 280,
        protein: 14
      },
      {
        id: "b4",
        name: "Tapioca com Queijo Cottage",
        description: "Tapioca recheada com cottage e orégano",
        ingredients: ["2 col. sopa goma de tapioca", "40g queijo cottage", "Orégano"],
        calories: 230,
        protein: 16
      },
      {
        id: "b5",
        name: "Mingau de Aveia Proteico",
        description: "Aveia com leite desnatado, whey e canela",
        ingredients: ["40g aveia", "200ml leite desnatado", "1 scoop whey", "Canela"],
        calories: 340,
        protein: 28
      },
      {
        id: "b6",
        name: "Crepioca Recheada",
        description: "Massa de tapioca com ovo, queijo branco e tomate",
        ingredients: ["2 col. sopa goma de tapioca", "1 ovo", "30g queijo branco", "Tomate"],
        calories: 290,
        protein: 22
      },
      {
        id: "b7",
        name: "Smoothie Verde Proteico",
        description: "Shake de espinafre, banana, whey e leite",
        ingredients: ["1 punhado espinafre", "1 banana", "1 scoop whey", "200ml leite desnatado"],
        calories: 300,
        protein: 25
      },
      {
        id: "b8",
        name: "Panqueca de Banana com Aveia",
        description: "Panquecas fit de banana, aveia e ovo",
        ingredients: ["1 banana", "2 ovos", "30g aveia", "Canela"],
        calories: 270,
        protein: 16
      },
      {
        id: "b9",
        name: "Pão Integral com Peito de Peru",
        description: "Sanduíche leve com peito de peru e cottage",
        ingredients: ["2 fatias pão integral", "3 fatias peito de peru", "30g queijo cottage"],
        calories: 250,
        protein: 20
      },
      {
        id: "b10",
        name: "Bowl de Açaí Proteico",
        description: "Açaí com banana, granola e whey",
        ingredients: ["100g açaí sem açúcar", "1 banana", "20g granola", "1/2 scoop whey"],
        calories: 380,
        protein: 18
      }
    ]
  },

  lunch: {
    label: "Almoço",
    icon: "🍽️",
    items: [
      {
        id: "l1",
        name: "Frango Grelhado com Arroz Integral",
        description: "Peito de frango, arroz integral, feijão e salada verde",
        ingredients: ["150g peito de frango", "4 col. arroz integral", "1 concha feijão", "Salada verde"],
        calories: 550,
        protein: 42
      },
      {
        id: "l2",
        name: "Tilápia Assada com Batata Doce",
        description: "Filé de tilápia ao forno com batata doce e brócolis",
        ingredients: ["150g tilápia", "100g batata doce", "Brócolis", "Azeite e limão"],
        calories: 480,
        protein: 38
      },
      {
        id: "l3",
        name: "Carne Moída com Arroz e Legumes",
        description: "Patinho moído refogado com arroz e legumes salteados",
        ingredients: ["120g patinho moído", "4 col. arroz", "Cenoura", "Abobrinha", "Feijão"],
        calories: 580,
        protein: 35
      },
      {
        id: "l4",
        name: "Frango com Macarrão Integral",
        description: "Frango desfiado ao molho de tomate com macarrão integral",
        ingredients: ["130g frango desfiado", "80g macarrão integral", "Molho de tomate", "Manjericão"],
        calories: 520,
        protein: 36
      },
      {
        id: "l5",
        name: "Omelete de Forno com Legumes",
        description: "Omelete grande assada com legumes variados e queijo",
        ingredients: ["3 ovos", "Abobrinha", "Cenoura", "Espinafre", "30g queijo branco"],
        calories: 400,
        protein: 30
      },
      {
        id: "l6",
        name: "Bowl de Frango Desfiado",
        description: "Arroz integral, frango, feijão preto, milho e salada",
        ingredients: ["130g frango desfiado", "3 col. arroz integral", "Feijão preto", "Milho", "Alface e tomate"],
        calories: 530,
        protein: 40
      },
      {
        id: "l7",
        name: "Peixe Grelhado com Purê de Batata Doce",
        description: "Filé de peixe grelhado com purê leve e vagem",
        ingredients: ["150g filé de peixe", "100g batata doce", "Vagem", "Azeite"],
        calories: 460,
        protein: 35
      },
      {
        id: "l8",
        name: "Strogonoff de Frango Light",
        description: "Strogonoff com creme de leite light, arroz integral e salada",
        ingredients: ["140g frango em cubos", "Creme de leite light", "Champignon", "Arroz integral", "Salada"],
        calories: 560,
        protein: 38
      },
      {
        id: "l9",
        name: "Escondidinho de Frango",
        description: "Frango desfiado com purê de batata doce gratinado",
        ingredients: ["130g frango desfiado", "120g batata doce", "Requeijão light", "Queijo parmesão"],
        calories: 490,
        protein: 36
      },
      {
        id: "l10",
        name: "Salada Completa com Frango",
        description: "Salada rica com frango grelhado, grão-de-bico e ovo",
        ingredients: ["120g frango grelhado", "Grão-de-bico", "Ovo cozido", "Mix de folhas", "Tomate", "Azeite"],
        calories: 450,
        protein: 38
      }
    ]
  },

  snack: {
    label: "Lanche da Tarde",
    icon: "🥪",
    items: [
      {
        id: "s1",
        name: "Sanduíche Natural de Frango",
        description: "Pão integral com frango desfiado, cenoura e alface",
        ingredients: ["2 fatias pão integral", "60g frango desfiado", "Cenoura ralada", "Alface"],
        calories: 280,
        protein: 18
      },
      {
        id: "s2",
        name: "Shake Proteico de Banana",
        description: "Whey com banana, aveia e leite desnatado",
        ingredients: ["1 scoop whey", "1 banana", "20g aveia", "200ml leite desnatado"],
        calories: 300,
        protein: 28
      },
      {
        id: "s3",
        name: "Iogurte Grego com Mel e Castanhas",
        description: "Iogurte grego com fio de mel e castanhas picadas",
        ingredients: ["170g iogurte grego", "1 col. chá mel", "3 castanhas-do-pará"],
        calories: 230,
        protein: 15
      },
      {
        id: "s4",
        name: "Frutas com Pasta de Amendoim",
        description: "Maçã e banana com pasta de amendoim integral",
        ingredients: ["1 maçã", "1/2 banana", "1 col. sopa pasta de amendoim"],
        calories: 260,
        protein: 8
      },
      {
        id: "s5",
        name: "Tapioca com Queijo e Orégano",
        description: "Tapioca simples com queijo branco derretido",
        ingredients: ["2 col. sopa goma de tapioca", "30g queijo branco", "Orégano"],
        calories: 200,
        protein: 12
      },
      {
        id: "s6",
        name: "Mix de Oleaginosas e Frutas Secas",
        description: "Castanhas, nozes, uva passa e damasco",
        ingredients: ["3 castanhas-do-pará", "3 nozes", "1 col. sopa uva passa", "2 damascos"],
        calories: 290,
        protein: 8
      },
      {
        id: "s7",
        name: "Wrap de Atum",
        description: "Tortilha integral com atum, alface e tomate",
        ingredients: ["1 tortilha integral", "1/2 lata atum light", "Alface", "Tomate"],
        calories: 320,
        protein: 24
      },
      {
        id: "s8",
        name: "Bolo de Caneca Proteico",
        description: "Bolo rápido no micro-ondas com whey e banana",
        ingredients: ["1/2 scoop whey", "1/2 banana", "1 ovo", "1 col. sopa aveia"],
        calories: 250,
        protein: 22
      },
      {
        id: "s9",
        name: "Pão de Queijo com Suco Natural",
        description: "Pão de queijo pequeno com suco de laranja natural",
        ingredients: ["2 pães de queijo pequenos", "200ml suco de laranja"],
        calories: 270,
        protein: 10
      },
      {
        id: "s10",
        name: "Banana com Aveia e Canela",
        description: "Banana amassada com aveia e canela polvilhada",
        ingredients: ["1 banana", "2 col. sopa aveia", "Canela", "1 col. chá mel"],
        calories: 190,
        protein: 5
      }
    ]
  },

  dinner: {
    label: "Janta",
    icon: "🌙",
    items: [
      {
        id: "d1",
        name: "Sopa de Legumes com Frango",
        description: "Sopa nutritiva com frango desfiado e legumes",
        ingredients: ["100g frango desfiado", "Batata", "Cenoura", "Abobrinha", "Cebola e alho"],
        calories: 320,
        protein: 28
      },
      {
        id: "d2",
        name: "Omelete Recheada com Legumes",
        description: "Omelete com espinafre, tomate e queijo branco",
        ingredients: ["3 ovos", "Espinafre", "Tomate", "30g queijo branco"],
        calories: 350,
        protein: 25
      },
      {
        id: "d3",
        name: "Salada Completa com Atum",
        description: "Salada rica com atum, ovo cozido e azeite",
        ingredients: ["1 lata atum light", "1 ovo cozido", "Alface", "Tomate", "Cenoura", "Azeite"],
        calories: 380,
        protein: 32
      },
      {
        id: "d4",
        name: "Frango Grelhado com Legumes",
        description: "Peito de frango com legumes salteados variados",
        ingredients: ["150g peito de frango", "Abobrinha", "Cenoura", "Brócolis", "Azeite"],
        calories: 400,
        protein: 38
      },
      {
        id: "d5",
        name: "Sopa Cremosa de Abóbora com Frango",
        description: "Creme de abóbora leve com frango desfiado",
        ingredients: ["200g abóbora", "80g frango desfiado", "Cebola", "Alho", "Noz-moscada"],
        calories: 310,
        protein: 26
      },
      {
        id: "d6",
        name: "Wrap de Frango com Cream Cheese",
        description: "Tortilha integral com frango, cream cheese light e alface",
        ingredients: ["1 tortilha integral", "100g frango desfiado", "Cream cheese light", "Alface"],
        calories: 420,
        protein: 30
      },
      {
        id: "d7",
        name: "Peixe Assado com Salada",
        description: "Tilápia assada com salada verde completa",
        ingredients: ["150g tilápia", "Mix de folhas", "Tomate", "Pepino", "Azeite e limão"],
        calories: 360,
        protein: 34
      },
      {
        id: "d8",
        name: "Creme de Espinafre com Frango",
        description: "Creme leve de espinafre com frango desfiado",
        ingredients: ["Espinafre", "100g frango desfiado", "Creme de leite light", "Cebola", "Alho"],
        calories: 340,
        protein: 28
      },
      {
        id: "d9",
        name: "Salada Caesar com Frango",
        description: "Salada Caesar com frango grelhado e croutons integrais",
        ingredients: ["120g frango grelhado", "Alface romana", "Croutons integrais", "Parmesão", "Molho caesar light"],
        calories: 410,
        protein: 32
      },
      {
        id: "d10",
        name: "Panqueca de Carne Moída",
        description: "Panqueca integral recheada com carne e molho de tomate",
        ingredients: ["2 panquecas integrais", "100g carne moída", "Molho de tomate", "Queijo ralado"],
        calories: 460,
        protein: 30
      }
    ]
  }
};

const TMB_RANGES = [
  { label: "1.200 - 1.400 kcal", min: 1200, max: 1400, target: 1300 },
  { label: "1.400 - 1.600 kcal", min: 1400, max: 1600, target: 1500 },
  { label: "1.600 - 1.800 kcal", min: 1600, max: 1800, target: 1700 },
  { label: "1.800 - 2.000 kcal", min: 1800, max: 2000, target: 1900 },
  { label: "2.000 - 2.200 kcal", min: 2000, max: 2200, target: 2100 },
  { label: "2.200 - 2.500 kcal", min: 2200, max: 2500, target: 2350 }
];

const MEAL_ORDER = ["breakfast", "lunch", "snack", "dinner"];
const MIN_CALORIES_PER_MEAL = 150;
