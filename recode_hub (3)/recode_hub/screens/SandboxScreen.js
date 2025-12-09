// screens/SandboxScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';

export default function SandboxScreen() {
  const [code, setCode] = useState(`# Bem-vindo ao Sandbox Python!
# Escreva seu código aqui

drone = DroneScout()
drone.scan(radius=10)
print("Escaneando área...")
`);
  const [output, setOutput] = useState('');
  const [selectedExample, setSelectedExample] = useState(null);

  const codeExamples = [
    {
      id: 1,
      title: 'Drone Scout Básico',
      icon: '🚁',
      code: `# Drone Scout - Exploração básica
drone = DroneScout()

# Escanear área
drone.scan(radius=15)

# Mover para coordenada
drone.move_to(x=10, y=20)

# Retornar à base
drone.return_home()

print("Missão completa!")`,
    },
    {
      id: 2,
      title: 'Loop de Cultivo',
      icon: '🌾',
      code: `# Robo Agricultor - Plantio automatizado
robo = RoboAgricultor()

# Plantar em grid 5x5
for x in range(5):
    for y in range(5):
        robo.move_to(x, y)
        robo.plant_seed("trigo")
        print(f"Plantado em ({x}, {y})")

print("Plantio concluído!")`,
    },
    {
      id: 3,
      title: 'Monitoramento Ambiental',
      icon: '📡',
      code: `# Sensor - Loop de monitoramento
sensor = SensorAmbiental()

while True:
    dados = sensor.read_all()
    
    toxicidade = dados['toxicidade']
    
    if toxicidade > 50:
        print(f"⚠️ ALERTA! Toxicidade: {toxicidade}%")
        purificador.activate()
    else:
        print(f"✅ Ambiente seguro: {toxicidade}%")
    
    time.sleep(60)`,
    },
    {
      id: 4,
      title: 'Condicional Simples',
      icon: '🔀',
      code: `# Exemplo de condicional
recursos = {
    'metal': 50,
    'chip': 10
}

if recursos['metal'] >= 5 and recursos['chip'] >= 1:
    print("✅ Recursos suficientes!")
    construir_drone()
else:
    print("❌ Recursos insuficientes")`,
    },
  ];

  const runCode = () => {
    // Simulação simples de execução
    setOutput('🔄 Executando código...\\n');
    
    setTimeout(() => {
      let result = '✅ Código executado com sucesso!\\n\\n';
      result += '📊 Output simulado:\\n';
      result += '-------------------\\n';
      
      // Simular alguns outputs baseados no código
      if (code.includes('drone')) {
        result += '🚁 Drone inicializado\\n';
        result += '📡 Escaneando área...\\n';
        result += '✅ Scan completo: 5 recursos encontrados\\n';
      }
      if (code.includes('robo')) {
        result += '🤖 Robo Agricultor ativado\\n';
        result += '🌱 Plantando sementes...\\n';
        result += '✅ 25 plantas cultivadas\\n';
      }
      if (code.includes('sensor')) {
        result += '📡 Sensores online\\n';
        result += '🌡️ Temperatura: 23°C\\n';
        result += '💨 Qualidade do ar: 85%\\n';
        result += '☢️ Toxicidade: 12%\\n';
      }
      if (code.includes('print')) {
        result += '\\n💬 Mensagens do código:\\n';
        const matches = code.match(/print\((.*?)\)/g);
        if (matches) {
          matches.forEach(match => {
            const msg = match.replace(/print\(|\)/g, '').replace(/["']/g, '');
            result += `   ${msg}\\n`;
          });
        }
      }
      
      result += '-------------------\\n';
      result += '✨ Execução finalizada!';
      
      setOutput(result);
    }, 1500);
  };

  const clearCode = () => {
    setCode('# Digite seu código aqui\\n');
    setOutput('');
  };

  const loadExample = (example) => {
    setCode(example.code);
    setOutput('');
    setSelectedExample(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💻 SANDBOX PYTHON</Text>
        <Text style={styles.headerSubtitle}>Editor de código experimental</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Botões de Ação */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setSelectedExample('show')}
          >
            <Text style={styles.actionButtonText}>📚 Exemplos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={clearCode}
          >
            <Text style={styles.actionButtonText}>🗑️ Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* Editor */}
        <GlassCard style={styles.editorCard}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>📝 Editor</Text>
            <Text style={styles.lineCount}>{code.split('\\n').length} linhas</Text>
          </View>
          
          <ScrollView style={styles.editorScroll} horizontal>
            <TextInput
              style={styles.editor}
              value={code}
              onChangeText={setCode}
              multiline
              placeholder="Digite seu código Python aqui..."
              placeholderTextColor={text.tertiary}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </ScrollView>

          <NeonButton
            title="▶️ Executar Código"
            variant="green"
            onPress={runCode}
            style={styles.runButton}
          />
        </GlassCard>

        {/* Output */}
        {output !== '' && (
          <GlassCard style={styles.outputCard}>
            <Text style={styles.outputTitle}>📤 Output</Text>
            <ScrollView style={styles.outputScroll}>
              <Text style={styles.outputText}>{output}</Text>
            </ScrollView>
          </GlassCard>
        )}

        {/* Dicas */}
        <GlassCard style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Dicas</Text>
          <Text style={styles.tipText}>• Use os exemplos para aprender</Text>
          <Text style={styles.tipText}>• Teste diferentes comandos</Text>
          <Text style={styles.tipText}>• Combine múltiplos dispositivos</Text>
          <Text style={styles.tipText}>• Experimente loops e condicionais</Text>
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de Exemplos */}
      {selectedExample && (
        <View style={styles.examplesOverlay}>
          <GlassCard style={styles.examplesCard}>
            <Text style={styles.examplesTitle}>📚 Exemplos de Código</Text>
            
            <ScrollView style={styles.examplesList}>
              {codeExamples.map(example => (
                <TouchableOpacity
                  key={example.id}
                  onPress={() => loadExample(example)}
                  style={styles.exampleItem}
                >
                  <Text style={styles.exampleIcon}>{example.icon}</Text>
                  <Text style={styles.exampleTitle}>{example.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <NeonButton
              title="Fechar"
              variant="purple"
              onPress={() => setSelectedExample(null)}
            />
          </GlassCard>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg.primary,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: accent.green,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: text.secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: accent.green,
    alignItems: 'center',
  },
  actionButtonText: {
    color: accent.green,
    fontSize: 14,
    fontWeight: 'bold',
  },
  editorCard: {
    marginBottom: 16,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  editorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: text.primary,
  },
  lineCount: {
    fontSize: 12,
    color: text.tertiary,
  },
  editorScroll: {
    maxHeight: 300,
  },
  editor: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: accent.green,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 8,
    minHeight: 200,
    minWidth: '100%',
  },
  runButton: {
    marginTop: 12,
  },
  outputCard: {
    marginBottom: 16,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 12,
  },
  outputScroll: {
    maxHeight: 200,
  },
  outputText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: text.primary,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 8,
    lineHeight: 18,
  },
  tipsCard: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: text.secondary,
    marginBottom: 6,
  },
  examplesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    padding: 20,
  },
  examplesCard: {
    maxHeight: '80%',
  },
  examplesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: accent.purple,
    marginBottom: 16,
    textAlign: 'center',
  },
  examplesList: {
    marginBottom: 16,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 44, 191, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: accent.purple,
  },
  exampleIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  exampleTitle: {
    fontSize: 16,
    color: text.primary,
    fontWeight: 'bold',
  },
});