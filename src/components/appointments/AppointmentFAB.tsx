// components/appointments/AppointmentFAB.tsx
import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing } from '../../styles';

interface AppointmentFABProps {
  onPress: () => void;
}

export const AppointmentFAB: React.FC<AppointmentFABProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
        delay: 300,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        delay: 300,
      }),
    ]).start();

    // Pulso continuo sutil
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    
    const pulseTimeout = setTimeout(pulse, 1000);
    return () => clearTimeout(pulseTimeout);
  }, []);

  const handlePress = () => {
    // Animación de presión
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
    
    onPress();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[modernColors.primary, '#E8956B', '#D6845A']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Icono principal */}
          <View style={styles.iconContainer}>
            <View style={styles.plusVertical} />
            <View style={styles.plusHorizontal} />
          </View>

          {/* Efecto de brillo */}
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{
                  translateX: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 30],
                  }),
                }],
                opacity: rotateAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.3, 0],
                }),
              },
            ]}
          />
        </LinearGradient>

        {/* Sombra adicional para profundidad */}
        <View style={styles.shadowExtra} />
      </TouchableOpacity>

      {/* Anillo de pulso externo */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.pulseRing,
          {
            transform: [{
              scale: pulseAnim.interpolate({
                inputRange: [1, 1.05],
                outputRange: [1, 1.2],
              }),
            }],
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.05],
              outputRange: [0.3, 0],
            }),
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: modernSpacing.xl,
    right: modernSpacing.lg,
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: modernColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusVertical: {
    position: 'absolute',
    width: 3,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
  plusHorizontal: {
    position: 'absolute',
    width: 18,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  shadowExtra: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 26,
    backgroundColor: 'transparent',
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  pulseRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: modernColors.primary,
  },
});