// components/NeonButton.js
// Botão com efeito neon e animação

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { accent, text } from '../theme/colors';

export default function NeonButton({ 
  title,           // Texto do botão
  onPress,         // Função ao clicar
  variant = 'green', // Cor: 'green', 'purple', 'blue', 'pink'
  style 
}) {
  
  // Define a cor baseada na variant
  const getColor = () => {
    switch(variant) {
      case 'purple': return accent.purple;
      case 'blue': return accent.blue;
      case 'pink': return accent.pink;
      default: return accent.green;
    }
  };

  const buttonColor = getColor();

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          borderColor: buttonColor,
          shadowColor: buttonColor, // Glow com a cor do botão
        },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7} // Efeito ao pressionar
    >
      <Text style={[styles.buttonText, { color: buttonColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fundo semi-transparente
    alignItems: 'center',
    justifyContent: 'center',
    
    // Efeito glow (neon)
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1, // Espaçamento entre letras
    textTransform: 'uppercase', // Texto em maiúsculas
  },
});