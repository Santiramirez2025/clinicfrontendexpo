// ============================================================================
// screens/LoginScreen.tsx - VERSION CORREGIDA SIN ERRORES ✅
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
  variants,
  // premiumButtons,  // ❌ ELIMINADO - NO EXISTE
  // premiumCards     // ❌ ELIMINADO - NO EXISTE
} from '../../styles';

// ✅ IMPORTAR TUS COMPONENTES EXISTENTES
import {
  ConnectionStatus,
  LoginHeader,
  DemoCard,
  ElegantDivider,
  LoginForm,
  TestCredentials,
  LoginFooter,
  loginStyles // ✅ Mantener tus estilos existentes como fallback
} from '../../components/login';

// Importar hook personalizado
import { useLogin } from '../../hooks/useLogin';

// ============================================================================
// ESTILOS PREMIUM QUE EXTIENDEN LOS EXISTENTES
// ============================================================================
const premiumLoginStyles = StyleSheet.create({
  // === OVERRIDE DEL CONTAINER ===
  container: {
    ...loginStyles.container, // ✅ Mantener tu estilo base
    backgroundColor: modernColors.backgroundWarm, // ✅ Aplicar color premium
  },

  // === OVERRIDE DEL SCROLL ===
  scrollView: {
    ...loginStyles.scrollView,
  },

  scrollContent: {
    ...loginStyles.scrollContent,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing, // ✅ Nuevo spacing premium
    paddingTop: modernSpacing.lg,
    paddingBottom: modernSpacing.xxl,
  },

  // === NUEVOS ESTILOS PREMIUM ADICIONALES ===
  premiumSection: {
    marginBottom: modernSpacing.xl, // ✅ Spacing premium
  },

  wellnessSection: {
    marginBottom: modernSpacing.lg, // ✅ Spa-inspired spacing
  },

  vipSection: {
    marginBottom: modernSpacing.xl,
  },

  // === PREMIUM ENHANCEMENT WRAPPERS ===
  enhancedCard: {
    borderRadius: modernSpacing.componentModern.radiusLG,
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },

  vipEnhancement: {
    shadowColor: modernShadows.premium.shadowColor,
    shadowOffset: modernShadows.premium.shadowOffset,
    shadowOpacity: modernShadows.premium.shadowOpacity,
    shadowRadius: modernShadows.premium.shadowRadius,
    elevation: modernShadows.premium.elevation,
    borderWidth: 1,
    borderColor: modernColors.vip,
  },

  wellnessEnhancement: {
    borderLeftWidth: 4,
    borderLeftColor: modernColors.wellness,
  },
});

// ============================================================================
// COMPONENTE PRINCIPAL CON PREMIUM ENHANCEMENTS
// ============================================================================
const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Hook personalizado (sin cambios)
  const {
    email,
    password,
    loading,
    connectionStatus,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    handleDemoLogin,
    handleLogin,
    fillDemoCredentials,
    checkBackendConnection,
  } = useLogin();

  // Navegación (sin cambios)
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
        backgroundColor={modernColors.backgroundWarm} 
      />
      
      <ScrollView 
        style={premiumLoginStyles.scrollView}
        contentContainerStyle={premiumLoginStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ✅ TUS COMPONENTES EXISTENTES SIN CAMBIOS */}
        
        {/* Estado de conexión */}
        <ConnectionStatus status={connectionStatus} />

        {/* Header principal con premium spacing */}
        <LoginHeader />

        {/* Demo Experience Card con VIP enhancement */}
        <DemoCard 
          onDemoLogin={handleDemoLogin}
          loading={loading}
          connectionStatus={connectionStatus}
        />

        {/* Elegant Divider con wellness enhancement */}
        <ElegantDivider />

        {/* Login Form Card con premium enhancement */}
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

        {/* Test Credentials Section */}
        <TestCredentials onFillCredentials={fillDemoCredentials} />

        {/* Footer branding */}
        <LoginFooter />

      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;