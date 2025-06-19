// ============================================================================
// components/login/DemoCard.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';
import { ModernButton } from './ModernButton';

export interface DemoCardProps {
  onDemoLogin: () => void;
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
}

export const DemoCard: React.FC<DemoCardProps> = ({ 
  onDemoLogin, 
  loading, 
  connectionStatus 
}) => {
  const features = [
    'Usuario VIP con historial completo',
    'Citas programadas reales',
    'Beauty Points sincronizados',
    'Notificaciones en tiempo real'
  ];

  return (
    <View style={loginStyles.demoCard}>
      <View style={loginStyles.demoHeader}>
        <View style={loginStyles.demoIconContainer}>
          <Text style={loginStyles.demoIcon}>✨</Text>
        </View>
        <Text style={loginStyles.demoTitle}>Experiencia Demo</Text>
        <Text style={loginStyles.demoSubtitle}>Conecta con el servidor real</Text>
      </View>
      
      <Text style={loginStyles.demoDescription}>
        Explora todas las funcionalidades con datos reales y sincronización en tiempo real
      </Text>
      
      <View style={loginStyles.features}>
        {features.map((feature, index) => (
          <View key={index} style={loginStyles.feature}>
            <View style={loginStyles.checkIconContainer}>
              <Text style={loginStyles.checkIcon}>✓</Text>
            </View>
            <Text style={loginStyles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <ModernButton
        title="Comenzar experiencia demo"
        onPress={onDemoLogin}
        loading={loading}
        disabled={connectionStatus === 'error'}
        variant="vip"
        icon="✨"
      />
    </View>
  );
};
