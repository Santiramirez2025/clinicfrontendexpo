// ============================================================================
// components/dashboard/ClinicInfoCard.tsx - COMPONENTE SEPARADO
// ============================================================================
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  Animated,
  Vibration,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { dashboardStyles } from './styles';
import type { ClinicInfo } from './types';

interface ClinicInfoCardProps {
  clinicInfo?: ClinicInfo;
}

export const ClinicInfoCard: React.FC<ClinicInfoCardProps> = ({
  clinicInfo,
}) => {
  
  // Estados para animaciones
  const [isCallPressed, setIsCallPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  // Animación shimmer continua
  React.useEffect(() => {
    const shimmerLoop = () => {
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: -1,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => shimmerLoop());
    };
    shimmerLoop();
  }, []);

  const handleCallPress = async () => {
    setIsCallPressed(true);
    
    // Animación de feedback
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.96,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setIsCallPressed(false);
    });

    // Efecto ripple
    Animated.sequence([
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rippleAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    // Feedback háptico sutil
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 50]);
    }

    const phoneNumber = clinicInfo?.phone || '+54 11 4567-8900';
    const url = Platform.OS === 'ios' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error al abrir la llamada:', error);
    }
  };

  const glowStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 0.6],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 20],
    }),
  };

  return (
    <View style={dashboardStyles.clinicCardContainer}>
      <View style={dashboardStyles.clinicCard}>
        {/* Overlay con textura sutil */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.4)']}
          style={dashboardStyles.cardOverlay}
        />
        
        {/* Shimmer effect */}
        <Animated.View
          style={[
            dashboardStyles.shimmerOverlay,
            {
              transform: [{
                translateX: shimmerAnim.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-200, 200],
                })
              }]
            }
          ]}
        />
        
        {/* Header de la clínica */}
        <View style={dashboardStyles.clinicHeader}>
          <View style={dashboardStyles.clinicIconContainer}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={dashboardStyles.clinicIconGradient}
            >
              <Text style={dashboardStyles.clinicIconText}>🏛️</Text>
            </LinearGradient>
            <View style={dashboardStyles.iconPulse} />
          </View>
          <View style={dashboardStyles.clinicTitleContainer}>
            <Text style={dashboardStyles.clinicTitle}>
              {clinicInfo?.name || 'Belleza Premium'}
            </Text>
            <Text style={dashboardStyles.clinicSubtitle}>Centro de Estética</Text>
          </View>
        </View>

        {/* Información de contacto */}
        <View style={dashboardStyles.clinicDetails}>
          {/* Dirección */}
          <View style={dashboardStyles.clinicDetailRow}>
            <View style={dashboardStyles.detailIconContainer}>
              <LinearGradient
                colors={['#ff9a9e', '#fecfef']}
                style={dashboardStyles.detailIconBg}
              >
                <Text style={dashboardStyles.detailIcon}>📍</Text>
              </LinearGradient>
            </View>
            <View style={dashboardStyles.detailContent}>
              <Text style={dashboardStyles.detailTitle}>
                {clinicInfo?.address || 'Av. Corrientes 1234, CABA'}
              </Text>
              <Text style={dashboardStyles.detailSubtitle}>
                {clinicInfo?.zone || 'Zona premium • Fácil acceso'}
              </Text>
            </View>
          </View>

          {/* Teléfono */}
          <TouchableOpacity 
            style={dashboardStyles.clinicDetailRow}
            onPress={handleCallPress}
            activeOpacity={0.7}
          >
            <View style={dashboardStyles.detailIconContainer}>
              <LinearGradient
                colors={['#a8edea', '#fed6e3']}
                style={dashboardStyles.detailIconBg}
              >
                <Text style={dashboardStyles.detailIcon}>📞</Text>
              </LinearGradient>
            </View>
            <View style={dashboardStyles.detailContent}>
              <Text style={[dashboardStyles.detailTitle, { color: '#059669' }]}>
                {clinicInfo?.phone || '+54 11 4567-8900'}
              </Text>
              <Text style={dashboardStyles.detailSubtitle}>
                {clinicInfo?.serviceHours || 'Atención personalizada 24/7'}
              </Text>
            </View>
            <View style={dashboardStyles.callIndicator}>
              <Text style={dashboardStyles.callIndicatorIcon}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Horarios */}
          <View style={dashboardStyles.clinicDetailRow}>
            <View style={dashboardStyles.detailIconContainer}>
              <LinearGradient
                colors={['#fbc2eb', '#a6c1ee']}
                style={dashboardStyles.detailIconBg}
              >
                <Text style={dashboardStyles.detailIcon}>⏰</Text>
              </LinearGradient>
            </View>
            <View style={dashboardStyles.detailContent}>
              <Text style={dashboardStyles.detailTitle}>Horarios de atención</Text>
              <Text style={dashboardStyles.detailSubtitle}>
                {clinicInfo?.schedule || 'Lun - Vie: 9:00 - 19:00 • Sáb: 9:00 - 15:00'}
              </Text>
            </View>
          </View>
        </View>

        {/* Botón de llamada principal */}
        <Animated.View 
          style={[
            dashboardStyles.callButtonContainer,
            { 
              transform: [{ scale: scaleAnim }],
              ...glowStyle,
            }
          ]}
        >
          <TouchableOpacity 
            onPress={handleCallPress}
            activeOpacity={1}
            style={dashboardStyles.callButtonTouch}
          >
            <LinearGradient
              colors={['#11998e', '#38ef7d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={dashboardStyles.callButton}
            >
              <Animated.View
                style={[
                  dashboardStyles.rippleEffect,
                  {
                    transform: [{
                      scale: rippleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 4],
                      })
                    }],
                    opacity: rippleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 0],
                    }),
                  }
                ]}
              />
              <View style={dashboardStyles.callButtonContent}>
                <View style={dashboardStyles.callIconContainer}>
                  <Text style={dashboardStyles.callButtonIcon}>📞</Text>
                </View>
                <Text style={dashboardStyles.callButtonText}>Llamar Ahora</Text>
                <View style={dashboardStyles.callButtonShine} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};