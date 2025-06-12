export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescriptions: Prescription[];
  vitalSigns: VitalSigns;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  oxygenSaturation?: number;
}

export interface MedicalState {
  records: MedicalRecord[];
  selectedRecord: MedicalRecord | null;
  isLoading: boolean;
  error: string | null;
}
