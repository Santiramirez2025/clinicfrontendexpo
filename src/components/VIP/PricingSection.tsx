// ============================================================================
// components/VIP/PricingSection.tsx - SECCIÓN DE PRECIOS
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { PricingCard } from './PricingCard';
import { vipStyles } from './styles';

interface PricingSectionProps {
  isVIP: boolean;
  onSubscribe: (planType: 'MONTHLY' | 'YEARLY') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ isVIP, onSubscribe }) => {
  if (isVIP) return null;

  return (
    <View style={vipStyles.section}>
      <Text style={vipStyles.sectionTitle}>Elige tu plan VIP</Text>
      <Text style={vipStyles.sectionSubtitle}>
        Comienza a disfrutar de todos los beneficios exclusivos
      </Text>

      <View style={vipStyles.pricingContainer}>
        <PricingCard
          planType="MONTHLY"
          price={19.99}
          onSelect={onSubscribe}
        />
        
        <PricingCard
          planType="YEARLY"
          price={199.99}
          originalPrice={239.88}
          isPopular={true}
          onSelect={onSubscribe}
        />
      </View>

      <View style={vipStyles.guaranteeContainer}>
        <Text style={vipStyles.guaranteeIcon}>🔒</Text>
        <View style={vipStyles.guaranteeContent}>
          <Text style={vipStyles.guaranteeTitle}>Garantía de satisfacción</Text>
          <Text style={vipStyles.guaranteeText}>
            Cancela cuando quieras. Sin compromisos a largo plazo.
          </Text>
        </View>
      </View>
    </View>
  );
};