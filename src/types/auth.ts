export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor extends User {
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
  consultationFee: number;
  availability: DoctorAvailability[];
}

export interface Patient extends User {
  dateOfBirth: Date;
  gender: Gender;
  bloodType?: BloodType;
  emergencyContact: EmergencyContact;
  insurance?: InsuranceInfo;
}

export interface Staff extends User {
  department: string;
  position: string;
  permissions: Permission[];
}

export type UserRole = 'doctor' | 'patient' | 'admin' | 'receptionist' | 'nurse';
export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expiryDate: Date;
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
  isAvailable: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: UserRole;
  dateOfBirth?: Date;
  gender?: Gender;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
