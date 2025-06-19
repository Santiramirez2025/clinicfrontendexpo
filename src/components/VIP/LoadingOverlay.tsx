// ============================================================================
// components/VIP/LoadingOverlay.tsx - OVERLAY DE CARGA
// ============================================================================
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { vipStyles } from './styles';
import { modernColors } from '../../styles';

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  visible, 
  text = 'Procesando suscripción...' 
}) => {
  if (!visible) return null;

  return (
    <View style={vipStyles.subscriptionOverlay}>
      <View style={vipStyles.subscriptionModal}>
        <ActivityIndicator size="large" color={modernColors.vip} />
        <Text style={vipStyles.subscriptionText}>{text}</Text>
      </View>
    </View>
  );
};
