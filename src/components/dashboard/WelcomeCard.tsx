// ============================================================================
// components/dashboard/WelcomeCard.tsx - "Buenas tardes, Bella ✨"
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing, modernTypography, modernShadows } from '../../styles';

interface WelcomeCardProps {
  firstName: string;
  vipStatus: boolean;
  onProfilePress: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  firstName,
  vipStatus,
  onProfilePress
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#EC4899']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.welcomeCard}
    >
      <View style={styles.welcomeContent}>
        <Text style={styles.greetingText}>
          {getGreeting()}, {firstName} ✨
        </Text>
        <Text style={styles.mainMessage}>
          ¡Lista para brillar hoy!
        </Text>
        <Text style={styles.subtitle}>
          Tu belleza es nuestro arte
        </Text>
        {vipStatus && (
          <View style={styles.vipBadge}>
            <Text style={styles.vipText}>👑 VIP</Text>
          </View>
        )}
      </View>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={onProfilePress}
      >
        <Text style={styles.profileIcon}>😊</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
    margin: modernSpacing.aesthetic.cardSpacing,
    borderRadius: modernSpacing.componentModern.radiusXL,
    padding: modernSpacing.aesthetic.sectionPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 120,
    ...modernShadows.md,
  },
  welcomeContent: {
    flex: 1,
  },
  greetingText: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: modernTypography.fontWeightModern.medium,
    color: modernColors.surface,
    marginBottom: 4,
  },
  mainMessage: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: modernTypography.fontWeightModern.bold,
    color: modernColors.surface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.surface,
    opacity: 0.9,
  },
  vipBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: modernSpacing.componentModern.radiusSM,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  vipText: {
    color: modernColors.surface,
    fontWeight: modernTypography.fontWeightModern.semibold,
    fontSize: modernTypography.fontSizeModern.sm,
  },
  profileButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
});
