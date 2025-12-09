import React from 'react';
import { View, StyleSheet } from 'react-native';
import { bg, border } from '../theme/colors';

export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: bg.card,           // Fundo semi-transparente
    borderRadius: 16,                   // Bordas arredondadas
    padding: 20,                        // Espaço interno
    borderWidth: 1,                     // Borda fina
    borderColor: border.neon,          // Borda branca transparente
    
    // Sombra (iOS e Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Sombra no Android
  },
});