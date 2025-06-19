// ============================================================================
// components/login/ElegantDivider.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { modernColors } from '../../styles';
import { loginStyles } from './styles';

export const ElegantDivider: React.FC = () => {
  return (
    <View style={loginStyles.divider}>
      <View style={loginStyles.dividerLine} />
      <View style={loginStyles.dividerTextContainer}>
        <Text style={loginStyles.dividerText}>O INICIA SESIÓN</Text>
      </View>
      <View style={loginStyles.dividerLine} />
    </View>
  );
};
