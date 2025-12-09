// screens/ProfileScreen.js
// Tela de perfil e progressão do jogador

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Image,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { playerProfile } from '../data/Profile';

export default function ProfileScreen() {
  
  // Calcula a porcentagem de missões completas
  const missionProgress = (playerProfile.stats.missionsCompleted / playerProfile.stats.totalMissions) * 100;
  
  // Formata a data de entrada
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Formata timestamp para "há X horas/dias"
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffMs = now - activityDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Há poucos minutos';
    if (diffHours < 24) return `Há ${diffHours}h`;
    if (diffDays === 1) return 'Ontem';
    return `Há ${diffDays} dias`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header do Perfil */}
        <GlassCard style={styles.headerCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {playerProfile.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            {/* Badge de Nível */}
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{playerProfile.level}</Text>
            </View>
          </View>
          
          {/* Informações */}
          <Text style={styles.playerName}>{playerProfile.name}</Text>
          <Text style={styles.playerTitle}>{playerProfile.title}</Text>
          <Text style={styles.joinDate}>
            Jogando desde {formatDate(playerProfile.joinDate)}
          </Text>
          
          {/* Barra de XP */}
          <View style={styles.xpSection}>
            <Text style={styles.xpLabel}>Experiência</Text>
            <ProgressBar 
              current={playerProfile.xp}
              max={playerProfile.xpToNextLevel}
              color="purple"
            />
            <Text style={styles.xpToNext}>
              {playerProfile.xpToNextLevel - playerProfile.xp} XP para o próximo nível
            </Text>
          </View>
        </GlassCard>

        {/* Estatísticas */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerProfile.stats.zonesRestored}</Text>
              <Text style={styles.statLabel}>Zonas Restauradas</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerProfile.stats.devicesBuilt}</Text>
              <Text style={styles.statLabel}>Dispositivos</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerProfile.stats.codeLines}</Text>
              <Text style={styles.statLabel}>Linhas de Código</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerProfile.stats.hoursPlayed}h</Text>
              <Text style={styles.statLabel}>Tempo de Jogo</Text>
            </View>
          </View>
          
          {/* Progresso de Missões */}
          <View style={styles.missionProgress}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionLabel}>Progresso da Campanha</Text>
              <Text style={styles.missionPercentage}>{Math.round(missionProgress)}%</Text>
            </View>
            <ProgressBar 
              current={playerProfile.stats.missionsCompleted}
              max={playerProfile.stats.totalMissions}
              color="blue"
              showLabel={false}
            />
          </View>
        </GlassCard>

        {/* Recursos */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Recursos</Text>
          
          <View style={styles.resourcesGrid}>
            {Object.entries(playerProfile.resources).map(([resource, amount]) => (
              <View key={resource} style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Text style={styles.resourceEmoji}>
                    {resource === 'metal' && '⚙️'}
                    {resource === 'chip' && '💾'}
                    {resource === 'bateria' && '🔋'}
                    {resource === 'madeira' && '🪵'}
                    {resource === 'agua' && '💧'}
                  </Text>
                </View>
                <Text style={styles.resourceAmount}>{amount}</Text>
                <Text style={styles.resourceName}>{resource}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Conquistas */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Conquistas</Text>
          
          <View style={styles.achievementsGrid}>
            {playerProfile.achievements.map(achievement => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <Text style={[
                  styles.achievementIcon,
                  !achievement.unlocked && styles.achievementIconLocked
                ]}>
                  {achievement.icon}
                </Text>
                <Text style={[
                  styles.achievementName,
                  !achievement.unlocked && styles.achievementTextLocked
                ]}>
                  {achievement.name}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.achievementTextLocked
                ]}>
                  {achievement.description}
                </Text>
                
                {achievement.unlocked && (
                  <Text style={styles.achievementDate}>
                    {formatDate(achievement.unlockedDate)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Atividade Recente */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>📜 Atividade Recente</Text>
          
          {playerProfile.recentActivity.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityIcon}>{activity.icon}</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{getTimeAgo(activity.timestamp)}</Text>
              </View>
            </View>
          ))}
        </GlassCard>

        <View style={{ height: 80 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg.primary,
  },
  content: {
    padding: 20,
  },
  
  // Header do Perfil
  headerCard: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: accent.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: accent.green,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: text.primary,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: accent.green,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: bg.primary,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: bg.primary,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 4,
  },
  playerTitle: {
    fontSize: 16,
    color: accent.purple,
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 12,
    color: text.tertiary,
  },
  
  // XP Section
  xpSection: {
    width: '100%',
    marginTop: 20,
  },
  xpLabel: {
    fontSize: 14,
    color: text.secondary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  xpToNext: {
    fontSize: 12,
    color: text.tertiary,
    textAlign: 'center',
    marginTop: 4,
  },
  
  // Sections
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 16,
  },
  
  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: border.light,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: accent.green,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: text.secondary,
    textAlign: 'center',
  },
  
  // Mission Progress
  missionProgress: {
    marginTop: 16,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  missionLabel: {
    fontSize: 14,
    color: text.secondary,
    fontWeight: 'bold',
  },
  missionPercentage: {
    fontSize: 14,
    color: accent.blue,
    fontWeight: 'bold',
  },
  
  // Resources
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 204, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: accent.blue,
  },
  resourceEmoji: {
    fontSize: 24,
  },
  resourceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: accent.green,
    marginBottom: 2,
  },
  resourceName: {
    fontSize: 12,
    color: text.secondary,
    textTransform: 'capitalize',
  },
  
  // Achievements
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'rgba(123, 44, 191, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: accent.purple,
    alignItems: 'center',
  },
  achievementLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: border.light,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.3,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 11,
    color: text.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementTextLocked: {
    color: text.tertiary,
  },
  achievementDate: {
    fontSize: 10,
    color: accent.green,
  },
  
  // Activity
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: text.primary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: text.tertiary,
  },
});