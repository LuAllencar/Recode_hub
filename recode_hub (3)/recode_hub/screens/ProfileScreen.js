// screens/LoginScreen.js - FUNÇÃO handleLogin ATUALIZADA

const handleLogin = async () => {
  if (!validateForm()) return;

  // Mostrar loading
  setLoading(true);

  // Chamar o login do Firebase
  const result = await login(formData.email, formData.password);

  setLoading(false);

  if (result.success) {
    Alert.alert('Bem-vindo!', 'Login realizado com sucesso!');
  } else {
    Alert.alert('Erro', result.error);
  }
};

const handleSignUp = async () => {
  if (!validateForm()) return;

  setLoading(true);

  const result = await signUp(
    formData.name, 
    formData.email, 
    formData.password
  );

  setLoading(false);

  if (result.success) {
    Alert.alert(
      'Cadastro realizado!',
      `Bem-vindo(a) à Terra Perdida, ${formData.name}!`
    );
  } else {
    Alert.alert('Erro', result.error);
  }
};