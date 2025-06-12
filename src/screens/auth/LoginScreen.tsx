const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Campos necesarios', 'Por favor completa email y contraseña');
    return;
  }

  try {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const loginPayload = {
      user: {
        id: '1',
        name: 'María González',
        email: email,
        role: 'patient' as const,
      },
      token: 'mock-token-123',
    };
    
    dispatch(setUser(loginPayload.user));
    dispatch(setToken(loginPayload.token));
    
  } catch (error) {
    Alert.alert('Error', 'Email o contraseña incorrectos');
  } finally {
    setLoading(false);
  }
};import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
TextInput,
TouchableOpacity,
Alert,
KeyboardAvoidingView,
Platform,
ScrollView,
Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/slices/authSlice';

const { width, height } = Dimensions.get('window');

// Paleta elegante y spa digital
const colors = {
lavender: '#F5F3FF',          // Lavanda suave de fondo
nude: '#F7F5F3',             // Nude cálido
rosePale: '#FBEEF5',         // Rosa palo
warmWhite: '#FEFDFB',        // Blanco cálido
jade: '#85C4A6',             // Verde jade sutil
gold: '#D4AF37',             // Dorado elegante
softGray: '#A8A8A8',         // Gris suave para texto
charcoal: '#3A3A3A',         // Carbón para títulos
pearl: '#F9F7F4',            // Perla para inputs
blush: '#F4E6E1',            // Rubor suave
sage: '#C8D5B9',             // Salvia para acentos
};

interface LoginScreenProps {
navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
const dispatch = useDispatch();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const handleDemoLogin = async () => {
  try {
    setLoading(true);
    
    // Tiempo suficiente para mostrar el loading
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const demoPayload = {
      user: {
        id: 'demo',
        name: 'María González',
        email: 'maria@bellezaestetica.com',
        role: 'demo' as const,
        isDemo: true,
      },
      token: 'demo-token-456',
    };
    
    dispatch(setUser(demoPayload.user));
    dispatch(setToken(demoPayload.token));
    
  } catch (error) {
    Alert.alert('Error', 'No se pudo cargar la experiencia demo');
  } finally {
    setLoading(false);
  }
};

const handleRegister = () => {
  navigation.navigate('Register');
};

return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.keyboardView}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Elementos decorativos sutiles */}
        <View style={styles.backgroundDecoration}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
          <View style={[styles.decorativeCircle, styles.circle3]} />
        </View>

        {/* Header elegante y minimalista */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🌸</Text>
            </View>
            <Text style={styles.brandName}>Belleza</Text>
            <Text style={styles.brandSubtitle}>Tu espacio de bienestar</Text>
          </View>
          
          <Text style={styles.welcomeMessage}>
            Bienvenida a tu momento de calma
          </Text>
        </View>

        {/* Sección demo principal */}
        <View style={styles.demoSection}>
          <View style={styles.demoCard}>
            <View style={styles.demoIconContainer}>
              <Text style={styles.demoIcon}>✨</Text>
            </View>
            <Text style={styles.demoTitle}>Descubre tu experiencia</Text>
            <Text style={styles.demoDescription}>
              Explora cómo reservar citas, ver tratamientos y gestionar tu bienestar
            </Text>
            
            <TouchableOpacity 
              style={[styles.demoButton, loading && styles.demoButtonDisabled]}
              onPress={handleDemoLogin}
              disabled={loading}
            >
              <Text style={styles.demoButtonText}>
                {loading ? 'Preparando tu experiencia...' : 'Comenzar experiencia'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.demoFeatures}>
              <Text style={styles.demoFeature}>Reservas en segundos</Text>
              <Text style={styles.demoFeature}>Historial personalizado</Text>
              <Text style={styles.demoFeature}>Puntos de fidelidad</Text>
              <Text style={styles.demoFeature}>Consejos de belleza</Text>
            </View>
          </View>
        </View>

        {/* Divider elegante */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o accede con tu cuenta</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Formulario minimalista */}
        <View style={styles.loginForm}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tu.email@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.softGray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={colors.softGray}
            />
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              Acceder
            </Text>
          </TouchableOpacity>

          <View style={styles.loginOptions}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Crear cuenta nueva</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Beneficios elegantes */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>¿Por qué elegirnos?</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>🌟</Text>
              <Text style={styles.benefitText}>Experiencia personalizada</Text>
            </View>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>⏰</Text>
              <Text style={styles.benefitText}>Reservas flexibles</Text>
            </View>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>💎</Text>
              <Text style={styles.benefitText}>Tratamientos premium</Text>
            </View>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>🎁</Text>
              <Text style={styles.benefitText}>Recompensas especiales</Text>
            </View>
          </View>
        </View>

        {/* Mensaje de confianza */}
        <View style={styles.trustSection}>
          <View style={styles.trustCard}>
            <Text style={styles.trustMessage}>
              Tu información está protegida con el máximo nivel de seguridad
            </Text>
            <View style={styles.securityIcon}>
              <Text style={styles.securityEmoji}>🔒</Text>
            </View>
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
backgroundDecoration: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: height,
  zIndex: -1,
},
decorativeCircle: {
  position: 'absolute',
  borderRadius: 9999,
  opacity: 0.03,
},
circle1: {
  width: 180,
  height: 180,
  backgroundColor: colors.jade,
  top: -50,
  right: -90,
},
circle2: {
  width: 120,
  height: 120,
  backgroundColor: colors.gold,
  top: height * 0.4,
  left: -60,
},
circle3: {
  width: 80,
  height: 80,
  backgroundColor: colors.rosePale,
  bottom: 150,
  right: -40,
},
header: {
  alignItems: 'center',
  paddingTop: 40,
  paddingBottom: 40,
},
logoContainer: {
  alignItems: 'center',
  marginBottom: 24,
},
logo: {
  width: 72,
  height: 72,
  backgroundColor: colors.warmWhite,
  borderRadius: 36,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
},
logoText: {
  fontSize: 32,
},
brandName: {
  fontSize: 28,
  fontWeight: '300',
  color: colors.charcoal,
  letterSpacing: 1,
  marginBottom: 4,
},
brandSubtitle: {
  fontSize: 14,
  color: colors.softGray,
  fontWeight: '300',
  letterSpacing: 0.5,
},
welcomeMessage: {
  fontSize: 18,
  color: colors.charcoal,
  textAlign: 'center',
  fontWeight: '300',
  lineHeight: 26,
},
demoBanner: {
  backgroundColor: colors.sage,
  borderRadius: 16,
  padding: 20,
  marginBottom: 32,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 3,
},
demoBannerTitle: {
  fontSize: 16,
  fontWeight: '500',
  color: colors.warmWhite,
  marginBottom: 6,
},
demoBannerText: {
  fontSize: 14,
  color: colors.warmWhite,
  textAlign: 'center',
  marginBottom: 12,
  opacity: 0.9,
  fontWeight: '300',
},
skipButton: {
  backgroundColor: colors.warmWhite,
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 20,
},
skipButtonText: {
  color: colors.sage,
  fontWeight: '500',
  fontSize: 14,
},
demoSection: {
  marginBottom: 32,
},
demoCard: {
  backgroundColor: colors.warmWhite,
  borderRadius: 20,
  padding: 28,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 6,
},
demoIconContainer: {
  width: 60,
  height: 60,
  backgroundColor: colors.blush,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
},
demoIcon: {
  fontSize: 28,
},
demoTitle: {
  fontSize: 22,
  fontWeight: '500',
  color: colors.charcoal,
  textAlign: 'center',
  marginBottom: 12,
  letterSpacing: 0.3,
},
demoDescription: {
  fontSize: 16,
  color: colors.softGray,
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: 24,
  fontWeight: '300',
},
demoButton: {
  backgroundColor: colors.jade,
  paddingVertical: 16,
  paddingHorizontal: 32,
  borderRadius: 14,
  marginBottom: 24,
  shadowColor: colors.jade,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
  minWidth: 200,
},
demoButtonDisabled: {
  opacity: 0.7,
},
demoButtonText: {
  color: colors.warmWhite,
  fontSize: 16,
  fontWeight: '500',
  textAlign: 'center',
  letterSpacing: 0.3,
},
demoFeatures: {
  alignItems: 'center',
  gap: 8,
},
demoFeature: {
  fontSize: 14,
  color: colors.softGray,
  fontWeight: '300',
},
divider: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 32,
},
dividerLine: {
  flex: 1,
  height: 1,
  backgroundColor: colors.pearl,
},
dividerText: {
  paddingHorizontal: 20,
  fontSize: 14,
  color: colors.softGray,
  fontWeight: '300',
},
loginForm: {
  backgroundColor: colors.warmWhite,
  borderRadius: 16,
  padding: 24,
  marginBottom: 32,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,
  shadowRadius: 8,
  elevation: 2,
},
inputContainer: {
  marginBottom: 20,
},
inputLabel: {
  fontSize: 14,
  fontWeight: '500',
  color: colors.charcoal,
  marginBottom: 8,
  letterSpacing: 0.2,
},
input: {
  backgroundColor: colors.pearl,
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 14,
  fontSize: 16,
  color: colors.charcoal,
  borderWidth: 1,
  borderColor: colors.pearl,
  fontWeight: '300',
},
loginButton: {
  backgroundColor: colors.charcoal,
  borderRadius: 12,
  paddingVertical: 16,
  alignItems: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
loginButtonDisabled: {
  opacity: 0.7,
},
loginButtonText: {
  color: colors.warmWhite,
  fontSize: 16,
  fontWeight: '500',
  letterSpacing: 0.3,
},
loginOptions: {
  alignItems: 'center',
  gap: 12,
},
forgotText: {
  fontSize: 14,
  color: colors.jade,
  fontWeight: '400',
},
registerLink: {
  fontSize: 14,
  color: colors.jade,
  fontWeight: '500',
},
benefitsSection: {
  marginBottom: 32,
},
benefitsTitle: {
  fontSize: 20,
  fontWeight: '400',
  color: colors.charcoal,
  textAlign: 'center',
  marginBottom: 20,
  letterSpacing: 0.3,
},
benefitsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
},
benefitCard: {
  backgroundColor: colors.warmWhite,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  width: (width - 72) / 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.03,
  shadowRadius: 4,
  elevation: 1,
},
benefitIcon: {
  fontSize: 24,
  marginBottom: 8,
},
benefitText: {
  fontSize: 12,
  color: colors.softGray,
  textAlign: 'center',
  fontWeight: '400',
  lineHeight: 16,
},
trustSection: {
  alignItems: 'center',
  marginBottom: 20,
},
trustCard: {
  backgroundColor: colors.warmWhite,
  borderRadius: 12,
  padding: 20,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.03,
  shadowRadius: 4,
  elevation: 1,
},
trustMessage: {
  flex: 1,
  fontSize: 12,
  color: colors.softGray,
  fontWeight: '300',
  lineHeight: 18,
},
securityIcon: {
  marginLeft: 12,
},
securityEmoji: {
  fontSize: 16,
},
bottomSpacing: {
  height: 40,
},
});

export default LoginScreen;