// hooks/useAppointments.ts
import { useState, useEffect, useCallback } from 'react';
import { 
  Appointment, 
  AppointmentFilters, 
  CreateAppointmentDTO,
  RescheduleAppointmentDTO 
} from '../../types/appointment';

interface UseAppointmentsReturn {
  appointments: Appointment[] | null;
  loading: boolean;
  error: string | null;
  fetchAppointments: (filters?: AppointmentFilters) => Promise<void>;
  createAppointment: (data: CreateAppointmentDTO) => Promise<Appointment>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  rescheduleAppointment: (data: RescheduleAppointmentDTO) => Promise<void>;
  rateAppointment: (appointmentId: string, rating: number) => Promise<void>;
}

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo para desarrollo
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      date: '2024-06-25',
      time: '10:00:00',
      treatment: 'Limpieza Facial Profunda',
      professional: 'Dra. María García',
      clinic: 'Beauty Center Plaza',
      status: 'CONFIRMED',
      duration: 60,
      price: 150,
      beautyPointsEarned: 150,
      category: 'facial',
    },
    {
      id: '2',
      date: '2024-06-28',
      time: '15:30:00',
      treatment: 'Masaje Relajante Premium',
      professional: 'Carlos Méndez',
      clinic: 'Beauty Center Plaza',
      status: 'PENDING',
      duration: 90,
      price: 200,
      beautyPointsEarned: 200,
      category: 'masaje',
      isVipExclusive: true,
    },
    {
      id: '3',
      date: '2024-06-20',
      time: '14:00:00',
      treatment: 'Manicure Spa',
      professional: 'Ana López',
      clinic: 'Beauty Center Norte',
      status: 'COMPLETED',
      duration: 45,
      price: 80,
      beautyPointsEarned: 80,
      category: 'manicure',
      rating: 5,
    },
    {
      id: '4',
      date: '2024-06-18',
      time: '11:00:00',
      treatment: 'Tratamiento Antiedad',
      professional: 'Dra. María García',
      clinic: 'Beauty Center Plaza',
      status: 'CANCELLED',
      duration: 75,
      price: 250,
      category: 'facial',
    },
  ];

  const fetchAppointments = useCallback(async (filters?: AppointmentFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En producción, aquí iría la llamada real a la API
      // const response = await api.get('/appointments', { params: filters });
      // setAppointments(response.data);
      
      setAppointments(mockAppointments);
    } catch (err) {
      setError('Error al cargar las citas');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAppointment = useCallback(async (data: CreateAppointmentDTO): Promise<Appointment> => {
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date: data.date,
        time: data.time,
        treatment: 'Nuevo Tratamiento', // En producción vendría del treatmentId
        professional: 'Profesional', // En producción vendría del professionalId
        clinic: 'Clínica', // En producción vendría del clinicId
        status: 'PENDING',
        notes: data.notes,
      };
      
      setAppointments(prev => prev ? [newAppointment, ...prev] : [newAppointment]);
      return newAppointment;
    } catch (err) {
      throw new Error('Error al crear la cita');
    }
  }, []);

  const cancelAppointment = useCallback(async (appointmentId: string) => {
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => 
        prev?.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'CANCELLED' as const }
            : apt
        ) || null
      );
    } catch (err) {
      throw new Error('Error al cancelar la cita');
    }
  }, []);

  const rescheduleAppointment = useCallback(async (data: RescheduleAppointmentDTO) => {
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => 
        prev?.map(apt => 
          apt.id === data.appointmentId 
            ? { ...apt, date: data.newDate, time: data.newTime, status: 'PENDING' as const }
            : apt
        ) || null
      );
    } catch (err) {
      throw new Error('Error al reprogramar la cita');
    }
  }, []);

  const rateAppointment = useCallback(async (appointmentId: string, rating: number) => {
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => 
        prev?.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, rating }
            : apt
        ) || null
      );
    } catch (err) {
      throw new Error('Error al calificar la cita');
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    cancelAppointment,
    rescheduleAppointment,
    rateAppointment,
  };
};