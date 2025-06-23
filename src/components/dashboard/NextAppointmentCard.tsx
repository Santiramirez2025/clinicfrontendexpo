// components/dashboard/NextAppointmentCard.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Interfaces
export interface NextAppointment {
  id: string;
  treatment: string;
  date: string;
  time: string;
  professional: string;
  clinic: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED';
  duration?: number;
  beautyPointsEarned?: number;
  category?: string;
  price?: number;
  isVipExclusive?: boolean;
}

export interface NextAppointmentCardProps {
  appointment: NextAppointment | null;
  onAppointmentPress: () => void;
  onModifyPress?: () => void;
  onDetailsPress?: () => void;
  formatAppointmentDate: (dateString: string) => string;
  formatAppointmentTime: (timeString: string) => string;
  isLoading?: boolean;
  userVipStatus?: boolean;
}

// Configuraciones de animación
const ANIMATION_CONFIG = {
  entrance: {
    duration: 800,
    delay: 100,
  },
  interaction: {
    duration: 200,
  },
  shimmer: {
    duration: 2500,
  },
};

export const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({
  appointment,
  onAppointmentPress,
  onModifyPress,
  onDetailsPress,
  formatAppointmentDate,
  formatAppointmentTime,
  isLoading = false,
  userVipStatus = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Animaciones
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shimmerAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: ANIMATION_CONFIG.entrance.delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ANIMATION_CONFIG.entrance.duration,
        useNativeDriver: true,
      }),
    ]).start();

    // Shimmer continuo
    if (!appointment) {
      const shimmerLoop = () => {
        shimmerAnim.setValue(-SCREEN_WIDTH);
        Animated.timing(shimmerAnim, {
          toValue: SCREEN_WIDTH,
          duration: ANIMATION_CONFIG.shimmer.duration,
          useNativeDriver: true,
        }).start(() => setTimeout(shimmerLoop, 1000));
      };
      shimmerLoop();
    }

    // Pulse para estado pendiente
    if (appointment?.status === 'PENDING') {
      const pulseLoop = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => pulseLoop());
      };
      pulseLoop();
    }
  }, [appointment]);

  // Handlers de interacción
  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: ANIMATION_CONFIG.interaction.duration,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Configuración de estilos según estado
  const getStatusConfig = (status: NextAppointment['status']) => {
    const configs = {
      CONFIRMED: {
        colors: ['#E8F5F1', '#D4EDE4'],
        statusColor: modernColors.success,
        icon: '✓',
        text: 'Confirmada',
      },
      PENDING: {
        colors: ['#FFF5E6', '#FFE5CC'],
        statusColor: modernColors.warning,
        icon: '⏳',
        text: 'Pendiente',
      },
      COMPLETED: {
        colors: ['#F5F5F5', '#EEEEEE'],
        statusColor: modernColors.gray600,
        icon: '✓',
        text: 'Completada',
      },
    };
    return configs[status] || configs.PENDING;
  };

  const getTreatmentIcon = (treatment: string, category?: string) => {
    const icons: { [key: string]: string } = {
      facial: '✨',
      corporal: '🌸',
      masaje: '💆‍♀️',
      depilacion: '🌺',
      manicure: '💅',
      pedicure: '🦶',
      default: '🌟',
    };
    return icons[category?.toLowerCase() || 'default'];
  };

  // Estado vacío (sin cita)
  if (!appointment) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          }
        ]}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={onAppointmentPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <LinearGradient
            colors={['#FFFFFF', '#FEF7F0']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Shimmer effect */}
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX: shimmerAnim }],
                },
              ]}
            />
            
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyIconContainer}>
                <LinearGradient
                  colors={[modernColors.primary, '#E8956B']}
                  style={styles.emptyIconGradient}
                >
                  <Text style={styles.emptyIcon}>📅</Text>
                </LinearGradient>
              </View>
              
              <Text style={styles.emptyTitle}>
                No tienes citas próximas
              </Text>
              <Text style={styles.emptySubtitle}>
                Agenda tu próxima sesión de belleza
              </Text>
              
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={onAppointmentPress}
              >
                <LinearGradient
                  colors={[modernColors.primary, '#E8956B']}
                  style={styles.ctaGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.ctaText}>Agendar ahora</Text>
                  <Text style={styles.ctaIcon}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Con cita
  const statusConfig = getStatusConfig(appointment.status);
  const treatmentIcon = getTreatmentIcon(appointment.treatment, appointment.category);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
            { translateY: slideAnim },
          ],
        }
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onDetailsPress || onAppointmentPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={statusConfig.colors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateLabel}>Próxima cita</Text>
              <View style={styles.dateTimeRow}>
                <Text style={styles.date}>
                  {formatAppointmentDate(appointment.date)}
                </Text>
                <View style={styles.timeDot} />
                <Text style={styles.time}>
                  {formatAppointmentTime(appointment.time)}
                </Text>
              </View>
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.statusColor + '20' }]}>
              <Text style={styles.statusIcon}>{statusConfig.icon}</Text>
              <Text style={[styles.statusText, { color: statusConfig.statusColor }]}>
                {statusConfig.text}
              </Text>
            </View>
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            <View style={styles.treatmentRow}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={[modernColors.primary, '#E8956B']}
                  style={styles.iconGradient}
                >
                  <Text style={styles.treatmentIcon}>{treatmentIcon}</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.treatmentInfo}>
                <Text style={styles.treatmentName}>
                  {appointment.treatment}
                </Text>
                <View style={styles.professionalRow}>
                  <Text style={styles.withText}>con</Text>
                  <Text style={styles.professionalName}>
                    {appointment.professional}
                  </Text>
                </View>
                {appointment.duration && (
                  <View style={styles.durationRow}>
                    <Text style={styles.durationIcon}>⏱</Text>
                    <Text style={styles.durationText}>
                      {appointment.duration} minutos
                    </Text>
                    {appointment.beautyPointsEarned && (
                      <>
                        <Text style={styles.pointsDivider}>•</Text>
                        <Text style={styles.pointsIcon}>💎</Text>
                        <Text style={styles.pointsText}>
                          +{appointment.beautyPointsEarned} pts
                        </Text>
                      </>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Footer con acciones */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onModifyPress}
            >
              <Text style={styles.secondaryButtonText}>Modificar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onDetailsPress || onAppointmentPress}
            >
              <LinearGradient
                colors={[modernColors.primary, '#E8956B']}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Ver detalles</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: modernSpacing.md,
  },
  card: {
    borderRadius: modernSpacing.lg,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    padding: modernSpacing.lg,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  // Estado vacío
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: modernSpacing.xl,
  },
  emptyIconContainer: {
    marginBottom: modernSpacing.lg,
  },
  emptyIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    ...modernTypography.headingSmall,
    color: modernColors.gray900,
    fontWeight: '700',
    marginBottom: modernSpacing.sm,
  },
  emptySubtitle: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray600,
    marginBottom: modernSpacing.xl,
  },
  ctaButton: {
    borderRadius: modernSpacing.md,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.lg,
    paddingVertical: modernSpacing.md,
    gap: modernSpacing.sm,
  },
  ctaText: {
    ...modernTypography.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ctaIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  // Con cita
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: modernSpacing.lg,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateLabel: {
    ...modernTypography.caption,
    color: modernColors.gray600,
    marginBottom: modernSpacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray900,
    fontWeight: '600',
  },
  timeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: modernColors.gray400,
    marginHorizontal: modernSpacing.sm,
  },
  time: {
    ...modernTypography.bodyLarge,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.sm,
    gap: modernSpacing.xs,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    ...modernTypography.caption,
    fontWeight: '600',
  },
  content: {
    marginBottom: modernSpacing.lg,
  },
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: modernSpacing.md,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatmentIcon: {
    fontSize: 24,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    ...modernTypography.bodyLarge,
    color: modernColors.gray900,
    fontWeight: '700',
    marginBottom: modernSpacing.xs,
  },
  professionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.xs,
  },
  withText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray500,
    marginRight: modernSpacing.xs,
  },
  professionalName: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    fontSize: 12,
    marginRight: modernSpacing.xs,
  },
  durationText: {
    ...modernTypography.caption,
    color: modernColors.gray600,
  },
  pointsDivider: {
    marginHorizontal: modernSpacing.sm,
    color: modernColors.gray400,
  },
  pointsIcon: {
    fontSize: 12,
    marginRight: modernSpacing.xs,
  },
  pointsText: {
    ...modernTypography.caption,
    color: modernColors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: modernSpacing.sm,
    paddingTop: modernSpacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: modernSpacing.sm,
    alignItems: 'center',
    borderRadius: modernSpacing.sm,
    borderWidth: 1,
    borderColor: modernColors.gray300,
  },
  secondaryButtonText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    borderRadius: modernSpacing.sm,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: modernSpacing.sm,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...modernTypography.bodySmall,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default NextAppointmentCard;