// types/appointment.ts
export type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
export type AppointmentTab = 'upcoming' | 'history';

export interface Appointment {
  id: string;
  date: string; // ISO 8601 format
  time: string; // HH:MM:SS format
  treatment: string;
  professional: string;
  clinic?: string;
  status: AppointmentStatus;
  duration?: number; // minutos
  price?: number;
  notes?: string;
  rating?: number; // 1-5 para citas completadas
  beautyPointsEarned?: number;
  category?: string;
  isVipExclusive?: boolean;
}

export interface AppointmentFilters {
  status?: AppointmentStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  professional?: string;
  treatment?: string;
}

export interface CreateAppointmentDTO {
  date: string;
  time: string;
  treatmentId: string;
  professionalId: string;
  clinicId?: string;
  notes?: string;
}

export interface RescheduleAppointmentDTO {
  appointmentId: string;
  newDate: string;
  newTime: string;
  reason?: string;
}