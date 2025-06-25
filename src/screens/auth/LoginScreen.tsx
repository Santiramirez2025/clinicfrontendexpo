// ============================================================================
// screens/auth/LoginScreen.tsx - VERSION CONECTADA AL BACKEND ✅
// ============================================================================
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ IMPORTS CORREGIDOS - SOLO LOS QUE EXISTEN
import { 
  modernColors, 
  modernSpacing, 
  modernTypography,
  modernShadows,
  // variants, // ❌ COMENTADO SI DA ERROR
} from '../../styles';

// ✅ IMPORTAR COMPONENTES DE LOGIN
import {
  ConnectionStatus,
  LoginHeader,
  DemoCard,
  ElegantDivider,
  LoginForm,
  TestCredentials,
  LoginFooter,
  loginStyles // ✅ Mantener estilos existentes como fallback
} from '../../components/login';

// ✅ IMPORTAR API SERVICE
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';

// ============================================================================
// TIPOS PARA NAVIGATION
// ============================================================================
interface LoginScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string) => void;
  };
}

// ============================================================================
// ESTILOS PREMIUM QUE EXTIENDEN LOS EXISTENTES
// ============================================================================
const premiumLoginStyles = StyleSheet.create({
  // === OVERRIDE DEL CONTAINER ===
  container: {
    ...loginStyles.container,
    backgroundColor: modernColors.backgroundWarm || modernColors.background,
  },

  // === OVERRIDE DEL SCROLL ===
  scrollView: {
    ...loginStyles.scrollView,
  },

  scrollContent: {
    ...loginStyles.scrollContent,
    paddingHorizontal: modernSpacing.lg || 20,
    paddingTop: modernSpacing.lg || 20,
    paddingBottom: modernSpacing.xxl || 40,
  },

  // === PREMIUM ENHANCEMENT WRAPPERS ===
  enhancedCard: {
    borderRadius: modernSpacing.xl || 16,
    shadowColor: modernShadows.soft?.shadowColor || '#000',
    shadowOffset: modernShadows.soft?.shadowOffset || { width: 0, height: 2 },
    shadowOpacity: modernShadows.soft?.shadowOpacity || 0.1,
    shadowRadius: modernShadows.soft?.shadowRadius || 8,
    elevation: modernShadows.soft?.elevation || 4,
  },

  vipEnhancement: {
    shadowColor: modernShadows.premium?.shadowColor || '#000',
    shadowOffset: modernShadows.premium?.shadowOffset || { width: 0, height: 4 },
    shadowOpacity: modernShadows.premium?.shadowOpacity || 0.15,
    shadowRadius: modernShadows.premium?.shadowRadius || 12,
    elevation: modernShadows.premium?.elevation || 8,
    borderWidth: 1,
    borderColor: modernColors.vip || modernColors.accent,
  },

  wellnessEnhancement: {
    borderLeftWidth: 4,
    borderLeftColor: modernColors.wellness || modernColors.accent,
  },
});

// ============================================================================
// COMPONENTE PRINCIPAL CON CONEXIÓN AL BACKEND
// ============================================================================
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // ✅ USAR useAuth HOOK Y REDUX
  const {
    login,
    loading,
    error
  } = useAuth();
  
  const dispatch = useDispatch();

  // ✅ ESTADO LOCAL PARA FORMULARIO
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [connectionStatus, setConnectionStatus] = React.useState<'connected' | 'disconnected' | 'checking'>('checking');

  // ✅ ERRORES ESPECÍFICOS DE CAMPOS
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  // ✅ CHECK CONNECTION ON MOUNT
  React.useEffect(() => {
    checkBackendConnection();
  }, []);

  // ✅ FUNCIÓN PARA VERIFICAR CONEXIÓN
  const checkBackendConnection = async () => {
    try {
      setConnectionStatus('checking');
      const response = await fetch('http://localhost:3000/health');
      
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  // ✅ VALIDACIÓN DE CAMPOS
  const validateFields = (): boolean => {
    let isValid = true;
    
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Ingresa un email válido');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  // ✅ MANEJAR LOGIN DEMO
  const handleDemoLogin = async () => {
    try {
      console.log('🎭 Iniciando demo login...');
      
      // ✅ USAR EL API SERVICE EN LUGAR DE FETCH DIRECTO
      const data = await authAPI.demoLogin();

      if (data.success) {
        console.log('✅ Demo login exitoso');
        
        // ✅ GUARDAR EN REDUX STORE
        const userData = {
          id: data.data.user.id,
          name: `${data.data.user.firstName} ${data.data.user.lastName}`,
          email: data.data.user.email,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          beautyPoints: data.data.user.beautyPoints,
          sessionsCompleted: data.data.user.sessionsCompleted,
          vipStatus: data.data.user.vipStatus,
          role: 'demo' as const,
        };
        
        // ✅ DISPATCH A REDUX (el API service ya guardó tokens)
        dispatch(setUser(userData));
        dispatch(setToken(data.data.tokens.accessToken));
        
        console.log('✅ Usuario logueado con token guardado');
        
      } else {
        console.error('❌ Error en demo login:', data.error);
      }
    } catch (error) {
      console.error('❌ Error en demo login:', error);
    }
  };

  // ✅ MANEJAR LOGIN TRADICIONAL
  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      console.log('🔐 Iniciando login tradicional...');
      await login(email.trim(), password);
      console.log('✅ Login exitoso - Redux manejará la navegación');
      // ✅ NO NECESITA NAVEGACIÓN MANUAL - Redux se encarga
    } catch (error) {
      console.error('❌ Error en login:', error);
      // El error ya se maneja en useAuth
    }
  };

  // ✅ LLENAR CREDENCIALES DEMO
  const fillDemoCredentials = () => {
    setEmail('demo@bellezaestetica.com');
    setPassword('demo123');
    setEmailError('');
    setPasswordError('');
  };

  // ✅ NAVEGACIÓN
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={premiumLoginStyles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={modernColors.backgroundWarm || modernColors.background} 
      />
      
      <ScrollView 
        style={premiumLoginStyles.scrollView}
        contentContainerStyle={premiumLoginStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ✅ ESTADO DE CONEXIÓN */}
        <ConnectionStatus 
          status={connectionStatus}
          onRetry={checkBackendConnection}
        />

        {/* ✅ HEADER PRINCIPAL */}
        <LoginHeader />

        {/* ✅ DEMO EXPERIENCE CARD */}
        <DemoCard 
          onDemoLogin={handleDemoLogin}
          loading={loading}
          connectionStatus={connectionStatus}
        />

        {/* ✅ ELEGANT DIVIDER */}
        <ElegantDivider />

        {/* ✅ LOGIN FORM */}
        <LoginForm
          email={email}
          password={password}
          emailError={emailError}
          passwordError={passwordError}
          loading={loading}
          connectionStatus={connectionStatus}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onRegister={handleRegister}
        />

        {/* ✅ TEST CREDENTIALS */}
        <TestCredentials 
          onFillCredentials={fillDemoCredentials} 
        />

        {/* ✅ FOOTER BRANDING */}
        <LoginFooter />

      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;