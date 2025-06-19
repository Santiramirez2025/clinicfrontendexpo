
// ============================================================================
// components/login/TestCredentials.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';
import { ModernButton } from './ModernButton';

export interface TestCredentialsProps {
  onFillCredentials: () => void;
}

export const TestCredentials: React.FC<TestCredentialsProps> = ({ 
  onFillCredentials 
}) => {
  return (
    <View style={loginStyles.testSection}>
      <View style={loginStyles.testHeader}>
        <Text style={loginStyles.testIcon}>💡</Text>
        <Text style={loginStyles.testTitle}>Credenciales de prueba</Text>
      </View>
      
      <View style={loginStyles.credentialsContainer}>
        <View style={loginStyles.credentialRow}>
          <Text style={loginStyles.credentialLabel}>Email:</Text>
          <Text style={loginStyles.credentialValue}>demo@bellezaestetica.com</Text>
        </View>
        
        <View style={loginStyles.credentialRow}>
          <Text style={loginStyles.credentialLabel}>Contraseña:</Text>
          <Text style={loginStyles.credentialValue}>demo123</Text>
        </View>
      </View>
      
      <ModernButton
        title="Rellenar automáticamente"
        onPress={onFillCredentials}
        variant="outline"
        icon="🔄"
      />
    </View>
  );
};
