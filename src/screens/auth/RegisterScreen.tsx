// src/screens/auth/RegisterScreen.tsx
import React, { useState } from 'react';
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

// Paleta de colores spa digital elegante
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
  sage: '#C8D5B9',             // Salvia para chips
  cream: '#FBF9F7',            // Crema suave
};

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    skinType: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true);
  const [loading, setLoading] = useState(false);

  const skinTypes = [
    { type: 'Normal', icon: '🌸' },
    { type: 'Seca', icon: '🕊' },
    { type: 'Grasa', icon: '🌿' },
    { type: 'Mixta', icon: '🦋' },
    { type: 'Sensible', icon: '🌺' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      Alert.alert('Datos incompletos', 'Tu nombre nos ayuda a personalizar tu experiencia');
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert('Datos incompletos', 'Tu apellido es importante para nosotras');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Email necesario', 'Te enviaremos consejos de belleza personalizados');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Teléfono requerido', 'Para confirmar tus citas y enviarte recordatorios');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Contraseña muy corta', 'Mínimo 6 caracteres para proteger tu cuenta');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Contraseñas diferentes', 'Por favor verifica que coincidan');
      return false;
    }
    if (!acceptTerms) {
      Alert.alert('Términos y condiciones', 'Acepta nuestros términos para continuar');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Email inválido', 'Verifica que el formato sea correcto');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        '¡Bienvenida a tu spa digital! ✨',
        `Hola ${formData.firstName}, tu cuenta ha sido creada.\n\n🎁 Regalo de bienvenida: 20% en tu primer tratamiento.\n\n💆‍♀️ Estamos aquí para cuidarte.`,
        [
          {
            text: 'Comenzar mi viaje',
            onPress: () => {
              const newUser = {
                id: 'new-user-' + Date.now(),
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                skinType: formData.skinType,
                role: 'patient' as const,
                isNewUser: true,
              };
              
              dispatch(setUser(newUser));
              dispatch(setToken('new-user-token-' + Date.now()));
            },
          },
        ]
      );
      
    } catch (error) {
      Alert.alert('Algo salió mal', 'Inténtalo nuevamente en un momento');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const demoUser = {
        id: 'demo',
        name: 'María González',
        email: 'maria@bellezaestetica.com',
        role: 'demo' as const,
        isDemo: true,
      };
      
      dispatch(setUser(demoUser));
      dispatch(setToken('demo-token-456'));
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la experiencia demo');
    } finally {
      setLoading(false);
    }
  };

  const SkinTypeOption = ({ option }: { option: typeof skinTypes[0] }) => (
    <TouchableOpacity
      style={[
        styles.skinTypeChip,
        formData.skinType === option.type && styles.skinTypeChipSelected
      ]}
      onPress={() => handleInputChange('skinType', option.type)}
    >
      <Text style={styles.skinTypeIcon}>{option.icon}</Text>
      <Text style={[
        styles.skinTypeText,
        formData.skinType === option.type && styles.skinTypeTextSelected
      ]}>
        {option.type}
      </Text>
    </TouchableOpacity>
  );

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
          {/* Header minimalista */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            
            <View style={styles.titleSection}>
              <Text style={styles.welcomeTitle}>Crea tu perfil de belleza</Text>
              <Text style={styles.welcomeSubtitle}>
                Personaliza tu experiencia en nuestro spa digital
              </Text>
            </View>
          </View>

          {/* Acceso rápido demo */}
          <View style={styles.demoSection}>
            <TouchableOpacity 
              style={[styles.demoButton, loading && styles.demoButtonDisabled]}
              onPress={handleDemoLogin}
              disabled={loading}
            >
              <Text style={styles.demoText}>
                {loading ? 'Accediendo...' : 'Explorar sin registro'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.demoSubtext}>
              O crea tu perfil personalizado
            </Text>
          </View>

          {/* Formulario elegante */}
          <View style={styles.formCard}>
            {/* Información personal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre ti</Text>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    placeholderTextColor={colors.softGray}
                  />
                </View>
                
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    placeholderTextColor={colors.softGray}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.softGray}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                  placeholderTextColor={colors.softGray}
                />
              </View>
            </View>

            {/* Perfil de piel */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tu tipo de piel</Text>
              <Text style={styles.sectionSubtitle}>
                Nos ayuda a personalizar tus tratamientos
              </Text>
              
              <View style={styles.skinTypeGrid}>
                {skinTypes.map((option, index) => (
                  <SkinTypeOption key={index} option={option} />
                ))}
              </View>
            </View>

            {/* Seguridad */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Protege tu cuenta</Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña (mínimo 6 caracteres)"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                  placeholderTextColor={colors.softGray}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry
                  placeholderTextColor={colors.softGray}
                />
              </View>
            </View>

            {/* Consentimientos */}
            <View style={styles.consentSection}>
              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                  {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  Acepto términos, condiciones y política de privacidad
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAcceptMarketing(!acceptMarketing)}
              >
                <View style={[styles.checkbox, acceptMarketing && styles.checkboxChecked]}>
                  {acceptMarketing && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  Quiero recibir tips y ofertas de belleza
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botón principal */}
            <TouchableOpacity 
              style={[styles.createButton, loading && styles.createButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.createButtonText}>
                {loading ? 'Creando tu perfil...' : 'Crear mi perfil'}
              </Text>
            </TouchableOpacity>

            {/* Link a login */}
            <View style={styles.loginLink}>
              <Text style={styles.loginQuestion}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Beneficios de bienvenida */}
          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>Te esperan estos regalos</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🎁</Text>
                <Text style={styles.benefitText}>20% en tu primer tratamiento</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>💎</Text>
                <Text style={styles.benefitText}>Beauty Points desde el día 1</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🌸</Text>
                <Text style={styles.benefitText}>Tips personalizados para tu piel</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🎂</Text>
                <Text style={styles.benefitText}>Sorpresa en tu cumpleaños</Text>
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
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.warmWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 18,
    color: colors.charcoal,
    fontWeight: '300',
  },
  titleSection: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 24,
  },
  demoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  demoButton: {
    backgroundColor: colors.sage,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 8,
    shadowColor: colors.sage,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  demoButtonDisabled: {
    opacity: 0.7,
  },
  demoText: {
    color: colors.warmWhite,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  demoSubtext: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  formCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.softGray,
    marginBottom: 20,
    fontWeight: '300',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.pearl,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.charcoal,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: colors.cream,
  },
  skinTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skinTypeChip: {
    backgroundColor: colors.pearl,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cream,
    minWidth: 90,
  },
  skinTypeChipSelected: {
    backgroundColor: colors.jade,
    borderColor: colors.jade,
  },
  skinTypeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  skinTypeText: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '500',
  },
  skinTypeTextSelected: {
    color: colors.warmWhite,
  },
  consentSection: {
    marginBottom: 32,
    gap: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.jade,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: colors.jade,
  },
  checkmark: {
    color: colors.warmWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: colors.charcoal,
    flex: 1,
    lineHeight: 20,
    fontWeight: '400',
  },
  createButton: {
    backgroundColor: colors.jade,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: colors.warmWhite,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginQuestion: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  loginText: {
    fontSize: 14,
    color: colors.jade,
    fontWeight: '500',
  },
  benefitsCard: {
    backgroundColor: colors.blush,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: colors.charcoal,
    flex: 1,
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default RegisterScreen;