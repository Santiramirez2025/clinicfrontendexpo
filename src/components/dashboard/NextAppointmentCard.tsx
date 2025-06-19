// ============================================================================
// components/dashboard/NextAppointmentCard.tsx - PREMIUM SENSORIAL CORREGIDO ✨
// ============================================================================
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Vibration,
  Platform,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  dashboardStyles, 
  appointmentCardStyles, 
  premiumEffects 
} from './styles';
import { 
  modernColors, 
  modernAnimations, 
  modernUtils,
  modernSpacing 
} from '../../styles'; // ✅ CORREGIDO: Path correcto

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// 🎯 INTERFACES PREMIUM
// ============================================================================
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

// ============================================================================
// 🎨 CONFIGURACIONES PREMIUM
// ============================================================================
const ANIMATION_CONFIG = {
  entrance: {
    duration: 800,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // easeOutQuart
  },
  interaction: {
    duration: 200,
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55), // easeInOutBack
  },
  shimmer: {
    duration: 2500,
    easing: Easing.bezier(0.4, 0.0, 0.6, 1.0), // easeInOutCubic
  },
  pulse: {
    duration: 2000,
    easing: Easing.bezier(0.445, 0.05, 0.55, 0.95), // easeInOutSine
  },
};

// ============================================================================
// 🌟 COMPONENTE PRINCIPAL PREMIUM
// ============================================================================
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
  // ============================================================================
  // 🎭 ESTADOS Y REFERENCIAS DE ANIMACIÓN
  // ============================================================================
  const [isPressed, setIsPressed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Animaciones principales
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Efectos premium
  const shimmerAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  
  // Elementos decorativos
  const floatingAnim1 = useRef(new Animated.Value(0)).current;
  const floatingAnim2 = useRef(new Animated.Value(0)).current;
  const floatingAnim3 = useRef(new Animated.Value(0)).current;

  // ============================================================================
  // 🎪 EFECTOS DE ENTRADA Y ANIMACIONES CONTINUAS
  // ============================================================================
  useEffect(() => {
    // Secuencia de entrada épica
    const entranceSequence = Animated.sequence([
      // Fase 1: Aparición suave
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATION_CONFIG.entrance.duration,
          easing: ANIMATION_CONFIG.entrance.easing,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          ...modernAnimations.easing.entrance,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: ANIMATION_CONFIG.entrance.duration,
          easing: ANIMATION_CONFIG.entrance.easing,
          useNativeDriver: true,
        }),
      ]),
      
      // Fase 2: Efecto de revelación
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Iniciar animación de entrada
    entranceSequence.start(() => setIsReady(true));

    // Shimmer continuo para efecto premium
    const shimmerLoop = () => {
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: SCREEN_WIDTH + 100,
          duration: ANIMATION_CONFIG.shimmer.duration,
          easing: ANIMATION_CONFIG.shimmer.easing,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Repetir con delay aleatorio para naturalidad
        setTimeout(shimmerLoop, Math.random() * 3000 + 2000);
      });
    };
    
    const shimmerTimeout = setTimeout(shimmerLoop, 1000);

    // Animaciones flotantes para elementos decorativos
    const startFloatingAnimations = () => {
      const createFloatingLoop = (animValue: Animated.Value, duration: number, delay: number) => {
        const loop = () => {
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: duration,
              easing: Easing.inOut(Easing.sin), // ✅ CORREGIDO: sin en lugar de sine
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: duration,
              easing: Easing.inOut(Easing.sin), // ✅ CORREGIDO: sin en lugar de sine
              useNativeDriver: true,
            }),
          ]).start(() => loop());
        };
        loop();
      };

      createFloatingLoop(floatingAnim1, 3000, 0);
      createFloatingLoop(floatingAnim2, 4000, 1000);
      createFloatingLoop(floatingAnim3, 5000, 2000);
    };

    const floatingTimeout = setTimeout(startFloatingAnimations, 500);

    // Pulse para estados pendientes
    if (appointment?.status === 'PENDING') {
      const pulseLoop = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: ANIMATION_CONFIG.pulse.duration,
            easing: ANIMATION_CONFIG.pulse.easing,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: ANIMATION_CONFIG.pulse.duration,
            easing: ANIMATION_CONFIG.pulse.easing,
            useNativeDriver: true,
          }),
        ]).start(() => pulseLoop());
      };
      pulseLoop();
    }

    return () => {
      clearTimeout(shimmerTimeout);
      clearTimeout(floatingTimeout);
    };
  }, [appointment]);

  // ============================================================================
  // 🤏 GESTIÓN DE INTERACCIONES PREMIUM
  // ============================================================================
  const handlePressIn = () => {
    setIsPressed(true);
    
    // Animación de presión con spring premium
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        ...modernAnimations.easing.interaction,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: ANIMATION_CONFIG.interaction.duration,
        useNativeDriver: true,
      }),
      // Efecto ripple
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Feedback háptico premium
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 50, 50, 50]); // Patrón elegante
    } else {
      Vibration.vibrate(50);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
    
    // Animación de liberación suave
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        ...modernAnimations.easing.gentle,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: ANIMATION_CONFIG.interaction.duration * 1.5,
        useNativeDriver: true,
      }),
      Animated.timing(rippleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ============================================================================
  // 🎨 CONFIGURACIONES DE ESTILO DINÁMICO
  // ============================================================================
  const getStatusConfig = (status: NextAppointment['status']) => {
    const configs = {
      CONFIRMED: {
        colors: ["#9FD8CB", "#E8F5F1"],
        statusColor: modernColors.success,
        icon: '✓',
        text: 'Confirmada',
        glowColor: modernColors.success + '30',
        borderColor: modernColors.success,
      },
      PENDING: {
        colors: ['#FFE5CC', '#FFD6AA', '#FFC688'], // ✅ CORREGIDO: Array directo
        statusColor: modernColors.warning,
        icon: '⏳',
        text: 'Pendiente',
        glowColor: modernColors.warning + '30',
        borderColor: modernColors.warning,
      },
      COMPLETED: {
        colors: ['#FFFFFF', '#FEF7F0', '#F5F5F4'], // ✅ CORREGIDO: Array directo
        statusColor: modernColors.gray600,
        icon: '🎉',
        text: 'Completada',
        glowColor: modernColors.gray200 + '30',
        borderColor: modernColors.gray400,
      },
    };
    
    return configs[status] || configs.PENDING;
  };

  const getTreatmentIcon = (treatment: string, category?: string) => {
    if (category) {
      const categoryIcons: { [key: string]: string } = { // ✅ CORREGIDO: Tipo explícito
        facial: '✨',
        corporal: '🌸',
        masaje: '💆‍♀️',
        depilacion: '🌺',
        manicure: '💅',
        pedicure: '🦶',
        estetica: '💎',
        relajacion: '🧘‍♀️',
      };
      return categoryIcons[category.toLowerCase()] || '🌟';
    }

    // Fallback basado en nombre del tratamiento
    const treatmentLower = treatment.toLowerCase();
    if (treatmentLower.includes('facial')) return '✨';
    if (treatmentLower.includes('masaje')) return '💆‍♀️';
    if (treatmentLower.includes('depilación')) return '🌸';
    if (treatmentLower.includes('manicure')) return '💅';
    if (treatmentLower.includes('pedicure')) return '🦶';
    if (treatmentLower.includes('peeling')) return '🌟';
    if (treatmentLower.includes('hidratación')) return '💧';
    return '🌺';
  };

  // ============================================================================
  // 🕳️ ESTADO VACÍO PREMIUM
  // ============================================================================
  if (!appointment) {
    return (
      <Animated.View
        style={[
          appointmentCardStyles.appointmentCardContainer,
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
          style={appointmentCardStyles.appointmentCard}
          onPress={onAppointmentPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          accessible={true}
          accessibilityLabel="Agendar nueva cita"
          accessibilityHint="Toca para abrir el calendario de citas"
        >
          <LinearGradient
            colors={['#FFFFFF', '#FEF7F0', '#F5F5F4']} // ✅ CORREGIDO: Array directo
            style={appointmentCardStyles.appointmentCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Elementos decorativos flotantes */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 20,
                  right: 30,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: modernColors.primary + '40', // ✅ CORREGIDO
                },
                {
                  transform: [{
                    translateY: floatingAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    })
                  }],
                  opacity: floatingAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.6],
                  }),
                }
              ]}
            />
            
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  bottom: 30,
                  left: 40,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: modernColors.vip + '40', // ✅ CORREGIDO
                },
                {
                  transform: [{
                    translateY: floatingAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 6],
                    })
                  }],
                  opacity: floatingAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 0.5],
                  }),
                }
              ]}
            />

            {/* Shimmer effect premium */}
            <Animated.View
              style={[
                premiumEffects.shimmerBase,
                {
                  transform: [{
                    translateX: shimmerAnim
                  }],
                  opacity: 0.6,
                }
              ]}
            />
            
            {/* Contenido del estado vacío */}
            <View style={appointmentCardStyles.noAppointmentContainer}>
              <View style={appointmentCardStyles.emptyStateIconContainer}>
                <LinearGradient
                  colors={[modernColors.vip, '#E8956B', '#D6845A']} // ✅ CORREGIDO: Array directo
                  style={appointmentCardStyles.emptyStateIconBg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={appointmentCardStyles.emptyStateIcon}>📅</Text>
                </LinearGradient>
                
                {/* Anillo de pulso */}
                <Animated.View
                  style={[
                    appointmentCardStyles.iconRipple,
                    {
                      transform: [{
                        scale: floatingAnim1.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1],
                        })
                      }],
                      opacity: floatingAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.1],
                      }),
                    }
                  ]}
                />
              </View>
              
              <View style={appointmentCardStyles.emptyStateContent}>
                <Text style={appointmentCardStyles.emptyStateTitle}>
                  Tu calendario está libre
                </Text>
                <Text style={appointmentCardStyles.emptyStateSubtitle}>
                  Es el momento perfecto para agendar tu próximo ritual de belleza y bienestar
                </Text>
                
                <View style={appointmentCardStyles.ctaContainer}>
                  <TouchableOpacity
                    onPress={onAppointmentPress}
                    activeOpacity={0.8}
                    accessible={true}
                    accessibilityLabel="Agendar ahora"
                  >
                    <LinearGradient
                      colors={[modernColors.vip, '#E8956B', '#D6845A']} // ✅ CORREGIDO: Array directo
                      style={appointmentCardStyles.ctaButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={appointmentCardStyles.ctaText}>Agendar ahora</Text>
                      <Text style={appointmentCardStyles.ctaIcon}>→</Text>
                      
                      {/* Efecto de brillo en hover */}
                      <Animated.View
                        style={[
                          premiumEffects.shimmerBase,
                          {
                            transform: [{
                              translateX: shimmerAnim.interpolate({
                                inputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
                                outputRange: [-100, 100],
                              })
                            }],
                            opacity: 0.3,
                          }
                        ]}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // ============================================================================
  // 💎 RENDERIZADO CON CITA - ESTADO PREMIUM
  // ============================================================================
  const statusConfig = getStatusConfig(appointment.status);
  const treatmentIcon = getTreatmentIcon(appointment.treatment, appointment.category);

  return (
    <Animated.View
      style={[
        appointmentCardStyles.appointmentCardContainer,
        {
          opacity: fadeAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
            { translateY: slideAnim },
            { 
              rotateX: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['45deg', '0deg'],
              })
            },
          ],
        }
      ]}
    >
      {/* Glow effect para interacciones */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: 28, // ✅ CORREGIDO: Valor directo
            backgroundColor: statusConfig.glowColor,
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
          }
        ]}
      />

      <TouchableOpacity
        style={appointmentCardStyles.appointmentCard}
        onPress={onDetailsPress || onAppointmentPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        accessible={true}
        accessibilityLabel={`Cita de ${appointment.treatment} el ${formatAppointmentDate(appointment.date)} a las ${formatAppointmentTime(appointment.time)}`}
        accessibilityHint="Toca para ver detalles de la cita"
      >
        <LinearGradient
          colors={statusConfig.colors}
          style={appointmentCardStyles.appointmentCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Elementos decorativos con movimiento */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 20,
                right: 30,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: statusConfig.statusColor + '40',
              },
              {
                transform: [{
                  translateY: floatingAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6],
                  })
                }],
              }
            ]}
          />
          
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 30,
                left: 40,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: statusConfig.statusColor + '25',
              },
              {
                transform: [{
                  translateY: floatingAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 4],
                  })
                }],
              }
            ]}
          />

          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 60,
                left: 20,
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: statusConfig.statusColor + '15',
              },
              {
                transform: [{
                  translateY: floatingAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -3],
                  })
                }],
              }
            ]}
          />

          {/* Shimmer effect */}
          <Animated.View
            style={[
              premiumEffects.shimmerBase,
              {
                transform: [{ translateX: shimmerAnim }],
                opacity: 0.4,
              }
            ]}
          />

          {/* Ripple effect en interacciones */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
                height: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
                borderRadius: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: [
                  { translateX: -100 },
                  { translateY: -100 },
                ],
                opacity: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 0],
                }),
              }
            ]}
          />

          {/* Header con tiempo y estado */}
          <View style={appointmentCardStyles.appointmentHeader}>
            <View style={appointmentCardStyles.timeContainer}>
              <Text style={appointmentCardStyles.timeLabel}>Próxima cita</Text>
              <View style={appointmentCardStyles.dateTimeRow}>
                <Text style={appointmentCardStyles.dateText}>
                  {formatAppointmentDate(appointment.date)}
                </Text>
                <View style={appointmentCardStyles.timeDivider} />
                <Text style={appointmentCardStyles.timeText}>
                  {formatAppointmentTime(appointment.time)}
                </Text>
              </View>
            </View>
            
            <View style={appointmentCardStyles.statusContainer}>
              <LinearGradient
                colors={[statusConfig.statusColor + '20', statusConfig.statusColor + '10']}
                style={[
                  appointmentCardStyles.statusBadge,
                  { 
                    borderColor: statusConfig.borderColor + '30',
                    borderWidth: 1,
                  }
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={appointmentCardStyles.statusIcon}>{statusConfig.icon}</Text>
                <Text style={[
                  appointmentCardStyles.statusText, 
                  { color: statusConfig.statusColor }
                ]}>
                  {statusConfig.text}
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Contenido principal del tratamiento */}
          <View style={appointmentCardStyles.appointmentContent}>
            <View style={appointmentCardStyles.treatmentRow}>
              <View style={appointmentCardStyles.treatmentIconContainer}>
                <LinearGradient
                  colors={[modernColors.vip, '#E8956B', '#D6845A']} // ✅ CORREGIDO: Array directo
                  style={appointmentCardStyles.treatmentIconBg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={appointmentCardStyles.treatmentIcon}>{treatmentIcon}</Text>
                  
                  {/* Indicator VIP si aplica */}
                  {appointment.isVipExclusive && (
                    <View style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: modernColors.vip,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={{ fontSize: 8, color: '#FFF' }}>👑</Text>
                    </View>
                  )}
                </LinearGradient>
              </View>
              
              <View style={appointmentCardStyles.treatmentInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: modernSpacing.sm }}>
                  <Text style={appointmentCardStyles.treatmentTitle}>
                    {appointment.treatment}
                  </Text>
                  {userVipStatus && (
                    <View style={{
                      marginLeft: modernSpacing.sm,
                      paddingHorizontal: modernSpacing.xs,
                      paddingVertical: 2,
                      backgroundColor: modernColors.vip + '20',
                      borderRadius: modernSpacing.xs,
                    }}>
                      <Text style={{
                        fontSize: 10,
                        color: modernColors.vip,
                        fontWeight: '600',
                      }}>-25%</Text>
                    </View>
                  )}
                </View>
                
                <View style={appointmentCardStyles.professionalRow}>
                  <Text style={appointmentCardStyles.withText}>con</Text>
                  <Text style={appointmentCardStyles.professionalName}>
                    {appointment.professional}
                  </Text>
                </View>
                
                {(appointment.duration || appointment.beautyPointsEarned) && (
                  <View style={appointmentCardStyles.durationRow}>
                    {appointment.duration && (
                      <>
                        <Text style={appointmentCardStyles.durationIcon}>⏱</Text>
                        <Text style={appointmentCardStyles.durationText}>
                          {appointment.duration} min
                        </Text>
                      </>
                    )}
                    
                    {appointment.beautyPointsEarned && (
                      <>
                        {appointment.duration && <View style={appointmentCardStyles.pointsDivider} />}
                        <Text style={appointmentCardStyles.pointsIcon}>💎</Text>
                        <Text style={appointmentCardStyles.pointsText}>
                          +{appointment.beautyPointsEarned} pts
                          {userVipStatus && ' (x2)'}
                        </Text>
                      </>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Footer con acciones premium */}
          <View style={appointmentCardStyles.appointmentFooter}>
            <TouchableOpacity 
              style={appointmentCardStyles.secondaryAction}
              onPress={onModifyPress || onAppointmentPress}
              accessible={true}
              accessibilityLabel="Modificar cita"
            >
              <Text style={appointmentCardStyles.secondaryActionText}>Modificar</Text>
            </TouchableOpacity>
            
            <View style={appointmentCardStyles.actionDivider} />
            
            <TouchableOpacity 
              style={appointmentCardStyles.primaryAction}
              onPress={onDetailsPress || onAppointmentPress}
              accessible={true}
              accessibilityLabel="Ver detalles completos"
            >
              <LinearGradient
                colors={[modernColors.vip, '#E8956B', '#D6845A']} // ✅ CORREGIDO: Array directo
                style={appointmentCardStyles.primaryActionBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={appointmentCardStyles.primaryActionText}>Ver detalles</Text>
                <Text style={appointmentCardStyles.primaryActionIcon}>→</Text>
                
                {/* Shine effect en hover */}
                <Animated.View
                  style={[
                    premiumEffects.shimmerBase,
                    {
                      width: 60,
                      transform: [{
                        translateX: shimmerAnim.interpolate({
                          inputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
                          outputRange: [-30, 30],
                        })
                      }],
                      opacity: 0.4,
                    }
                  ]}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================================================
// 🎯 EXPORT LIMPIO SIN defaultProps (deprecado en React 18)
// ============================================================================
export default NextAppointmentCard;