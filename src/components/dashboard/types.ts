// ============================================================================
// components/dashboard/types.ts - TIPOS CORREGIDOS Y OPTIMIZADOS
// ============================================================================

// ============================================================================
// COMPONENTES BASE
// ============================================================================
export interface ModernCardProps {
    children: React.ReactNode;
    style?: any;
    onPress?: () => void;
    gradient?: boolean;
    vip?: boolean;
  }
  
  export interface ActionButtonProps {
    title: string;
    onPress: () => void;
    icon: string;
    variant?: 'primary' | 'secondary' | 'accent';
    loading?: boolean;
    fullWidth?: boolean;
  }
  
  // ============================================================================
  // INFORMACIÓN DE CLÍNICA
  // ============================================================================
  export interface ClinicInfo {
    id?: string;
    name: string;
    address: string;
    zone?: string;
    phone: string;
    serviceHours?: string;
    schedule?: string;
    logoUrl?: string;
    email?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }
  
  // ============================================================================
  // HEADER DASHBOARD SIMPLIFICADO (SOLO BIENVENIDA)
  // ============================================================================
  export interface DashboardHeaderProps {
    firstName: string;
    vipStatus: boolean;
    onProfilePress: () => void;
  }
  
  // ============================================================================
  // CLINIC INFO CARD SEPARADO
  // ============================================================================
  export interface ClinicInfoCardProps {
    clinicInfo?: ClinicInfo;
  }
  
  // ============================================================================
  // CITAS / APPOINTMENTS
  // ============================================================================
  export interface NextAppointment {
    id: string;
    treatment: string;
    date: string;
    time: string;
    professional: string;
    clinic: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    duration?: number;
    notes?: string;
    beautyPointsEarned?: number;
  }
  
  export interface NextAppointmentCardProps {
    appointment: NextAppointment | null;
    onAppointmentPress: () => void;
    formatAppointmentDate: (dateString: string) => string;
    formatAppointmentTime: (timeString: string) => string;
  }
  
  // ============================================================================
  // BEAUTY POINTS
  // ============================================================================
  export interface BeautyPointsStats {
    totalSessions: number;
    beautyPoints: number;
    totalInvestment: number;
    vipStatus: boolean;
    pointsThisMonth?: number;
    nextRewardAt?: number;
  }
  
  export interface BeautyPointsCardProps {
    stats: BeautyPointsStats;
    vipStatus: boolean;
    onPress: () => void;
  }
  
  // ============================================================================
  // WELLNESS CHECK-IN
  // ============================================================================
  export interface WellnessCheckIn {
    mood: 'great' | 'good' | 'okay' | 'tired' | 'stressed';
    energy: number; // 1-5
    skinFeeling: 'amazing' | 'good' | 'normal' | 'needs-care';
    hydration?: number; // 1-5
    sleep?: number; // 1-5
  }
  
  export interface WellnessCheckInCardProps {
    onCheckIn: (data: WellnessCheckIn) => void;
    todayCompleted: boolean;
  }
  
  // ============================================================================
  // WELLNESS TIPS
  // ============================================================================
  export interface WellnessTip {
    id?: string;
    title: string;
    content: string;
    category: string;
    iconName: string;
    createdAt?: string;
    isPersonalized?: boolean;
  }
  
  export interface WellnessTipCardProps {
    tip: WellnessTip | null;
  }
  
  // ============================================================================
  // TRATAMIENTOS / TREATMENTS
  // ============================================================================
  export interface Treatment {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    vipPrice?: number;
    iconName: string;
    isVipExclusive: boolean;
    category?: string;
    clinic?: string;
    clinicId?: string;
    rating?: number;
    popularity?: number;
    imageUrl?: string;
  }
  
  export interface TreatmentCarouselProps {
    treatments: Treatment[];
    onTreatmentPress: (treatment: Treatment) => void;
  }
  
  // ============================================================================
  // SECCIÓN DE RECOMENDACIONES
  // ============================================================================
  export interface RecommendationsSectionProps {
    treatments: Treatment[];
    onTreatmentPress: (treatment: Treatment) => void;
    onSeeAllPress: () => void;
  }
  
  // ============================================================================
  // DATOS DEL DASHBOARD (ACTUALIZADO SIN CLINICINFO EN HEADER)
  // ============================================================================
  export interface DashboardUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    vipStatus: boolean;
    beautyPoints: number;
    sessionsCompleted: number;
    totalInvestment: number;
    avatarUrl?: string;
    memberSince?: string;
  }
  
  export interface DashboardData {
    user: DashboardUser;
    nextAppointment: NextAppointment | null;
    featuredTreatments: Treatment[];
    wellnessTip: WellnessTip | null;
    stats: BeautyPointsStats;
  }
  
  // ============================================================================
  // ESTADOS DEL HOOK useDashboard (CORREGIDO)
  // ============================================================================
  export interface UseDashboardState {
    dashboardData: DashboardData | null;
    loading: boolean;
    refreshing: boolean;
    wellnessCompleted: boolean;
    clinicInfo: ClinicInfo | null; // Separado del dashboardData
    user: DashboardUser | null;
    error: string | null;
  }
  
  export interface UseDashboardActions {
    handleWellnessCheckIn: (data: WellnessCheckIn) => Promise<void>;
    handleTreatmentPress: (treatment: Treatment) => void;
    handleNewAppointment: () => void;
    handleNextAppointmentPress: () => void;
    handleProfilePress: () => void;
    handleBeautyPointsPress: () => Promise<void>;
    handleSeeAllTreatments: () => void;
    onRefresh: () => void;
    formatAppointmentDate: (dateString: string) => string;
    formatAppointmentTime: (timeString: string) => string;
  }
  
  export interface UseDashboardReturn extends UseDashboardState, UseDashboardActions {}
  
  // ============================================================================
  // TIPOS DE RESPUESTA DE API
  // ============================================================================
  export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
    pagination?: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
  }
  
  export interface DashboardApiResponse extends ApiResponse<DashboardData> {}
  
  export interface ClinicApiResponse extends ApiResponse<ClinicInfo> {}
  
  export interface BeautyPointsApiResponse extends ApiResponse<{
    currentPoints: number;
    vipMultiplier: number;
    history: Array<{
      date: string;
      treatment: string;
      pointsEarned: number;
    }>;
    availableRewards: Array<{
      points: number;
      reward: string;
    }>;
    nextRewards: Array<{
      points: number;
      reward: string;
    }>;
  }> {}
  
  // ============================================================================
  // TIPOS DE EVENTOS/CALLBACKS
  // ============================================================================
  export type NavigationFunction = (screen: string, params?: any) => void;
  export type AppointmentPressHandler = () => void;
  export type TreatmentPressHandler = (treatment: Treatment) => void;
  export type WellnessCheckInHandler = (data: WellnessCheckIn) => Promise<void>;
  export type ProfilePressHandler = () => void;
  
  // ============================================================================
  // TIPOS DE VALIDACIÓN
  // ============================================================================
  export interface ValidationError {
    field: string;
    message: string;
    code?: string;
  }
  
  export interface FormState {
    isValid: boolean;
    errors: ValidationError[];
    isSubmitting: boolean;
    touched: Record<string, boolean>;
  }
  
  // ============================================================================
  // TIPOS DE ESTILO COMPARTIDOS
  // ============================================================================
  export interface StyleVariant {
    primary: any;
    secondary: any;
    accent: any;
    vip: any;
    success: any;
    warning: any;
    error: any;
  }
  
  export interface SharedStyleValues {
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      round: number;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    shadows: {
      soft: any;
      medium: any;
      strong: any;
    };
  }
  
  // ============================================================================
  // TIPOS PARA ESTADOS DE LOADING Y ERROR
  // ============================================================================
  export interface LoadingState {
    dashboard: boolean;
    appointments: boolean;
    treatments: boolean;
    beautyPoints: boolean;
    wellness: boolean;
    clinic: boolean;
  }
  
  export interface ErrorState {
    dashboard: string | null;
    appointments: string | null;
    treatments: string | null;
    beautyPoints: string | null;
    wellness: string | null;
    clinic: string | null;
  }
  
  // ============================================================================
  // TIPOS PARA FILTROS Y BÚSQUEDA
  // ============================================================================
  export interface TreatmentFilters {
    category?: string;
    priceRange?: {
      min: number;
      max: number;
    };
    duration?: {
      min: number;
      max: number;
    };
    vipOnly?: boolean;
    sortBy?: 'price' | 'duration' | 'popularity' | 'rating';
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface SearchParams {
    query: string;
    filters: TreatmentFilters;
    limit: number;
    offset: number;
  }
  
  // ============================================================================
  // CONSTANTES TIPADAS
  // ============================================================================
  export const APPOINTMENT_STATUS = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
  } as const;
  
  export const TREATMENT_CATEGORIES = {
    FACIAL: 'FACIAL',
    CORPORAL: 'CORPORAL',
    DEPILACION: 'DEPILACION',
    MASAJES: 'MASAJES',
    ESTETICA: 'ESTETICA',
    RELAJACION: 'RELAJACION'
  } as const;
  
  export const WELLNESS_MOODS = {
    GREAT: 'great',
    GOOD: 'good',
    OKAY: 'okay',
    TIRED: 'tired',
    STRESSED: 'stressed'
  } as const;
  
  export type AppointmentStatus = typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];
  export type TreatmentCategory = typeof TREATMENT_CATEGORIES[keyof typeof TREATMENT_CATEGORIES];
  export type WellnessMood = typeof WELLNESS_MOODS[keyof typeof WELLNESS_MOODS];
  
  // ============================================================================
  // EXPORT ALIASES (Para facilitar imports)
  // ============================================================================
  export type DashboardProps = DashboardHeaderProps;
  export type ClinicProps = ClinicInfoCardProps;
  export type AppointmentData = NextAppointment;
  export type TreatmentData = Treatment;
  export type WellnessData = WellnessCheckIn;
  export type PointsData = BeautyPointsStats;
  export type UserData = DashboardUser;
  export type ClinicData = ClinicInfo;
  
  // ============================================================================
  // TIPOS PARA ANIMACIONES Y MICROINTERACCIONES
  // ============================================================================
  export interface AnimationConfig {
    duration: number;
    easing: string;
    useNativeDriver: boolean;
  }
  
  export interface InteractionState {
    isPressed: boolean;
    isHovered: boolean;
    isFocused: boolean;
    isDisabled: boolean;
  }
  
  export interface GestureHandlers {
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
    onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  }
  
  // ============================================================================
  // TIPOS PARA THEMING Y PERSONALIZACIÓN
  // ============================================================================
  export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    vip: string;
  }
  
  export interface ComponentTheme {
    colors: ThemeColors;
    spacing: SharedStyleValues['spacing'];
    borderRadius: SharedStyleValues['borderRadius'];
    shadows: SharedStyleValues['shadows'];
    typography: {
      h1: any;
      h2: any;
      h3: any;
      body: any;
      caption: any;
    };
  }
  
  // ============================================================================
  // TIPOS PARA ACCESIBILIDAD
  // ============================================================================
  export interface AccessibilityProps {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
    accessibilityState?: {
      disabled?: boolean;
      selected?: boolean;
      checked?: boolean;
      busy?: boolean;
      expanded?: boolean;
    };
  }
  
  // ============================================================================
  // CAMBIOS PRINCIPALES REALIZADOS:
  // ============================================================================
  
  /*
  ✅ CORRECCIONES IMPLEMENTADAS:
  
  1. **DashboardHeaderProps**: 
     - ❌ Removido: clinicInfo
     - ✅ Solo: firstName, vipStatus, onProfilePress
  
  2. **Nuevo ClinicInfoCardProps**:
     - ✅ Agregado: Para el componente separado
     - ✅ Props: clinicInfo opcional
  
  3. **DashboardData**:
     - ❌ Removido: clinicInfo (ahora separado)
     - ✅ Mantiene: user, appointments, treatments, etc.
  
  4. **UseDashboardState**:
     - ✅ clinicInfo como estado separado
     - ✅ Mejor organización de responsabilidades
  
  5. **Tipos optimizados**:
     - ✅ Agregados: AnimationConfig, InteractionState
     - ✅ Mejorados: AccessibilityProps, ThemeColors
     - ✅ Organizados: Por funcionalidad lógica
  
  🎯 BENEFICIOS:
  - Separación clara de responsabilidades
  - Componentes más focused y reutilizables
  - Mejor tipado para animaciones
  - Soporte completo para accesibilidad
  - Estructura escalable y mantenible
  */