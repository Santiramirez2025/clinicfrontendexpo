// components/dashboard/VIPUpgradeCard.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface VIPUpgradeCardProps {
  userName: string;
  currentPoints: number;
  onUpgrade: () => void;
  isDarkMode?: boolean;
}

export const VIPUpgradeCard: React.FC<VIPUpgradeCardProps> = ({
  userName,
  currentPoints,
  onUpgrade,
  isDarkMode = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const shimmerAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const crownRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
      delay: 300,
    }).start();

    // Shimmer effect continuo
    const shimmerLoop = () => {
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: SCREEN_WIDTH,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(shimmerLoop, 1000);
      });
    };
    shimmerLoop();

    // Elementos flotantes
    const createFloatingAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createFloatingAnimation(floatAnim1, 0);
    createFloatingAnimation(floatAnim2, 1500);

    // Pulso del botón
    Animated.loop(
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
      ])
    ).start();

    // Rotación de corona
    Animated.loop(
      Animated.timing(crownRotate, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
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
    onUpgrade();
  };

  const vipBenefits = [
    { icon: '💎', text: 'Puntos dobles en cada compra' },
    { icon: '🎁', text: 'Regalos exclusivos mensuales' },
    { icon: '⭐', text: 'Acceso prioritario a citas' },
    { icon: '💅', text: 'Descuentos del 25% permanentes' },
  ];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.98}
        onPress={handlePress}
        style={styles.touchable}
      >
        <LinearGradient
          colors={['#FFD700', '#FFA500', '#FF8C00']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Efecto shimmer */}
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX: shimmerAnim }],
              },
            ]}
          />

          {/* Elementos decorativos flotantes */}
          <Animated.View
            style={[
              styles.floatingElement,
              styles.floatingElement1,
              {
                transform: [
                  {
                    translateY: floatAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10],
                    }),
                  },
                ],
                opacity: floatAnim1.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.6, 0.3],
                }),
              },
            ]}
          >
            <Text style={styles.floatingIcon}>✨</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingElement,
              styles.floatingElement2,
              {
                transform: [
                  {
                    translateY: floatAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
                opacity: floatAnim2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.6, 0.3],
                }),
              },
            ]}
          >
            <Text style={styles.floatingIcon}>💫</Text>
          </Animated.View>

          {/* Corona principal animada */}
          <Animated.View
            style={[
              styles.mainCrown,
              {
                transform: [
                  {
                    rotate: crownRotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.mainCrownIcon}>👑</Text>
          </Animated.View>

          {/* Contenido principal */}
          <View style={styles.content}>
            <Text style={styles.title}>
              {userName}, es hora de brillar
            </Text>
            <Text style={styles.subtitle}>
              Únete al Club VIP y transforma tu experiencia de belleza
            </Text>

            {/* Beneficios */}
            <View style={styles.benefitsContainer}>
              {vipBenefits.map((benefit, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.benefitRow,
                    {
                      opacity: scaleAnim,
                      transform: [
                        {
                          translateX: scaleAnim.interpolate({
                            inputRange: [0.95, 1],
                            outputRange: [-20, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </Animated.View>
              ))}
            </View>

            {/* Progreso actual */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Ya tienes <Text style={styles.pointsHighlight}>{currentPoints}</Text> Beauty Points
              </Text>
              <Text style={styles.progressSubtext}>
                Como VIP, estos se convertirían en {currentPoints * 2} puntos
              </Text>
            </View>

            {/* Botón CTA */}
            <Animated.View
              style={[
                styles.ctaButton,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#FFFFFF', '#FFF5E6']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Descubre el Club VIP</Text>
                <Text style={styles.buttonIcon}>→</Text>
              </LinearGradient>
            </Animated.View>

            {/* Precio */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                Solo <Text style={styles.priceAmount}>$29.99/mes</Text>
              </Text>
              <Text style={styles.priceSubtext}>Cancela cuando quieras</Text>
            </View>
          </View>

          {/* Sello de garantía */}
          <View style={styles.guaranteeContainer}>
            <Text style={styles.guaranteeIcon}>🛡️</Text>
            <Text style={styles.guaranteeText}>30 días de garantía</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: modernSpacing.xl,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: modernColors.vip,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: modernSpacing.xl,
  },
  touchable: {
    flex: 1,
  },
  gradient: {
    padding: modernSpacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  floatingElement: {
    position: 'absolute',
  },
  floatingElement1: {
    top: 20,
    right: 30,
  },
  floatingElement2: {
    bottom: 40,
    left: 30,
  },
  floatingIcon: {
    fontSize: 24,
  },
  mainCrown: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.1,
  },
  mainCrownIcon: {
    fontSize: 60,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...modernTypography.headingMedium,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: modernSpacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...modernTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: modernSpacing.lg,
    paddingHorizontal: modernSpacing.md,
  },
  benefitsContainer: {
    width: '100%',
    marginBottom: modernSpacing.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.sm,
    paddingHorizontal: modernSpacing.md,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: modernSpacing.sm,
  },
  benefitText: {
    ...modernTypography.bodySmall,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: modernSpacing.lg,
    paddingVertical: modernSpacing.md,
    borderRadius: modernSpacing.md,
    marginBottom: modernSpacing.lg,
  },
  progressText: {
    ...modernTypography.bodyMedium,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: modernSpacing.xs,
  },
  pointsHighlight: {
    fontWeight: '800',
    fontSize: 18,
  },
  progressSubtext: {
    ...modernTypography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: modernSpacing.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: modernSpacing.md,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.md,
    gap: modernSpacing.sm,
  },
  buttonText: {
    ...modernTypography.bodyLarge,
    color: modernColors.vip,
    fontWeight: '700',
  },
  buttonIcon: {
    fontSize: 20,
    color: modernColors.vip,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: modernSpacing.sm,
  },
  priceText: {
    ...modernTypography.bodySmall,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  priceAmount: {
    ...modernTypography.bodyLarge,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priceSubtext: {
    ...modernTypography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  guaranteeContainer: {
    position: 'absolute',
    bottom: modernSpacing.sm,
    right: modernSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.xs,
    gap: modernSpacing.xs,
  },
  guaranteeIcon: {
    fontSize: 12,
  },
  guaranteeText: {
    ...modernTypography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});