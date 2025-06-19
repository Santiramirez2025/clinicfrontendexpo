// ============================================================================
// components/login/ModernButton.tsx
// ============================================================================
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { modernColors, modernSpacing, modernTypography, modernShadows } from '../../styles';
import { loginStyles } from './styles';

export interface ModernButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'vip';
  icon?: string;
  fullWidth?: boolean;
}

export const ModernButton: React.FC<ModernButtonProps> = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false, 
  variant = 'primary', 
  icon,
  fullWidth = true
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: modernSpacing.componentModern.radiusMD,
      paddingVertical: modernSpacing.aesthetic.itemSpacing,
      paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
      ...modernShadows.md,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: modernColors.accent,
          ...modernShadows.colored.accent,
        };
      case 'vip':
        return {
          ...baseStyle,
          backgroundColor: modernColors.vip,
          shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 10,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: modernColors.gray100,
          ...modernShadows.sm,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: modernColors.accent,
          shadowOpacity: 0,
          elevation: 0,
        };
      default:
        return { ...baseStyle, backgroundColor: modernColors.accent };
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: modernTypography.fontSizeModern.base,
      fontWeight: '600' as const,
      textAlign: 'center' as const,
    };

    switch (variant) {
      case 'primary':
      case 'vip':
        return { ...baseStyle, color: '#FFFFFF' };
      case 'secondary':
        return { ...baseStyle, color: modernColors.charcoal };
      case 'outline':
        return { ...baseStyle, color: modernColors.accent };
      default:
        return { ...baseStyle, color: '#FFFFFF' };
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        fullWidth && { width: '100%' },
        (disabled || loading) && { opacity: 0.6 }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={loginStyles.buttonContent}>
        {loading && (
          <ActivityIndicator 
            color={variant === 'outline' ? modernColors.accent : '#FFFFFF'} 
            style={{ marginRight: 8 }}
            size="small"
          />
        )}
        {!loading && icon && (
          <Text style={{ fontSize: 18, marginRight: 8 }}>{icon}</Text>
        )}
        <Text style={getTextStyle()}>
          {loading ? 'Cargando...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};