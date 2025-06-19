// ============================================================================
// components/VIP/BenefitsSection.tsx - SECCIÓN DE BENEFICIOS
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { BenefitCard } from './BenefitCard';
import { vipStyles } from './styles';

interface VIPBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'access' | 'discounts' | 'services' | 'events' | 'support';
  available: boolean;
}

interface BenefitsSectionProps {
  benefits: VIPBenefit[];
  isVIP: boolean;
  onBenefitPress: (benefit: VIPBenefit) => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ 
  benefits, 
  isVIP, 
  onBenefitPress 
}) => {
  return (
    <View style={vipStyles.section}>
      <Text style={vipStyles.sectionTitle}>Beneficios exclusivos</Text>
      <Text style={vipStyles.sectionSubtitle}>
        {isVIP 
          ? 'Disfruta de todos estos beneficios como miembro VIP'
          : 'Todo lo que obtienes con la membresía VIP'
        }
      </Text>

      <View style={vipStyles.benefitsGrid}>
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            isVIP={isVIP}
            onPress={onBenefitPress}
          />
        ))}
      </View>
    </View>
  );
};
