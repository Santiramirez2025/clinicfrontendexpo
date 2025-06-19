// ============================================================================
// screens/RegisterScreen.tsx - VERSION CORREGIDA
// ============================================================================
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modernColors } from '../../styles';
import { loginStyles } from '../../components/login/styles';
import { ConnectionStatus, AuthHeader } from '../../components/common';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useAuth } from '../../hooks/useAuth';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    formData,
    errors,
    loading,
    connectionStatus,
    updateField,
    handleSubmit,
  } = useAuth('register');

  return (
    <SafeAreaView style={loginStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={modernColors.backgroundWarm} />
      
      <ScrollView 
        style={loginStyles.scrollView}
        contentContainerStyle={loginStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ConnectionStatus status={connectionStatus} />
        
        <AuthHeader 
          icon="🌸"
          title="Únete a Nosotras"
          subtitle="Tu viaje de belleza comienza aquí"
        />
        
        {/* ✅ PROPS EXACTOS SEGÚN LA INTERFAZ RegisterFormProps */}
        <RegisterForm
          formData={formData}
          errors={errors}
          loading={loading}
          connectionStatus={connectionStatus}
          onUpdateField={updateField}  // ✅ CORRECTO: La interfaz espera "onUpdateField"
          onSubmit={handleSubmit}
          onNavigateToLogin={() => navigation.navigate('Login')}
        />
        
        {/* 
        ✅ OPCIÓN 2: Si los nombres son diferentes, usa esta versión:
        
        <RegisterForm
          formData={formData}
          errors={errors}
          loading={loading}
          connectionStatus={connectionStatus}
          updateField={updateField}    // Sin "on" prefix
          onSubmit={handleSubmit}
          onNavigateToLogin={() => navigation.navigate('Login')}
        />
        
        ✅ OPCIÓN 3: Si usa nombres completamente diferentes:
        
        <RegisterForm
          registrationData={formData}
          validationErrors={errors}
          isLoading={loading}
          connectionStatus={connectionStatus}
          handleFieldUpdate={updateField}
          handleFormSubmit={handleSubmit}
          navigateToLogin={() => navigation.navigate('Login')}
        />
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;