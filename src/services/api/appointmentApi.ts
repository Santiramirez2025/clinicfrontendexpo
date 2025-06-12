import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-url.com/api';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  datetime: string;
  duration: number; // in minutes
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  symptoms?: string[];
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  datetime: string;
  duration?: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  reason: string;
  notes?: string;
  symptoms?: string[];
}

export interface UpdateAppointmentRequest {
  datetime?: string;
  duration?: number;
  type?: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  status?: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  symptoms?: string[];
}

class AppointmentAPI {
  private getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  getAllAppointments = async (
    page = 1,
    limit = 20,
    filters?: {
      doctorId?: string;
      patientId?: string;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    }
  ): Promise<{
    appointments: Appointment[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const headers = await this.getAuthHeaders();
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response: AxiosResponse = await axios.get(
        `${API_BASE_URL}/appointments?${params}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get appointments error:', error);
      throw error;
    }
  };

  getAppointmentById = async (appointmentId: string): Promise<Appointment> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Appointment> = await axios.get(
        `${API_BASE_URL}/appointments/${appointmentId}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get appointment error:', error);
      throw error;
    }
  };

  createAppointment = async (appointmentData: CreateAppointmentRequest): Promise<Appointment> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Appointment> = await axios.post(
        `${API_BASE_URL}/appointments`,
        appointmentData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Create appointment error:', error);
      throw error;
    }
  };

  updateAppointment = async (
    appointmentId: string,
    appointmentData: UpdateAppointmentRequest
  ): Promise<Appointment> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Appointment> = await axios.put(
        `${API_BASE_URL}/appointments/${appointmentId}`,
        appointmentData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Update appointment error:', error);
      throw error;
    }
  };

  cancelAppointment = async (appointmentId: string, reason?: string): Promise<void> => {
    try {
      const headers = await this.getAuthHeaders();
      await axios.patch(
        `${API_BASE_URL}/appointments/${appointmentId}/cancel`,
        { reason },
        { headers }
      );
    } catch (error) {
      console.error('Cancel appointment error:', error);
      throw error;
    }
  };

  confirmAppointment = async (appointmentId: string): Promise<void> => {
    try {
      const headers = await this.getAuthHeaders();
      await axios.patch(
        `${API_BASE_URL}/appointments/${appointmentId}/confirm`,
        {},
        { headers }
      );
    } catch (error) {
      console.error('Confirm appointment error:', error);
      throw error;
    }
  };

  getAvailableSlots = async (
    doctorId: string,
    date: string
  ): Promise<{ time: string; available: boolean }[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/appointments/availability/${doctorId}/${date}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get available slots error:', error);
      throw error;
    }
  };

  getTodayAppointments = async (): Promise<Appointment[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const today = new Date().toISOString().split('T')[0];
      const response: AxiosResponse<Appointment[]> = await axios.get(
        `${API_BASE_URL}/appointments/today`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get today appointments error:', error);
      throw error;
    }
  };

  getUpcomingAppointments = async (limit = 10): Promise<Appointment[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Appointment[]> = await axios.get(
        `${API_BASE_URL}/appointments/upcoming?limit=${limit}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Get upcoming appointments error:', error);
      throw error;
    }
  };

  searchAppointments = async (query: string): Promise<Appointment[]> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<Appointment[]> = await axios.get(
        `${API_BASE_URL}/appointments/search?q=${encodeURIComponent(query)}`,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Search appointments error:', error);
      throw error;
    }
  };
}

export const appointmentApi = new AppointmentAPI();
