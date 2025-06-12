export { authApi } from './authApi';
export { patientApi } from './patientApi';
export { appointmentApi } from './appointmentApi';
export { medicalApi } from './medicalApi';
export { reportsApi } from './reportsApi';

// Re-export types
export type { Patient, CreatePatientRequest } from './patientApi';
export type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from './appointmentApi';
export type { 
 MedicalRecord, 
 Diagnosis, 
 Prescription, 
 LabOrder, 
 VitalSigns, 
 CreateMedicalRecordRequest 
} from './medicalApi';
export type { 
 DashboardStats, 
 AppointmentReport, 
 PatientReport, 
 RevenueReport, 
 DoctorPerformanceReport 
} from './reportsApi';
