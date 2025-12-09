// data/Devices.js
// Base de dados dos dispositivos do jogo

export const deviceCategories = [
  { id: 'all', name: 'Todos', icon: '🎮' },
  { id: 'drones', name: 'Drones', icon: '🚁' },
  { id: 'robots', name: 'Robôs', icon: '🤖' },
  { id: 'sensors', name: 'Sensores', icon: '📡' },
  { id: 'energy', name: 'Energia', icon: '⚡' },
  { id: 'environment', name: 'Ambiente', icon: '🌱' },
];

export const devices = [
  {
    id: 1,
    name: 'Drone Scout',
    category: 'drones',
    icon: '🚁',
    description: 'Drone de reconhecimento para mapear áreas desconhecidas e detectar recursos.',
    level: 1,
    unlocked: true, // Já desbloqueado
    resources: {
      metal: 5,
      chip: 1,
      bateria: 2,
    },
    codeExample: `# Drone Scout - Exemplo básico
drone = DroneScout()

# Escanear área em um raio de 10m
drone.scan(radius=10)

# Retornar à base
drone.return_home()

# Obter dados coletados
data = drone.get_scan_data()
print(f"Recursos encontrados: {data}")`,
    commands: [
      'drone.scan(radius)',
      'drone.move_to(x, y)',
      'drone.return_home()',
      'drone.get_scan_data()',
    ],
  },
  {
    id: 2,
    name: 'Robo Agricultor',
    category: 'robots',
    icon: '🤖',
    description: 'Robô autônomo para plantar sementes e cuidar de cultivos em zonas restauradas.',
    level: 2,
    unlocked: true,
    resources: {
      metal: 8,
      chip: 2,
      bateria: 3,
    },
    codeExample: `# Robo Agricultor - Cultivo automatizado
robo = RoboAgricultor()

# Plantar em área 5x5
for x in range(5):
    for y in range(5):
        robo.move_to(x, y)
        robo.plant_seed("trigo")
        robo.water()

# Verificar saúde das plantas
status = robo.check_crops()
print(f"Plantas saudáveis: {status}")`,
    commands: [
      'robo.plant_seed(type)',
      'robo.water()',
      'robo.harvest()',
      'robo.check_crops()',
    ],
  },
  {
    id: 3,
    name: 'Sensor Ambiental',
    category: 'sensors',
    icon: '📡',
    description: 'Monitora qualidade do ar, radiação e toxicidade em tempo real.',
    level: 1,
    unlocked: true,
    resources: {
      metal: 3,
      chip: 2,
      bateria: 1,
    },
    codeExample: `# Sensor Ambiental - Monitoramento
sensor = SensorAmbiental()

# Loop de monitoramento
while True:
    dados = sensor.read_all()
    
    if dados['toxicidade'] > 50:
        print("⚠️ ALERTA: Área tóxica!")
        purificador.activate()
    
    time.sleep(60)  # Checa a cada minuto`,
    commands: [
      'sensor.read_all()',
      'sensor.get_air_quality()',
      'sensor.get_radiation()',
      'sensor.get_toxicity()',
    ],
  },
  {
    id: 4,
    name: 'Estação Solar',
    category: 'energy',
    icon: '⚡',
    description: 'Gera energia limpa a partir da luz solar. Essencial para expansão da base.',
    level: 3,
    unlocked: false, // Bloqueado
    resources: {
      metal: 12,
      chip: 3,
      bateria: 5,
    },
    codeExample: `# Estação Solar - Gerenciamento de energia
estacao = EstacaoSolar()

# Configurar ângulo de painéis
estacao.set_panel_angle(45)

# Monitorar produção
energia = estacao.get_energy_output()
print(f"Produzindo: {energia}kW")

# Distribuir energia
estacao.distribute_to("base_principal")`,
    commands: [
      'estacao.set_panel_angle(angle)',
      'estacao.get_energy_output()',
      'estacao.distribute_to(target)',
      'estacao.get_battery_level()',
    ],
  },
  {
    id: 5,
    name: 'Purificador de Água',
    category: 'environment',
    icon: '🌱',
    description: 'Remove toxinas e purifica água contaminada para consumo e irrigação.',
    level: 2,
    unlocked: true,
    resources: {
      metal: 6,
      chip: 2,
      bateria: 2,
    },
    codeExample: `# Purificador de Água
purificador = PurificadorAgua()

# Analisar fonte de água
qualidade = purificador.analyze_water()
print(f"Pureza: {qualidade['purity']}%")

# Iniciar purificação
if qualidade['purity'] < 80:
    purificador.start_purification()
    purificador.wait_until_complete()

# Coletar água limpa
agua_limpa = purificador.collect(liters=100)`,
    commands: [
      'purificador.analyze_water()',
      'purificador.start_purification()',
      'purificador.collect(liters)',
      'purificador.get_purity_level()',
    ],
  },
  {
    id: 6,
    name: 'Drone Transporte',
    category: 'drones',
    icon: '🚁',
    description: 'Drone de carga pesada para transportar recursos entre zonas.',
    level: 3,
    unlocked: false,
    resources: {
      metal: 10,
      chip: 2,
      bateria: 4,
    },
    codeExample: `# Drone Transporte - Logística
drone = DroneTransporte()

# Carregar recursos
drone.load_cargo({
    "metal": 50,
    "madeira": 30
})

# Voar para destino
drone.fly_to("zona_norte")

# Descarregar
drone.unload_cargo()

# Verificar capacidade
capacidade = drone.get_cargo_capacity()
print(f"Capacidade: {capacidade}kg")`,
    commands: [
      'drone.load_cargo(items)',
      'drone.unload_cargo()',
      'drone.fly_to(location)',
      'drone.get_cargo_capacity()',
    ],
  },
  {
    id: 7,
    name: 'Construtor Autônomo',
    category: 'robots',
    icon: '🏗️',
    description: 'Robô construtor capaz de erguer estruturas básicas automaticamente.',
    level: 4,
    unlocked: false,
    resources: {
      metal: 15,
      chip: 4,
      bateria: 6,
    },
    codeExample: `# Construtor Autônomo
construtor = ConstrutorAutonomo()

# Definir projeto
construtor.load_blueprint("abrigo_basico")

# Construir
construtor.build(
    position=(10, 20),
    materials={"metal": 20, "madeira": 50}
)

# Verificar progresso
progresso = construtor.get_build_progress()
print(f"Construção: {progresso}%")`,
    commands: [
      'construtor.load_blueprint(type)',
      'construtor.build(position, materials)',
      'construtor.get_build_progress()',
      'construtor.repair_structure(id)',
    ],
  },
  {
    id: 8,
    name: 'Scanner Geológico',
    category: 'sensors',
    icon: '🔍',
    description: 'Detecta depósitos minerais e recursos subterrâneos.',
    level: 2,
    unlocked: true,
    resources: {
      metal: 7,
      chip: 3,
      bateria: 2,
    },
    codeExample: `# Scanner Geológico
scanner = ScannerGeologico()

# Scan profundo
resultados = scanner.deep_scan(
    area=(0, 0, 100, 100),
    depth=50
)

# Processar dados
for recurso in resultados:
    print(f"{recurso['tipo']}: {recurso['quantidade']} unidades")
    print(f"Localização: {recurso['coords']}")`,
    commands: [
      'scanner.deep_scan(area, depth)',
      'scanner.locate_resource(type)',
      'scanner.get_mineral_composition()',
      'scanner.mark_location(coords)',
    ],
  },
];