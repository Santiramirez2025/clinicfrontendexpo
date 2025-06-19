// ============================================================================
// components/VIP/VIPStatusCard.tsx - COMPONENTE STATUS CARD
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { vipStyles } from './styles';

interface VIPStatus {
  isVIP: boolean;
  subscription?: {
    id: string;
    planType: 'MONTHLY' | 'YEARLY';
    price: number;
    status: string;
    expiresAt: string;
    daysRemaining: number;
  };
  benefits: {
    discountPercentage: number;
    pointsMultiplier: number;
    priorityBooking: boolean;
    freeMonthlyFacial: boolean;
    personalAdvisor: boolean;
  };
}

interface VIPStatusCardProps {
  vipStatus: VIPStatus;
}

export const VIPStatusCard: React.FC<VIPStatusCardProps> = ({ vipStatus }) => {
  return (
    <View style={[vipStyles.statusCard, vipStatus.isVIP && vipStyles.statusCardVIP]}>
      <View style={vipStyles.statusHeader}>
        <Text style={vipStyles.statusTitle}>
          {vipStatus.isVIP ? 'Estado de membresía' : 'Beneficios disponibles'}
        </Text>
        
        {vipStatus.isVIP && vipStatus.subscription && (
          <View style={vipStyles.expirationBadge}>
            <Text style={vipStyles.expirationText}>
              {vipStatus.subscription.daysRemaining} días restantes
            </Text>
          </View>
        )}
      </View>

      <View style={vipStyles.statusBenefits}>
        <View style={vipStyles.statusBenefit}>
          <Text style={vipStyles.statusBenefitIcon}>🏷️</Text>
          <Text style={vipStyles.statusBenefitText}>
            {vipStatus.benefits.discountPercentage}% descuento
          </Text>
        </View>
        
        <View style={vipStyles.statusBenefit}>
          <Text style={vipStyles.statusBenefitIcon}>💎</Text>
          <Text style={vipStyles.statusBenefitText}>
            {vipStatus.benefits.pointsMultiplier}x puntos
          </Text>
        </View>
        
        <View style={vipStyles.statusBenefit}>
          <Text style={vipStyles.statusBenefitIcon}>⚡</Text>
          <Text style={vipStyles.statusBenefitText}>
            {vipStatus.benefits.priorityBooking ? 'Acceso prioritario' : 'Sin prioridad'}
          </Text>
        </View>
      </View>
    </View>
  );
};