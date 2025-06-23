// ============================================================================
// screens/auth/RegisterScreen.tsx - VERSIÓN FINAL CORREGIDA ✅
// ============================================================================
import React, { useCallback } from 'react';
import { 
  ScrollView, 
  StatusBar, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks y utilidades
import { useAuth } from '../../hooks/useAuth';

// Componentes
import { ConnectionStatus, AuthHeader } from '../../components/common';
import { RegisterForm } from '../../components/auth/RegisterForm';

// ============================================================================
// TIPOS
// ============================================================================
interface RegisterScreenProps {
  navigation: any; // Tipo genérico para navegación
}

// ============================================================================
// ESTILOS
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  // Hook de autenticación
  const {
    formData,
    errors,
    loading,
    connectionStatus,
    updateField,
    handleSubmit,
  } = useAuth('register');

  // ✅ CORREGIDO: Convertir formData para garantizar que todos los campos requeridos existan
  const registerFormData = {
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  // ✅ CORREGIDO: Wrapper para updateField que acepta string genérico
  const handleUpdateField = useCallback((field: string, value: string) => {
    // Validar que el campo es válido antes de actualizar
    const validFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
    if (validFields.includes(field)) {
      updateField(field as keyof typeof formData, value);
    }
  }, [updateField]);

  // Navegación a login
  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFF9F5" 
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Estado de conexión */}
          <ConnectionStatus status={connectionStatus} />
          
          {/* Header */}
          <View style={styles.headerContainer}>
            <AuthHeader 
              icon="🌸"
              title="Únete a Nosotras"
              subtitle="Tu viaje de belleza comienza aquí"
            />
          </View>
          
          {/* ✅ FORMULARIO CON PROPS CORRECTOS */}
          <RegisterForm
            formData={registerFormData}
            errors={errors}
            loading={loading}
            connectionStatus={connectionStatus}
            onUpdateField={handleUpdateField}
            onSubmit={handleSubmit}
            onNavigateToLogin={handleNavigateToLogin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================
export default RegisterScreen;