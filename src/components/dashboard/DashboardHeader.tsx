// components/dashboard/DashboardHeader.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

interface DashboardHeaderProps {
  userName: string;
  isVIP: boolean;
  profileImage?: string;
  beautyPoints: number;
  onProfilePress: () => void;
  isDarkMode?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  isVIP,
  profileImage,
  beautyPoints,
  onProfilePress,
  isDarkMode = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const crownRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de corona VIP
    if (isVIP) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(crownRotate, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(crownRotate, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isVIP]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        {/* Saludo y nombre */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greeting, isDarkMode && styles.textDark]}>
            {getGreeting()},
          </Text>
          <View style={styles.nameRow}>
            <Text style={[styles.userName, isDarkMode && styles.textDark]}>
              {userName}
            </Text>
            {isVIP && (
              <Animated.View
                style={[
                  styles.vipBadge,
                  {
                    transform: [{
                      rotate: crownRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    }],
                  },
                ]}
              >
                <Text style={styles.vipIcon}>👑</Text>
              </Animated.View>
            )}
          </View>
          
          {/* Beauty Points */}
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsIcon}>💎</Text>
            <Text style={[styles.pointsText, isDarkMode && styles.textDark]}>
              {beautyPoints.toLocaleString()} puntos
            </Text>
            {isVIP && (
              <View style={styles.pointsMultiplier}>
                <Text style={styles.multiplierText}>x2</Text>
              </View>
            )}
          </View>
        </View>

        {/* Perfil */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.8}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <LinearGradient
              colors={isVIP 
                ? [modernColors.vip, '#E8956B'] 
                : [modernColors.primary, '#E8956B']
              }
              style={styles.profilePlaceholder}
            >
              <Text style={styles.profileInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>
          )}
          
          {/* Indicador de estado VIP */}
          {isVIP && (
            <View style={styles.vipIndicator}>
              <LinearGradient
                colors={[modernColors.vip, '#FFB800']}
                style={styles.vipGradient}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: modernSpacing.lg,
    paddingVertical: modernSpacing.md,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray600,
    marginBottom: modernSpacing.xs,
  },
  textDark: {
    color: modernColors.gray300,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.sm,
  },
  userName: {
    ...modernTypography.headingLarge,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  vipBadge: {
    marginLeft: modernSpacing.sm,
  },
  vipIcon: {
    fontSize: 24,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.gray50,
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.sm,
    alignSelf: 'flex-start',
  },
  pointsIcon: {
    fontSize: 14,
    marginRight: modernSpacing.xs,
  },
  pointsText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  pointsMultiplier: {
    marginLeft: modernSpacing.xs,
    backgroundColor: modernColors.vip,
    paddingHorizontal: modernSpacing.xs,
    paddingVertical: 2,
    borderRadius: modernSpacing.xs,
  },
  multiplierText: {
    ...modernTypography.caption,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: modernColors.gray100,
  },
  profilePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    ...modernTypography.headingMedium,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  vipIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  vipGradient: {
    flex: 1,
  },
});