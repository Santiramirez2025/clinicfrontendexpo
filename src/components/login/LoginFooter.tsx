// ============================================================================
// components/login/LoginFooter.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { loginStyles } from './styles';

export const LoginFooter: React.FC = () => {
  return (
    <View style={loginStyles.footer}>
      <View style={loginStyles.securityBadge}>
        <Text style={loginStyles.securityIcon}>🔒</Text>
        <Text style={loginStyles.securityText}>Datos protegidos y encriptados</Text>
      </View>
    </View>
  );
};