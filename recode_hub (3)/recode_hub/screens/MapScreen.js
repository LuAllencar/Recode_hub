// screens/MapScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import ProgressBar from '../components/ProgressBar';
import { mapZones } from '../data/Map';

export default function MapScreen() {
  const [selectedZone, setSelectedZone] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'restored': return accent.green;
      case 'restoration': return accent.blue;
      case 'toxic': return accent.pink;
      default: return text.secondary;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'restored': return '✅ Restaurada';
      case 'restoration': return '🔄 Em Restauração';
      case 'toxic': return '☢️ Tóxica';
      default: return 'Desconhecida';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MAPA DA TERRA PERDIDA</Text>
        <Text style={styles.headerSubtitle}>
          {mapZones.filter(z => z.explored).length} / {mapZones.length} zonas exploradas
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Legenda */}
        <GlassCard style={styles.legendCard}>
          <Text style={styles.legendTitle}>📍 Legenda</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: accent.green }]} />
              <Text style={styles.legendText}>Restaurada</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: accent.blue }]} />
              <Text style={styles.legendText}>Em Restauração</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: accent.pink }]} />
              <Text style={styles.legendText}>Tóxica</Text>
            </View>
          </View>
        </GlassCard>

        {/* Mapa de Zonas */}
        <View style={styles.mapGrid}>
          {mapZones.map(zone => (
            <TouchableOpacity
              key={zone.id}
              onPress={() => zone.explored && setSelectedZone(zone)}
              disabled={!zone.explored}
            >
              <GlassCard 
                style={[
                  styles.zoneCard,
                  { borderColor: getStatusColor(zone.status) },
                  !zone.explored && styles.zoneCardLocked,
                ]}
              >
                <Text style={[
                  styles.zoneIcon,
                  !zone.explored && styles.zoneIconLocked
                ]}>
                  {zone.explored ? zone.icon : '❓'}
                </Text>
                
                <Text style={[
                  styles.zoneName,
                  !zone.explored && styles.zoneTextLocked
                ]}>
                  {zone.explored ? zone.name : 'Inexplorada'}
                </Text>

                {zone.explored && (
                  <>
                    <Text style={[
                      styles.zoneStatus,
                      { color: getStatusColor(zone.status) }
                    ]}>
                      {getStatusText(zone.status)}
                    </Text>

                    {zone.status === 'restoration' && zone.progress && (
                      <View style={styles.zoneProgress}>
                        <ProgressBar
                          current={zone.progress}
                          max={100}
                          color="blue"
                          showLabel={false}
                          height={6}
                        />
                      </View>
                    )}

                    <View style={styles.zoneToxicity}>
                      <Text style={styles.zoneToxicityLabel}>
                        Toxicidade: {zone.toxicity}%
                      </Text>
                    </View>
                  </>
                )}

                {!zone.explored && (
                  <Text style={styles.lockText}>🔒 Explore para desbloquear</Text>
                )}
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Modal de Detalhes */}
      {selectedZone && (
        <Modal
          visible={!!selectedZone}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedZone(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{selectedZone.icon}</Text>
                  <Text style={styles.modalTitle}>{selectedZone.name}</Text>
                  <Text style={[
                    styles.modalStatus,
                    { color: getStatusColor(selectedZone.status) }
                  ]}>
                    {getStatusText(selectedZone.status)}
                  </Text>
                </View>

                {/* Descrição */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.modalDescription}>
                    {selectedZone.description}
                  </Text>
                </GlassCard>

                {/* Toxicidade */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>☢️ Nível de Toxicidade</Text>
                  <ProgressBar
                    current={selectedZone.toxicity}
                    max={100}
                    color="pink"
                    showLabel={true}
                  />
                  <Text style={styles.toxicityWarning}>
                    {selectedZone.toxicity > 70 && '⚠️ Área extremamente perigosa!'}
                    {selectedZone.toxicity > 40 && selectedZone.toxicity <= 70 && '⚠️ Equipamento de proteção necessário'}
                    {selectedZone.toxicity <= 40 && '✅ Nível seguro para exploração'}
                  </Text>
                </GlassCard>

                {/* Recursos Disponíveis */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>📦 Recursos Disponíveis</Text>
                  {Object.entries(selectedZone.resources).map(([resource, amount]) => (
                    <View key={resource} style={styles.resourceRow}>
                      <Text style={styles.resourceName}>{resource}</Text>
                      <Text style={styles.resourceAmount}>{amount}x</Text>
                    </View>
                  ))}
                </GlassCard>

                {/* Progresso de Restauração */}
                {selectedZone.status === 'restoration' && (
                  <GlassCard style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>🔄 Progresso de Restauração</Text>
                    <ProgressBar
                      current={selectedZone.progress}
                      max={100}
                      color="blue"
                    />
                  </GlassCard>
                )}

                {/* Botões */}
                {selectedZone.status === 'toxic' && (
                  <NeonButton
                    title="Iniciar Restauração"
                    variant="green"
                    onPress={() => {
                      setSelectedZone(null);
                      // Aqui seria a lógica de iniciar restauração
                    }}
                    style={styles.modalButton}
                  />
                )}

                <NeonButton
                  title="Fechar"
                  variant="purple"
                  onPress={() => setSelectedZone(null)}
                  style={styles.modalButton}
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
    color: accent.blue,
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
  legendCard: {
    marginBottom: 16,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: text.secondary,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  zoneCard: {
    width: '48%',
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  zoneCardLocked: {
    opacity: 0.5,
  },
  zoneIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  zoneIconLocked: {
    opacity: 0.3,
  },
  zoneName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  zoneTextLocked: {
    color: text.tertiary,
  },
  zoneStatus: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  zoneProgress: {
    width: '100%',
    marginBottom: 8,
  },
  zoneToxicity: {
    backgroundColor: 'rgba(255, 0, 110, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  zoneToxicityLabel: {
    fontSize: 10,
    color: accent.pink,
    fontWeight: 'bold',
  },
  lockText: {
    fontSize: 10,
    color: text.tertiary,
    textAlign: 'center',
    marginTop: 8,
  },
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
    color: accent.blue,
    marginBottom: 8,
  },
  modalStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalSection: {
    margin: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: text.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 12,
  },
  toxicityWarning: {
    fontSize: 12,
    color: text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  resourceName: {
    fontSize: 14,
    color: text.primary,
    textTransform: 'capitalize',
  },
  resourceAmount: {
    fontSize: 14,
    color: accent.green,
    fontWeight: 'bold',
  },
  modalButton: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
});