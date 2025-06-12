export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'followup' | 'emergency' | 'surgery';
  status: 'scheduled' | 'confirmed' | 'inprogress' | 'completed' | 'cancelled';
  notes?: string;
  symptoms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
  selectedDate: string;
}
