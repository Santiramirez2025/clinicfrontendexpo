// components/appointments/EmptyState.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing, modernTypography } from '../../styles';
import { AppointmentTab } from '../../../types/appointment';

interface EmptyStateProps {
  type: AppointmentTab;
  onAction: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación flotante del ícono
    const float = () => {
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => float());
    };
    float();
  }, []);

  const config = type === 'upcoming' 
    ? {
        icon: '📅',
        title: 'No tienes citas próximas',
        subtitle: 'Agenda tu próxima sesión de belleza y bienestar',
        actionText: 'Agendar cita',
        gradient: [modernColors.primary, '#E8956B'],
      }
    : {
        icon: '📋',
        title: 'Tu historial está vacío',
        subtitle: 'Aquí aparecerán todas tus citas pasadas',
        actionText: 'Explorar servicios',
        gradient: [modernColors.gray400, modernColors.gray500],
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
        {/* Icono animado */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              }],
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>{config.icon}</Text>
          </View>
          
          {/* Círculos decorativos */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          <View style={styles.decorativeCircle3} />
        </Animated.View>

        {/* Textos */}
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>

        {/* Botón de acción */}
        {type === 'upcoming' && (
          <TouchableOpacity
            style={styles.button}
            onPress={onAction}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={config.gradient}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>{config.actionText}</Text>
              <Text style={styles.buttonIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: modernSpacing.xxl * 2,
    paddingHorizontal: modernSpacing.xl,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: modernSpacing.xl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: modernColors.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: modernColors.gray100,
  },
  icon: {
    fontSize: 48,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -10,
    right: -20,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: modernColors.primary + '20',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -5,
    left: -15,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: modernColors.secondary + '20',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: 20,
    left: -25,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: modernColors.warning + '20',
  },
  title: {
    ...modernTypography.headingMedium,
    color: modernColors.gray900,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: modernSpacing.sm,
  },
  subtitle: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray600,
    textAlign: 'center',
    marginBottom: modernSpacing.xl,
    paddingHorizontal: modernSpacing.lg,
  },
  button: {
    borderRadius: modernSpacing.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: modernColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.lg,
    paddingVertical: modernSpacing.md,
    gap: modernSpacing.sm,
  },
  buttonText: {
    ...modernTypography.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});