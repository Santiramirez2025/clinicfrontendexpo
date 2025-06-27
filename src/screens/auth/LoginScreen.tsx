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

// ✅ IMPORTS CORREGIDOS
import { 
  modernColors, 
  modernSpacing, 
  modernTypography,
  modernShadows,
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
  loginStyles
} from '../../components/login';

// ✅ IMPORTAR HOOKS Y REDUX
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';

// ✅ IMPORTAR TIPOS DESDE auth.ts
import type { User, LoginCredentials, mapConnectionStatus } from '../../types/auth';

// ============================================================================
// TIPOS PARA NAVIGATION ✅
// ============================================================================
interface LoginScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string) => void;
  };
}

// ============================================================================
// ESTILOS PREMIUM QUE EXTIENDEN LOS EXISTENTES ✅
// ============================================================================
const premiumLoginStyles = StyleSheet.create({
  container: {
    ...loginStyles.container,
    backgroundColor: modernColors.backgroundWarm || modernColors.background,
  },

  scrollView: {
    ...loginStyles.scrollView,
  },

  scrollContent: {
    ...loginStyles.scrollContent,
    paddingHorizontal: modernSpacing.lg || 20,
    paddingTop: modernSpacing.lg || 20,
    paddingBottom: modernSpacing.xxl || 40,
  },

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
    borderColor: modernColors.accent,
  },

  wellnessEnhancement: {
    borderLeftWidth: 4,
    borderLeftColor: modernColors.accent,
  },
});

// ============================================================================
// COMPONENTE PRINCIPAL CON CONEXIÓN AL BACKEND ✅
// ============================================================================
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // ✅ USAR useAuth HOOK SIN PARÁMETROS
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
      const response = await fetch('http://192.168.1.174:3000/health'); // ✅ TU IP
      
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
      
      const data = await authAPI.demoLogin();

      if (data.success) {
        console.log('✅ Demo login exitoso');
        
        // ✅ CREAR USUARIO CON CAMPOS REQUERIDOS
        const userData: User = {
          id: data.data.user.id,
          name: `${data.data.user.firstName} ${data.data.user.lastName}`,
          email: data.data.user.email,
          role: 'demo',
          createdAt: new Date().toISOString(), // ✅ REQUERIDO
          updatedAt: new Date().toISOString(), // ✅ REQUERIDO
          
          // Campos adicionales
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          beautyPoints: data.data.user.beautyPoints,
          sessionsCompleted: data.data.user.sessionsCompleted,
          vipStatus: data.data.user.vipStatus,
        };
        
        // ✅ DISPATCH A REDUX
        dispatch(setUser(userData));
        
        console.log('✅ Usuario logueado con token guardado');
        
      } else {
        console.error('❌ Error en demo login:', data.error);
      }
    } catch (error) {
      console.error('❌ Error en demo login:', error);
    }
  };

  // ✅ MANEJAR LOGIN TRADICIONAL - CORREGIDO
  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      console.log('🔐 Iniciando login tradicional...');
      
      // ✅ USAR OBJETO LoginCredentials
      const credentials: LoginCredentials = {
        email: email.trim(),
        password: password
      };
      
      await login(credentials); // ✅ PASAR OBJETO, NO PARÁMETROS SEPARADOS
      console.log('✅ Login exitoso - Redux manejará la navegación');
    } catch (error) {
      console.error('❌ Error en login:', error);
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

  // ✅ MAPEAR CONNECTION STATUS PARA COMPONENTES
  const getConnectionStatusForComponents = (status: typeof connectionStatus): 'checking' | 'connected' | 'error' => {
    if (status === 'disconnected') return 'error';
    return status as 'checking' | 'connected' | 'error';
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
        {/* ✅ ESTADO DE CONEXIÓN - STATUS MAPEADO */}
        <ConnectionStatus 
          status={getConnectionStatusForComponents(connectionStatus)}
          onRetry={checkBackendConnection}
        />

        {/* ✅ HEADER PRINCIPAL */}
        <LoginHeader />

        {/* ✅ DEMO EXPERIENCE CARD - STATUS MAPEADO */}
        <DemoCard 
          onDemoLogin={handleDemoLogin}
          loading={loading}
          connectionStatus={getConnectionStatusForComponents(connectionStatus)}
        />

        {/* ✅ ELEGANT DIVIDER */}
        <ElegantDivider />

        {/* ✅ LOGIN FORM - STATUS MAPEADO */}
        <LoginForm
          email={email}
          password={password}
          emailError={emailError}
          passwordError={passwordError}
          loading={loading}
          connectionStatus={getConnectionStatusForComponents(connectionStatus)}
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