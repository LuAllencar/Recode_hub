import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import NeonButton from '../components/NeonButton';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <View>
      <Text>Bem-vinda ao RECODE</Text>
      <NeonButton
        title="Entrar"
        onPress={() => login('Luana')}
      />
    </View>
  );
}
