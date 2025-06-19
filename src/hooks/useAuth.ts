// ============================================================================
// hooks/useAuth.ts - HOOK DE AUTENTICACIÓN OPTIMIZADO
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
export type AuthType = 'login' | 'register' | 'forgot';

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  confirmPassword?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isDemo: boolean;
  vipStatus: boolean;
  beautyPoints: number;
  sessionsCompleted: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  notificationPreferences?: {
    appointments: boolean;
    wellness: boolean;
    offers: boolean;
  };
}

export interface AuthState {
  formData: AuthFormData;
  errors: Partial<AuthFormData>;
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
}

interface UseAuthReturn extends AuthState {
  // Funciones principales
  updateField: (field: keyof AuthFormData, value: string) => void;
  handleSubmit: () => Promise<void>;
  checkBackendConnection: () => Promise<void>;
  clearForm: () => void;
  clearErrors: () => void;
  
  // Validadores
  validateForm: () => boolean;
  validateEmail: (email: string) => string | null;
  validatePassword: (password: string) => string | null;
  
  // Estados calculados
  isFormValid: boolean;
  canSubmit: boolean;
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================
export const useAuth = (type: AuthType): UseAuthReturn => {
  const dispatch = useDispatch();
  
  // Estados principales
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // ============================================================================
  // FUNCIONES DE VALIDACIÓN
  // ============================================================================
  const validateEmail = useCallback((email: string): string | null => {
    if (!email.trim()) {
      return 'Email es requerido';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Email inválido';
    }
    
    return null;
  }, []);

  const validatePassword = useCallback((password: string): string | null => {
    if (!password.trim()) {
      return 'Contraseña es requerida';
    }
    
    if (password.length < 6) {
      return 'Contraseña debe tener al menos 6 caracteres';
    }
    
    // Opcional: validación más estricta
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumbers = /\d/.test(password);
    // if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    //   return 'Contraseña debe contener mayúsculas, minúsculas y números';
    // }
    
    return null;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<AuthFormData> = {};

    // Validación de email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Validación de contraseña (no aplica para forgot)
    if (type !== 'forgot') {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // Validaciones específicas para registro
    if (type === 'register') {
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'Nombre es requerido';
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = 'Nombre debe tener al menos 2 caracteres';
      }
      
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Apellido es requerido';
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = 'Apellido debe tener al menos 2 caracteres';
      }
      
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Teléfono es requerido';
      } else {
        // Validación básica de teléfono (formato argentino)
        const phoneRegex = /^(\+54|54)?[\s\-]?[0-9\s\-]{8,}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
          newErrors.phone = 'Formato de teléfono inválido';
        }
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, type, validateEmail, validatePassword]);

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
  const updateField = useCallback((field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const clearForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: '',
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================================================
  const createUserPayload = useCallback((userData: any): AuthUser => {
    return {
      id: userData.id,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'patient',
      isDemo: false,
      vipStatus: userData.vipStatus || false,
      beautyPoints: userData.beautyPoints || 20,
      sessionsCompleted: userData.sessionsCompleted || 0,
    };
  }, []);

  const handleLogin = useCallback(async () => {
    console.log('🚀 Iniciando login para:', formData.email.trim());
    
    const loginResponse = await authAPI.login(formData.email.trim(), formData.password);
    
    if (loginResponse.success) {
      const userPayload = createUserPayload(loginResponse.data.user);
      
      dispatch(setUser(userPayload));
      dispatch(setToken(loginResponse.data.tokens.accessToken));
      
      Alert.alert(
        `¡Hola ${loginResponse.data.user.firstName}! 🌸`, 
        loginResponse.data.user.vipStatus ? 
          'Bienvenida de vuelta, miembro VIP 👑' : 
          'Nos alegra tenerte de vuelta'
      );
    }
  }, [formData.email, formData.password, dispatch, createUserPayload]);

  const handleRegister = useCallback(async () => {
    console.log('🚀 Iniciando registro con datos:', {
      email: formData.email.trim(),
      firstName: formData.firstName!.trim(),
      lastName: formData.lastName!.trim(),
      phone: formData.phone!.trim(),
    });

    const registerData: RegisterData = {
      email: formData.email.trim(),
      password: formData.password,
      firstName: formData.firstName!.trim(),
      lastName: formData.lastName!.trim(),
      phone: formData.phone!.trim(),
      notificationPreferences: {
        appointments: true,
        wellness: true,
        offers: false
      }
    };

    const registerResponse = await authAPI.register(registerData);
    
    if (registerResponse.success) {
      console.log('✅ Registro exitoso:', registerResponse.data.user);

      // Auto-login después del registro exitoso
      const userPayload = createUserPayload(registerResponse.data.user);
      
      dispatch(setUser(userPayload));
      dispatch(setToken(registerResponse.data.tokens.accessToken));
      
      Alert.alert(
        '¡Bienvenida! 🎉',
        `Hola ${registerResponse.data.user.firstName}, tu cuenta ha sido creada exitosamente. ${registerResponse.data.user.beautyPoints || 20} Beauty Points de regalo te esperan.`,
        [{ text: 'Comenzar mi experiencia', style: 'default' }]
      );
    }
  }, [formData, dispatch, createUserPayload]);

  const handleForgotPassword = useCallback(async () => {
    console.log('🔑 Enviando email de recuperación a:', formData.email.trim());
    
    const forgotResponse = await authAPI.forgotPassword(formData.email.trim());
    
    if (forgotResponse.success) {
      console.log('✅ Email de recuperación enviado');
      Alert.alert(
        'Email enviado 📧',
        'Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.',
        [{ text: 'Entendido' }]
      );
    }
  }, [formData.email]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

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

      switch (type) {
        case 'login':
          await handleLogin();
          break;
        case 'register':
          await handleRegister();
          break;
        case 'forgot':
          await handleForgotPassword();
          break;
      }

    } catch (error: any) {
      console.error(`❌ ${type} error:`, error);
      
      const userMessage = handleApiError(
        error, 
        `No se pudo completar ${
          type === 'register' ? 'el registro' : 
          type === 'login' ? 'el login' : 
          'la recuperación'
        }`
      );
      
      Alert.alert('Error', userMessage);
    } finally {
      setLoading(false);
    }
  }, [
    validateForm, 
    connectionStatus, 
    type, 
    handleLogin, 
    handleRegister, 
    handleForgotPassword,
    checkBackendConnection
  ]);

  // ============================================================================
  // ESTADOS CALCULADOS
  // ============================================================================
  const isFormValid = useCallback(() => {
    const hasRequiredFields = formData.email.trim() && 
      (type === 'forgot' || formData.password.trim());
    
    if (type === 'register') {
      return hasRequiredFields && 
        formData.firstName?.trim() && 
        formData.lastName?.trim() && 
        formData.phone?.trim() &&
        formData.password === formData.confirmPassword;
    }
    
    return hasRequiredFields;
  }, [formData, type])();

  const canSubmit = isFormValid && !loading && connectionStatus === 'connected';

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    checkBackendConnection();
  }, [checkBackendConnection]);

  // Limpiar formulario cuando cambia el tipo
  useEffect(() => {
    clearForm();
    clearErrors();
  }, [type, clearForm, clearErrors]);

  return {
    // Estado
    formData,
    errors,
    loading,
    connectionStatus,
    
    // Funciones principales
    updateField,
    handleSubmit,
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