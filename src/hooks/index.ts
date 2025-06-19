// ============================================================================
// hooks/index.ts - EXPORT COMPLETO DE HOOKS
// ============================================================================

// Dashboard Hook
export { useDashboard } from './useDashboard';
export type { DashboardData, WellnessCheckIn } from './useDashboard';

// VIP Hook
export { useVIP } from './useVIP';
export type {
 VIPStatus,
 VIPBenefit,
 Testimonial
} from './useVIP';

// Auth Hook
export { useAuth } from './useAuth';
export type {
 AuthType,
 AuthUser,
 AuthFormData,
 LoginCredentials,
 RegisterData,
 AuthState
} from './useAuth';

// Appointments Hook
export { useAppointments } from './useAppointments';
export type {
 TabType,
 AppointmentStatus,
 Appointment,
 Treatment,
 Professional,
 AvailabilitySlot,
 AppointmentSection,
 AppointmentFilters
} from './useAppointments';

// Login Hook
export { useLogin } from './useLogin';
export type {
 LoginFormData,
 LoginResponse,
 LoginUser
} from './useLogin';

// Profile Hooks
export { useProfile } from './useProfile';
export { useClinicSelector } from './useClinicSelector';
export { useProfileActions } from './useProfileActions';
export type { 
 UserProfile, 
 NotificationSettings 
} from './useProfile';
export type { Clinic } from './useClinicSelector';