// ============================================================================
// components/dashboard/TreatmentCarousel.tsx - CORREGIDO
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { dashboardStyles } from './styles';
import type { TreatmentCarouselProps } from './types';

export const TreatmentCarousel: React.FC<TreatmentCarouselProps> = ({ 
  treatments, 
  onTreatmentPress 
}) => {
  if (!treatments || treatments.length === 0) {
    return (
      <View style={dashboardStyles.emptyState}>
        <Text style={dashboardStyles.emptyStateIcon}>💆‍♀️</Text>
        <Text style={dashboardStyles.emptyStateText}>
          Cargando recomendaciones personalizadas...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={dashboardStyles.treatmentScrollContainer}
      decelerationRate="fast"
      snapToInterval={280}
      snapToAlignment="start"
    >
      {treatments.map((treatment, index) => (
        <TouchableOpacity
          key={treatment.id || index}
          style={[
            dashboardStyles.treatmentCard,
            treatment.isVipExclusive && dashboardStyles.treatmentCardVip
          ]}
          onPress={() => onTreatmentPress(treatment)}
          activeOpacity={0.8}
        >
          {treatment.isVipExclusive && (
            <View style={dashboardStyles.vipBadge}>
              <Text style={dashboardStyles.vipBadgeText}>VIP</Text>
            </View>
          )}
          
          <View style={dashboardStyles.treatmentIconContainer}>
            <Text style={dashboardStyles.treatmentIcon}>
              {treatment.iconName === 'sparkles' ? '✨' : 
               treatment.iconName === 'heart' ? '💖' : 
               treatment.iconName === 'star' ? '⭐' : '💆‍♀️'}
            </Text>
          </View>
          
          <Text style={dashboardStyles.treatmentName}>{treatment.name}</Text>
          <Text style={dashboardStyles.treatmentDescription} numberOfLines={2}>
            {treatment.description}
          </Text>
          
          <View style={dashboardStyles.treatmentFooter}>
            <Text style={dashboardStyles.treatmentDuration}>{treatment.duration}min</Text>
            <Text style={dashboardStyles.treatmentPrice}>
              ${treatment.vipPrice ? treatment.vipPrice : treatment.price}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
