// ============================================================================
// components/VIP/PricingCard.tsx - COMPONENTE PRICING CARD
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { vipStyles } from './styles';

interface PricingCardProps {
  planType: 'MONTHLY' | 'YEARLY';
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  onSelect: (planType: 'MONTHLY' | 'YEARLY') => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  planType, 
  price, 
  originalPrice, 
  isPopular = false, 
  onSelect 
}) => {
  const isMonthly = planType === 'MONTHLY';
  const savings = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <TouchableOpacity
      style={[
        vipStyles.pricingCard,
        isPopular && vipStyles.pricingCardPopular
      ]}
      onPress={() => onSelect(planType)}
      activeOpacity={0.8}
    >
      {isPopular && (
        <View style={vipStyles.popularBadge}>
          <Text style={vipStyles.popularBadgeText}>Más popular</Text>
        </View>
      )}

      <View style={vipStyles.pricingHeader}>
        <Text style={vipStyles.pricingTitle}>
          {isMonthly ? 'Mensual' : 'Anual'}
        </Text>
        {!isMonthly && savings > 0 && (
          <View style={vipStyles.savingsBadge}>
            <Text style={vipStyles.savingsText}>Ahorra {savings}%</Text>
          </View>
        )}
      </View>

      <View style={vipStyles.pricingPrice}>
        <Text style={vipStyles.price}>€{price}</Text>
        <Text style={vipStyles.pricePeriod}>/{isMonthly ? 'mes' : 'año'}</Text>
      </View>

      {originalPrice && !isMonthly && (
        <Text style={vipStyles.originalPrice}>€{originalPrice}/año</Text>
      )}

      <View style={vipStyles.pricingFeatures}>
        <Text style={vipStyles.pricingFeature}>✓ Todos los beneficios VIP</Text>
        <Text style={vipStyles.pricingFeature}>✓ Descuentos hasta 25%</Text>
        <Text style={vipStyles.pricingFeature}>✓ Soporte prioritario</Text>
        {!isMonthly && (
          <Text style={vipStyles.pricingFeature}>✓ 2 meses gratis</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
