// ============================================================================
// hooks/index.ts - EXPORT COMPLETO DE HOOKS CORREGIDO ✅
// ============================================================================

// Dashboard Hook
export { useDashboard } from './useDashboard';
export type { DashboardData } from './useDashboard';
// ✅ COMENTAR WellnessCheckIn SI NO EXISTE
// export type { WellnessCheckIn } from './useDashboard';

// VIP Hook
export { useVIP } from './useVIP';
export type {
  VIPStatus,
  VIPBenefit,
  Testimonial
} from './useVIP';

// Auth Hook - ✅ CORREGIDO
export { useAuth } from './useAuth';
export type {
  AuthType,
  AuthUser,
  AuthFormData,
  LoginCredentials,
  RegisterData,
  AuthState,
  User,  // ✅ AGREGADO
  UserRole,  // ✅ AGREGADO
  UseAuthReturn  // ✅ AGREGADO
} from './useAuth';

// Appointments Hook - ✅ CORREGIDO
export { useAppointments } from './useAppointments';
export type {
  TabType,
  AppointmentStatus,
  Appointment,
  Treatment,
  Professional,
  AvailabilitySlot,
  AppointmentSection,
  AppointmentFilters,
  BookingData,  // ✅ AGREGADO
  TimeSlot  // ✅ AGREGADO
} from './useAppointments';

// Login Hook - ✅ VERIFICAR SI EXISTE
export { useLogin } from './useLogin';
export type {
  LoginFormData,
  LoginResponse,
  LoginUser
} from './useLogin';

// Profile Hooks - ✅ VERIFICAR SI EXISTEN
export { useProfile } from './useProfile';
export { useClinicSelector } from './useClinicSelector';
export { useProfileActions } from './useProfileActions';
export type { 
  UserProfile, 
  NotificationSettings 
} from './useProfile';
export type { Clinic } from './useClinicSelector';

// ============================================================================
// IMPORTS DESDE types/auth.ts PARA EVITAR DUPLICADOS ✅
// ============================================================================

// Re-exportar tipos desde auth.ts para centralizarlos
export type {
  ConnectionStatus,
  AppointmentDetailsScreenProps,
  BookingSummaryProps,
  APIResponse,
  PaginatedResponse,
  FormErrors,
  FormState,
  ConnectionStatusProps,
  DemoCardProps,
  LoginFormProps,
  LoadingState,
  AsyncState,
  NotificationType,
  Notification,
  SearchFilters,
  SortOptions,
  AppConfig
} from '../types/auth';

// ============================================================================
// HELPERS Y UTILITIES ✅
// ============================================================================

// Re-exportar helpers útiles
export {
  createUserWithDefaults,
  mapConnectionStatus,
  getStatusColor,
  getStatusText,
  getStatusIcon,
  getTreatmentIcon,
  renderTreatmentName,
  renderProfessionalName,
  renderPrice,
  renderDuration
} from '../types/auth';

// ============================================================================
// CONSTANTES ✅
// ============================================================================

export {
  AuthTypeConstants,
  AppointmentStatusConstants,
  UserRoleConstants
} from '../types/auth';

// ============================================================================
// HOOKS ADICIONALES SI EXISTEN ✅
// ============================================================================

// ✅ DESCOMENTAR SOLO SI EXISTEN ESTOS HOOKS
// export { useBookAppointment } from './useBookAppointment';
// export { useNotifications } from './useNotifications';
// export { useSettings } from './useSettings';
// export { useTreatments } from './useTreatments';
// export { useProfessionals } from './useProfessionals';

// ============================================================================
// TIPOS ADICIONALES SI ES NECESARIO ✅
// ============================================================================

// ✅ SOLO SI NECESITAS TIPOS ESPECÍFICOS DE OTROS HOOKS
// export type {
//   BookAppointmentState,
//   NotificationPreferences,
//   AppSettings,
//   TreatmentCategory
// } from './otherHooks';