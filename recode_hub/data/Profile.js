// data/profile.js
// Dados do perfil do jogador

export const playerProfile = {
  name: 'Luana Alencar',
  level: 12,
  xp: 2850,
  xpToNextLevel: 3500,
  title: 'Engenheira Ambiental',
  joinDate: '2024-11-15',
  
  stats: {
    zonesRestored: 8,
    devicesBuilt: 24,
    codeLines: 1847,
    hoursPlayed: 42,
    missionsCompleted: 15,
    totalMissions: 30,
  },
  
  resources: {
    metal: 156,
    chip: 45,
    bateria: 78,
    madeira: 203,
    agua: 89,
  },
  
  achievements: [
    {
      id: 1,
      name: 'Primeiro Passo',
      description: 'Complete seu primeiro dispositivo',
      icon: '🎯',
      unlocked: true,
      unlockedDate: '2024-11-16',
    },
    {
      id: 2,
      name: 'Mestre do Código',
      description: 'Escreva 1000 linhas de código',
      icon: '💻',
      unlocked: true,
      unlockedDate: '2024-11-20',
    },
    {
      id: 3,
      name: 'Guardião Verde',
      description: 'Restaure 5 zonas ambientais',
      icon: '🌱',
      unlocked: true,
      unlockedDate: '2024-11-25',
    },
    {
      id: 4,
      name: 'Explorador',
      description: 'Descubra todas as zonas do mapa',
      icon: '🗺️',
      unlocked: false,
      unlockedDate: null,
    },
    {
      id: 5,
      name: 'Cientista Louco',
      description: 'Construa 50 dispositivos diferentes',
      icon: '🔬',
      unlocked: false,
      unlockedDate: null,
    },
    {
      id: 6,
      name: 'Herói da Terra',
      description: 'Complete a campanha principal',
      icon: '🏆',
      unlocked: false,
      unlockedDate: null,
    },
  ],
  
  recentActivity: [
    {
      id: 1,
      type: 'device',
      message: 'Construiu um Drone Scout',
      timestamp: '2024-12-08T10:30:00',
      icon: '🚁',
    },
    {
      id: 2,
      type: 'mission',
      message: 'Completou: Restaurar Zona Norte',
      timestamp: '2024-12-08T09:15:00',
      icon: '✅',
    },
    {
      id: 3,
      type: 'achievement',
      message: 'Desbloqueou: Guardião Verde',
      timestamp: '2024-12-07T18:45:00',
      icon: '🏆',
    },
    {
      id: 4,
      type: 'level',
      message: 'Subiu para o nível 12!',
      timestamp: '2024-12-07T16:20:00',
      icon: '⬆️',
    },
  ],
};