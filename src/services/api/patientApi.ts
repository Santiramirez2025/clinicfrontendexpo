import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-url.com/api';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
}

class PatientAPI {
  private getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  getAllPatients = async (page = 1, limit = 20, search?: string): Promise<{
    patients: Patient[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const headers = await this.getAuthHeaders();
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response: AxiosResponse = await axios.get(
        `${API_BASE_URL}/patients?${params}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get patients error:', error);
      throw error;
    }
  };

  getPatientById = async (patientId: string): Promise<Patient> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Patient> = await axios.get(
        `${API_BASE_URL}/patients/${patientId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get patient error:', error);
      throw error;
    }
  };

  createPatient = async (patientData: CreatePatientRequest): Promise<Patient> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Patient> = await axios.post(
        `${API_BASE_URL}/patients`,
        patientData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Create patient error:', error);
      throw error;
    }
  };

  updatePatient = async (patientId: string, patientData: Partial<Patient>): Promise<Patient> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Patient> = await axios.put(
        `${API_BASE_URL}/patients/${patientId}`,
        patientData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Update patient error:', error);
      throw error;
    }
  };

  deletePatient = async (patientId: string): Promise<void> => {
    try {
      const headers = await this.getAuthHeaders();
      await axios.delete(`${API_BASE_URL}/patients/${patientId}`, { headers });
    } catch (error) {
      console.error('Delete patient error:', error);
      throw error;
    }
  };

  searchPatients = async (query: string): Promise<Patient[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Patient[]> = await axios.get(
        `${API_BASE_URL}/patients/search?q=${encodeURIComponent(query)}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Search patients error:', error);
      throw error;
    }
  };

  getPatientHistory = async (patientId: string): Promise<any[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/patients/${patientId}/history`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get patient history error:', error);
      throw error;
    }
  };

  uploadPatientDocument = async (patientId: string, document: FormData): Promise<any> => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        `${API_BASE_URL}/patients/${patientId}/documents`,
        document,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Upload document error:', error);
      throw error;
    }
  };
}

export const patientApi = new PatientAPI();
