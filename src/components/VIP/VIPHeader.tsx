// ============================================================================
// components/VIP/VIPHeader.tsx - COMPONENTE HEADER VIP
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { vipStyles } from './styles';

interface VIPHeaderProps {
  isVIP: boolean;
  onUpgradePress: () => void;
}

export const VIPHeader: React.FC<VIPHeaderProps> = ({ isVIP, onUpgradePress }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={vipStyles.header}>
      <Animated.View style={[vipStyles.headerContent, { transform: [{ scale: scaleAnim }] }]}>
        <View style={vipStyles.titleContainer}>
          <View style={vipStyles.crownContainer}>
            <Text style={vipStyles.crownIcon}>👑</Text>
            {isVIP && (
              <View style={vipStyles.crownGlow}>
                <Text style={vipStyles.crownGlowText}>✨</Text>
              </View>
            )}
          </View>
          <Text style={vipStyles.vipTitle}>Membresía VIP</Text>
          <Text style={vipStyles.vipSubtitle}>
            {isVIP ? 'Eres miembro VIP' : 'Únete al club exclusivo'}
          </Text>
        </View>

        {isVIP ? (
          <View style={vipStyles.vipActiveBadge}>
            <Text style={vipStyles.vipActiveText}>✓ Activa</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={vipStyles.upgradeButton}
            onPress={onUpgradePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={vipStyles.upgradeButtonText}>Ser VIP</Text>
            <Text style={vipStyles.upgradeArrow}>→</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};