// ============================================================================
// components/dashboard/DashboardHeader.tsx - HEADER SIMPLIFICADO
// ============================================================================
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { dashboardStyles } from './styles';
import type { DashboardHeaderProps } from './types';

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  firstName,
  vipStatus,
  onProfilePress,
}) => {
  
  // Animaciones de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Animación de entrada elegante
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name ? name.slice(0, 2).toUpperCase() : 'BC';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <Animated.View 
      style={[
        dashboardStyles.headerContainer,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <BlurView intensity={95} tint="light" style={dashboardStyles.headerBlur}>
        <LinearGradient
          colors={[
            'rgba(255, 248, 246, 0.95)',
            'rgba(255, 253, 251, 0.90)',
          ]}
          locations={[0, 1]}
          style={dashboardStyles.headerGradient}
        >
          {/* Elementos decorativos sutiles */}
          <View style={dashboardStyles.decorativeCircle1} />
          <View style={dashboardStyles.decorativeCircle2} />
          
          {/* Contenido principal */}
          <View style={dashboardStyles.headerContent}>
            <View style={dashboardStyles.headerTop}>
              {/* Sección de bienvenida */}
              <View style={dashboardStyles.welcomeContainer}>
                <Text style={dashboardStyles.welcomeGreeting}>
                  {getGreeting()}
                </Text>
                <Text style={dashboardStyles.welcomeText}>
                  {firstName || 'Bella'}
                </Text>
                
                {/* Badge VIP si aplica */}
                {vipStatus && (
                  <View style={dashboardStyles.vipBadgeContainer}>
                    <LinearGradient
                      colors={['#F7DC6F', '#F39C12', '#E67E22']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={dashboardStyles.vipBadgeHeader}
                    >
                      <Text style={dashboardStyles.vipBadgeHeaderText}>✨ VIP</Text>
                    </LinearGradient>
                    <View style={dashboardStyles.vipShimmer} />
                  </View>
                )}
              </View>
              
              {/* Avatar del usuario */}
              <TouchableOpacity 
                style={dashboardStyles.avatarContainer}
                onPress={onProfilePress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF9A9E', '#FECFEF', '#FECFEF']}
                  style={dashboardStyles.avatarGradient}
                >
                  <Text style={dashboardStyles.avatarText}>
                    {getInitials(firstName || '')}
                  </Text>
                </LinearGradient>
                <View style={dashboardStyles.avatarRing} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
      
      {/* Fade inferior sutil */}
      <LinearGradient
        colors={['transparent', 'rgba(255, 248, 246, 0.2)']}
        style={dashboardStyles.bottomFade}
      />
    </Animated.View>
  );
};
