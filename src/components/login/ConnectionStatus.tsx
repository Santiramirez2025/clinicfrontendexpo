// ============================================================================
// components/login/ConnectionStatus.tsx - CORREGIDO ✅
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';

// ⭐ INTERFACE CORREGIDA CON onRetry
export interface ConnectionStatusProps {
  status: 'checking' | 'connected' | 'error';
  onRetry: () => Promise<void>; // ⭐ AGREGADO - REQUERIDO POR ERROR
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  status, 
  onRetry // ⭐ AGREGADO
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'checking':
        return {
          icon: '⏳',
          text: 'Conectando...',
          backgroundColor: '#FFF3E0',
          textColor: '#E65100',
          showRetry: false,
        };
      case 'connected':
        return {
          icon: '✅',
          text: 'Conectado al servidor',
          backgroundColor: modernColors.successModern + '20',
          textColor: modernColors.successModern,
          showRetry: false,
        };
      case 'error':
        return {
          icon: '❌',
          text: 'Sin conexión al servidor',
          backgroundColor: modernColors.errorModern + '20',
          textColor: modernColors.errorModern,
          showRetry: true, // ⭐ MOSTRAR BOTÓN DE REINTENTAR
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[
      loginStyles.connectionBanner, 
      { backgroundColor: config.backgroundColor }
    ]}>
      <View style={styles.statusContent}>
        <Text style={{ fontSize: 16 }}>{config.icon}</Text>
        <Text style={[loginStyles.connectionText, { color: config.textColor }]}>
          {config.text}
        </Text>
      </View>
      
      {/* ⭐ BOTÓN DE REINTENTAR CUANDO HAY ERROR */}
      {config.showRetry && (
        <TouchableOpacity 
          style={[styles.retryButton, { borderColor: config.textColor }]}
          onPress={onRetry}
        >
          <Text style={[styles.retryText, { color: config.textColor }]}>
            Reintentar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ⭐ ESTILOS ADICIONALES
const styles = {
  statusContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 12,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
};