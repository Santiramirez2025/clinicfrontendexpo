import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-url.com/api';

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  date: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  assessment: string;
  plan: string;
  diagnosis: Diagnosis[];
  prescriptions: Prescription[];
  labOrders: LabOrder[];
  vitalSigns: VitalSigns;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Diagnosis {
  id: string;
  code: string; // ICD-10 code
  description: string;
  type: 'primary' | 'secondary';
  status: 'active' | 'resolved' | 'chronic';
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface LabOrder {
  id: string;
  testName: string;
  testCode: string;
  urgency: 'routine' | 'urgent' | 'stat';
  status: 'ordered' | 'in-progress' | 'completed' | 'cancelled';
  orderedDate: string;
  results?: LabResult[];
}

export interface LabResult {
  id: string;
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  resultDate: string;
}

export interface VitalSigns {
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  height: number;
  weight: number;
  bmi: number;
  recordedAt: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  url: string;
}

export interface CreateMedicalRecordRequest {
  patientId: string;
  appointmentId?: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  assessment: string;
  plan: string;
  diagnosis?: Omit<Diagnosis, 'id'>[];
  prescriptions?: Omit<Prescription, 'id' | 'prescribedDate' | 'status'>[];
  labOrders?: Omit<LabOrder, 'id' | 'orderedDate' | 'status'>[];
  vitalSigns?: Omit<VitalSigns, 'recordedAt'>;
}

class MedicalAPI {
  private getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  // Medical Records
  getMedicalRecords = async (
    patientId: string,
    page = 1,
    limit = 20
  ): Promise<{
    records: MedicalRecord[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse = await axios.get(
        `${API_BASE_URL}/medical-records/patient/${patientId}?page=${page}&limit=${limit}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get medical records error:', error);
      throw error;
    }
  };

  getMedicalRecordById = async (recordId: string): Promise<MedicalRecord> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<MedicalRecord> = await axios.get(
        `${API_BASE_URL}/medical-records/${recordId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get medical record error:', error);
      throw error;
    }
  };

  createMedicalRecord = async (recordData: CreateMedicalRecordRequest): Promise<MedicalRecord> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<MedicalRecord> = await axios.post(
        `${API_BASE_URL}/medical-records`,
        recordData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Create medical record error:', error);
      throw error;
    }
  };

  updateMedicalRecord = async (
    recordId: string,
    recordData: Partial<MedicalRecord>
  ): Promise<MedicalRecord> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<MedicalRecord> = await axios.put(
        `${API_BASE_URL}/medical-records/${recordId}`,
        recordData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Update medical record error:', error);
      throw error;
    }
  };

  // Prescriptions
  getPatientPrescriptions = async (patientId: string): Promise<Prescription[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Prescription[]> = await axios.get(
        `${API_BASE_URL}/prescriptions/patient/${patientId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get prescriptions error:', error);
      throw error;
    }
  };

  createPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'prescribedDate' | 'status'>): Promise<Prescription> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Prescription> = await axios.post(
        `${API_BASE_URL}/prescriptions`,
        prescriptionData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Create prescription error:', error);
      throw error;
    }
  };

  // Lab Orders
  getPatientLabOrders = async (patientId: string): Promise<LabOrder[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<LabOrder[]> = await axios.get(
        `${API_BASE_URL}/lab-orders/patient/${patientId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get lab orders error:', error);
      throw error;
    }
  };

  createLabOrder = async (labOrderData: Omit<LabOrder, 'id' | 'orderedDate' | 'status'>): Promise<LabOrder> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<LabOrder> = await axios.post(
        `${API_BASE_URL}/lab-orders`,
        labOrderData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Create lab order error:', error);
      throw error;
    }
  };

  // Vital Signs
  recordVitalSigns = async (patientId: string, vitalSigns: Omit<VitalSigns, 'recordedAt'>): Promise<VitalSigns> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<VitalSigns> = await axios.post(
        `${API_BASE_URL}/vital-signs/patient/${patientId}`,
        vitalSigns,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Record vital signs error:', error);
      throw error;
    }
  };

  getPatientVitalSigns = async (patientId: string, limit = 10): Promise<VitalSigns[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<VitalSigns[]> = await axios.get(
        `${API_BASE_URL}/vital-signs/patient/${patientId}?limit=${limit}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get vital signs error:', error);
      throw error;
    }
  };

  // File Attachments
  uploadMedicalAttachment = async (recordId: string, file: FormData): Promise<Attachment> => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response: AxiosResponse<Attachment> = await axios.post(
        `${API_BASE_URL}/medical-records/${recordId}/attachments`,
        file,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Upload attachment error:', error);
      throw error;
    }
  };
}

export const medicalApi = new MedicalAPI();
