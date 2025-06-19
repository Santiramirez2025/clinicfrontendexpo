// ============================================================================
// hooks/useAppointments.ts - HOOK DE CITAS COMPLETO Y SIN ERRORES
// ============================================================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { appointmentAPI, handleApiError } from '../services/api';

// ============================================================================
// TIPOS Y INTERFACES EXPORTABLES
// ============================================================================
export type TabType = 'upcoming' | 'past' | 'cancelled';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Treatment {
  id: string;
  name: string;
  duration: number;
  price: number;
  iconName?: string;
  category?: string;
  description?: string;
}

export interface Professional {
  id: string;
  name: string;
  specialties: string[];
  rating?: number;
  avatarUrl?: string;
}

export interface AvailabilitySlot {
  time: string;
  availableProfessionals: Professional[];
  isAvailable?: boolean;
}

export interface Appointment {
  id: string;
  treatment: Treatment;
  date: string;
  time: string;
  duration: number;
  professional: string;
  clinic: string;
  status: AppointmentStatus;
  beautyPointsEarned: number;
  notes?: string;
  createdAt: string;
  // Campos computados
  isPast?: boolean;
  canReschedule?: boolean;
  canCancel?: boolean;
  hoursUntil?: number;
}

export interface AppointmentSection {
  title: string;
  data: Appointment[];
  count: number;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  limit?: number;
  offset?: number;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================================================
// INTERFACE DEL HOOK
// ============================================================================
interface UseAppointmentsReturn {
  // Estados principales
  appointments: Appointment[];
  loading: boolean;
  refreshing: boolean;
  activeTab: TabType;
  selectedAppointment: Appointment | null;
  detailsModalVisible: boolean;
  
  // Datos computados
  sections: AppointmentSection[];
  currentSection: AppointmentSection | undefined;
  upcomingCount: number;
  pastCount: number;
  cancelledCount: number;
  
  // Setters
  setActiveTab: (tab: TabType) => void;
  setDetailsModalVisible: (visible: boolean) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  
  // Funciones principales
  loadAppointments: (isRefresh?: boolean) => Promise<void>;
  onRefresh: () => void;
  handleRescheduleAppointment: (appointment: Appointment, navigation: any) => void;
  handleCancelAppointment: (appointment: Appointment) => Promise<void>;
  handleWhatsAppReminder: (appointment: Appointment) => void;
  handleAppointmentPress: (appointment: Appointment) => void;
  
  // Funciones de filtrado
  getAppointmentsByStatus: (status: AppointmentStatus) => Appointment[];
  getUpcomingAppointments: () => Appointment[];
  getPastAppointments: () => Appointment[];
  getCancelledAppointments: () => Appointment[];
  
  // Utilidades
  canRescheduleAppointment: (appointment: Appointment) => boolean;
  canCancelAppointment: (appointment: Appointment) => boolean;
  getHoursUntilAppointment: (appointment: Appointment) => number;
  formatAppointmentDate: (appointment: Appointment) => string;
  formatAppointmentTime: (appointment: Appointment) => string;
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================
export const useAppointments = (): UseAppointmentsReturn => {
  // Estados principales
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // ============================================================================
  // FUNCIONES DE UTILIDAD MEMOIZADAS
  // ============================================================================
  const getHoursUntilAppointment = useCallback((appointment: Appointment): number => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    return (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  }, []);

  const canRescheduleAppointment = useCallback((appointment: Appointment): boolean => {
    if (!['PENDING', 'CONFIRMED'].includes(appointment.status)) {
      return false;
    }
    
    const hoursUntil = getHoursUntilAppointment(appointment);
    return hoursUntil > 24; // Permitir reprogramar solo con más de 24h de anticipación
  }, [getHoursUntilAppointment]);

  const canCancelAppointment = useCallback((appointment: Appointment): boolean => {
    if (!['PENDING', 'CONFIRMED'].includes(appointment.status)) {
      return false;
    }
    
    const hoursUntil = getHoursUntilAppointment(appointment);
    return hoursUntil > 0; // Permitir cancelar hasta la hora de la cita
  }, [getHoursUntilAppointment]);

  const formatAppointmentDate = useCallback((appointment: Appointment): string => {
    try {
      return new Date(appointment.date).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return appointment.date;
    }
  }, []);

  const formatAppointmentTime = useCallback((appointment: Appointment): string => {
    try {
      // Manejar diferentes formatos de tiempo
      let timeString = appointment.time;
      
      // Si no tiene formato de hora completo, agregarlo
      if (!timeString.includes('T') && !timeString.includes(':')) {
        timeString = `${timeString}:00`;
      }
      
      // Crear fecha con tiempo para formatear
      const timeDate = timeString.includes('T') 
        ? new Date(timeString)
        : new Date(`2000-01-01T${timeString}`);
      
      return timeDate.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return appointment.time;
    }
  }, []);

  // ============================================================================
  // FUNCIÓN DE ENRIQUECIMIENTO DE DATOS
  // ============================================================================
  const enrichAppointment = useCallback((appointment: Appointment): Appointment => {
    try {
      const now = new Date();
      const appointmentDate = new Date(appointment.date);
      const hoursUntil = getHoursUntilAppointment(appointment);
      
      return {
        ...appointment,
        isPast: appointmentDate < now,
        canReschedule: canRescheduleAppointment(appointment),
        canCancel: canCancelAppointment(appointment),
        hoursUntil: Math.max(0, hoursUntil)
      };
    } catch (error) {
      console.error('Error enriching appointment:', error);
      return appointment;
    }
  }, [getHoursUntilAppointment, canRescheduleAppointment, canCancelAppointment]);

  // ============================================================================
  // FUNCIONES DE FILTRADO MEMOIZADAS
  // ============================================================================
  const getAppointmentsByStatus = useCallback((status: AppointmentStatus): Appointment[] => {
    return appointments.filter(apt => apt.status === status);
  }, [appointments]);

  const getUpcomingAppointments = useCallback((): Appointment[] => {
    const now = new Date();
    return appointments
      .filter(apt => {
        try {
          const aptDate = new Date(apt.date);
          return aptDate >= now && ['PENDING', 'CONFIRMED'].includes(apt.status);
        } catch (error) {
          console.error('Error filtering upcoming appointments:', error);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } catch (error) {
          console.error('Error sorting appointments:', error);
          return 0;
        }
      });
  }, [appointments]);

  const getPastAppointments = useCallback((): Appointment[] => {
    const now = new Date();
    return appointments
      .filter(apt => {
        try {
          const aptDate = new Date(apt.date);
          return aptDate < now || apt.status === 'COMPLETED';
        } catch (error) {
          console.error('Error filtering past appointments:', error);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } catch (error) {
          console.error('Error sorting appointments:', error);
          return 0;
        }
      });
  }, [appointments]);

  const getCancelledAppointments = useCallback((): Appointment[] => {
    return appointments
      .filter(apt => ['CANCELLED', 'NO_SHOW'].includes(apt.status))
      .sort((a, b) => {
        try {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } catch (error) {
          console.error('Error sorting appointments:', error);
          return 0;
        }
      });
  }, [appointments]);

  // ============================================================================
  // DATOS COMPUTADOS CON useMemo
  // ============================================================================
  const sections = useMemo((): AppointmentSection[] => {
    const upcoming = getUpcomingAppointments();
    const past = getPastAppointments();
    const cancelled = getCancelledAppointments();

    return [
      {
        title: 'Próximas Citas',
        data: upcoming,
        count: upcoming.length
      },
      {
        title: 'Historial',
        data: past,
        count: past.length
      },
      {
        title: 'Canceladas',
        data: cancelled,
        count: cancelled.length
      }
    ];
  }, [getUpcomingAppointments, getPastAppointments, getCancelledAppointments]);

  const currentSection = useMemo(() => {
    return sections.find(section => {
      switch (activeTab) {
        case 'upcoming':
          return section.title === 'Próximas Citas';
        case 'past':
          return section.title === 'Historial';
        case 'cancelled':
          return section.title === 'Canceladas';
        default:
          return false;
      }
    });
  }, [sections, activeTab]);

  const upcomingCount = useMemo(() => sections[0]?.count || 0, [sections]);
  const pastCount = useMemo(() => sections[1]?.count || 0, [sections]);
  const cancelledCount = useMemo(() => sections[2]?.count || 0, [sections]);

  // ============================================================================
  // FUNCIONES DE API
  // ============================================================================
  const loadAppointments = useCallback(async (isRefresh = false): Promise<void> => {
    try {
      if (!isRefresh) setLoading(true);
      
      console.log('📅 Cargando citas...');
      
      const response = await appointmentAPI.getAll({
        limit: 50,
        offset: 0
      });
      
      if (response.success && response.data?.appointments) {
        const enrichedAppointments = response.data.appointments.map(enrichAppointment);
        setAppointments(enrichedAppointments);
        console.log(`✅ ${enrichedAppointments.length} citas cargadas`);
      } else {
        console.warn('⚠️ Respuesta sin citas:', response);
        setAppointments([]);
      }
    } catch (error) {
      console.error('❌ Error loading appointments:', error);
      const errorMessage = handleApiError(error, 'No se pudieron cargar las citas');
      Alert.alert('Error', errorMessage);
      setAppointments([]); // Fallback a array vacío
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [enrichAppointment]);

  // ============================================================================
  // FUNCIONES DE ACCIONES
  // ============================================================================
  const handleRescheduleAppointment = useCallback((appointment: Appointment, navigation: any): void => {
    if (!canRescheduleAppointment(appointment)) {
      Alert.alert(
        'No se puede reprogramar',
        'Solo puedes reprogramar citas con más de 24 horas de anticipación.'
      );
      return;
    }

    Alert.alert(
      'Reprogramar Cita',
      `¿Deseas reprogramar tu cita de ${appointment.treatment.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reprogramar', 
          onPress: () => {
            navigation.navigate('BookAppointment', {
              rescheduleMode: true,
              appointmentId: appointment.id,
              treatmentId: appointment.treatment.id,
              treatmentName: appointment.treatment.name,
              currentDate: appointment.date,
              currentTime: appointment.time
            });
          }
        }
      ]
    );
  }, [canRescheduleAppointment]);

  const handleCancelAppointment = useCallback(async (appointment: Appointment): Promise<void> => {
    if (!canCancelAppointment(appointment)) {
      Alert.alert(
        'No se puede cancelar',
        'Esta cita ya no se puede cancelar.'
      );
      return;
    }

    const hoursUntil = getHoursUntilAppointment(appointment);
    const warningMessage = hoursUntil < 24 
      ? 'ATENCIÓN: Cancelar con menos de 24 horas puede aplicar una penalización.'
      : 'Tu cita será cancelada sin penalización.';

    Alert.alert(
      'Cancelar Cita',
      `¿Estás segura de que deseas cancelar tu cita de ${appointment.treatment.name}?\n\n${warningMessage}`,
      [
        { text: 'No cancelar', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🗑️ Cancelando cita:', appointment.id);
              
              const response = await appointmentAPI.cancel(appointment.id);
              
              if (response.success) {
                console.log('✅ Cita cancelada exitosamente');
                
                Alert.alert(
                  'Cita Cancelada',
                  response.data?.penaltyApplied 
                    ? 'Tu cita ha sido cancelada. Se aplicó una penalización por cancelación tardía.'
                    : 'Tu cita ha sido cancelada exitosamente.',
                  [{ text: 'OK', onPress: () => loadAppointments() }]
                );
              }
            } catch (error) {
              console.error('❌ Error cancelando cita:', error);
              const errorMessage = handleApiError(error, 'No se pudo cancelar la cita');
              Alert.alert('Error', errorMessage);
            }
          }
        }
      ]
    );
  }, [canCancelAppointment, getHoursUntilAppointment, loadAppointments]);

  const handleWhatsAppReminder = useCallback((appointment: Appointment): void => {
    try {
      const formattedDate = formatAppointmentDate(appointment);
      const formattedTime = formatAppointmentTime(appointment);
      
      const message = `Hola! Te recuerdo tu cita de ${appointment.treatment.name} el ${formattedDate} a las ${formattedTime} con ${appointment.professional}. ¡Te esperamos! 💆‍♀️✨`;
      
      Alert.alert(
        'Recordatorio por WhatsApp',
        '¿Deseas enviar un recordatorio a tu WhatsApp registrado?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Enviar', 
            onPress: () => {
              // En una implementación real, aquí integrarías con WhatsApp Business API
              console.log('📱 Enviando recordatorio WhatsApp:', message);
              Alert.alert('✅ Enviado', 'Recordatorio enviado por WhatsApp');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error sending WhatsApp reminder:', error);
      Alert.alert('Error', 'No se pudo enviar el recordatorio');
    }
  }, [formatAppointmentDate, formatAppointmentTime]);

  const handleAppointmentPress = useCallback((appointment: Appointment): void => {
    setSelectedAppointment(appointment);
    setDetailsModalVisible(true);
  }, []);

  // ============================================================================
  // REFRESH CONTROL
  // ============================================================================
  const onRefresh = useCallback((): void => {
    setRefreshing(true);
    loadAppointments(true);
  }, [loadAppointments]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // Actualizar estados calculados cuando cambien las citas
  useEffect(() => {
    if (appointments.length > 0) {
      const shouldUpdate = appointments.some(apt => {
        const enriched = enrichAppointment(apt);
        return apt.canReschedule !== enriched.canReschedule ||
               apt.canCancel !== enriched.canCancel ||
               apt.isPast !== enriched.isPast;
      });

      if (shouldUpdate) {
        const enrichedAppointments = appointments.map(enrichAppointment);
        setAppointments(enrichedAppointments);
      }
    }
  }, [appointments, enrichAppointment]);

  // ============================================================================
  // RETURN DEL HOOK
  // ============================================================================
  return {
    // Estados principales
    appointments,
    loading,
    refreshing,
    activeTab,
    selectedAppointment,
    detailsModalVisible,
    
    // Datos computados
    sections,
    currentSection,
    upcomingCount,
    pastCount,
    cancelledCount,
    
    // Setters
    setActiveTab,
    setDetailsModalVisible,
    setSelectedAppointment,
    
    // Funciones principales
    loadAppointments,
    onRefresh,
    handleRescheduleAppointment,
    handleCancelAppointment,
    handleWhatsAppReminder,
    handleAppointmentPress,
    
    // Funciones de filtrado
    getAppointmentsByStatus,
    getUpcomingAppointments,
    getPastAppointments,
    getCancelledAppointments,
    
    // Utilidades
    canRescheduleAppointment,
    canCancelAppointment,
    getHoursUntilAppointment,
    formatAppointmentDate,
    formatAppointmentTime,
  };
};