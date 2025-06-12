export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}
