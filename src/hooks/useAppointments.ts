// ============================================================================
// hooks/useAppointments.ts - HOOK CORREGIDO PARA APPOINTMENTS ✅
// ============================================================================

import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { appointmentAPI } from '../services/api';

// ✅ IMPORTAR TIPOS DESDE auth.ts PARA CONSISTENCIA
import type {
  AppointmentStatus,
  TabType,
  Treatment,
  Professional,
  Appointment,
  AvailabilitySlot,
  BookingData
} from '../types/auth';

// ============================================================================
// TIPOS ADICIONALES ESPECÍFICOS DEL HOOK ✅
// ============================================================================

export interface AppointmentSection {
  title: string;
  data: Appointment[];
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  dateFrom?: string;
  dateTo?: string;
  treatmentId?: string;
  professionalId?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  professionalId?: string;
}

// ✅ RE-EXPORTAR TIPOS PARA COMPATIBILIDAD
export type { 
  AppointmentStatus,
  TabType,
  Treatment,
  Professional,
  Appointment,
  AvailabilitySlot,
  BookingData
};

// ============================================================================
// HOOK PRINCIPAL useAppointments ✅
// ============================================================================

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // ✅ AGREGADO
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // CONFIGURACIÓN DE API ✅
  // ============================================================================
  
  const BASE_URL = 'http://192.168.1.174:3000/api'; // Tu IP del backend

  // Helper para obtener token
  const getAuthToken = async (): Promise<string | null> => {
    try {
      const SecureStore = await import('expo-secure-store');
      return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Helper para fetch con autenticación
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = await getAuthToken();
    
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });
  };

  // ============================================================================
  // OBTENER APPOINTMENTS ✅
  // ============================================================================
  
  const fetchAppointments = useCallback(async (filters?: AppointmentFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/appointments';
      if (filters) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }

      const response = await authFetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setAppointments(data.data);
      } else {
        throw new Error(data.error?.message || 'Error obteniendo citas');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar citas');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================================
  // OBTENER TREATMENTS ✅ - ENDPOINT CORREGIDO
  // ============================================================================
  
  const fetchTreatments = useCallback(async () => {
    try {
      setError(null);
      
      const response = await authFetch('/treatments'); // ✅ Endpoint correcto
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setTreatments(data.data);
      } else {
        console.warn('No treatments data received');
        setTreatments([]);
      }
    } catch (err: any) {
      console.error('Error fetching treatments:', err);
      setTreatments([]);
    }
  }, []);

  // ============================================================================
  // OBTENER PROFESIONALES ✅ - ENDPOINT CORREGIDO
  // ============================================================================
  
  const fetchProfessionals = useCallback(async (treatmentId?: string) => {
    try {
      setError(null);
      
      const url = treatmentId 
        ? `/professionals?treatmentId=${treatmentId}` 
        : '/professionals'; // ✅ Endpoint correcto

      const response = await authFetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setProfessionals(data.data);
      } else {
        console.warn('No professionals data received');
        setProfessionals([]);
      }
    } catch (err: any) {
      console.error('Error fetching professionals:', err);
      setProfessionals([]);
    }
  }, []);

  // ============================================================================
  // OBTENER DISPONIBILIDAD ✅ - PARÁMETROS CORREGIDOS
  // ============================================================================
  
  const fetchAvailability = useCallback(async (date: string, treatmentId: string) => {
    try {
      setError(null);
      
      // ✅ Solo 2 parámetros - sin professionalId
      const response = await authFetch(
        `/appointments/availability?treatmentId=${treatmentId}&date=${date}`
      );
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setAvailability(data.data);
      } else {
        console.warn('No availability data received');
        setAvailability([]);
      }
    } catch (err: any) {
      console.error('Error fetching availability:', err);
      setAvailability([]);
    }
  }, []);

  // ============================================================================
  // CREAR APPOINTMENT ✅
  // ============================================================================
  
  const createAppointment = useCallback(async (bookingData: BookingData): Promise<boolean> => {
    try {
      setSubmitting(true);
      setError(null);

      // Validar datos
      if (!bookingData.treatmentId || !bookingData.date || !bookingData.time) {
        throw new Error('Datos incompletos para la reserva');
      }

      const response = await authFetch('/appointments', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refrescar la lista de appointments
        await fetchAppointments();
        
        Alert.alert(
          '¡Cita agendada! 🎉',
          'Tu cita ha sido agendada exitosamente.',
          [{ text: 'OK' }]
        );
        
        return true;
      } else {
        throw new Error(data.error?.message || 'Error al crear la cita');
      }
    } catch (err: any) {
      setError(err.message || 'Error al agendar la cita');
      
      Alert.alert(
        'Error',
        `No se pudo agendar la cita: ${err.message}`,
        [{ text: 'OK' }]
      );
      
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchAppointments]);

  // ============================================================================
  // ACTUALIZAR APPOINTMENT ✅
  // ============================================================================
  
  const updateAppointment = useCallback(async (appointmentId: string, data: Partial<Appointment>): Promise<boolean> => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await authFetch(`/appointments/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchAppointments();
        return true;
      } else {
        throw new Error(result.error?.message || 'Error al actualizar la cita');
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la cita');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchAppointments]);

  // ============================================================================
  // CANCELAR APPOINTMENT ✅
  // ============================================================================
  
  const cancelAppointment = useCallback(async (appointmentId: string): Promise<boolean> => {
    try {
      setSubmitting(true);
      
      const response = await authFetch(`/appointments/${appointmentId}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchAppointments();
        
        Alert.alert(
          'Cita cancelada',
          'La cita ha sido cancelada exitosamente.',
          [{ text: 'OK' }]
        );
        
        return true;
      } else {
        throw new Error(result.error?.message || 'Error al cancelar');
      }
    } catch (err: any) {
      Alert.alert(
        'Error',
        `No se pudo cancelar la cita: ${err.message}`,
        [{ text: 'OK' }]
      );
      
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchAppointments]);

  // ============================================================================
  // REFRESH FUNCTIONALITY ✅
  // ============================================================================
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchAppointments(),
        fetchTreatments(),
        fetchProfessionals()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchAppointments, fetchTreatments, fetchProfessionals]);

  // ============================================================================
  // FILTROS Y UTILIDADES ✅
  // ============================================================================
  
  const getAppointmentsByTab = useCallback((tab: TabType): Appointment[] => {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    switch (tab) {
      case 'upcoming':
        return appointments.filter(apt => {
          const isUpcoming = apt.date >= today && 
            (apt.status === 'CONFIRMED' || apt.status === 'PENDING'); // ✅ MAYÚSCULAS
          return isUpcoming;
        }).sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        
      case 'history':
        return appointments.filter(apt => {
          const isPast = apt.date < today || 
            apt.status === 'COMPLETED' || apt.status === 'CANCELLED'; // ✅ MAYÚSCULAS
          return isPast;
        }).sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB.getTime() - dateA.getTime(); // Más recientes primero
        });
        
      case 'all':
      default:
        return appointments;
    }
  }, [appointments]);

  const getAppointmentsByStatus = useCallback((status: AppointmentStatus): Appointment[] => {
    return appointments.filter(apt => apt.status === status);
  }, [appointments]);

  // ============================================================================
  // OBTENER CITAS PRÓXIMAS ✅
  // ============================================================================
  
  const getUpcomingAppointments = useCallback((limit: number = 5): Appointment[] => {
    return getAppointmentsByTab('upcoming').slice(0, limit);
  }, [getAppointmentsByTab]);

  // ============================================================================
  // EFECTOS ✅
  // ============================================================================
  
  useEffect(() => {
    fetchAppointments();
    fetchTreatments();
  }, [fetchAppointments, fetchTreatments]);

  // ============================================================================
  // RETURN ✅
  // ============================================================================
  
  return {
    // Data
    appointments,
    treatments,
    professionals,
    availability,
    
    // States
    loading,
    refreshing, // ✅ AGREGADO
    submitting,
    error,
    
    // Actions
    fetchAppointments,
    fetchTreatments,
    fetchProfessionals,
    fetchAvailability,
    createAppointment,
    updateAppointment, // ✅ AGREGADO
    cancelAppointment,
    onRefresh, // ✅ AGREGADO
    
    // Utilities
    getAppointmentsByTab,
    getAppointmentsByStatus,
    getUpcomingAppointments, // ✅ AGREGADO
  };
};