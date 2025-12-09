// data/store.js
// Sistema de loja e recursos

export const resources = [
  {
    id: 'metal',
    name: 'Metal',
    icon: '⚙️',
    description: 'Metal reciclado essencial para construção',
    color: '#808080',
    rarity: 'common',
  },
  {
    id: 'chip',
    name: 'Chip',
    icon: '💾',
    description: 'Processadores avançados para dispositivos',
    color: '#00ccff',
    rarity: 'rare',
  },
  {
    id: 'bateria',
    name: 'Bateria',
    icon: '🔋',
    description: 'Células de energia para alimentar tecnologias',
    color: '#00ff88',
    rarity: 'uncommon',
  },
  {
    id: 'madeira',
    name: 'Madeira',
    icon: '🪵',
    description: 'Madeira sustentável de áreas restauradas',
    color: '#8B4513',
    rarity: 'common',
  },
  {
    id: 'agua',
    name: 'Água',
    icon: '💧',
    description: 'Água purificada essencial para sobrevivência',
    color: '#1E90FF',
    rarity: 'common',
  },
  {
    id: 'cristal',
    name: 'Cristal Energético',
    icon: '💎',
    description: 'Cristais raros com propriedades energéticas',
    color: '#7b2cbf',
    rarity: 'epic',
  },
  {
    id: 'codigo',
    name: 'Fragmento de Código',
    icon: '📜',
    description: 'Algoritmos antigos que desbloqueiam tecnologias',
    color: '#ff006e',
    rarity: 'legendary',
  },
];

export const storeItems = [
  {
    id: 'bundle_basic',
    name: 'Pacote Iniciante',
    description: 'Kit básico de sobrevivência',
    icon: '📦',
    price: 100,
    currency: 'coins',
    contents: {
      metal: 10,
      madeira: 15,
      agua: 10,
    },
    discount: 0,
    featured: true,
  },
  {
    id: 'bundle_tech',
    name: 'Pacote Tecnológico',
    description: 'Componentes eletrônicos avançados',
    icon: '🔧',
    price: 500,
    currency: 'coins',
    contents: {
      chip: 5,
      bateria: 8,
      metal: 5,
    },
    discount: 15,
    featured: true,
  },
  {
    id: 'bundle_premium',
    name: 'Pacote Premium',
    description: 'Recursos raros e valiosos',
    icon: '✨',
    price: 1000,
    currency: 'coins',
    contents: {
      cristal: 3,
      codigo: 2,
      chip: 10,
      bateria: 10,
    },
    discount: 25,
    featured: true,
  },
  {
    id: 'metal_small',
    name: 'Metal (10x)',
    icon: '⚙️',
    price: 50,
    currency: 'coins',
    contents: { metal: 10 },
  },
  {
    id: 'chip_small',
    name: 'Chips (5x)',
    icon: '💾',
    price: 150,
    currency: 'coins',
    contents: { chip: 5 },
  },
  {
    id: 'bateria_small',
    name: 'Baterias (8x)',
    icon: '🔋',
    price: 120,
    currency: 'coins',
    contents: { bateria: 8 },
  },
];

export const craftingRecipes = [
  {
    id: 'craft_drone_scout',
    deviceId: 1, // Referência ao device
    deviceName: 'Drone Scout',
    icon: '🚁',
    requirements: {
      metal: 5,
      chip: 1,
      bateria: 2,
    },
    craftTime: 300, // 5 minutos em segundos
    xpReward: 50,
  },
  {
    id: 'craft_robo_agricultor',
    deviceId: 2,
    deviceName: 'Robo Agricultor',
    icon: '🤖',
    requirements: {
      metal: 8,
      chip: 2,
      bateria: 3,
    },
    craftTime: 600,
    xpReward: 100,
  },
  {
    id: 'craft_sensor',
    deviceId: 3,
    deviceName: 'Sensor Ambiental',
    icon: '📡',
    requirements: {
      metal: 3,
      chip: 2,
      bateria: 1,
    },
    craftTime: 240,
    xpReward: 40,
  },
];

export const transactionHistory = [
  {
    id: 1,
    type: 'purchase',
    item: 'Pacote Tecnológico',
    amount: -500,
    currency: 'coins',
    timestamp: '2024-12-09T08:30:00',
    icon: '🛍️',
  },
  {
    id: 2,
    type: 'craft',
    item: 'Drone Scout',
    resources: { metal: -5, chip: -1, bateria: -2 },
    timestamp: '2024-12-09T07:15:00',
    icon: '🔨',
  },
  {
    id: 3,
    type: 'reward',
    item: 'Missão Completada',
    amount: +200,
    currency: 'coins',
    timestamp: '2024-12-08T18:45:00',
    icon: '🎁',
  },
  {
    id: 4,
    type: 'sell',
    item: 'Metal (20x)',
    amount: +80,
    currency: 'coins',
    timestamp: '2024-12-08T16:20:00',
    icon: '💰',
  },
];