import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-url.com/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'doctor' | 'nurse' | 'admin';
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

class AuthAPI {
  private getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      
      // Store token
      await AsyncStorage.setItem('auth_token', response.data.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      
      await AsyncStorage.setItem('auth_token', response.data.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  logout = async (): Promise<void> => {
    try {
      const headers = await this.getAuthHeaders();
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers });
      
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
    } catch (error) {
      console.error('Logout error:', error);
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
    }
  };

  refreshToken = async (): Promise<string> => {
    try {
      const headers = await this.getAuthHeaders();
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        { headers }
      );
      
      await AsyncStorage.setItem('auth_token', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}/auth/me`, { headers });
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  };

  forgotPassword = async (email: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        password: newPassword,
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };
}

export const authApi = new AuthAPI();
