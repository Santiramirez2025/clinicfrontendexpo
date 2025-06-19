// ============================================================================
// components/dashboard/ActionButton.tsx
// ============================================================================
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { modernColors, modernSpacing, modernTypography, modernShadows } from '../../styles';

export interface ActionButtonProps {
  title: string;
  onPress: () => void;
  icon: string;
  variant?: 'primary' | 'secondary' | 'accent';
  loading?: boolean;
  fullWidth?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
  fullWidth = true
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: modernSpacing.componentModern.radiusMD,
      paddingVertical: modernSpacing.aesthetic.itemSpacing + 4,
      paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...modernShadows.md,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: modernColors.accent,
          ...modernShadows.colored.accent,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: modernColors.gray100,
          ...modernShadows.sm,
        };
      case 'accent':
        return {
          ...baseStyle,
          backgroundColor: modernColors.vip,
          shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 10,
        };
      default:
        return { ...baseStyle, backgroundColor: modernColors.accent };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'accent':
        return '#FFFFFF';
      case 'secondary':
        return modernColors.charcoal;
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        fullWidth && { width: '100%' },
        loading && { opacity: 0.7 }
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          <Text style={{ fontSize: 20, marginRight: 12 }}>{icon}</Text>
          <Text style={{
            fontSize: modernTypography.fontSizeModern.base,
            fontWeight: '600',
            color: getTextColor()
          }}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
