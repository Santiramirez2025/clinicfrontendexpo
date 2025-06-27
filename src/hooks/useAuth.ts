// ============================================================================
// hooks/useAuth.ts - HOOK DE AUTENTICACIÓN OPTIMIZADO Y CORREGIDO ✅
// ============================================================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setUser, setToken, clearUser, setLoading, setError } from '../store/slices/authSlice';
import { authAPI, handleApiError } from '../services/api';
import api from '../services/api'; // ✅ CORREGIDO: import api en lugar de ApiService
import type { 
  AuthType, 
  UserRole, 
  User, 
  AuthUser, 
  LoginCredentials, 
  RegisterData, 
  UseAuthReturn 
} from '../types/auth';

// ✅ EXPORTAR TODOS LOS TIPOS
export type { 
  AuthType, 
  UserRole, 
  User, 
  AuthUser, 
  LoginCredentials, 
  RegisterData, 
  UseAuthReturn 
};

// ============================================================================
// INTERFACES ADICIONALES PARA EL HOOK ✅
// ============================================================================
export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  confirmPassword?: string;
}

export interface AuthState {
  formData: AuthFormData;
  errors: Partial<AuthFormData>;
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
}

interface ExtendedUseAuthReturn extends AuthState {
  // Funciones principales
  updateField: (field: keyof AuthFormData, value: string) => void;
  handleSubmit: () => Promise<void>;
  checkBackendConnection: () => Promise<void>;
  clearForm: () => void;
  clearErrors: () => void;
  
  // Funciones estándar de auth
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  
  // Validadores
  validateForm: () => boolean;
  validateEmail: (email: string) => string | null;
  validatePassword: (password: string) => string | null;
  
  // Estados calculados
  isFormValid: boolean;
  canSubmit: boolean;
  
  // Estados del store
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

// ============================================================================
// HOOK PRINCIPAL CORREGIDO ✅
// ============================================================================
export const useAuth = (type?: AuthType): ExtendedUseAuthReturn => {
  const dispatch = useDispatch();
  const { user, loading: storeLoading, error, isAuthenticated } = useSelector((state: any) => state.auth);
  
  // Estados del formulario
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
  // FUNCIONES DE VALIDACIÓN ✅
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
    if (type !== 'forgot-password') {
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
  // FUNCIONES DE CONEXIÓN ✅
  // ============================================================================
  const checkBackendConnection = useCallback(async () => {
    try {
      setConnectionStatus('checking');
      const isConnected = await api.checkConnection(); // ✅ CORREGIDO: api en lugar de ApiService
      setConnectionStatus(isConnected ? 'connected' : 'error');
    } catch (error) {
      console.log('Connection check failed:', error);
      setConnectionStatus('error');
    }
  }, []);

  // ============================================================================
  // FUNCIONES DE FORMULARIO ✅
  // ============================================================================
  const updateField = useCallback((field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
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

  const clearError = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  // ============================================================================
  // HELPER PARA CREAR USER PAYLOAD ✅
  // ============================================================================
  const createUserPayload = useCallback((userData: any): User => {
    return {
      id: userData.id || '',
      name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      email: userData.email,
      role: userData.role as UserRole || 'patient',
      avatar: userData.avatar,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      preferences: userData.preferences,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: userData.updatedAt || new Date().toISOString(),
      
      // ✅ CAMPOS ADICIONALES PARA COMPATIBILIDAD
      firstName: userData.firstName,
      lastName: userData.lastName,
      beautyPoints: userData.beautyPoints || 0,
      sessionsCompleted: userData.sessionsCompleted || 0,
      vipStatus: userData.vipStatus || false,
    };
  }, []);

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN PRINCIPALES ✅
  // ============================================================================
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authAPI.login(credentials.email, credentials.password);
      
      if (response.success && response.data?.user && response.data?.tokens) {
        // Guardar token
        await SecureStore.setItemAsync('accessToken', response.data.tokens.accessToken);
        if (response.data.tokens.refreshToken) {
          await SecureStore.setItemAsync('refreshToken', response.data.tokens.refreshToken);
        }

        // Actualizar store
        const userPayload = createUserPayload(response.data.user);
        dispatch(setUser(userPayload));
        dispatch(setToken(response.data.tokens.accessToken));

        Alert.alert(
          `¡Hola ${response.data.user.firstName}! 🌸`, 
          response.data.user.vipStatus ? 
            'Bienvenida de vuelta, miembro VIP 👑' : 
            'Nos alegra tenerte de vuelta'
        );

        return true;
      } else {
        throw new Error(response.error?.message || 'Error al iniciar sesión');
      }
    } catch (error: any) {
      dispatch(setError(error.message || 'Error al iniciar sesión'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, createUserPayload]);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authAPI.register(data);
      
      if (response.success && response.data?.user && response.data?.tokens) {
        // Guardar token
        await SecureStore.setItemAsync('accessToken', response.data.tokens.accessToken);
        if (response.data.tokens.refreshToken) {
          await SecureStore.setItemAsync('refreshToken', response.data.tokens.refreshToken);
        }

        // Actualizar store
        const userPayload = createUserPayload(response.data.user);
        dispatch(setUser(userPayload));
        dispatch(setToken(response.data.tokens.accessToken));

        Alert.alert(
          '¡Bienvenida! 🎉',
          `Hola ${response.data.user.firstName}, tu cuenta ha sido creada exitosamente.`,
          [{ text: 'Comenzar mi experiencia', style: 'default' }]
        );

        return true;
      } else {
        throw new Error(response.error?.message || 'Error al registrarse');
      }
    } catch (error: any) {
      dispatch(setError(error.message || 'Error al registrarse'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, createUserPayload]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      // Limpiar tokens
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');

      // Limpiar store
      dispatch(clearUser());
      
      // Limpiar formulario
      clearForm();
      clearErrors();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [dispatch, clearForm, clearErrors]);

  const updateProfile = useCallback(async (data: Partial<User>): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Aquí iría la llamada al API cuando esté disponible
      // const response = await authAPI.updateProfile(data);

      // Por ahora, simulamos una actualización exitosa
      if (user) {
        const updatedUser = { 
          ...user, 
          ...data,
          updatedAt: new Date().toISOString()
        };
        dispatch(setUser(updatedUser));
        return true;
      }

      return false;
    } catch (error: any) {
      dispatch(setError(error.message || 'Error al actualizar perfil'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user]);

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN DEL FORMULARIO ✅
  // ============================================================================
  const handleLogin = useCallback(async () => {
    const credentials: LoginCredentials = {
      email: formData.email.trim(),
      password: formData.password
    };
    return await login(credentials);
  }, [formData.email, formData.password, login]);

  const handleRegister = useCallback(async () => {
    const registerData: RegisterData = {
      name: `${formData.firstName!.trim()} ${formData.lastName!.trim()}`,
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone!.trim(),
      
      // ✅ CAMPOS INDIVIDUALES PARA COMPATIBILIDAD
      firstName: formData.firstName!.trim(),
      lastName: formData.lastName!.trim(),
    };
    return await register(registerData);
  }, [formData, register]);

  const handleForgotPassword = useCallback(async () => {
    try {
      const response = await authAPI.forgotPassword(formData.email.trim());
      
      if (response.success) {
        Alert.alert(
          'Email enviado 📧',
          'Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.',
          [{ text: 'Entendido' }]
        );
        return true;
      } else {
        throw new Error(response.error?.message || 'Error al enviar email');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
      return false;
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
        case 'forgot-password':
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
  // ESTADOS CALCULADOS ✅
  // ============================================================================
  const isFormValid = useMemo(() => {
    if (!type) return true;
    
    const hasRequiredFields = formData.email.trim() !== '' && 
      (type === 'forgot-password' || formData.password.trim() !== '');
    
    if (type === 'register') {
      return hasRequiredFields && 
        !!formData.firstName?.trim() && 
        !!formData.lastName?.trim() && 
        !!formData.phone?.trim() &&
        formData.password === formData.confirmPassword;
    }
    
    return hasRequiredFields;
  }, [formData, type]);

  const canSubmit = useMemo(() => {
    return isFormValid && !loading && !storeLoading && connectionStatus === 'connected';
  }, [isFormValid, loading, storeLoading, connectionStatus]);

  // ============================================================================
  // EFFECTS ✅
  // ============================================================================
  useEffect(() => {
    checkBackendConnection();
  }, [checkBackendConnection]);

  useEffect(() => {
    if (type) {
      clearForm();
      clearErrors();
    }
  }, [type, clearForm, clearErrors]);

  // ============================================================================
  // RETURN ✅
  // ============================================================================
  return {
    // Estado del formulario
    formData,
    errors,
    loading: loading || storeLoading,
    connectionStatus,
    
    // Funciones del formulario
    updateField,
    handleSubmit,
    checkBackendConnection,
    clearForm,
    clearErrors,
    
    // Funciones de auth estándar
    login,
    register,
    logout,
    updateProfile,
    clearError,
    
    // Validadores
    validateForm,
    validateEmail,
    validatePassword,
    
    // Estados calculados
    isFormValid,
    canSubmit,
    
    // Estados del store
    user,
    isAuthenticated,
    error,
  };
};