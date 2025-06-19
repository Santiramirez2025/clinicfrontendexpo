// ============================================================================
// components/dashboard/RecommendationsSection.tsx - CORREGIDO
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TreatmentCarousel } from './TreatmentCarousel';
import { dashboardStyles } from './styles';
import type { RecommendationsSectionProps } from './types';

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  treatments,
  onTreatmentPress,
  onSeeAllPress,
}) => {
  return (
    <View style={dashboardStyles.recommendationsSection}>
      <View style={dashboardStyles.sectionHeader}>
        <Text style={dashboardStyles.sectionTitle}>Recomendado para ti</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={dashboardStyles.seeAllText}>Ver todo</Text>
        </TouchableOpacity>
      </View>
      
      <TreatmentCarousel
        treatments={treatments}
        onTreatmentPress={onTreatmentPress}
      />
    </View>
  );
};