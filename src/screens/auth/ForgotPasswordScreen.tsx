// ============================================================================
// screens/ForgotPasswordScreen.tsx - SCREEN CORREGIDO
// ============================================================================
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modernColors } from '../../styles';
import { loginStyles } from '../../components/login/styles';
import { ConnectionStatus, AuthHeader } from '../../components/common';
import { ForgotForm } from '../../components/auth/ForgotForm';
import { useAuth } from '../../hooks/useAuth';

const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    formData,
    errors,
    loading,
    connectionStatus,
    updateField,
    handleSubmit,
  } = useAuth('forgot');

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
          icon="🔐"
          title="Recuperar Acceso"
          subtitle="Te ayudamos a recuperar tu cuenta"
        />
        
        <ForgotForm
          email={formData.email}
          emailError={errors.email || ''}
          loading={loading}
          connectionStatus={connectionStatus}
          onEmailChange={(text) => updateField('email', text)}
          onSubmit={handleSubmit}
          onNavigateToLogin={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;