// ============================================================================
// components/login/ConnectionStatus.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';

export interface ConnectionStatusProps {
  status: 'checking' | 'connected' | 'error';
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'checking':
        return {
          icon: '⏳',
          text: 'Conectando...',
          backgroundColor: '#FFF3E0',
          textColor: '#E65100',
        };
      case 'connected':
        return {
          icon: '✅',
          text: 'Conectado al servidor',
          backgroundColor: modernColors.successModern + '20',
          textColor: modernColors.successModern,
        };
      case 'error':
        return {
          icon: '❌',
          text: 'Sin conexión',
          backgroundColor: modernColors.errorModern + '20',
          textColor: modernColors.errorModern,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[
      loginStyles.connectionBanner, 
      { backgroundColor: config.backgroundColor }
    ]}>
      <Text style={{ fontSize: 16 }}>{config.icon}</Text>
      <Text style={[loginStyles.connectionText, { color: config.textColor }]}>
        {config.text}
      </Text>
    </View>
  );
};