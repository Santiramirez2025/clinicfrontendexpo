// ============================================================================
// components/profile/SectionHeader.tsx - HEADER DE SECCIÓN
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { profileStyles } from './styles';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => (
  <View style={profileStyles.sectionHeader}>
    <View style={profileStyles.sectionIconContainer}>
      <Text style={profileStyles.sectionIcon}>{icon}</Text>
    </View>
    <View style={profileStyles.sectionTitleContainer}>
      <Text style={profileStyles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={profileStyles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  </View>
);