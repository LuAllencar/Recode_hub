// screens/LoginScreen.js
// Tela de autenticação (Login e Cadastro)

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  
  // Estados do formulário
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Cadastro
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  // Atualiza um campo do formulário
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpa o erro daquele campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    // Validação de Nome (só no cadastro)
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (!isLogin && formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

    // Validação de Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação de Senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    // Validação de Confirmação de Senha (só no cadastro)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de Login
  const handleLogin = () => {
    if (!validateForm()) return;

    // Simula autenticação
    // Em produção, aqui você faria uma chamada para sua API
    login({
      name: formData.email.split('@')[0], // Pega o nome antes do @
      email: formData.email,
    });

    Alert.alert('Bem-vindo!', `Olá, ${formData.email}!`);
  };

  // Função de Cadastro
  const handleSignUp = () => {
    if (!validateForm()) return;

    // Simula cadastro
    login({
      name: formData.name,
      email: formData.email,
    });

    Alert.alert(
      'Cadastro realizado!',
      `Bem-vindo(a) à Terra Perdida, ${formData.name}!`
    );
  };

  // Alterna entre Login e Cadastro
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({}); // Limpa os erros ao alternar
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Background Effect */}
        <View style={styles.backgroundGrid} />

        {/* Logo/Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🌍</Text>
            <View style={styles.logoGlow} />
          </View>
          <Text style={styles.logoText}>RECODE_HUB</Text>
          <Text style={styles.logoSubtext}>Terra Perdida</Text>
          <Text style={styles.welcomeText}>
            {isLogin ? 'Bem-vindo de volta!' : 'Junte-se à missão'}
          </Text>
        </View>

        {/* Formulário */}
        <GlassCard style={styles.formCard}>
          {/* Tabs Login/Cadastro */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.tabActive]}
              onPress={() => isLogin ? null : toggleMode()}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.tabActive]}
              onPress={() => !isLogin ? null : toggleMode()}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
                Cadastro
              </Text>
            </TouchableOpacity>
          </View>

          {/* Campo Nome (só no cadastro) */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Digite seu nome"
                placeholderTextColor={text.tertiary}
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                autoCapitalize="words"
              />
              {errors.name && (
                <Text style={styles.errorText}>❌ {errors.name}</Text>
              )}
            </View>
          )}

          {/* Campo Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="seu@email.com"
              placeholderTextColor={text.tertiary}
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>❌ {errors.email}</Text>
            )}
          </View>

          {/* Campo Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={text.tertiary}
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={styles.errorText}>❌ {errors.password}</Text>
            )}
          </View>

          {/* Campo Confirmar Senha (só no cadastro) */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirmar Senha</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="••••••••"
                placeholderTextColor={text.tertiary}
                value={formData.confirmPassword}
                onChangeText={(value) => updateField('confirmPassword', value)}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  ❌ {errors.confirmPassword}
                </Text>
              )}
            </View>
          )}

          {/* Lembrar-me (só no login) */}
          {isLogin && (
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberMeText}>Lembrar-me</Text>
            </TouchableOpacity>
          )}

          {/* Botão Principal */}
          <NeonButton
            title={isLogin ? 'Entrar' : 'Criar Conta'}
            variant={isLogin ? 'green' : 'purple'}
            onPress={isLogin ? handleLogin : handleSignUp}
            style={styles.submitButton}
          />

          {/* Link para alternar modo */}
          <TouchableOpacity onPress={toggleMode} style={styles.switchModeBtn}>
            <Text style={styles.switchModeText}>
              {isLogin
                ? 'Não tem uma conta? '
                : 'Já tem uma conta? '}
              <Text style={styles.switchModeLink}>
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </Text>
            </Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Desenvolvido por{' '}
            <Text style={styles.footerHighlight}>Luana Alencar</Text>
          </Text>
          <Text style={styles.footerSubtext}>
            Salve o mundo através do código 🌍💚
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },

  // Background
  backgroundGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    // Simulação de grid tech (pode adicionar imagem depois)
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 80,
  },
  logoGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: accent.green,
    opacity: 0.3,
    borderRadius: 40,
    transform: [{ scale: 1.2 }],
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: accent.purple,
    marginBottom: 4,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 14,
    color: text.secondary,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: accent.green,
    fontWeight: 'bold',
  },

  // Form Card
  formCard: {
    marginBottom: 20,
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
  },
  tabText: {
    fontSize: 16,
    color: text.secondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: accent.green,
    fontWeight: 'bold',
  },

  // Input Groups
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: text.secondary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: border.light,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: text.primary,
  },
  inputError: {
    borderColor: accent.pink,
    borderWidth: 2,
  },
  errorText: {
    fontSize: 12,
    color: accent.pink,
    marginTop: 6,
  },

  // Remember Me
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: border.light,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: accent.green,
    borderColor: accent.green,
  },
  checkmark: {
    color: bg.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 14,
    color: text.secondary,
  },

  // Submit Button
  submitButton: {
    marginTop: 8,
  },

  // Switch Mode
  switchModeBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 14,
    color: text.secondary,
  },
  switchModeLink: {
    color: accent.green,
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: text.tertiary,
  },
  footerHighlight: {
    color: accent.green,
    fontWeight: 'bold',
  },
  footerSubtext: {
    fontSize: 11,
    color: text.tertiary,
    marginTop: 4,
  },
});