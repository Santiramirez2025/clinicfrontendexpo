// ============= BASE API TYPES =============
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
  meta?: ResponseMeta;
  links?: ResponseLinks;
}

export interface ApiError {
  field?: string;
  code: ErrorCode;
  message: string;
  details?: Record<string, any>;
  timestamp?: string;
}

export interface ResponseMeta {
  pagination?: PaginationMeta;
  timestamp: string;
  requestId: string;
  version: string;
  processingTime?: number;
  rateLimit?: RateLimitInfo;
}

export interface ResponseLinks {
  self?: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  resetTime: string;
}

// ============= ERROR CODES =============
export type ErrorCode =
  // Authentication Errors
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_TOKEN_EXPIRED'
  | 'AUTH_TOKEN_INVALID'
  | 'AUTH_ACCESS_DENIED'
  | 'AUTH_ACCOUNT_LOCKED'
  | 'AUTH_ACCOUNT_DISABLED'
  | 'AUTH_EMAIL_NOT_VERIFIED'
  | 'AUTH_PASSWORD_EXPIRED'
  | 'AUTH_TWO_FACTOR_REQUIRED'
  
  // Validation Errors
  | 'VALIDATION_REQUIRED_FIELD'
  | 'VALIDATION_INVALID_FORMAT'
  | 'VALIDATION_VALUE_TOO_LONG'
  | 'VALIDATION_VALUE_TOO_SHORT'
  | 'VALIDATION_INVALID_EMAIL'
  | 'VALIDATION_INVALID_PHONE'
  | 'VALIDATION_INVALID_DATE'
  | 'VALIDATION_DUPLICATE_VALUE'
  
  // Resource Errors
  | 'RESOURCE_NOT_FOUND'
  | 'RESOURCE_ALREADY_EXISTS'
  | 'RESOURCE_CONFLICT'
  | 'RESOURCE_LOCKED'
  | 'RESOURCE_ARCHIVED'
  
  // Permission Errors
  | 'PERMISSION_DENIED'
  | 'PERMISSION_INSUFFICIENT_ROLE'
  | 'PERMISSION_FEATURE_DISABLED'
  | 'PERMISSION_QUOTA_EXCEEDED'
  
  // System Errors
  | 'SYSTEM_INTERNAL_ERROR'
  | 'SYSTEM_SERVICE_UNAVAILABLE'
  | 'SYSTEM_TIMEOUT'
  | 'SYSTEM_MAINTENANCE'
  | 'SYSTEM_RATE_LIMITED'
  
  // Business Logic Errors
  | 'BUSINESS_APPOINTMENT_CONFLICT'
  | 'BUSINESS_PATIENT_INACTIVE'
  | 'BUSINESS_DOCTOR_UNAVAILABLE'
  | 'BUSINESS_INVALID_TIME_SLOT'
  | 'BUSINESS_PRESCRIPTION_EXPIRED'
  | 'BUSINESS_INSURANCE_INVALID';

// ============= REQUEST TYPES =============
export interface BaseRequest {
  timestamp?: string;
  requestId?: string;
  clientVersion?: string;
  deviceInfo?: DeviceInfo;
}

export interface PaginatedRequest extends BaseRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface DeviceInfo {
  deviceId: string;
  platform: 'ios' | 'android' | 'web';
  osVersion: string;
  appVersion: string;
  model?: string;
  manufacturer?: string;
  timezone: string;
  locale: string;
}

// ============= AUTH API TYPES =============
export interface LoginRequest extends BaseRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: TokenPair;
  permissions: string[];
  preferences: UserPreferences;
  clinicInfo?: ClinicInfo;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
  emailVerifiedAt?: string;
  twoFactorEnabled: boolean;
  preferences: UserPreferences;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  expiresAt: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  appointmentReminders: boolean;
  labResults: boolean;
  prescriptionAlerts: boolean;
  systemUpdates: boolean;
}

export interface ClinicInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  timezone: string;
  businessHours: BusinessHours[];
  features: ClinicFeature[];
}

export interface BusinessHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface ClinicFeature {
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

export interface RegisterRequest extends BaseRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  clinicId?: string;
  invitationToken?: string;
}

export interface RefreshTokenRequest extends BaseRequest {
  refreshToken: string;
}

export interface PasswordResetRequest extends BaseRequest {
  email: string;
}

export interface PasswordResetConfirmRequest extends BaseRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============= PATIENT API TYPES =============
export interface PatientListRequest extends PaginatedRequest {
  status?: 'active' | 'inactive' | 'all';
  gender?: 'male' | 'female' | 'other';
  ageRange?: {
    min: number;
    max: number;
  };
  hasInsurance?: boolean;
  lastVisitRange?: {
    startDate: string;
    endDate: string;
  };
  tags?: string[];
}

export interface CreatePatientRequest extends BaseRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: AddressInput;
  emergencyContact: EmergencyContactInput;
  insurance?: InsuranceInput;
  medicalHistory?: MedicalHistoryInput;
  allergies?: AllergyInput[];
  medications?: MedicationInput[];
  notes?: string;
  tags?: string[];
}

export interface UpdatePatientRequest extends BaseRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: AddressInput;
  emergencyContact?: EmergencyContactInput;
  insurance?: InsuranceInput;
  notes?: string;
  tags?: string[];
  status?: 'active' | 'inactive';
}

export interface AddressInput {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContactInput {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface InsuranceInput {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  memberNumber?: string;
  expiryDate: string;
  copay?: number;
  deductible?: number;
}

export interface MedicalHistoryInput {
  conditions?: MedicalConditionInput[];
  surgeries?: SurgeryInput[];
  familyHistory?: FamilyHistoryInput[];
  socialHistory?: SocialHistoryInput;
}

export interface MedicalConditionInput {
  name: string;
  diagnosisDate: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

export interface SurgeryInput {
  name: string;
  date: string;
  hospital: string;
  surgeon: string;
  notes?: string;
}

export interface FamilyHistoryInput {
  relationship: string;
  condition: string;
  ageOfOnset?: number;
  notes?: string;
}

export interface SocialHistoryInput {
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy';
  exerciseFrequency: 'none' | 'rarely' | 'weekly' | 'daily';
  occupation: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
}

export interface AllergyInput {
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

export interface MedicationInput {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  notes?: string;
}

// ============= APPOINTMENT API TYPES =============
export interface AppointmentListRequest extends PaginatedRequest {
  doctorId?: string;
  patientId?: string;
  clinicId?: string;
  status?: AppointmentStatus[];
  type?: AppointmentType[];
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  priority?: Priority[];
}

export interface CreateAppointmentRequest extends BaseRequest {
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  duration: number;
  type: AppointmentType;
  reason: string;
  notes?: string;
  priority?: Priority;
  reminderPreferences?: ReminderPreference[];
}

export interface UpdateAppointmentRequest extends BaseRequest {
  date?: string;
  startTime?: string;
  duration?: number;
  reason?: string;
  notes?: string;
  status?: AppointmentStatus;
  priority?: Priority;
  cancelReason?: string;
}

export interface RescheduleAppointmentRequest extends BaseRequest {
  newDate: string;
  newStartTime: string;
  reason: string;
  notifyPatient: boolean;
}

export interface CheckinAppointmentRequest extends BaseRequest {
  checkinTime: string;
  vitals?: VitalSignsInput;
  notes?: string;
}

export interface ReminderPreference {
  type: 'email' | 'sms' | 'push';
  minutesBefore: number;
  enabled: boolean;
}

export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'checked_in'
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show' 
  | 'rescheduled';

export type AppointmentType = 
  | 'consultation' 
  | 'follow_up' 
  | 'check_up' 
  | 'procedure' 
  | 'surgery' 
  | 'emergency' 
  | 'telemedicine'
  | 'vaccination'
  | 'lab_work'
  | 'imaging';

export type Priority = 'low' | 'normal' | 'high' | 'urgent';

// ============= MEDICAL RECORDS API TYPES =============
export interface MedicalRecordListRequest extends PaginatedRequest {
  patientId?: string;
  doctorId?: string;
  appointmentId?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  diagnosisCodes?: string[];
  hasAttachments?: boolean;
}

export interface CreateMedicalRecordRequest extends BaseRequest {
  patientId: string;
  doctorId: string;
  appointmentId: string;
  visitDate: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  reviewOfSystems?: ReviewOfSystemsInput;
  physicalExamination: PhysicalExaminationInput;
  vitals: VitalSignsInput;
  assessment: AssessmentInput;
  plan: TreatmentPlanInput;
  followUpInstructions: string;
  nextAppointmentRecommendation?: string;
  attachments?: string[];
}

export interface VitalSignsInput {
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight?: number;
  height?: number;
  bmi?: number;
  painScale?: number;
  notes?: string;
}

export interface ReviewOfSystemsInput {
  constitutional?: string;
  heent?: string;
  cardiovascular?: string;
  respiratory?: string;
  gastrointestinal?: string;
  genitourinary?: string;
  musculoskeletal?: string;
  neurological?: string;
  psychiatric?: string;
  endocrine?: string;
  hematologic?: string;
  allergic?: string;
}

export interface PhysicalExaminationInput {
  generalAppearance: string;
  vitals: VitalSignsInput;
  heent?: string;
  cardiovascular?: string;
  respiratory?: string;
  gastrointestinal?: string;
  neurological?: string;
  musculoskeletal?: string;
  skin?: string;
  notes?: string;
}

export interface AssessmentInput {
  diagnoses: DiagnosisInput[];
  differentialDiagnoses?: string[];
  clinicalImpression: string;
}

export interface DiagnosisInput {
  code: string;
  description: string;
  type: 'primary' | 'secondary' | 'differential';
  severity?: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'resolved' | 'chronic';
  onsetDate?: string;
  notes?: string;
}

export interface TreatmentPlanInput {
  medications?: PrescriptionInput[];
  procedures?: ProcedureInput[];
  referrals?: ReferralInput[];
  labOrders?: LabOrderInput[];
  imagingOrders?: ImagingOrderInput[];
  followUp: FollowUpInput;
  patientEducation: string[];
  lifestyle?: LifestyleRecommendationInput[];
}

export interface PrescriptionInput {
  medicationName: string;
  strength: string;
  dosageForm: string;
  sig: string;
  quantity: number;
  refills: number;
  daysSupply: number;
  substitutionAllowed: boolean;
  notes?: string;
}

export interface ProcedureInput {
  code?: string;
  name: string;
  description: string;
  scheduledDate?: string;
  urgency: Priority;
  instructions: string;
  estimatedDuration?: number;
}

export interface ReferralInput {
  specialty: string;
  provider?: string;
  reason: string;
  urgency: Priority;
  clinicalInfo: string;
  requestedTests?: string[];
}

export interface LabOrderInput {
  tests: LabTestInput[];
  priority: Priority;
  clinicalInfo: string;
  fastingRequired?: boolean;
  specimenCollectionDate?: string;
  notes?: string;
}

export interface LabTestInput {
  code: string;
  name: string;
  specimenType: string;
  category: string;
}

export interface ImagingOrderInput {
  studyType: 'xray' | 'ct' | 'mri' | 'ultrasound' | 'mammography' | 'nuclear';
  bodyPart: string;
  clinicalInfo: string;
  urgency: Priority;
  contrast?: boolean;
  laterality?: 'left' | 'right' | 'bilateral';
  priorStudies?: string[];
  notes?: string;
}

export interface FollowUpInput {
  timeframe: string;
  reason: string;
  provider?: string;
  instructions: string;
  appointmentType?: AppointmentType;
}

export interface LifestyleRecommendationInput {
  category: 'diet' | 'exercise' | 'sleep' | 'stress' | 'habits';
  recommendation: string;
  targetDate?: string;
  priority: Priority;
}

// ============= ANALYTICS API TYPES =============
export interface AnalyticsRequest extends BaseRequest {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate?: string;
  endDate?: string;
  metrics: AnalyticsMetric[];
  dimensions?: string[];
  filters?: AnalyticsFilters;
  granularity?: 'hour' | 'day' | 'week' | 'month';
}

export interface AnalyticsFilters {
  doctorIds?: string[];
  patientIds?: string[];
  appointmentTypes?: AppointmentType[];
  departments?: string[];
  ageGroups?: string[];
  genders?: string[];
}

export type AnalyticsMetric = 
  | 'appointments_count'
  | 'appointments_completed'
  | 'appointments_cancelled'
  | 'appointments_no_show'
  | 'patients_new'
  | 'patients_returning'
  | 'revenue_total'
  | 'revenue_insurance'
  | 'revenue_self_pay'
  | 'wait_time_average'
  | 'consultation_duration_average'
  | 'patient_satisfaction'
  | 'doctor_utilization';

export interface AnalyticsResponse {
  period: string;
  data: AnalyticsDataPoint[];
  summary: AnalyticsSummary;
  trends: AnalyticsTrend[];
  benchmarks?: AnalyticsBenchmark[];
}

export interface AnalyticsDataPoint {
  timestamp: string;
  period: string;
  metrics: Record<AnalyticsMetric, number>;
  dimensions?: Record<string, string>;
}

export interface AnalyticsSummary {
  totalPeriods: number;
  metrics: Record<AnalyticsMetric, {
    total: number;
    average: number;
    min: number;
    max: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export interface AnalyticsTrend {
  metric: AnalyticsMetric;
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  significance: 'low' | 'medium' | 'high';
  description: string;
}

export interface AnalyticsBenchmark {
  metric: AnalyticsMetric;
  value: number;
  benchmark: number;
  percentile: number;
  comparison: 'above' | 'below' | 'at';
  industry: string;
}

// ============= FILE UPLOAD TYPES =============
export interface FileUploadRequest extends BaseRequest {
  file: File | Blob;
  filename: string;
  contentType: string;
  category: FileCategory;
  description?: string;
  tags?: string[];
  isPublic?: boolean;
  expiresAt?: string;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  originalFilename: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  contentType: string;
  category: FileCategory;
  uploadedAt: string;
  expiresAt?: string;
  metadata: FileMetadata;
}

export interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  pages?: number;
  hash: string;
  virusScanStatus: 'pending' | 'clean' | 'infected' | 'failed';
  ocrText?: string;
}

export type FileCategory = 
  | 'patient_document'
  | 'medical_image'
  | 'lab_result'
  | 'prescription'
  | 'insurance_card'
  | 'profile_photo'
  | 'clinic_document'
  | 'report'
  | 'other';

// ============= NOTIFICATION TYPES =============
export interface NotificationListRequest extends PaginatedRequest {
  recipientId?: string;
  type?: NotificationType[];
  status?: NotificationStatus[];
  priority?: Priority[];
  read?: boolean;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface CreateNotificationRequest extends BaseRequest {
  recipientIds: string[];
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  priority: Priority;
  scheduledFor?: string;
  channels: NotificationChannel[];
  actionButtons?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  label: string;
  action: 'navigate' | 'api_call' | 'dismiss';
  data?: Record<string, any>;
}

export type NotificationType = 
  | 'appointment_reminder'
  | 'appointment_confirmation'
  | 'appointment_cancellation'
  | 'lab_result_ready'
  | 'prescription_ready'
  | 'prescription_refill'
  | 'insurance_expiry'
  | 'payment_reminder'
  | 'system_maintenance'
  | 'security_alert'
  | 'marketing'
  | 'general';

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'cancelled';
export type NotificationChannel = 'push' | 'email' | 'sms' | 'in_app';

// ============= SEARCH TYPES =============
export interface SearchRequest extends BaseRequest {
  query: string;
  entityTypes?: SearchEntityType[];
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  fuzzy?: boolean;
  highlight?: boolean;
}

export interface SearchFilters {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  tags?: string[];
  categories?: string[];
  status?: string[];
  [key: string]: any;
}

export type SearchEntityType = 
  | 'patients'
  | 'appointments'
  | 'medical_records'
  | 'prescriptions'
  | 'lab_results'
  | 'doctors'
  | 'procedures'
  | 'diagnoses'
  | 'medications';

export interface SearchResponse {
  query: string;
  totalResults: number;
  processingTime: number;
  results: SearchResult[];
  suggestions?: string[];
  facets?: SearchFacet[];
}

export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  description?: string;
  relevanceScore: number;
  highlights?: SearchHighlight[];
  metadata: Record<string, any>;
  url?: string;
}

export interface SearchHighlight {
  field: string;
  fragments: string[];
}

export interface SearchFacet {
  field: string;
  values: Array<{
    value: string;
    count: number;
  }>;
}

// ============= WEBHOOK TYPES =============
export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  timestamp: string;
  data: Record<string, any>;
  source: string;
  version: string;
  signature: string;
  attempt: number;
  maxAttempts: number;
}

export type WebhookEventType = 
  | 'patient.created'
  | 'patient.updated'
  | 'patient.deleted'
  | 'appointment.scheduled'
  | 'appointment.updated'
  | 'appointment.cancelled'
  | 'appointment.completed'
  | 'medical_record.created'
  | 'prescription.created'
  | 'lab_result.available'
  | 'payment.received'
  | 'user.login'
  | 'system.backup_completed';

// ============= HTTP CLIENT TYPES =============
export interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  defaultHeaders: Record<string, string>;
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
  };
}

export interface RequestInterceptor {
  (config: RequestConfig): RequestConfig | Promise<RequestConfig>;
}

export interface ResponseInterceptor {
  (response: ApiResponse): ApiResponse | Promise<ApiResponse>;
}

export interface RequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
  validateStatus?: (status: number) => boolean;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// ============= CACHE TYPES =============
export interface CacheConfig {
  ttl: number;
  maxSize: number;
  strategy: CacheStrategy;
  keyPrefix?: string;
  serialize?: boolean;
}

export type CacheStrategy = 'lru' | 'fifo' | 'ttl' | 'memory' | 'storage';

export interface CachedResponse<T> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
  size: number;
  hits: number;
}

// ============= REAL-TIME TYPES =============
export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectAttempts: number;
  reconnectDelay: number;
  heartbeatInterval: number;
  authentication?: {
    type: 'token' | 'query' | 'header';
    value: string;
  };
}

export interface WebSocketMessage {
  id: string;
  type: string;
  event: string;
  data: any;
  timestamp: string;
  room?: string;
  userId?: string;
}

export interface WebSocketSubscription {
  id: string;
  topic: string;
  filters?: Record<string, any>;
  callback: (message: WebSocketMessage) => void;
}

// ============= UTILITY TYPES =============
export type HttpStatus = 
  | 200 | 201 | 204 // Success
  | 400 | 401 | 403 | 404 | 409 | 422 | 429 // Client Errors  
  | 500 | 502 | 503 | 504; // Server Errors

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  cache?: boolean;
  validateStatus?: (status: number) => boolean;
}

// ============= EXPORTS FOR EXTERNAL USE =============
export type {
  // API Response types
  ApiResponse as Response,
  ApiError as Error,
  ErrorCode,
  
  // Request types
  PaginatedRequest as PagedRequest,
  BaseRequest as Request,
  
  // Auth types
  LoginRequest as Login,
  LoginResponse as LoginResult,
  RegisterRequest as Register,
  AuthUser as User,
  TokenPair as Tokens,
  
  // Patient types
  CreatePatientRequest as PatientCreate,
  UpdatePatientRequest as PatientUpdate,
  PatientListRequest as PatientQuery,
  
  // Appointment types
  CreateAppointmentRequest as AppointmentCreate,
  UpdateAppointmentRequest as AppointmentUpdate,
  AppointmentListRequest as AppointmentQuery,
  
  // Medical types
  CreateMedicalRecordRequest as MedicalRecordCreate,
  VitalSignsInput as VitalSigns,
  DiagnosisInput as Diagnosis,
  
  // Utility types
  HttpMethod,
  HttpStatus,
  RequestOptions,
  DeviceInfo,
};
