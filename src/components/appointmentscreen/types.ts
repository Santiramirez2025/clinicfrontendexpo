// ============================================================================
// components/appointmentscreen/types.ts - INTERFACES Y TIPOS
// ============================================================================
export interface Appointment {
    id: string;
    treatment: {
      name: string;
      duration: number;
      price: number;
      iconName: string;
    };
    date: string;
    time: string;
    professional: string;
    clinic: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
    beautyPointsEarned: number;
    notes?: string;
    createdAt: string;
    canReschedule?: boolean;
    canCancel?: boolean;
  }
  
  export interface AppointmentSection {
    title: string;
    data: Appointment[];
    count: number;
  }
  
  export type TabType = 'upcoming' | 'past' | 'cancelled';