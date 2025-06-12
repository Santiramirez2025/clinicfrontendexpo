import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

// ============= ROOT NAVIGATION =============
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Modal screens
  PatientModal: { patientId?: string; mode: 'create' | 'edit' | 'view' };
  AppointmentModal: { appointmentId?: string; patientId?: string; mode: 'create' | 'edit' | 'view' };
  ImageViewer: { images: string[]; index: number };
  PdfViewer: { uri: string; title: string };
  NotificationDetail: { notificationId: string };
};

// ============= AUTH STACK =============
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { userType?: 'doctor' | 'patient' | 'staff' };
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  VerifyEmail: { email: string };
  CompleteProfile: { userId: string; userType: string };
};

// ============= MAIN TAB NAVIGATION =============
export type MainTabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Appointments: NavigatorScreenParams<AppointmentStackParamList>;
  Medical: NavigatorScreenParams<MedicalStackParamList>;
  More: NavigatorScreenParams<MoreStackParamList>;
};

// ============= DASHBOARD STACK =============
export type DashboardStackParamList = {
  DashboardHome: undefined;
  Analytics: { period?: 'week' | 'month' | 'quarter' | 'year' };
  Reports: { type?: 'financial' | 'medical' | 'operational' };
  QuickActions: undefined;
  Search: { query?: string; type?: 'patients' | 'appointments' | 'medical' };
};

// ============= PATIENT STACK =============
export type PatientStackParamList = {
  PatientList: { 
    filter?: 'all' | 'active' | 'new' | 'flagged';
    search?: string;
  };
  PatientDetail: { 
    patientId: string;
    tab?: 'overview' | 'history' | 'appointments' | 'documents';
  };
  PatientHistory: { 
    patientId: string;
    type?: 'medical' | 'appointments' | 'billing';
  };
  PatientDocuments: { 
    patientId: string;
    category?: 'images' | 'reports' | 'insurance';
  };
  AddPatient: {
    prefill?: Partial<{
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    }>;
  };
  EditPatient: { patientId: string };
  PatientMedicalHistory: { patientId: string };
  PatientInsurance: { patientId: string };
  PatientEmergencyContact: { patientId: string };
};

// ============= APPOINTMENT STACK =============
export type AppointmentStackParamList = {
  AppointmentList: {
    view?: 'list' | 'calendar';
    date?: string;
    filter?: 'today' | 'week' | 'month' | 'upcoming';
    doctorId?: string;
    status?: 'scheduled' | 'completed' | 'cancelled';
  };
  AppointmentDetail: { 
    appointmentId: string;
    action?: 'view' | 'checkin' | 'complete' | 'reschedule';
  };
  ScheduleAppointment: {
    patientId?: string;
    doctorId?: string;
    suggestedDate?: string;
    appointmentType?: string;
  };
  EditAppointment: { appointmentId: string };
  AppointmentCalendar: {
    doctorId?: string;
    date?: string;
  };
  RescheduleAppointment: { appointmentId: string };
  AppointmentCheckin: { appointmentId: string };
  AppointmentNotes: { appointmentId: string };
};

// ============= MEDICAL STACK =============
export type MedicalStackParamList = {
  MedicalRecords: {
    patientId?: string;
    filter?: 'recent' | 'flagged' | 'pending';
  };
  MedicalRecordDetail: { 
    recordId: string;
    mode?: 'view' | 'edit';
  };
  CreateMedicalRecord: { 
    appointmentId: string;
    patientId: string;
    template?: string;
  };
  Prescriptions: {
    patientId?: string;
    status?: 'active' | 'completed' | 'expired';
  };
  PrescriptionDetail: { prescriptionId: string };
  CreatePrescription: { 
    patientId: string;
    appointmentId?: string;
  };
  LabResults: {
    patientId?: string;
    status?: 'pending' | 'completed';
  };
  LabResultDetail: { labOrderId: string };
  CreateLabOrder: { 
    patientId: string;
    appointmentId?: string;
  };
  ImagingResults: {
    patientId?: string;
    studyType?: string;
  };
  ImagingResultDetail: { imagingOrderId: string };
  VitalSigns: { 
    patientId: string;
    appointmentId?: string;
  };
  Diagnoses: { patientId: string };
  TreatmentPlans: { patientId: string };
};

// ============= MORE/SETTINGS STACK =============
export type MoreStackParamList = {
  MoreHome: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
  SecuritySettings: undefined;
  ChangePassword: undefined;
  TwoFactorAuth: undefined;
  Preferences: undefined;
  Theme: undefined;
  Language: undefined;
  About: undefined;
  Help: undefined;
  Support: undefined;
  Feedback: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  Logout: undefined;
};

// ============= NAVIGATION PROP TYPES =============
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

// Auth Navigation
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;
export type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type RegisterNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

// Main Tab Navigation
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Stack Navigations
export type DashboardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<DashboardStackParamList>,
  MainTabNavigationProp
>;

export type PatientNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PatientStackParamList>,
  MainTabNavigationProp
>;

export type AppointmentNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppointmentStackParamList>,
  MainTabNavigationProp
>;

export type MedicalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MedicalStackParamList>,
  MainTabNavigationProp
>;

export type MoreNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoreStackParamList>,
  MainTabNavigationProp
>;

// ============= ROUTE PROP TYPES =============
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type DashboardRouteProp<T extends keyof DashboardStackParamList> = RouteProp<DashboardStackParamList, T>;
export type PatientRouteProp<T extends keyof PatientStackParamList> = RouteProp<PatientStackParamList, T>;
export type AppointmentRouteProp<T extends keyof AppointmentStackParamList> = RouteProp<AppointmentStackParamList, T>;
export type MedicalRouteProp<T extends keyof MedicalStackParamList> = RouteProp<MedicalStackParamList, T>;
export type MoreRouteProp<T extends keyof MoreStackParamList> = RouteProp<MoreStackParamList, T>;

// ============= SCREEN PROPS INTERFACES =============
export interface BaseScreenProps<
  TNavigation = any,
  TRoute = any
> {
  navigation: TNavigation;
  route: TRoute;
}

// Auth Screen Props
export interface LoginScreenProps extends BaseScreenProps<
  StackNavigationProp<AuthStackParamList, 'Login'>,
  RouteProp<AuthStackParamList, 'Login'>
> {}

export interface RegisterScreenProps extends BaseScreenProps<
  StackNavigationProp<AuthStackParamList, 'Register'>,
  RouteProp<AuthStackParamList, 'Register'>
> {}

// Patient Screen Props
export interface PatientListScreenProps extends BaseScreenProps<
  StackNavigationProp<PatientStackParamList, 'PatientList'>,
  RouteProp<PatientStackParamList, 'PatientList'>
> {}

export interface PatientDetailScreenProps extends BaseScreenProps<
  StackNavigationProp<PatientStackParamList, 'PatientDetail'>,
  RouteProp<PatientStackParamList, 'PatientDetail'>
> {}

// Appointment Screen Props
export interface AppointmentListScreenProps extends BaseScreenProps<
  StackNavigationProp<AppointmentStackParamList, 'AppointmentList'>,
  RouteProp<AppointmentStackParamList, 'AppointmentList'>
> {}

export interface AppointmentDetailScreenProps extends BaseScreenProps<
  StackNavigationProp<AppointmentStackParamList, 'AppointmentDetail'>,
  RouteProp<AppointmentStackParamList, 'AppointmentDetail'>
> {}

// Medical Screen Props
export interface MedicalRecordDetailScreenProps extends BaseScreenProps<
  StackNavigationProp<MedicalStackParamList, 'MedicalRecordDetail'>,
  RouteProp<MedicalStackParamList, 'MedicalRecordDetail'>
> {}

// ============= TAB BAR TYPES =============
export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface TabBarLabelProps {
  focused: boolean;
  color: string;
}

// ============= NAVIGATION OPTIONS =============
export interface ScreenOptions {
  title?: string;
  headerShown?: boolean;
  headerTitle?: string;
  headerBackTitle?: string;
  headerTitleAlign?: 'left' | 'center';
  headerStyle?: object;
  headerTitleStyle?: object;
  headerTintColor?: string;
  headerBackgroundColor?: string;
  gestureEnabled?: boolean;
  cardStyle?: object;
  animationEnabled?: boolean;
}

// ============= DEEP LINKING =============
export interface DeepLinkConfig {
  screens: {
    Auth: {
      screens: {
        Login: string;
        Register: string;
        ForgotPassword: string;
      };
    };
    Main: {
      screens: {
        Dashboard: string;
        Patients: {
          screens: {
            PatientList: string;
            PatientDetail: string;
          };
        };
        Appointments: {
          screens: {
            AppointmentList: string;
            AppointmentDetail: string;
          };
        };
      };
    };
  };
}

// ============= NAVIGATION STATE =============
export interface NavigationState {
  key: string;
  index: number;
  routeNames: string[];
  routes: Array<{
    key: string;
    name: string;
    params?: object;
  }>;
  type: string;
  stale: boolean;
}

// ============= UTILITY TYPES =============
export type NavigationParams<T extends keyof RootStackParamList> = RootStackParamList[T];

export type ScreenName = 
  | keyof AuthStackParamList
  | keyof DashboardStackParamList
  | keyof PatientStackParamList
  | keyof AppointmentStackParamList
  | keyof MedicalStackParamList
  | keyof MoreStackParamList;

// ============= NAVIGATION HELPERS =============
export interface NavigationHelpers {
  navigate: (name: string, params?: object) => void;
  goBack: () => void;
  reset: (state: NavigationState) => void;
  setParams: (params: object) => void;
  isFocused: () => boolean;
}

// ============= EXPORTS =============
export type {
  // Navigation Props for external use
  AuthNavigationProp as AuthNavigation,
  PatientNavigationProp as PatientNavigation,
  AppointmentNavigationProp as AppointmentNavigation,
  MedicalNavigationProp as MedicalNavigation,
  
  // Route Props for external use
  AuthRouteProp as AuthRoute,
  PatientRouteProp as PatientRoute,
  AppointmentRouteProp as AppointmentRoute,
  MedicalRouteProp as MedicalRoute,
};
