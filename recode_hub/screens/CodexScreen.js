import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { GameContext } from '../context/GameContext'; // novo import

export default function CodexScreen() {
  const { devices = [], deviceCategories = [] } = useContext(GameContext) || {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);

  // DEBUG: verifique no console se devices está vindo corretamente
  useEffect(() => {
    // Remova ou comente depois de debugar
    console.log('CodexScreen devices:', devices);
    console.log('CodexScreen categories:', deviceCategories);
  }, [devices, deviceCategories]);

  // Proteção: garante que filteredDevices sempre seja array
  const filteredDevices = (Array.isArray(devices) ? devices : []).filter(device => {
    if (!device) return false;
    // opcional: filtrar apenas desbloqueados (se for a regra)
    if (device.unlocked === false) return false;

    const matchCategory = selectedCategory === 'all' || device.category === selectedCategory;
    const matchSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ... o resto do seu componente (sem alterações)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CODEX</Text>
          <Text style={styles.subtitle}>Biblioteca de Dispositivos</Text>
          <Text style={styles.deviceCount}>Exibindo {filteredDevices.length} dispositivos</Text>
        </View>

        {/* Busca */}
        <GlassCard style={styles.searchCard}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar dispositivo..."
            placeholderTextColor={text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </GlassCard>

        {/* Categorias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {deviceCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de Dispositivos */}
        <View style={styles.devicesGrid}>
          {filteredDevices.map(device => (
            <TouchableOpacity
              key={device.id}
              onPress={() => setSelectedDevice(device)}
            >
              <GlassCard style={styles.deviceCard}>
                <Text style={styles.deviceIcon}>{device.icon}</Text>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceLevel}>Nível {device.level}</Text>
                <Text style={styles.deviceDescription} numberOfLines={2}>
                  {device.description}
                </Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Modal de Detalhes */}
      {selectedDevice && (
        <Modal
          visible={!!selectedDevice}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedDevice(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                
                {/* Header do Modal */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{selectedDevice.icon}</Text>
                  <Text style={styles.modalTitle}>{selectedDevice.name}</Text>
                  <Text style={styles.modalLevel}>Nível {selectedDevice.level}</Text>
                </View>

                {/* Descrição */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Descrição</Text>
                  <Text style={styles.modalDescription}>
                    {selectedDevice.description}
                  </Text>
                </GlassCard>

                {/* Recursos Necessários */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Recursos Necessários</Text>
                  {Object.entries(selectedDevice.resources).map(([key, value]) => (
                    <View key={key} style={styles.resourceRow}>
                      <Text style={styles.resourceName}>{key}</Text>
                      <Text style={styles.resourceValue}>x{value}</Text>
                    </View>
                  ))}
                </GlassCard>

                {/* Comandos */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Comandos Disponíveis</Text>
                  {selectedDevice.commands.map((cmd, index) => (
                    <View key={index} style={styles.commandRow}>
                      <Text style={styles.commandText}>{cmd}</Text>
                    </View>
                  ))}
                </GlassCard>

                {/* Código Exemplo */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Exemplo de Código</Text>
                  <ScrollView horizontal>
                    <Text style={styles.codeBlock}>
                      {selectedDevice.codeExample}
                    </Text>
                  </ScrollView>
                </GlassCard>

                {/* Botão Fechar */}
                <NeonButton
                  title="Fechar"
                  variant="purple"
                  onPress={() => setSelectedDevice(null)}
                  style={styles.closeButton}
                />

              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: accent.green,
  },
  subtitle: {
    fontSize: 14,
    color: text.secondary,
    marginTop: 4,
  },
  searchCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    color: text.primary,
    padding: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: border.light,
  },
  categoryChipActive: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderColor: accent.green,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  categoryText: {
    color: text.secondary,
    fontSize: 14,
  },
  categoryTextActive: {
    color: accent.green,
    fontWeight: 'bold',
  },
  devicesGrid: {
    paddingHorizontal: 20,
  },
  deviceCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  deviceIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 4,
  },
  deviceLevel: {
    fontSize: 12,
    color: accent.purple,
    marginBottom: 8,
  },
  deviceDescription: {
    fontSize: 14,
    color: text.secondary,
    textAlign: 'center',
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: bg.secondary,
    borderRadius: 20,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: border.medium,
  },
  modalHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  modalIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: accent.green,
  },
  modalLevel: {
    fontSize: 14,
    color: accent.purple,
    marginTop: 4,
  },
  modalSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: text.secondary,
    lineHeight: 20,
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  resourceName: {
    fontSize: 14,
    color: text.secondary,
    textTransform: 'capitalize',
  },
  resourceValue: {
    fontSize: 14,
    color: accent.green,
    fontWeight: 'bold',
  },
  commandRow: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: accent.green,
  },
  commandText: {
    fontSize: 13,
    color: accent.green,
    fontFamily: 'monospace',
  },
  codeBlock: {
    fontSize: 12,
    color: text.primary,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 8,
    lineHeight: 18,
  },
  closeButton: {
    margin: 16,
  },
  deviceCount: {
  fontSize: 12,
  color: text.tertiary,
  textAlign: 'center',
  marginTop: 4,
  },
});