// ============================================================================
// hooks/useProfile.ts - CONECTADO A API REAL
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/slices/authSlice';
import { profileAPI, handleApiError } from '../services/api';

// Interfaces
export interface UserProfile {
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
  followUp: boolean;
}

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Estados principales
  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    treatmentPreferences: [],
    preferredSchedule: [],
    notes: ''
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    appointments: true,
    promotions: false,
    wellness: true,
    followUp: false
  });

  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Estados de validación
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // ============================================================================
  // FUNCIONES DE VALIDACIÓN
  // ============================================================================
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

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
  };

  // ============================================================================
  // FUNCIONES DE API CONECTADAS
  // ============================================================================
  const loadProfile = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      
      console.log('📋 Cargando perfil del usuario...');
      const response = await profileAPI.get();
      
      if (response.success && response.data) {
        const userData = response.data.user;
        
        console.log('✅ Perfil cargado:', userData);
        
        // Mapear datos del API al estado local
        setProfile({
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

        // Configurar notificaciones
        setNotifications(
          userData.preferredNotifications || {
            appointments: true,
            promotions: false,
            wellness: true,
            followUp: false
          }
        );
      }
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar el perfil');
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const saveProfile = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    try {
      setSaving(true);
      
      console.log('💾 Guardando perfil...');
      
      // Preparar datos para enviar al API
      const profileData = {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        phone: profile.phone.trim(),
        skinType: profile.skinType,
        birthDate: profile.birthDate,
        // Agregar campos adicionales si el backend los soporta
        treatmentPreferences: profile.treatmentPreferences,
        preferredSchedule: profile.preferredSchedule,
        notes: profile.notes
      };

      console.log('📤 Datos a enviar:', profileData);
      
      const response = await profileAPI.update(profileData);

      if (response.success) {
        console.log('✅ Perfil guardado exitosamente');
        
        // Actualizar usuario en el store Redux
        dispatch(setUser({
          ...user,
          firstName: profile.firstName.trim(),
          lastName: profile.lastName.trim(),
          name: `${profile.firstName.trim()} ${profile.lastName.trim()}`
        }));

        setHasUnsavedChanges(false);
        Alert.alert('✅ Guardado', 'Tu perfil se ha actualizado correctamente');
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      const errorMessage = handleApiError(error, 'No se pudo guardar el perfil');
      Alert.alert('Error', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const saveNotificationSettings = async (newSettings: NotificationSettings) => {
    try {
      console.log('🔔 Actualizando notificaciones:', newSettings);
      
      const response = await profileAPI.updateNotifications(newSettings);
      
      if (response.success) {
        console.log('✅ Notificaciones actualizadas');
        setNotifications(newSettings);
      }
    } catch (error) {
      console.error('❌ Error saving notifications:', error);
      // Revertir el cambio en caso de error
      setNotifications(notifications);
      const errorMessage = handleApiError(error, 'No se pudieron guardar las notificaciones');
      Alert.alert('Error', errorMessage);
    }
  };

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNotificationChange = (setting: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...notifications, [setting]: value };
    setNotifications(newSettings);
    saveNotificationSettings(newSettings);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProfile(true);
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    loadProfile();
  }, []);

  return {
    // Estados
    profile,
    notifications,
    loading,
    saving,
    refreshing,
    hasUnsavedChanges,
    errors,
    user,
    
    // Funciones
    handleProfileChange,
    handleNotificationChange,
    saveProfile,
    onRefresh,
    validateForm,
    
    // Utilidades
    dispatch
  };
};