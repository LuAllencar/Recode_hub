// screens/MissionsScreen.js
// Sistema de missões e progressão

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
import { missions, missionCategories } from '../data/Missions';

export default function MissionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMission, setSelectedMission] = useState(null);

  // Filtrar missões
  const filteredMissions = missions.filter(mission => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'completed') return mission.status === 'completed';
    return mission.category === selectedCategory;
  });

  // Estatísticas
  const stats = {
    total: missions.length,
    completed: missions.filter(m => m.status === 'completed').length,
    active: missions.filter(m => m.status === 'active').length,
  };

  // Função para cor de dificuldade
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return accent.green;
      case 'medium': return accent.blue;
      case 'hard': return accent.pink;
      default: return text.secondary;
    }
  };

  // Renderizar card de missão
  const renderMissionCard = (mission) => (
    <TouchableOpacity
      key={mission.id}
      onPress={() => setSelectedMission(mission)}
      disabled={mission.status === 'locked'}
    >
      <GlassCard 
        style={[
          styles.missionCard,
          mission.status === 'locked' && styles.missionCardLocked,
          mission.status === 'completed' && styles.missionCardCompleted,
        ]}
      >
        <View style={styles.missionHeader}>
          <Text style={[
            styles.missionIcon,
            mission.status === 'locked' && styles.missionIconLocked
          ]}>
            {mission.icon}
          </Text>
          <View style={styles.missionInfo}>
            <Text style={[
              styles.missionTitle,
              mission.status === 'locked' && styles.missionTextLocked
            ]}>
              {mission.title}
            </Text>
            <Text style={[
              styles.missionDescription,
              mission.status === 'locked' && styles.missionTextLocked
            ]} numberOfLines={2}>
              {mission.description}
            </Text>
          </View>
          {mission.status === 'locked' && (
            <Text style={styles.lockIcon}>🔒</Text>
          )}
          {mission.status === 'completed' && (
            <Text style={styles.completedIcon}>✅</Text>
          )}
        </View>

        {/* Dificuldade e Categoria */}
        <View style={styles.missionMeta}>
          <View style={[
            styles.difficultyBadge,
            { borderColor: getDifficultyColor(mission.difficulty) }
          ]}>
            <Text style={[
              styles.difficultyText,
              { color: getDifficultyColor(mission.difficulty) }
            ]}>
              {mission.difficulty === 'easy' && '⭐ Fácil'}
              {mission.difficulty === 'medium' && '⭐⭐ Médio'}
              {mission.difficulty === 'hard' && '⭐⭐⭐ Difícil'}
            </Text>
          </View>

          {mission.timeLimit && mission.status === 'active' && (
            <View style={styles.timeLimitBadge}>
              <Text style={styles.timeLimitText}>⏰ {mission.timeLimit}</Text>
            </View>
          )}
        </View>

        {/* Progresso */}
        {mission.status !== 'locked' && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progresso</Text>
              <Text style={styles.progressPercentage}>{mission.progress}%</Text>
            </View>
            <ProgressBar
              current={mission.progress}
              max={100}
              color={mission.status === 'completed' ? 'green' : 'purple'}
              showLabel={false}
              height={8}
            />
          </View>
        )}

        {/* Recompensas */}
        <View style={styles.rewardsSection}>
          <Text style={styles.rewardsLabel}>Recompensas:</Text>
          <View style={styles.rewardsRow}>
            {mission.rewards.xp && (
              <Text style={styles.rewardItem}>⭐ {mission.rewards.xp} XP</Text>
            )}
            {mission.rewards.coins && (
              <Text style={styles.rewardItem}>🪙 {mission.rewards.coins}</Text>
            )}
            {mission.rewards.items && (
              <Text style={styles.rewardItem}>
                📦 {Object.keys(mission.rewards.items).length} itens
              </Text>
            )}
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MISSÕES</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.active}</Text>
            <Text style={styles.statLabel}>Ativas</Text>
          </View>
        </View>
      </View>

      {/* Categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {missionCategories.map(category => (
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

      {/* Lista de Missões */}
      <ScrollView style={styles.content}>
        {filteredMissions.map(mission => renderMissionCard(mission))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Modal de Detalhes */}
      {selectedMission && (
        <Modal
          visible={!!selectedMission}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedMission(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{selectedMission.icon}</Text>
                  <Text style={styles.modalTitle}>{selectedMission.title}</Text>
                  <View style={[
                    styles.difficultyBadge,
                    { borderColor: getDifficultyColor(selectedMission.difficulty) }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(selectedMission.difficulty) }
                    ]}>
                      {selectedMission.difficulty === 'easy' && '⭐ Fácil'}
                      {selectedMission.difficulty === 'medium' && '⭐⭐ Médio'}
                      {selectedMission.difficulty === 'hard' && '⭐⭐⭐ Difícil'}
                    </Text>
                  </View>
                </View>

                {/* Descrição */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.modalDescription}>
                    {selectedMission.description}
                  </Text>
                </GlassCard>

                {/* Objetivos */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>📋 Objetivos</Text>
                  {selectedMission.objectives.map(objective => (
                    <View key={objective.id} style={styles.objectiveItem}>
                      <Text style={styles.objectiveCheckbox}>
                        {objective.completed ? '✅' : '⬜'}
                      </Text>
                      <View style={styles.objectiveContent}>
                        <Text style={[
                          styles.objectiveText,
                          objective.completed && styles.objectiveTextCompleted
                        ]}>
                          {objective.text}
                        </Text>
                        {objective.target > 1 && (
                          <Text style={styles.objectiveProgress}>
                            {objective.current} / {objective.target}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </GlassCard>

                {/* Recompensas Detalhadas */}
                <GlassCard style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>🎁 Recompensas</Text>
                  
                  {selectedMission.rewards.xp && (
                    <View style={styles.rewardDetailItem}>
                      <Text style={styles.rewardDetailIcon}>⭐</Text>
                      <Text style={styles.rewardDetailText}>
                        {selectedMission.rewards.xp} XP
                      </Text>
                    </View>
                  )}

                  {selectedMission.rewards.coins && (
                    <View style={styles.rewardDetailItem}>
                      <Text style={styles.rewardDetailIcon}>🪙</Text>
                      <Text style={styles.rewardDetailText}>
                        {selectedMission.rewards.coins} Moedas
                      </Text>
                    </View>
                  )}

                  {selectedMission.rewards.items && (
                    <>
                      {Object.entries(selectedMission.rewards.items).map(([item, amount]) => (
                        <View key={item} style={styles.rewardDetailItem}>
                          <Text style={styles.rewardDetailIcon}>📦</Text>
                          <Text style={styles.rewardDetailText}>
                            {item} x{amount}
                          </Text>
                        </View>
                      ))}
                    </>
                  )}
                </GlassCard>

                {/* Botões */}
                {selectedMission.status === 'active' && (
                  <NeonButton
                    title="Continuar Missão"
                    variant="green"
                    onPress={() => setSelectedMission(null)}
                    style={styles.modalButton}
                  />
                )}

                {selectedMission.status === 'completed' && (
                  <View style={styles.completedInfo}>
                    <Text style={styles.completedText}>
                      ✅ Concluída em {new Date(selectedMission.completedDate).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                )}

                <NeonButton
                  title="Fechar"
                  variant="purple"
                  onPress={() => setSelectedMission(null)}
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

  // Header
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: accent.purple,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: accent.green,
  },
  statLabel: {
    fontSize: 12,
    color: text.secondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: border.light,
  },

  // Categorias
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
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
    backgroundColor: 'rgba(123, 44, 191, 0.2)',
    borderColor: accent.purple,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    color: text.secondary,
    fontSize: 14,
  },
  categoryTextActive: {
    color: accent.purple,
    fontWeight: 'bold',
  },

  // Content
  content: {
    flex: 1,
    padding: 16,
  },

  // Mission Cards
  missionCard: {
    marginBottom: 16,
  },
  missionCardLocked: {
    opacity: 0.5,
  },
  missionCardCompleted: {
    borderColor: accent.green,
    borderWidth: 2,
  },
  missionHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  missionIcon: {
    fontSize: 48,
    marginRight: 12,
  },
  missionIconLocked: {
    opacity: 0.3,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 13,
    color: text.secondary,
  },
  missionTextLocked: {
    color: text.tertiary,
  },
  lockIcon: {
    fontSize: 24,
  },
  completedIcon: {
    fontSize: 24,
  },

  // Meta
  missionMeta: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  difficultyBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  timeLimitBadge: {
    backgroundColor: 'rgba(255, 0, 110, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  timeLimitText: {
    fontSize: 11,
    color: accent.pink,
    fontWeight: 'bold',
  },

  // Progress
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: text.secondary,
  },
  progressPercentage: {
    fontSize: 12,
    color: accent.purple,
    fontWeight: 'bold',
  },

  // Rewards
  rewardsSection: {
    borderTopWidth: 1,
    borderTopColor: border.light,
    paddingTop: 12,
  },
  rewardsLabel: {
    fontSize: 12,
    color: text.secondary,
    marginBottom: 6,
  },
  rewardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rewardItem: {
    fontSize: 12,
    color: accent.green,
    fontWeight: 'bold',
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
    color: accent.purple,
    textAlign: 'center',
    marginBottom: 12,
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

  // Objectives
  objectiveItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  objectiveCheckbox: {
    fontSize: 20,
    marginRight: 12,
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveText: {
    fontSize: 14,
    color: text.primary,
    marginBottom: 2,
  },
  objectiveTextCompleted: {
    textDecorationLine: 'line-through',
    color: text.tertiary,
  },
  objectiveProgress: {
    fontSize: 12,
    color: accent.blue,
  },

  // Reward Details
  rewardDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardDetailIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  rewardDetailText: {
    fontSize: 14,
    color: text.primary,
  },

  // Modal Buttons
  modalButton: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  completedInfo: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    color: accent.green,
    fontWeight: 'bold',
  },
});