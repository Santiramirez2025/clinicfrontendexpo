// ============================================================================
// hooks/useProfile.ts - HOOK CONECTADO AL BACKEND ✅
// ============================================================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/slices/authSlice';
import { profileAPI, handleApiError } from '../services/api'; // ✅ Usar API existente

// ============================================================================
// INTERFACES Y TIPOS
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
  offers: boolean; // ✅ Campo correcto según tu backend
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
  user: ReturnType<typeof getSafeUser> | null;
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
// TIPOS DE USUARIO
// ============================================================================
interface AuthUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isDemo: boolean;
  vipStatus: boolean;
  beautyPoints: number;
  totalInvestment?: number;
  sessionsCompleted: number;
  memberSince?: string;
}

// ============================================================================
// FUNCIÓN HELPER PARA USUARIO SEGURO
// ============================================================================
const getSafeUser = (user: AuthUser | null, profile: UserProfile): AuthUser | null => {
  if (!user || !user.id) return null;
  
  return {
    id: user.id,
    email: user.email || profile.email || '',
    name: user.name || `${profile.firstName} ${profile.lastName}`.trim(),
    firstName: user.firstName || profile.firstName,
    lastName: user.lastName || profile.lastName,
    role: user.role || 'user',
    isDemo: user.isDemo || false,
    vipStatus: user.vipStatus || false,
    beautyPoints: user.beautyPoints || 0,
    totalInvestment: user.totalInvestment || 0,
    sessionsCompleted: user.sessionsCompleted || 0,
    memberSince: user.memberSince || new Date().toISOString(),
  };
};

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================
export const useProfile = (): UseProfileReturn => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as AuthUser | null;

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
    offers: false // ✅ Campo correcto
  });

  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Estados de validación
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ============================================================================
  // FUNCIONES DE VALIDACIÓN
  // ============================================================================
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
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
      newErrors.phone = 'Teléfono inválido (formato español)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profile, validateEmail, validatePhone]);

  // ============================================================================
  // FUNCIONES DE API - ✅ USANDO API EXISTENTE
  // ============================================================================
  const loadProfile = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      
      console.log('📋 Cargando perfil del usuario...');
      const response = await profileAPI.get(); // ✅ Usar API existente
      
      if (response.success && response.data) {
        const userData = response.data.user;
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
          // Estos campos son locales por ahora
          treatmentPreferences: [],
          preferredSchedule: [],
          notes: ''
        });

        // ✅ CORREGIDO: Usar campos correctos del backend
        setNotifications({
          appointments: userPreferences.appointments ?? true,
          promotions: userPreferences.promotions ?? false,
          wellness: userPreferences.wellness ?? true,
          offers: userPreferences.offers ?? false // ✅ Campo correcto
        });
      }
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar el perfil');
      setErrors(prev => ({ ...prev, general: errorMessage }));
      Alert.alert('Error', errorMessage);
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
      };

      console.log('📤 Datos a enviar:', profileData);
      
      const response = await profileAPI.update(profileData); // ✅ Usar API existente

      if (response.success) {
        console.log('✅ Perfil guardado exitosamente');
        
        // Actualizar usuario en Redux
        if (user && user.id) {
          const updatedUser: AuthUser = {
            ...user,
            id: user.id,
            firstName: profile.firstName.trim(),
            lastName: profile.lastName.trim(),
            name: `${profile.firstName.trim()} ${profile.lastName.trim()}`,
            email: user.email,
            role: user.role || 'user',
            isDemo: user.isDemo || false,
            vipStatus: user.vipStatus || false,
            beautyPoints: user.beautyPoints || 0,
            totalInvestment: user.totalInvestment || 0,
            sessionsCompleted: user.sessionsCompleted || 0,
            memberSince: user.memberSince || new Date().toISOString(),
          };

          dispatch(setUser(updatedUser));
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
      
      const response = await profileAPI.updateNotifications(newSettings); // ✅ Usar API existente
      
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
  // HANDLERS
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
  // VALOR COMPUTADO PARA USUARIO SEGURO
  // ============================================================================
  const safeUser = useMemo(() => getSafeUser(user, profile), [user, profile]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

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
  // RETURN
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