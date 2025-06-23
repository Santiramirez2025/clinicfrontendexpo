// ============================================================================
// components/profile/InviteFriendCard.tsx - COMPONENTE PARA INVITAR AMIGAS
// ============================================================================
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ============================================================================
// 🎨 COLORES Y CONSTANTES
// ============================================================================
const modernColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  vip: '#FFB347',
  success: '#4CAF50',
  warning: '#FFA06B',
  error: '#FF6B6B',
  gray100: '#F7F7F7',
  gray200: '#E8E8E8',
  gray300: '#D1D1D1',
  gray400: '#B8B8B8',
  gray500: '#9E9E9E',
  gray600: '#6E6E6E',
  gray700: '#4E4E4E',
  gray800: '#2E2E2E',
  white: '#FFFFFF',
  black: '#000000',
};

const modernSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// ============================================================================
// 🎯 INTERFACES
// ============================================================================
interface InviteFriendCardProps {
  onInviteSuccess?: () => void;
  defaultMessage?: string;
}

// ============================================================================
// 🎨 ESTILOS
// ============================================================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: modernColors.white,
    borderRadius: 20,
    marginHorizontal: modernSpacing.md,
    marginVertical: modernSpacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: modernColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradient: {
    padding: modernSpacing.lg,
    borderRadius: 20,
  },
  header: {
    marginBottom: modernSpacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: modernColors.gray800,
    marginBottom: modernSpacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: modernColors.gray600,
    lineHeight: 20,
  },
  form: {
    gap: modernSpacing.md,
  },
  inputContainer: {
    backgroundColor: modernColors.gray100,
    borderRadius: 12,
    paddingHorizontal: modernSpacing.md,
    paddingVertical: Platform.OS === 'ios' ? modernSpacing.md : modernSpacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: modernColors.primary,
    backgroundColor: modernColors.white,
  },
  input: {
    fontSize: 16,
    color: modernColors.gray800,
    ...Platform.select({
      ios: {
        paddingVertical: 0,
      },
      android: {
        paddingVertical: 0,
      },
    }),
  },
  messageInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: modernColors.gray500,
    textAlign: 'right',
    marginTop: modernSpacing.xs,
  },
  button: {
    marginTop: modernSpacing.sm,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.md,
    paddingHorizontal: modernSpacing.lg,
    gap: modernSpacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: modernColors.white,
  },
  successContainer: {
    backgroundColor: modernColors.success + '10',
    borderRadius: 12,
    padding: modernSpacing.md,
    marginTop: modernSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.sm,
  },
  successIcon: {
    fontSize: 20,
  },
  successText: {
    flex: 1,
    fontSize: 14,
    color: modernColors.success,
    fontWeight: '600',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: modernColors.vip + '10',
  },
  decorativeCircle1: {
    top: -20,
    right: -20,
  },
  decorativeCircle2: {
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: modernColors.primary + '08',
  },
});

// ============================================================================
// 🌟 COMPONENTE PRINCIPAL
// ============================================================================
export const InviteFriendCard: React.FC<InviteFriendCardProps> = ({
  onInviteSuccess,
  defaultMessage = '¡Hola! Te invito a unirte a nuestra app de belleza. ¡Ambas ganaremos 50 Beauty Points! 💅✨'
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función simulada para enviar invitación
  const handleInviteFriend = async (email: string, message: string): Promise<boolean> => {
    // Simulamos una llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulamos un 90% de éxito
        resolve(Math.random() > 0.1);
      }, 1500);
    });
  };

  const sendInvitation = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    // Validaciones
    if (!email.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el email de tu amiga');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('Email inválido', 'Por favor ingresa un email válido');
      return;
    }

    setSending(true);
    setShowSuccess(false);

    try {
      const finalMessage = message.trim() || defaultMessage;
      const success = await handleInviteFriend(email.trim(), finalMessage);
      
      if (success) {
        setEmail('');
        setMessage('');
        setShowSuccess(true);
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => setShowSuccess(false), 5000);
        
        // Callback opcional
        onInviteSuccess?.();
        
        Alert.alert(
          '¡Invitación enviada! 🎉',
          `Tu amiga recibirá la invitación en ${email.trim()}. Ambas ganarán 50 Beauty Points cuando se registre.`,
          [{ text: 'Genial', style: 'default' }]
        );
      } else {
        Alert.alert(
          'Error al enviar',
          'No pudimos enviar la invitación. Por favor intenta nuevamente.',
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Ocurrió un error inesperado. Por favor intenta más tarde.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setSending(false);
    }
  };

  const remainingChars = 200 - message.length;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#FFFFFF', '#FFF9F5', '#FFF5F0']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, styles.decorativeCircle1]} />
        <View style={[styles.decorativeCircle, styles.decorativeCircle2]} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Invita una amiga 👯‍♀️</Text>
          <Text style={styles.subtitle}>
            Comparte la experiencia de belleza y bienestar. 
            Ambas recibirán 50 Beauty Points cuando tu amiga se registre.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={[
            styles.inputContainer,
            emailFocused && styles.inputContainerFocused
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Email de tu amiga"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={modernColors.gray400}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              editable={!sending}
            />
          </View>

          {/* Message Input */}
          <View>
            <View style={[
              styles.inputContainer,
              messageFocused && styles.inputContainerFocused
            ]}>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Mensaje personal (opcional)"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
                maxLength={200}
                placeholderTextColor={modernColors.gray400}
                onFocus={() => setMessageFocused(true)}
                onBlur={() => setMessageFocused(false)}
                editable={!sending}
              />
            </View>
            {message.length > 0 && (
              <Text style={[
                styles.charCount,
                remainingChars < 20 && { color: modernColors.warning }
              ]}>
                {remainingChars} caracteres restantes
              </Text>
            )}
          </View>

          {/* Success Message */}
          {showSuccess && (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successText}>
                ¡Invitación enviada exitosamente!
              </Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, sending && styles.buttonDisabled]}
            onPress={sendInvitation}
            disabled={sending}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[modernColors.vip, '#E8956B', '#D6845A']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {sending ? (
                <ActivityIndicator color={modernColors.white} size="small" />
              ) : (
                <>
                  <Text style={styles.buttonIcon}>📧</Text>
                  <Text style={styles.buttonText}>Enviar Invitación</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// ============================================================================
// 🎯 EXPORT
// ============================================================================
export default InviteFriendCard;