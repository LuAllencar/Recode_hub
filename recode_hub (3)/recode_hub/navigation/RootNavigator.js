// navigation/RootNavigator.js
// Versão simplificada SEM autenticação

import React from 'react';
import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  // Por enquanto, vai direto para o app
  // Depois adicionamos o login
  return <AppNavigator />;
}