// src/screens/auth/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Paleta de colores elegante y relajante
const colors = {
  lavender: '#F5F3FF',          // Lavanda suave de fondo
  nude: '#F7F5F3',             // Nude cálido
  rosePale: '#FBEEF5',         // Rosa palo
  warmWhite: '#FEFDFB',        // Blanco cálido
  jade: '#85C4A6',             // Verde jade sutil
  gold: '#D4AF37',             // Dorado elegante
  softGray: '#A8A8A8',         // Gris suave para texto
  charcoal: '#3A3A3A',         // Carbón para títulos
  pearl: '#F9F7F4',            // Perla para cards
  blush: '#F4E6E1',            // Rubor suave
  sage: '#C8D5B9',             // Salvia para acentos
  cream: '#FAF8F5',            // Crema suave
};

interface Props {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa tu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email inválido', 'Por favor verifica el formato de tu email');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailSent(true);
    } catch (error) {
      Alert.alert('Error', 'No pudimos enviar el email. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setEmail('');
  };

  // Estado de carga elegante
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIcon}>
            <Text style={styles.loadingEmoji}>✨</Text>
          </View>
          <Text style={styles.loadingTitle}>Enviando recuperación</Text>
          <Text style={styles.loadingSubtext}>
            Estamos preparando el enlace para ti...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Estado de éxito elegante
  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>💌</Text>
          </View>
          
          <Text style={styles.successTitle}>Email enviado</Text>
          <Text style={styles.successDescription}>
            Hemos enviado las instrucciones de recuperación a:
          </Text>
          
          <View style={styles.emailDisplay}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          
          <Text style={styles.instructionsText}>
            Revisa tu bandeja de entrada y sigue el enlace para crear una nueva contraseña.
          </Text>
          
          <View style={styles.successActions}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleBackToLogin}
            >
              <Text style={styles.primaryButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleTryAgain}
            >
              <Text style={styles.secondaryButtonText}>Usar otro email</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.helpText}>
            ¿No ves el email? Revisa tu carpeta de spam o contacta con nosotras.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Pantalla principal de recuperación
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header minimalista */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>
            
            <View style={styles.iconContainer}>
              <Text style={styles.headerEmoji}>🔑</Text>
            </View>
            
            <Text style={styles.title}>Recuperar acceso</Text>
            <Text style={styles.subtitle}>
              Te ayudamos a volver a tu cuenta de manera segura
            </Text>
          </View>

          {/* Pasos simples */}
          <View style={styles.stepsContainer}>
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Ingresa tu email</Text>
            </View>
            
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Revisa tu bandeja</Text>
            </View>
            
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Crea nueva contraseña</Text>
            </View>
          </View>

          {/* Formulario elegante */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tu email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="maria@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.softGray}
              />
            </View>

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleResetPassword}
            >
              <Text style={styles.resetButtonText}>Enviar enlace de recuperación</Text>
            </TouchableOpacity>
          </View>

          {/* Ayuda elegante */}
          <View style={styles.helpContainer}>
            <View style={styles.helpCard}>
              <Text style={styles.helpTitle}>¿Necesitas ayuda?</Text>
              <Text style={styles.helpDescription}>
                Si no puedes acceder a tu email o tienes dudas, estamos aquí para ayudarte.
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contactar soporte</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.warmWhite,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingEmoji: {
    fontSize: 32,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    fontWeight: '300',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successIcon: {
    width: 100,
    height: 100,
    backgroundColor: colors.jade,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  successEmoji: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 16,
    textAlign: 'center',
  },
  successDescription: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '300',
  },
  emailDisplay: {
    backgroundColor: colors.warmWhite,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 16,
    color: colors.jade,
    fontWeight: '500',
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: colors.softGray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    fontWeight: '300',
  },
  successActions: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  helpText: {
    fontSize: 12,
    color: colors.softGray,
    textAlign: 'center',
    fontWeight: '300',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.jade,
    fontWeight: '500',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.warmWhite,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    paddingHorizontal: 20,
  },
  stepsContainer: {
    marginBottom: 40,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warmWhite,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: colors.jade,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.warmWhite,
  },
  stepText: {
    fontSize: 16,
    color: colors.charcoal,
    fontWeight: '400',
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.charcoal,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.charcoal,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.cream,
  },
  resetButton: {
    backgroundColor: colors.jade,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.warmWhite,
    letterSpacing: 0.3,
  },
  primaryButton: {
    backgroundColor: colors.jade,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.warmWhite,
  },
  secondaryButton: {
    backgroundColor: colors.warmWhite,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.jade,
  },
  helpContainer: {
    marginBottom: 20,
  },
  helpCard: {
    backgroundColor: colors.rosePale,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 12,
    textAlign: 'center',
  },
  helpDescription: {
    fontSize: 14,
    color: colors.softGray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    fontWeight: '300',
  },
  contactButton: {
    backgroundColor: colors.warmWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  contactButtonText: {
    fontSize: 14,
    color: colors.jade,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ForgotPasswordScreen;