// ============================================================================
// components/common/AuthCard.tsx - CARD BASE REUTILIZABLE
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { modernColors, modernSpacing, modernShadows } from '../../styles';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <View style={{
      backgroundColor: modernColors.surfaceElevated,
      borderRadius: modernSpacing.componentModern.radiusLG,
      padding: modernSpacing.aesthetic.cardSpacing,
      marginBottom: modernSpacing.aesthetic.cardSpacing,
      ...modernShadows.md,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: modernColors.charcoal,
        marginBottom: subtitle ? 8 : modernSpacing.aesthetic.itemSpacing,
        textAlign: 'center',
      }}>
        {title}
      </Text>
      
      {subtitle && (
        <Text style={{
          fontSize: 14,
          color: modernColors.gray600,
          textAlign: 'center',
          marginBottom: modernSpacing.aesthetic.itemSpacing,
          lineHeight: 20,
        }}>
          {subtitle}
        </Text>
      )}
      
      {children}
    </View>
  );
};
