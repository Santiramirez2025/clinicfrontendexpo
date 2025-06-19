// ============================================================================
// hooks/useLogin.ts - HOOK DE LOGIN OPTIMIZADO
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../store/slices/authSlice';
import { authAPI, handleApiError } from '../services/api';
import ApiService from '../services/api';

// ============================================================================
// TIPOS Y INTERFACES
// ============================================================================
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      vipStatus: boolean;
      beautyPoints: number;
      sessionsCompleted: number;
      isDemo?: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface LoginUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'demo';
  isDemo: boolean;
  vipStatus: boolean;
  beautyPoints: number;
  sessionsCompleted: number;
}

interface UseLoginReturn {
  // Estados del formulario
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  
  // Estados de UI
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
  
  // Funciones de actualización
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  
  // Funciones principales
  handleLogin: () => Promise<void>;
  handleDemoLogin: () => Promise<void>;
  fillDemoCredentials: () => void;
  checkBackendConnection: () => Promise<void>;
  clearForm: () => void;
  clearErrors: () => void;
  
  // Validadores
  validateForm: () => boolean;
  validateEmail: (email: string) => string;
  validatePassword: (password: string) => string;
  
  // Estados calculados
  isFormValid: boolean;
  canSubmit: boolean;
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================
export const useLogin = (): UseLoginReturn => {
  const dispatch = useDispatch();
  
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // ============================================================================
  // FUNCIONES DE VALIDACIÓN
  // ============================================================================
  const validateEmail = useCallback((emailValue: string): string => {
    if (!emailValue.trim()) {
      return 'Email es requerido';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue.trim())) {
      return 'Email inválido';
    }
    
    return '';
  }, []);

  const validatePassword = useCallback((passwordValue: string): string => {
    if (!passwordValue.trim()) {
      return 'Contraseña es requerida';
    }
    
    if (passwordValue.length < 6) {
      return 'Contraseña debe tener al menos 6 caracteres';
    }
    
    return '';
  }, []);

  const validateForm = useCallback((): boolean => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    
    return !emailValidation && !passwordValidation;
  }, [email, password, validateEmail, validatePassword]);

  // ============================================================================
  // FUNCIONES DE CONEXIÓN
  // ============================================================================
  const checkBackendConnection = useCallback(async () => {
    try {
      setConnectionStatus('checking');
      const isConnected = await ApiService.checkConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
    } catch (error) {
      console.log('Connection check failed:', error);
      setConnectionStatus('error');
    }
  }, []);

  // ============================================================================
  // FUNCIONES DE FORMULARIO
  // ============================================================================
  const updateEmail = useCallback((emailValue: string) => {
    setEmail(emailValue);
    if (emailError) {
      setEmailError('');
    }
  }, [emailError]);

  const updatePassword = useCallback((passwordValue: string) => {
    setPassword(passwordValue);
    if (passwordError) {
      setPasswordError('');
    }
  }, [passwordError]);

  const clearForm = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  const clearErrors = useCallback(() => {
    setEmailError('');
    setPasswordError('');
  }, []);

  const fillDemoCredentials = useCallback(() => {
    setEmail('demo@bellezaestetica.com');
    setPassword('demo123');
    clearErrors();
  }, [clearErrors]);

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================================================
  const createUserPayload = useCallback((userData: any, isDemo = false): LoginUser => {
    return {
      id: userData.id,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: isDemo ? 'demo' : 'patient',
      isDemo,
      vipStatus: userData.vipStatus || false,
      beautyPoints: userData.beautyPoints || 0,
      sessionsCompleted: userData.sessionsCompleted || 0,
    };
  }, []);

  const handleSuccessfulAuth = useCallback((response: LoginResponse, isDemo = false) => {
    const userPayload = createUserPayload(response.data.user, isDemo);
    
    dispatch(setUser(userPayload));
    dispatch(setToken(response.data.tokens.accessToken));
    
    const welcomeMessage = isDemo ? 
      `¡Bienvenida! ✨\nHola ${response.data.user.firstName}, tu experiencia de belleza comienza ahora.` :
      response.data.user.vipStatus ? 
        `¡Hola ${response.data.user.firstName}! 🌸\nBienvenida de vuelta, miembro VIP 👑` : 
        `¡Hola ${response.data.user.firstName}! 🌸\nNos alegra tenerte de vuelta`;
    
    const [title, message] = welcomeMessage.split('\n');
    
    Alert.alert(title, message, [
      { text: isDemo ? 'Continuar' : 'Comenzar', style: 'default' }
    ]);
  }, [dispatch, createUserPayload]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    if (connectionStatus === 'error') {
      Alert.alert(
        'Sin conexión',
        'Por favor verifica que tu servidor esté corriendo.',
        [
          { text: 'Reintentar', onPress: checkBackendConnection },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
      return;
    }

    try {
      setLoading(true);
      console.log('🚀 Iniciando login para:', email.trim());
      
      const response = await authAPI.login(email.trim(), password);
      
      if (response.success) {
        console.log('✅ Login exitoso:', response.data.user.firstName);
        handleSuccessfulAuth(response, false);
      }
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      
      const errorMessage = handleApiError(error, 'No se pudo iniciar sesión');
      
      // Manejar errores específicos
      if (error.message?.includes('Credenciales inválidas') || 
          error.message?.includes('Invalid credentials')) {
        Alert.alert('Error de acceso', 'Email o contraseña incorrectos');
      } else if (error.message?.includes('Usuario no encontrado') ||
                 error.message?.includes('User not found')) {
        Alert.alert('Usuario no encontrado', 'No existe una cuenta con este email');
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [
    validateForm, 
    connectionStatus, 
    email, 
    password, 
    handleSuccessfulAuth,
    checkBackendConnection
  ]);

  const handleDemoLogin = useCallback(async () => {
    if (connectionStatus === 'error') {
      Alert.alert(
        'Sin conexión',
        'Por favor verifica que tu servidor esté corriendo.',
        [
          { text: 'Reintentar', onPress: checkBackendConnection },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
      return;
    }

    try {
      setLoading(true);
      console.log('🎭 Iniciando demo login...');
      
      const response = await authAPI.demoLogin();
      
      if (response.success) {
        console.log('✅ Demo login exitoso:', response.data.user.firstName);
        handleSuccessfulAuth(response, true);
      }
      
    } catch (error: any) {
      console.error('❌ Demo login error:', error);
      
      const errorMessage = handleApiError(error, 'No se pudo acceder al modo demo');
      Alert.alert('Error de conexión', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [connectionStatus, handleSuccessfulAuth, checkBackendConnection]);

  // ============================================================================
  // ESTADOS CALCULADOS
  // ============================================================================
  const isFormValid = email.trim() !== '' && password.trim() !== '' && !emailError && !passwordError;
  const canSubmit = isFormValid && !loading && connectionStatus === 'connected';

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    checkBackendConnection();
  }, [checkBackendConnection]);

  // Auto-limpiar errores cuando el usuario corrige
  useEffect(() => {
    if (email && emailError) {
      const error = validateEmail(email);
      if (!error) setEmailError('');
    }
  }, [email, emailError, validateEmail]);

  useEffect(() => {
    if (password && passwordError) {
      const error = validatePassword(password);
      if (!error) setPasswordError('');
    }
  }, [password, passwordError, validatePassword]);

  return {
    // Estados del formulario
    email,
    password,
    emailError,
    passwordError,
    
    // Estados de UI
    loading,
    connectionStatus,
    
    // Funciones de actualización (compatibilidad)
    setEmail,
    setPassword,
    updateEmail,
    updatePassword,
    
    // Funciones principales
    handleLogin,
    handleDemoLogin,
    fillDemoCredentials,
    checkBackendConnection,
    clearForm,
    clearErrors,
    
    // Validadores
    validateForm,
    validateEmail,
    validatePassword,
    
    // Estados calculados
    isFormValid,
    canSubmit,
  };
};