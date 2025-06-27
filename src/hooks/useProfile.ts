// ============================================================================
// hooks/useProfile.ts - HOOK CONECTADO AL BACKEND ✅
// ============================================================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { profileAPI, handleApiError } from '../services/api';

// ✅ IMPORTAR TIPOS DESDE auth.ts PARA CONSISTENCIA
import type { User } from '../types/auth';

// ============================================================================
// INTERFACES Y TIPOS ✅
// ============================================================================
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  skinType?: 'OILY' | 'DRY' | 'MIXED' | 'SENSITIVE' | 'NORMAL';
  treatmentPreferences: string[];
  preferredSchedule: string[];
  notes?: string;
}

export interface NotificationSettings {
  appointments: boolean;
  promotions: boolean;
  wellness: boolean;
  offers: boolean;
}

export interface UseProfileReturn {
  // Estados
  profile: UserProfile;
  notifications: NotificationSettings;
  loading: boolean;
  saving: boolean;
  refreshing: boolean;
  hasUnsavedChanges: boolean;
  errors: Record<string, string>;
  user: User | null; // ✅ USAR TIPO User CONSISTENTE
  error: string | null;
  
  // Funciones principales
  handleProfileChange: (field: keyof UserProfile, value: any) => void;
  handleNotificationChange: (setting: keyof NotificationSettings, value: boolean) => void;
  saveProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  onRefresh: () => void;
  validateForm: () => boolean;
  
  // Funciones de utilidad
  validateEmail: (email: string) => boolean;
  validatePhone: (phone: string) => boolean;
}

// ============================================================================
// INTERFACE PARA ROOTSTATE ✅
// ============================================================================
interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
}

// ============================================================================
// FUNCIÓN HELPER PARA USUARIO SEGURO ✅
// ============================================================================
const getSafeUser = (user: User | null, profile: UserProfile): User | null => {
  if (!user || !user.id) return null;
  
  return {
    ...user, // ✅ MANTENER TODOS LOS CAMPOS DEL USER ORIGINAL
    name: user.name || `${profile.firstName} ${profile.lastName}`.trim(),
    firstName: profile.firstName || user.firstName,
    lastName: profile.lastName || user.lastName,
    email: profile.email || user.email,
    updatedAt: new Date().toISOString(), // ✅ ACTUALIZAR TIMESTAMP
  };
};

// ============================================================================
// HOOK PRINCIPAL ✅
// ============================================================================
export const useProfile = (): UseProfileReturn => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Estado inicial del perfil
  const initialProfile = useMemo<UserProfile>(() => ({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    treatmentPreferences: [],
    preferredSchedule: [],
    notes: ''
  }), [user]);

  // Estados principales
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    appointments: true,
    promotions: false,
    wellness: true,
    offers: false
  });

  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Estados de validación
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ============================================================================
  // FUNCIONES DE VALIDACIÓN ✅
  // ============================================================================
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    // ✅ REGEX PARA TELÉFONOS ARGENTINOS Y ESPAÑOLES
    const phoneRegex = /^(\+54|54|\+34|34)?[\s\-]?[6789]\d{8,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profile.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!profile.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(profile.email)) {
      newErrors.email = 'Email inválido';
    }

    if (profile.phone && !validatePhone(profile.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profile, validateEmail, validatePhone]);

  // ============================================================================
  // FUNCIONES DE API ✅
  // ============================================================================
  const loadProfile = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      
      console.log('📋 Cargando perfil del usuario...');
      const response = await profileAPI.get();
      
      if (response.success && response.data) {
        const userData = response.data.user || response.data;
        const userPreferences = response.data.preferences || {};
        
        console.log('✅ Perfil cargado:', userData);
        
        // Mapear datos del backend a la estructura local
        setProfile({
          id: userData.id || user?.id || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          birthDate: userData.birthDate || '',
          skinType: userData.skinType,
          treatmentPreferences: userData.treatmentPreferences || [],
          preferredSchedule: userData.preferredSchedule || [],
          notes: userData.notes || ''
        });

        setNotifications({
          appointments: userPreferences.appointments ?? true,
          promotions: userPreferences.promotions ?? false,
          wellness: userPreferences.wellness ?? true,
          offers: userPreferences.offers ?? false
        });
      }
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar el perfil');
      setErrors(prev => ({ ...prev, general: errorMessage }));
      
      // ✅ NO MOSTRAR ALERT SI ES REFRESH SILENCIOSO
      if (!isRefresh) {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [user?.id]);

  const saveProfile = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    try {
      setSaving(true);
      
      console.log('💾 Guardando perfil...');
      
      const profileData = {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        phone: profile.phone.trim(),
        skinType: profile.skinType,
        birthDate: profile.birthDate,
        treatmentPreferences: profile.treatmentPreferences,
        preferredSchedule: profile.preferredSchedule,
        notes: profile.notes,
      };

      console.log('📤 Datos a enviar:', profileData);
      
      const response = await profileAPI.update(profileData);

      if (response.success) {
        console.log('✅ Perfil guardado exitosamente');
        
        // ✅ ACTUALIZAR USUARIO EN REDUX CON TIPO CORRECTO
        if (user && user.id) {
          const updatedUser: User = {
            ...user, // ✅ MANTENER TODOS LOS CAMPOS ORIGINALES
            firstName: profile.firstName.trim(),
            lastName: profile.lastName.trim(),
            name: `${profile.firstName.trim()} ${profile.lastName.trim()}`,
            updatedAt: new Date().toISOString(), // ✅ ACTUALIZAR TIMESTAMP
          };

          dispatch(setUser(updatedUser)); // ✅ SIN return
        }

        setHasUnsavedChanges(false);
        Alert.alert('✅ Guardado', 'Tu perfil se ha actualizado correctamente');
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      const errorMessage = handleApiError(error, 'No se pudo guardar el perfil');
      setErrors(prev => ({ ...prev, general: errorMessage }));
      Alert.alert('Error', errorMessage);
    } finally {
      setSaving(false);
    }
  }, [profile, user, validateForm, dispatch]);

  const saveNotificationSettings = useCallback(async (newSettings: NotificationSettings) => {
    try {
      console.log('🔔 Actualizando notificaciones:', newSettings);
      
      const response = await profileAPI.updateNotifications(newSettings);
      
      if (response.success) {
        console.log('✅ Notificaciones actualizadas');
        setNotifications(newSettings);
      }
    } catch (error) {
      console.error('❌ Error saving notifications:', error);
      const errorMessage = handleApiError(error, 'No se pudieron guardar las notificaciones');
      Alert.alert('Error', errorMessage);
    }
  }, []);

  // ============================================================================
  // HANDLERS ✅
  // ============================================================================
  const handleProfileChange = useCallback((field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleNotificationChange = useCallback((setting: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...notifications, [setting]: value };
    setNotifications(newSettings);
    saveNotificationSettings(newSettings);
  }, [notifications, saveNotificationSettings]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProfile(true);
  }, [loadProfile]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  }, []);

  // ============================================================================
  // VALOR COMPUTADO PARA USUARIO SEGURO ✅
  // ============================================================================
  const safeUser = useMemo(() => getSafeUser(user, profile), [user, profile]);

  // ============================================================================
  // EFFECTS ✅
  // ============================================================================
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id, loadProfile]);

  // Actualizar perfil cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        id: user.id || prev.id,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // ============================================================================
  // RETURN ✅
  // ============================================================================
  return {
    // Estados
    profile,
    notifications,
    loading,
    saving,
    refreshing,
    hasUnsavedChanges,
    errors,
    user: safeUser,
    error: errors.general || null,
    
    // Funciones principales
    handleProfileChange,
    handleNotificationChange,
    saveProfile,
    updateProfile,
    onRefresh,
    validateForm,
    
    // Funciones de utilidad
    validateEmail,
    validatePhone,
  };
};