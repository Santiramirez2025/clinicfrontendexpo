// ============================================================================
// components/dashboard/WellnessTipCard.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ModernCard } from './ModernCard';
import { dashboardStyles } from './styles';

export interface WellnessTip {
  title: string;
  content: string;
  category: string;
  iconName: string;
}

export interface WellnessTipCardProps {
  tip: WellnessTip | null;
}

export const WellnessTipCard: React.FC<WellnessTipCardProps> = ({ tip }) => {
  if (!tip) return null;

  return (
    <ModernCard>
      <View style={dashboardStyles.tipHeader}>
        <View style={dashboardStyles.tipIconContainer}>
          <Text style={dashboardStyles.tipIcon}>🌿</Text>
        </View>
        <View style={dashboardStyles.tipContent}>
          <Text style={dashboardStyles.tipTitle}>{tip.title}</Text>
          <Text style={dashboardStyles.tipText}>{tip.content}</Text>
        </View>
      </View>
    </ModernCard>
  );
};
