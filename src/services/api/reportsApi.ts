import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-url.com/api';

export interface DashboardStats {
 todayAppointments: number;
 totalPatients: number;
 pendingAppointments: number;
 completedAppointments: number;
 revenue: {
   today: number;
   thisWeek: number;
   thisMonth: number;
 };
 appointmentsByStatus: {
   scheduled: number;
   confirmed: number;
   completed: number;
   cancelled: number;
   noShow: number;
 };
}

export interface AppointmentReport {
 period: string;
 totalAppointments: number;
 completedAppointments: number;
 cancelledAppointments: number;
 noShowAppointments: number;
 averageDuration: number;
 appointmentsByDay: {
   date: string;
   count: number;
 }[];
 appointmentsByType: {
   type: string;
   count: number;
 }[];
}

export interface PatientReport {
 period: string;
 totalPatients: number;
 newPatients: number;
 returningPatients: number;
 patientsByAge: {
   ageRange: string;
   count: number;
 }[];
 patientsByGender: {
   gender: string;
   count: number;
 }[];
 topDiagnoses: {
   diagnosis: string;
   count: number;
 }[];
}

export interface RevenueReport {
 period: string;
 totalRevenue: number;
 averagePerAppointment: number;
 revenueByDay: {
   date: string;
   amount: number;
 }[];
 revenueByService: {
   service: string;
   amount: number;
 }[];
 paymentMethods: {
   method: string;
   amount: number;
 }[];
}

export interface DoctorPerformanceReport {
 doctorId: string;
 doctorName: string;
 period: string;
 totalAppointments: number;
 completedAppointments: number;
 averageRating: number;
 totalRevenue: number;
 patientsSeen: number;
 specialization: string;
}

class ReportsAPI {
 private getAuthHeaders = async () => {
   const token = await AsyncStorage.getItem('auth_token');
   return {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json',
   };
 };

 // Dashboard Statistics
 getDashboardStats = async (): Promise<DashboardStats> => {
   try {
     const headers = await this.getAuthHeaders();
     const response: AxiosResponse<DashboardStats> = await axios.get(
       `${API_BASE_URL}/reports/dashboard`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get dashboard stats error:', error);
     throw error;
   }
 };

 // Appointment Reports
 getAppointmentReport = async (
   startDate: string,
   endDate: string,
   doctorId?: string
 ): Promise<AppointmentReport> => {
   try {
     const headers = await this.getAuthHeaders();
     const params = new URLSearchParams({
       startDate,
       endDate,
       ...(doctorId && { doctorId }),
     });

     const response: AxiosResponse<AppointmentReport> = await axios.get(
       `${API_BASE_URL}/reports/appointments?${params}`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get appointment report error:', error);
     throw error;
   }
 };

 // Patient Reports
 getPatientReport = async (
   startDate: string,
   endDate: string
 ): Promise<PatientReport> => {
   try {
     const headers = await this.getAuthHeaders();
     const params = new URLSearchParams({
       startDate,
       endDate,
     });

     const response: AxiosResponse<PatientReport> = await axios.get(
       `${API_BASE_URL}/reports/patients?${params}`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get patient report error:', error);
     throw error;
   }
 };

 // Revenue Reports
 getRevenueReport = async (
   startDate: string,
   endDate: string
 ): Promise<RevenueReport> => {
   try {
     const headers = await this.getAuthHeaders();
     const params = new URLSearchParams({
       startDate,
       endDate,
     });

     const response: AxiosResponse<RevenueReport> = await axios.get(
       `${API_BASE_URL}/reports/revenue?${params}`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get revenue report error:', error);
     throw error;
   }
 };

 // Doctor Performance
 getDoctorPerformanceReport = async (
   doctorId: string,
   startDate: string,
   endDate: string
 ): Promise<DoctorPerformanceReport> => {
   try {
     const headers = await this.getAuthHeaders();
     const params = new URLSearchParams({
       startDate,
       endDate,
     });

     const response: AxiosResponse<DoctorPerformanceReport> = await axios.get(
       `${API_BASE_URL}/reports/doctor/${doctorId}?${params}`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get doctor performance error:', error);
     throw error;
   }
 };

 // Export Reports
 exportReport = async (
   reportType: 'appointments' | 'patients' | 'revenue' | 'doctor',
   format: 'pdf' | 'excel',
   startDate: string,
   endDate: string,
   doctorId?: string
 ): Promise<{ downloadUrl: string }> => {
   try {
     const headers = await this.getAuthHeaders();
     const params = new URLSearchParams({
       type: reportType,
       format,
       startDate,
       endDate,
       ...(doctorId && { doctorId }),
     });

     const response: AxiosResponse<{ downloadUrl: string }> = await axios.post(
       `${API_BASE_URL}/reports/export?${params}`,
       {},
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Export report error:', error);
     throw error;
   }
 };

 // Analytics
 getWeeklyAnalytics = async (): Promise<{
   appointmentsThisWeek: number;
   appointmentsLastWeek: number;
   patientsThisWeek: number;
   patientsLastWeek: number;
   revenueThisWeek: number;
   revenueLastWeek: number;
 }> => {
   try {
     const headers = await this.getAuthHeaders();
     const response = await axios.get(
       `${API_BASE_URL}/reports/analytics/weekly`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get weekly analytics error:', error);
     throw error;
   }
 };

 getMonthlyAnalytics = async (): Promise<{
   appointmentsThisMonth: number;
   appointmentsLastMonth: number;
   patientsThisMonth: number;
   patientsLastMonth: number;
   revenueThisMonth: number;
   revenueLastMonth: number;
 }> => {
   try {
     const headers = await this.getAuthHeaders();
     const response = await axios.get(
       `${API_BASE_URL}/reports/analytics/monthly`,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Get monthly analytics error:', error);
     throw error;
   }
 };

 // Custom Reports
 generateCustomReport = async (config: {
   metrics: string[];
   filters: {
     dateRange: { start: string; end: string };
     doctorIds?: string[];
     patientIds?: string[];
     appointmentTypes?: string[];
   };
   groupBy?: 'day' | 'week' | 'month';
 }): Promise<any> => {
   try {
     const headers = await this.getAuthHeaders();
     const response = await axios.post(
       `${API_BASE_URL}/reports/custom`,
       config,
       { headers }
     );
     
     return response.data;
   } catch (error) {
     console.error('Generate custom report error:', error);
     throw error;
   }
 };
}

export const reportsApi = new ReportsAPI();
