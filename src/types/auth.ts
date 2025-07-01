// ============================================================================
// src/types/auth.ts - TIPOS DE AUTENTICACIÓN SIN ERRORES ✅
// ============================================================================

export type UserRole = "patient" | "admin" | "professional" | "demo";

export type ConnectionStatus = "checking" | "connected" | "disconnected" | "error";

export type AuthType = 'login' | 'register' | 'forgot' | 'forgot-password';

// ============================================================================
// INTERFACES PRINCIPALES ✅
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
  
  // Campos específicos de la app para compatibilidad
  firstName?: string;
  lastName?: string;
  beautyPoints?: number;
  sessionsCompleted?: number;
  vipStatus?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
  
  // Campos específicos para compatibilidad con authSlice
  firstName?: string;
  lastName?: string;
  beautyPoints?: number;
  sessionsCompleted?: number;
  vipStatus?: boolean;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
}

// ============================================================================
// INTERFACES DE AUTENTICACIÓN ✅
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  role?: UserRole;
  
  // Campos adicionales para registro
  firstName?: string;
  lastName?: string;
  notificationPreferences?: {
    appointments: boolean;
    wellness: boolean;
    offers: boolean;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  refreshToken?: string;
  data?: {
    user: AuthUser;
    tokens: {
      accessToken: string;
      refreshToken?: string;
    };
  };
  error?: {
    message: string;
    code?: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// INTERFACES PARA HOOKS ✅
// ============================================================================

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

// ============================================================================
// INTERFACES PARA NAVEGACIÓN ✅
// ============================================================================

export interface AppointmentDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      appointmentId: string;
    };
  };
}

// ============================================================================
// INTERFACES PARA COMPONENTES DE BOOKING ✅
// ============================================================================

export interface BookingSummaryProps {
  selectedTreatment: Treatment;
  selectedProfessional: Professional;
  selectedDate: string;
  selectedTime: string;
  onEditStep?: (step: number) => void;
}

// ============================================================================
// INTERFACES PARA DASHBOARD ✅
// ============================================================================

export interface DashboardData {
  upcomingAppointments: number;
  beautyPoints: number;
  recentTreatments: Treatment[];
  notifications: Notification[];
}

export interface WellnessCheckIn {
  id: string;
  date: string;
  mood: 'excellent' | 'good' | 'okay' | 'tired' | 'stressed';
  energyLevel: number; // 1-10
  skinCondition: 'excellent' | 'good' | 'normal' | 'needs-attention';
  notes?: string;
  treatments?: string[];
}

// ============================================================================
// INTERFACES PARA TRATAMIENTOS ✅
// ============================================================================

export interface Treatment {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  iconName?: 'sparkles' | 'waves' | 'crown' | 'default';
  category?: string;
  benefits?: string[];
  requirements?: string[];
}

export interface Professional {
  id: string;
  name: string;
  specialties: string[];
  avatar?: string;
  rating?: number;
  experience?: number;
  description?: string;
  availability?: AvailabilitySlot[];
}

// ============================================================================
// INTERFACES PARA CITAS ✅ - CAMBIO CRÍTICO AQUÍ
// ============================================================================

// ✅ CAMBIO PRINCIPAL: Valores en MAYÚSCULAS para coincidir con tu código
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type TabType = 'upcoming' | 'history' | 'all';

export interface Appointment {
  id: string;
  treatmentId: string;
  professionalId?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  treatment?: Treatment;
  professional?: Professional;
  createdAt: string;
  updatedAt: string;
  
  // Campos adicionales que usa tu app
  isVipExclusive?: boolean;
  clinic?: string;
  duration?: number;
  price?: number;
  rating?: number;
}

export interface AvailabilitySlot {
  time: string;
  available: boolean;
  professionalId?: string;
}

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

export interface BookingData {
  treatmentId: string;
  professionalId?: string;
  date: string;
  time: string;
  notes?: string;
}

// ============================================================================
// INTERFACES PARA API ✅
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ============================================================================
// INTERFACES PARA FORMULARIOS ✅
// ============================================================================

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T = any> {
  values: T;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// INTERFACES PARA COMPONENTES UI ✅
// ============================================================================

export interface ConnectionStatusProps {
  status: 'checking' | 'connected' | 'error';
}

export interface DemoCardProps {
  connectionStatus: 'checking' | 'connected' | 'error';
}

export interface LoginFormProps {
  connectionStatus: 'checking' | 'connected' | 'error';
  onLogin?: (credentials: LoginCredentials) => void;
  loading?: boolean;
  error?: string;
}

// ============================================================================
// TIPOS PARA ESTADOS DE CARGA ✅
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: string;
}

// ============================================================================
// TIPOS PARA NOTIFICACIONES ✅
// ============================================================================

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// ============================================================================
// TIPOS PARA FILTROS Y BÚSQUEDA ✅
// ============================================================================

export interface SearchFilters {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  availability?: boolean;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// ============================================================================
// TIPOS PARA CONFIGURACIÓN ✅
// ============================================================================

export interface AppConfig {
  apiUrl: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    appointments: boolean;
    payments: boolean;
    notifications: boolean;
    analytics: boolean;
  };
}

// ============================================================================
// HELPERS PARA CREAR USUARIOS CON DEFAULTS ✅
// ============================================================================

export const createUserWithDefaults = (userData: Partial<User>): User => {
  return {
    id: userData.id || '',
    email: userData.email || '',
    name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
    role: userData.role || 'patient',
    avatar: userData.avatar,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth,
    preferences: userData.preferences,
    createdAt: userData.createdAt || new Date().toISOString(),
    updatedAt: userData.updatedAt || new Date().toISOString(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    beautyPoints: userData.beautyPoints || 0,
    sessionsCompleted: userData.sessionsCompleted || 0,
    vipStatus: userData.vipStatus || false,
  };
};

// ============================================================================
// MAPPERS PARA CONNECTION STATUS ✅
// ============================================================================

export type ConnectionStatusComponent = 'checking' | 'connected' | 'error';

export const mapConnectionStatus = (status: ConnectionStatus): ConnectionStatusComponent => {
  if (status === 'disconnected') return 'error';
  return status as ConnectionStatusComponent;
};

// ============================================================================
// HELPERS PARA APPOINTMENT STATUS ✅
// ============================================================================

export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'CONFIRMED': return '#10B981'; // green
    case 'PENDING': return '#F59E0B';   // yellow
    case 'CANCELLED': return '#EF4444'; // red
    case 'COMPLETED': return '#3B82F6'; // blue
    default: return '#6B7280';          // gray
  }
};

export const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'CONFIRMED': return 'Confirmado';
    case 'PENDING': return 'Pendiente';
    case 'CANCELLED': return 'Cancelado';
    case 'COMPLETED': return 'Completado';
    default: return 'Desconocido';
  }
};

export const getStatusIcon = (status: AppointmentStatus): string => {
  switch (status) {
    case 'CONFIRMED': return 'checkmark-circle';
    case 'PENDING': return 'time';
    case 'CANCELLED': return 'close-circle';
    case 'COMPLETED': return 'checkmark-circle';
    default: return 'help-circle';
  }
};

// ============================================================================
// HELPERS PARA TRATAMIENTOS ✅
// ============================================================================

export const getTreatmentIcon = (iconName?: string): string => {
  switch (iconName) {
    case 'sparkles': return '✨';
    case 'waves': return '🌊';
    case 'crown': return '👑';
    default: return '💆‍♀️';
  }
};

// ============================================================================
// SAFE RENDER HELPERS ✅
// ============================================================================

export const renderTreatmentName = (treatment?: Treatment): string => {
  return treatment?.name || 'Sin tratamiento';
};

export const renderProfessionalName = (professional?: Professional): string => {
  return professional?.name || 'Sin profesional';
};

export const renderPrice = (price?: number): string => {
  return price ? `$${price}` : '';
};

export const renderDuration = (duration?: number): string => {
  return duration ? `${duration} min` : '';
};

// ============================================================================
// CONSTANTES DE TIPOS - NO EXPORT DEFAULT ✅
// ============================================================================

export const AuthTypeConstants = {
  LOGIN: 'login' as const,
  REGISTER: 'register' as const,
  FORGOT_PASSWORD: 'forgot-password' as const,
};

export const AppointmentStatusConstants = {
  PENDING: 'PENDING' as const,
  CONFIRMED: 'CONFIRMED' as const,
  COMPLETED: 'COMPLETED' as const,
  CANCELLED: 'CANCELLED' as const,
};

export const UserRoleConstants = {
  PATIENT: 'patient' as const,
  ADMIN: 'admin' as const,
  PROFESSIONAL: 'professional' as const,
  DEMO: 'demo' as const,
};