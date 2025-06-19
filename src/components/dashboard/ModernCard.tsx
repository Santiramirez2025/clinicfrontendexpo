// ============================================================================
// components/dashboard/ModernCard.tsx - CORREGIDO
// ============================================================================
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { modernColors, modernSpacing, modernShadows } from '../../styles';
import type { ModernCardProps } from './types';

export const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  style = {}, 
  onPress,
  gradient = false,
  vip = false
}) => {
  const cardStyle = {
    backgroundColor: vip ? modernColors.vip + '10' : modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.md,
    ...(vip && { borderWidth: 1, borderColor: modernColors.vip + '30' }),
    ...style
  };

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};