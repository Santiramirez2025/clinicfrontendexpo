// ============================================================================
// components/dashboard/BeautyPointsCard.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ModernCard } from './ModernCard';
import { dashboardStyles } from './styles';

export interface BeautyPointsStats {
  totalSessions: number;
  beautyPoints: number;
  totalInvestment: number;
  vipStatus: boolean;
}

export interface BeautyPointsCardProps {
  stats: BeautyPointsStats;
  vipStatus: boolean;
  onPress: () => void;
}

export const BeautyPointsCard: React.FC<BeautyPointsCardProps> = ({
  stats,
  vipStatus,
  onPress,
}) => {
  return (
    <ModernCard 
      vip={vipStatus}
      onPress={onPress}
    >
      <View style={dashboardStyles.pointsHeader}>
        <View style={dashboardStyles.pointsIconContainer}>
          <Text style={dashboardStyles.pointsIcon}>💎</Text>
        </View>
        <View style={dashboardStyles.pointsInfo}>
          <Text style={dashboardStyles.pointsTitle}>Beauty Points</Text>
          <Text style={dashboardStyles.pointsValue}>
            {stats.beautyPoints} puntos
          </Text>
        </View>
        {vipStatus && (
          <View style={dashboardStyles.multiplierBadge}>
            <Text style={dashboardStyles.multiplierText}>x2</Text>
          </View>
        )}
      </View>
      
      <Text style={dashboardStyles.pointsSubtext}>
        {stats.totalSessions} sesiones completadas • ${stats.totalInvestment} invertido
      </Text>
      
      <View style={dashboardStyles.tapToViewMore}>
        <Text style={dashboardStyles.tapToViewMoreText}>Toca para ver más detalles</Text>
      </View>
    </ModernCard>
  );
};