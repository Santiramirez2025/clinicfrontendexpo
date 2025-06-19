// ============================================================================
// components/common/AuthHeader.tsx - VERSIÓN SIN ERRORES ✅
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { modernColors, modernSpacing, modernTypography, modernShadows } from '../../styles';

export interface AuthHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <View style={{
      alignItems: 'center',
      marginBottom: 40,
    }}>
      <View style={{
        width: 80,
        height: 80,
        borderRadius: 24, // Valor fijo en lugar de modernSpacing.componentModern.radiusXXL
        backgroundColor: modernColors.surfaceElevated,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: modernSpacing.aesthetic.itemSpacing,
        // Sombra expandida sin spread operator
        shadowColor: modernShadows.strong.shadowColor,
        shadowOffset: modernShadows.strong.shadowOffset,
        shadowOpacity: modernShadows.strong.shadowOpacity,
        shadowRadius: modernShadows.strong.shadowRadius,
        elevation: modernShadows.strong.elevation,
      }}>
        <Text style={{ fontSize: 36 }}>{icon}</Text>
      </View>
      
      <Text style={{
        fontSize: modernTypography.fontSizeModern.display,
        fontWeight: '300',
        color: modernColors.charcoal,
        letterSpacing: 0.4, // Valor fijo en lugar de modernTypography.letterSpacingModern.wide
        marginBottom: 4,
        textAlign: 'center',
      }}>
        {title}
      </Text>
      
      <Text style={{
        fontSize: modernTypography.fontSizeModern.lg,
        color: modernColors.gray600,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 27, // Valor fijo: 18 * 1.5 - SIN ERRORES
      }}>
        {subtitle}
      </Text>
    </View>
  );
};