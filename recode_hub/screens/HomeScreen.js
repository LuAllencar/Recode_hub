// screens/HomeScreen.js
// Tela inicial do app

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { bg, accent, text } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <GlassCard>
          <Text style={styles.title}>RECODE_HUB</Text>
          <Text style={styles.subtitle}>Terra Perdida</Text>
        </GlassCard>

        {/* Mensagem motivacional */}
        <GlassCard style={{ marginTop: 20 }}>
          <Text style={styles.message}>
            Sua perspectiva de jogo depende do quanto você pode codar!
          </Text>
        </GlassCard>

        {/* Ações rápidas */}
        <GlassCard style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          
          <NeonButton 
            title="Abrir Codex" 
            variant="purple"
            onPress={() => navigation.navigate('Codex')}
            style={{ marginTop: 12 }}
          />
          
          <NeonButton 
            title="Ver Perfil" 
            variant="blue"
            onPress={() => navigation.navigate('Profile')}
            style={{ marginTop: 12 }}
          />
        </GlassCard>

        {/* Créditos */}
        <GlassCard style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.creator}>Desenvolvido por</Text>
          <Text style={styles.creatorName}>Luana Alencar</Text>
        </GlassCard>

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: accent.purple,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: text.secondary,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: accent.green,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: text.primary,
    marginBottom: 8,
  },
  creator: {
    fontSize: 12,
    color: text.tertiary,
    textAlign: 'center',
  },
  creatorName: {
    fontSize: 16,
    color: accent.green,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
});