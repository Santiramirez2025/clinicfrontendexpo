// ============================================================================
// components/login/LoginForm.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';
import { ModernInput } from './ModernInput';
import { ModernButton } from './ModernButton';

export interface LoginFormProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  emailError,
  passwordError,
  loading,
  connectionStatus,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onForgotPassword,
  onRegister,
}) => {
  return (
    <View style={loginStyles.loginCard}>
      <Text style={loginStyles.formTitle}>Iniciar Sesión</Text>
      
      <ModernInput
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        placeholder="tu.email@ejemplo.com"
        keyboardType="email-address"
        error={emailError}
      />

      <ModernInput
        label="Contraseña"
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Tu contraseña segura"
        secureTextEntry
        error={passwordError}
      />

      <ModernButton
        title="Iniciar sesión"
        onPress={onLogin}
        loading={loading}
        disabled={connectionStatus === 'error'}
        variant="primary"
      />

      <View style={loginStyles.loginOptions}>
        <TouchableOpacity 
          onPress={onForgotPassword}
          style={loginStyles.linkButton}
        >
          <Text style={loginStyles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onRegister}
          style={loginStyles.linkButton}
        >
          <Text style={loginStyles.primaryLinkText}>Crear cuenta nueva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};