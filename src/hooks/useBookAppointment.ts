// ============================================================================
// hooks/useBookAppointment.ts - HOOK CORREGIDO PARA AGENDAR CITAS ✅
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { appointmentAPI, treatmentAPI, handleApiError } from '../services/api';

// ============================================================================
// TIPOS CORREGIDOS ✅
// ============================================================================
export interface Treatment {
  id: string;
  name: string;
  category: string; // ⭐ REQUERIDO - FIX ERROR
  duration: number; // ⭐ REQUERIDO - FIX ERROR
  price: number;
  description?: string;
  emoji?: string;
  isVipExclusive?: boolean;
  clinic?: string;
}

export interface Professional {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string; // ✅ AGREGADO: backend devuelve 'name' directamente
  specialty: string; // ⭐ REQUERIDO (no opcional) - FIX ERROR
  specialties?: string[];
  avatar?: string;
  rating?: number;
  isAvailable?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  professionalId?: string;
  availableProfessionals?: Professional[]; // ✅ AGREGADO: estructura del backend
}

export interface BookingData {
  treatmentId: string;
  professionalId?: string; // ✅ CORREGIDO: puede ser opcional si se asigna automáticamente
  date: string;
  time: string;
  notes?: string;
}

// ============================================================================
// HOOK PRINCIPAL CON TIPOS CORREGIDOS ✅
// ============================================================================
interface UseBookAppointmentReturn {
  // Estados
  treatments: Treatment[] | null;
  professionals: Professional[] | null;
  availableSlots: TimeSlot[] | null;
  selectedTreatment: Treatment | null;
  selectedProfessional: Professional | null;
  selectedDate: string | null;
  selectedTime: string | null;
  notes: string;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  
  // ⭐ FUNCIONES CORREGIDAS PARA ACEPTAR NULL
  loadTreatments: () => Promise<void>;
  loadProfessionals: (treatmentId?: string) => Promise<void>;
  loadAvailableSlots: (treatmentId: string, date: string) => Promise<void>;
  selectTreatment: (treatment: Treatment | null) => void; // ⭐ ACEPTA NULL
  selectProfessional: (professional: Professional | null) => void; // ⭐ ACEPTA NULL
  selectDate: (date: string | null) => void; // ⭐ ACEPTA NULL
  selectTime: (time: string | null) => void; // ⭐ ACEPTA NULL
  setNotes: (notes: string) => void;
  submitBooking: () => Promise<boolean>;
  resetBooking: () => void;
  canSubmit: boolean;
}

export const useBookAppointment = (navigation: any): UseBookAppointmentReturn => {
  // Estados principales
  const [treatments, setTreatments] = useState<Treatment[] | null>(null);
  const [professionals, setProfessionals] = useState<Professional[] | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[] | null>(null);
  
  // Selecciones del usuario
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  // Estados de carga
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // CARGAR TRATAMIENTOS - ✅ CORREGIDO
  // ============================================================================
  const loadTreatments = useCallback(async () => {
    try {
      console.log('💆‍♀️ Loading treatments...');
      setLoading(true);
      setError(null);
      
      // ✅ CORREGIDO: usar el endpoint correcto para appointments
      const response = await treatmentAPI.getForAppointments();
      
      if (response.success && response.data) {
        // ✅ CORREGIDO: estructura correcta del backend
        const treatmentsData = response.data.treatments || response.data;
        const transformedTreatments: Treatment[] = treatmentsData.map((treatment: any) => ({
          id: treatment.id,
          name: treatment.name,
          category: treatment.category || 'General', // ⭐ FALLBACK
          duration: treatment.duration || 60, // ⭐ FALLBACK
          price: treatment.price,
          description: treatment.description,
          emoji: treatment.emoji || getTreatmentEmoji(treatment.category || 'General'),
          isVipExclusive: treatment.isVipExclusive,
          clinic: treatment.clinic,
        }));
        
        setTreatments(transformedTreatments);
        console.log('✅ Treatments loaded:', transformedTreatments.length);
      } else {
        throw new Error(response.error?.message || 'Error al cargar tratamientos');
      }
    } catch (error: any) {
      console.error('❌ Error loading treatments:', error);
      const errorMessage = handleApiError(error, 'No se pudieron cargar los tratamientos');
      setError(errorMessage);
      
      // Fallback a datos mock en desarrollo
      if (__DEV__) {
        console.log('🔧 Using mock treatments for development');
        setTreatments(getMockTreatments());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================================
  // CARGAR PROFESIONALES - ✅ MEJORADO
  // ============================================================================
  const loadProfessionals = useCallback(async (treatmentId?: string) => {
    try {
      console.log('👩‍⚕️ Loading professionals...', treatmentId);
      setLoading(true);
      
      // ✅ MEJORADO: En desarrollo usar mock, en producción implementar endpoint
      if (__DEV__) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfessionals(getMockProfessionals());
        console.log('✅ Professionals loaded (mock)');
      } else {
        // TODO: Implementar endpoint para profesionales
        // const response = await api.request(`/professionals${treatmentId ? `?treatmentId=${treatmentId}` : ''}`);
        setProfessionals(getMockProfessionals());
      }
      
    } catch (error: any) {
      console.error('❌ Error loading professionals:', error);
      const errorMessage = handleApiError(error, 'No se pudieron cargar los profesionales');
      setError(errorMessage);
      
      // Fallback a mock
      setProfessionals(getMockProfessionals());
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================================
  // CARGAR HORARIOS DISPONIBLES - ✅ CORREGIDO
  // ============================================================================
  const loadAvailableSlots = useCallback(async (treatmentId: string, date: string) => {
    try {
      console.log('⏰ Loading available slots...', treatmentId, date);
      setLoading(true);
      setAvailableSlots(null);
      
      const response = await appointmentAPI.getAvailability(treatmentId, date);
      
      if (response.success && response.data) {
        // ✅ CORREGIDO: estructura correcta del backend
        const slotsData = response.data.availableSlots || [];
        const transformedSlots: TimeSlot[] = slotsData.map((slot: any) => ({
          time: slot.time,
          available: true, // Si está en availableSlots, está disponible
          professionalId: slot.availableProfessionals?.[0]?.id,
          availableProfessionals: slot.availableProfessionals?.map((prof: any) => ({
            id: prof.id,
            name: prof.name,
            specialty: prof.specialty || prof.specialties?.[0] || 'General', // ⭐ FALLBACK
            specialties: prof.specialties,
            rating: prof.rating,
            isAvailable: true,
          })) || [],
        }));
        
        setAvailableSlots(transformedSlots);
        console.log('✅ Available slots loaded:', transformedSlots.length);
        
        // ✅ AGREGADO: Extraer profesionales únicos de los slots
        const uniqueProfessionals: Professional[] = [];
        const professionalIds = new Set();
        
        slotsData.forEach((slot: any) => {
          slot.availableProfessionals?.forEach((prof: any) => {
            if (!professionalIds.has(prof.id)) {
              professionalIds.add(prof.id);
              uniqueProfessionals.push({
                id: prof.id,
                name: prof.name,
                specialty: prof.specialty || prof.specialties?.[0] || 'General', // ⭐ FALLBACK
                specialties: prof.specialties,
                rating: prof.rating,
                isAvailable: true,
              });
            }
          });
        });
        
        if (uniqueProfessionals.length > 0) {
          setProfessionals(uniqueProfessionals);
        }
        
      } else {
        throw new Error(response.error?.message || 'Error al cargar horarios');
      }
    } catch (error: any) {
      console.error('❌ Error loading slots:', error);
      const errorMessage = handleApiError(error, 'No se pudieron cargar los horarios disponibles');
      setError(errorMessage);
      
      // Fallback a horarios mock en desarrollo
      if (__DEV__) {
        console.log('🔧 Using mock time slots for development');
        setAvailableSlots(getMockTimeSlots());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================================
  // FUNCIONES DE SELECCIÓN - ⭐ CORREGIDAS PARA ACEPTAR NULL
  // ============================================================================
  const selectTreatment = useCallback((treatment: Treatment | null) => {
    if (treatment) {
      console.log('💆‍♀️ Treatment selected:', treatment.name);
      setSelectedTreatment(treatment);
      
      // Limpiar selecciones dependientes
      setSelectedProfessional(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots(null);
      
      // Cargar profesionales para este tratamiento
      loadProfessionals(treatment.id);
    } else {
      setSelectedTreatment(null);
      setSelectedProfessional(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots(null);
    }
  }, [loadProfessionals]);

  const selectProfessional = useCallback((professional: Professional | null) => {
    if (professional) {
      console.log('👩‍⚕️ Professional selected:', professional.name);
      setSelectedProfessional(professional);
      
      // Limpiar selecciones dependientes
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots(null);
    } else {
      setSelectedProfessional(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots(null);
    }
  }, []);

  const selectDate = useCallback((date: string | null) => {
    if (date) {
      console.log('📅 Date selected:', date);
      setSelectedDate(date);
      setSelectedTime(null);
      
      // Cargar horarios disponibles
      if (selectedTreatment) {
        loadAvailableSlots(selectedTreatment.id, date);
      }
    } else {
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots(null);
    }
  }, [selectedTreatment, loadAvailableSlots]);

  const selectTime = useCallback((time: string | null) => {
    if (time) {
      console.log('⏰ Time selected:', time);
      setSelectedTime(time);
    } else {
      setSelectedTime(null);
    }
  }, []);

  // ============================================================================
  // ENVIAR RESERVA - ✅ NAVEGACIÓN CORREGIDA
  // ============================================================================
  const submitBooking = useCallback(async (): Promise<boolean> => {
    if (!selectedTreatment || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos.');
      return false;
    }

    try {
      console.log('📅 Submitting booking...');
      setSubmitting(true);
      setError(null);
      
      const bookingData: BookingData = {
        treatmentId: selectedTreatment.id,
        date: selectedDate,
        time: selectedTime,
        notes: notes.trim() || undefined,
        // ✅ CORREGIDO: professionalId es opcional si el backend lo asigna automáticamente
        ...(selectedProfessional && { professionalId: selectedProfessional.id }),
      };
      
      console.log('📤 Booking data:', bookingData);
      
      const response = await appointmentAPI.create(bookingData);
      
      if (response.success) {
        console.log('✅ Booking created successfully:', response.data);
        
        Alert.alert(
          '¡Cita agendada! 🎉',
          `Tu cita de ${selectedTreatment.name} ha sido agendada para el ${formatDate(selectedDate)} a las ${selectedTime}.`,
          [
            {
              text: 'Ver mis citas',
              onPress: () => {
                // ✅ NAVEGACIÓN CORREGIDA: Usar navigate simple
                try {
                  navigation.navigate('Appointments');
                } catch (navError) {
                  console.log('❌ Navigation error, trying alternative:', navError);
                  // ✅ FALLBACK: Si falla, ir hacia atrás
                  navigation.goBack();
                }
              }
            },
            {
              text: 'Ir al inicio',
              onPress: () => {
                try {
                  navigation.navigate('Dashboard');
                } catch (navError) {
                  console.log('❌ Navigation error, trying alternative:', navError);
                  navigation.goBack();
                }
              }
            }
          ]
        );
        
        return true;
      } else {
        throw new Error(response.error?.message || 'Error al agendar la cita');
      }
      
    } catch (error: any) {
      console.error('❌ Error submitting booking:', error);
      const errorMessage = handleApiError(error, 'No se pudo agendar la cita');
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [selectedTreatment, selectedProfessional, selectedDate, selectedTime, notes, navigation]);

  // ============================================================================
  // RESETEAR FORMULARIO
  // ============================================================================
  const resetBooking = useCallback(() => {
    setSelectedTreatment(null);
    setSelectedProfessional(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setNotes('');
    setAvailableSlots(null);
    setError(null);
  }, []);

  // ============================================================================
  // VALIDACIONES - ✅ MEJORADO
  // ============================================================================
  const canSubmit = !!(
    selectedTreatment &&
    selectedDate &&
    selectedTime &&
    !submitting
    // ✅ CORREGIDO: professional no es siempre requerido
  );

  // ============================================================================
  // EFFECT INICIAL
  // ============================================================================
  useEffect(() => {
    loadTreatments();
  }, [loadTreatments]);

  // ============================================================================
  // FUNCIONES HELPER
  // ============================================================================
  const getTreatmentEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      facial: '💆‍♀️',
      masaje: '🤲',
      manicure: '💅',
      pedicure: '🦶',
      depilacion: '✨',
      corporal: '🧴',
      estetica: '🌟',
      general: '💆‍♀️',
    };
    return emojiMap[category.toLowerCase()] || '💆‍♀️';
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // ============================================================================
  // DATOS MOCK - ✅ ACTUALIZADOS CON CAMPOS REQUERIDOS
  // ============================================================================
  const getMockTreatments = (): Treatment[] => [
    {
      id: 't1',
      name: 'Ritual Purificante',
      category: 'Facial', // ⭐ REQUERIDO
      duration: 60, // ⭐ REQUERIDO
      price: 2500,
      emoji: '💆‍♀️',
      description: 'Limpieza facial profunda con extracción de comedones',
      isVipExclusive: false,
      clinic: 'Belleza Estética Premium',
    },
    {
      id: 't2',
      name: 'Drenaje Relajante',
      category: 'Corporal', // ⭐ REQUERIDO
      duration: 90, // ⭐ REQUERIDO
      price: 3500,
      emoji: '🤲',
      description: 'Masaje de drenaje linfático corporal',
      isVipExclusive: false,
      clinic: 'Belleza Estética Premium',
    },
    {
      id: 't3',
      name: 'Hidratación Premium VIP',
      category: 'Facial', // ⭐ REQUERIDO
      duration: 75, // ⭐ REQUERIDO
      price: 4500,
      emoji: '✨',
      description: 'Tratamiento facial exclusivo con ácido hialurónico',
      isVipExclusive: true,
      clinic: 'Belleza Estética Premium',
    },
  ];

  const getMockProfessionals = (): Professional[] => [
    {
      id: 'prof1',
      name: 'Ana Martínez',
      firstName: 'Ana',
      lastName: 'Martínez',
      specialty: 'Facial', // ⭐ REQUERIDO
      specialties: ['Facial', 'Corporal'],
      rating: 4.9,
      isAvailable: true,
    },
    {
      id: 'prof2',
      name: 'Carmen Rodríguez',
      firstName: 'Carmen',
      lastName: 'Rodríguez',
      specialty: 'Corporal', // ⭐ REQUERIDO
      specialties: ['Facial', 'Corporal'],
      rating: 4.9,
      isAvailable: true,
    },
  ];

  const getMockTimeSlots = (): TimeSlot[] => [
    { 
      time: '09:00', 
      available: true,
      availableProfessionals: [
        { 
          id: 'prof1', 
          name: 'Ana Martínez', 
          specialty: 'Facial', // ⭐ REQUERIDO
          specialties: ['Facial'], 
          rating: 4.9, 
          isAvailable: true 
        }
      ]
    },
    { 
      time: '10:00', 
      available: true,
      availableProfessionals: [
        { 
          id: 'prof2', 
          name: 'Carmen Rodríguez', 
          specialty: 'Corporal', // ⭐ REQUERIDO
          specialties: ['Corporal'], 
          rating: 4.9, 
          isAvailable: true 
        }
      ]
    },
    { 
      time: '14:00', 
      available: true,
      availableProfessionals: [
        { 
          id: 'prof1', 
          name: 'Ana Martínez', 
          specialty: 'Facial', // ⭐ REQUERIDO
          specialties: ['Facial'], 
          rating: 4.9, 
          isAvailable: true 
        }
      ]
    },
    { 
      time: '15:30', 
      available: true,
      availableProfessionals: [
        { 
          id: 'prof2', 
          name: 'Carmen Rodríguez', 
          specialty: 'Corporal', // ⭐ REQUERIDO
          specialties: ['Corporal'], 
          rating: 4.9, 
          isAvailable: true 
        }
      ]
    },
  ];

  return {
    // Estados
    treatments,
    professionals,
    availableSlots,
    selectedTreatment,
    selectedProfessional,
    selectedDate,
    selectedTime,
    notes,
    loading,
    submitting,
    error,
    
    // Funciones
    loadTreatments,
    loadProfessionals,
    loadAvailableSlots,
    selectTreatment,
    selectProfessional,
    selectDate,
    selectTime,
    setNotes,
    submitBooking,
    resetBooking,
    canSubmit,
  };
};