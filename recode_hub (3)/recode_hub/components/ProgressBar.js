// components/ProgressBar.js
// Barra de progresso animada

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { accent, text, border } from '../theme/colors';

export default function ProgressBar({ 
  current,        // Valor atual
  max,           // Valor máximo
  color = 'green', // Cor: 'green', 'purple', 'blue'
  showLabel = true, // Mostrar números?
  height = 12,    // Altura da barra
}) {
  
  // Calcula a porcentagem
  const percentage = Math.min((current / max) * 100, 100);
  
  // Define a cor baseada na prop
  const getColor = () => {
    switch(color) {
      case 'purple': return accent.purple;
      case 'blue': return accent.blue;
      case 'pink': return accent.pink;
      default: return accent.green;
    }
  };

  const barColor = getColor();

  return (
    <View style={styles.container}>
      {/* Barra de fundo */}
      <View style={[styles.barBackground, { height }]}>
        {/* Barra de progresso */}
        <View 
          style={[
            styles.barFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: barColor,
              shadowColor: barColor, // Glow
            }
          ]} 
        />
      </View>
      
      {/* Label com números */}
      {showLabel && (
        <Text style={styles.label}>
          {current} / {max}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barBackground: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    overflow: 'hidden', // Importante para o border-radius funcionar
    borderWidth: 1,
    borderColor: border.light,
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
    
    // Efeito glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  label: {
    fontSize: 12,
    color: text.secondary,
    textAlign: 'right',
    marginTop: 4,
  },
});