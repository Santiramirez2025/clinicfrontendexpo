import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'checkup' | 'surgery' | 'therapy';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
}

interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: Appointment['type'];
  notes?: string;
  symptoms?: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      patientName: 'María González',
      doctorId: 'doc1',
      doctorName: 'Dr. Juan Pérez',
      date: '2024-06-12',
      time: '09:00',
      duration: 30,
      type: 'consultation',
      status: 'scheduled',
      notes: 'Revisión general',
      symptoms: 'Dolor de cabeza frecuente'
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Juan Martínez',
      doctorId: 'doc1',
      doctorName: 'Dr. Juan Pérez',
      date: '2024-06-12',
      time: '10:30',
      duration: 45,
      type: 'checkup',
      status: 'confirmed',
      notes: 'Control de asma'
    },
    {
      id: '3',
      patientId: '1',
      patientName: 'María González',
      doctorId: 'doc2',
      doctorName: 'Dra. Ana López',
      date: '2024-06-13',
      time: '14:00',
      duration: 60,
      type: 'therapy',
      status: 'scheduled',
      notes: 'Sesión de fisioterapia'
    }
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAppointments(mockAppointments);
      setError(null);
    } catch (err) {
      setError('Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentById = (id: string): Appointment | undefined => {
    return appointments.find(appointment => appointment.id === id);
  };

  const getAppointmentsByDate = (date: string): Appointment[] => {
    return appointments.filter(appointment => appointment.date === date);
  };

  const getAppointmentsByPatient = (patientId: string): Appointment[] => {
    return appointments.filter(appointment => appointment.patientId === patientId);
  };

  const getTodayAppointments = (): Appointment[] => {
    const today = new Date().toISOString().split('T')[0];
    return getAppointmentsByDate(today);
  };

  const getUpcomingAppointments = (days: number = 7): Appointment[] => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= today && appointmentDate <= futureDate;
    });
  };

  const createAppointment = async (appointmentData: CreateAppointmentData) => {
    setLoading(true);
    try {
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
        patientName: 'Paciente Nuevo', // This should come from patient lookup
        doctorName: 'Doctor Asignado', // This should come from doctor lookup
        duration: 30,
        status: 'scheduled',
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      return { success: true, data: newAppointment };
    } catch (err) {
      setError('Error al crear cita');
      return { success: false, error: 'Error al crear cita' };
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setLoading(true);
    try {
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === id ? { ...appointment, ...updates } : appointment
        )
      );
      return { success: true };
    } catch (err) {
      setError('Error al actualizar cita');
      return { success: false, error: 'Error al actualizar cita' };
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string, reason?: string) => {
    return updateAppointment(id, { 
      status: 'cancelled', 
      notes: reason ? `Cancelada: ${reason}` : 'Cancelada'
    });
  };

  const confirmAppointment = async (id: string) => {
    return updateAppointment(id, { status: 'confirmed' });
  };

  const completeAppointment = async (id: string, diagnosis?: string, treatment?: string) => {
    return updateAppointment(id, { 
      status: 'completed',
      diagnosis,
      treatment
    });
  };

  const deleteAppointment = async (id: string) => {
    setLoading(true);
    try {
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
      return { success: true };
    } catch (err) {
      setError('Error al eliminar cita');
      return { success: false, error: 'Error al eliminar cita' };
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    getAppointmentById,
    getAppointmentsByDate,
    getAppointmentsByPatient,
    getTodayAppointments,
    getUpcomingAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    confirmAppointment,
    completeAppointment,
    deleteAppointment,
  };
};
