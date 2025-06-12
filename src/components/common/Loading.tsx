/**
 * Loading Component for ClinicSaasRN
 * Reusable loading indicator with medical theme
 */

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../utils/constants';

interface LoadingProps {
  message?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  size?: 'small' | 'large';
  color?: string;
  showIcon?: boolean;
  iconName?: string;
  style?: object;
  fullScreen?: boolean;
  transparent?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Cargando...',
  showButton = false,
  buttonText = 'Reintentar',
  onButtonPress,
  size = 'large',
  color = COLORS.primary,
  showIcon = true,
  iconName = 'local-hospital',
  style,
  fullScreen = true,
  transparent = false,
}) => {
  // Animated value for pulse effect
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Create pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [pulseAnim]);

  const containerStyle = [
    fullScreen ? styles.fullScreenContainer : styles.inlineContainer,
    transparent && styles.transparent,
    style,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {/* Medical Icon with Pulse Animation */}
        {showIcon && (
          <Animated.View 
            style={[
              styles.iconContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Icon 
              name={iconName} 
              size={size === 'large' ? 60 : 40} 
              color={color} 
            />
          </Animated.View>
        )}

        {/* Loading Spinner */}
        <View style={styles.spinnerContainer}>
          <ActivityIndicator 
            size={size} 
            color={color}
            style={styles.spinner}
          />
        </View>

        {/* Loading Message */}
        <Text style={[styles.message, { color }]}>
          {message}
        </Text>

        {/* Medical Loading Tips */}
        <Text style={styles.tip}>
          💡 {getRandomMedicalTip()}
        </Text>

        {/* Action Button */}
        {showButton && onButtonPress && (
          <TouchableOpacity 
            style={[styles.button, { borderColor: color }]} 
            onPress={onButtonPress}
            activeOpacity={0.7}
          >
            <Icon name="refresh" size={20} color={color} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color }]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}

        {/* Loading Dots Animation */}
        <LoadingDots color={color} />
      </View>
    </View>
  );
};

// Loading dots animation component
const LoadingDots: React.FC<{ color: string }> = ({ color }) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '•';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text style={[styles.dots, { color }]}>
      {dots}
    </Text>
  );
};

// Random medical tips for better UX
const getRandomMedicalTip = (): string => {
  const tips = [
    'Recuerda mantener actualizada la información de tus pacientes',
    'Las citas puntuales mejoran la satisfacción del paciente',
    'Revisa siempre el historial médico antes de la consulta',
    'La comunicación clara es clave en la atención médica',
    'Mantén organizados los expedientes médicos',
    'La tecnología mejora la eficiencia en tu práctica médica',
    'Un buen seguimiento post-consulta es fundamental',
    'La privacidad del paciente es nuestra prioridad',
  ];

  return tips[Math.floor(Math.random() * tips.length)];
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  transparent: {
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
  },
  content: {
    alignItems: 'center',
    maxWidth: 280,
  },
  iconContainer: {
    marginBottom: SPACING.md,
  },
  spinnerContainer: {
    marginBottom: SPACING.lg,
  },
  spinner: {
    marginVertical: SPACING.sm,
  },
  message: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.medium,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.lg,
  },
  tip: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 2,
    borderRadius: 25,
    marginTop: SPACING.md,
    backgroundColor: COLORS.white,
    minWidth: 140,
  },
  buttonIcon: {
    marginRight: SPACING.xs,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.semibold,
  },
  dots: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    marginTop: SPACING.sm,
    minHeight: 30,
    textAlign: 'center',
  },
});

export default Loading;