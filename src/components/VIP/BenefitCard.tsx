// ============================================================================
// components/VIP/BenefitCard.tsx - COMPONENTE BENEFIT CARD
// ============================================================================
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { vipStyles } from './styles';
import { modernColors } from '../../styles';

interface VIPBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'access' | 'discounts' | 'services' | 'events' | 'support';
  available: boolean;
}

interface BenefitCardProps {
  benefit: VIPBenefit;
  isVIP: boolean;
  onPress: (benefit: VIPBenefit) => void;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, isVIP, onPress }) => {
  const [pressed, setPressed] = useState(false);

  const getIconBackground = (category: string) => {
    const backgrounds = {
      access: modernColors.vip + '15',
      discounts: '#E8F5E9',
      services: '#FFF3E0',
      events: '#F3E5F5',
      support: '#E3F2FD',
    };
    return backgrounds[category as keyof typeof backgrounds] || modernColors.gray100;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      access: 'Acceso prioritario',
      discounts: 'Descuentos',
      services: 'Servicios extra',
      events: 'Eventos exclusivos',
      support: 'Soporte premium',
    };
    return labels[category as keyof typeof labels] || 'Beneficio';
  };

  return (
    <TouchableOpacity
      style={[
        vipStyles.benefitCard,
        isVIP && vipStyles.benefitCardVIP,
        pressed && vipStyles.benefitCardPressed,
        !benefit.available && vipStyles.benefitCardDisabled,
      ]}
      onPress={() => onPress(benefit)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.9}
      disabled={!benefit.available}
    >
      <View style={vipStyles.benefitHeader}>
        <View style={[vipStyles.benefitIconContainer, { backgroundColor: getIconBackground(benefit.category) }]}>
          <Text style={vipStyles.benefitIcon}>{benefit.icon}</Text>
        </View>
        
        <View style={vipStyles.benefitContent}>
          <View style={vipStyles.benefitTitleRow}>
            <Text style={vipStyles.benefitTitle}>{benefit.title}</Text>
            {isVIP && benefit.available && (
              <View style={vipStyles.availableBadge}>
                <Text style={vipStyles.availableBadgeText}>✓</Text>
              </View>
            )}
          </View>
          
          <Text style={vipStyles.benefitCategory}>{getCategoryLabel(benefit.category)}</Text>
        </View>
      </View>

      <Text style={vipStyles.benefitDescription}>{benefit.description}</Text>

      <View style={vipStyles.benefitFooter}>
        {benefit.available ? (
          <Text style={vipStyles.benefitAction}>
            {isVIP ? 'Usar beneficio' : 'Disponible con VIP'}
          </Text>
        ) : (
          <Text style={vipStyles.benefitUnavailable}>Próximamente</Text>
        )}
      </View>

      {!benefit.available && (
        <View style={vipStyles.comingSoonOverlay}>
          <Text style={vipStyles.comingSoonText}>Próximamente</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
