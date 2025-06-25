// ============================================================================
// services/authService.ts - SERVICIO DE AUTENTICACIÓN
// ============================================================================
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './apiClient';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  vipStatus: boolean;
  beautyPoints: number;
  isDemo?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

class AuthService {
  // Demo Login
  async demoLogin(): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/demo-login');
      
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Guardar tokens en storage
        await this.storeTokens(tokens);
        await this.storeUser(user);
        
        return { user, tokens };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Demo login error:', error);
      throw new Error(error.response?.data?.error?.message || 'Error en login demo');
    }
  }

  // Login tradicional
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Guardar tokens en storage
        await this.storeTokens(tokens);
        await this.storeUser(user);
        
        return { user, tokens };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error?.message || 'Error en el login');
    }
  }

  // Registro
  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Guardar tokens en storage
        await this.storeTokens(tokens);
        await this.storeUser(user);
        
        return { user, tokens };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.response?.data?.error?.message || 'Error en el registro');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
      // Continuar con la limpieza local aunque falle la API
    } finally {
      // Limpiar storage local
      await this.clearStorage();
    }
  }

  // Recuperar contraseña
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      
      if (response.data.success) {
        return { message: response.data.message };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      throw new Error(error.response?.data?.error?.message || 'Error al enviar recuperación');
    }
  }

  // Verificar token de reset
  async verifyResetToken(token: string): Promise<{ email: string; firstName: string }> {
    try {
      const response = await apiClient.get(`/auth/verify-reset-token/${token}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Verify reset token error:', error);
      throw new Error(error.response?.data?.error?.message || 'Token inválido o expirado');
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword
      });
      
      if (response.data.success) {
        return { message: response.data.message };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.response?.data?.error?.message || 'Error al resetear contraseña');
    }
  }

  // Helpers para storage
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    await AsyncStorage.multiSet([
      ['authToken', tokens.accessToken],
      ['refreshToken', tokens.refreshToken],
    ]);
  }

  private async storeUser(user: User): Promise<void> {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  private async clearStorage(): Promise<void> {
    await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'user']);
  }

  // Verificar si hay tokens guardados
  async getStoredTokens(): Promise<AuthTokens | null> {
    try {
      const [[, accessToken], [, refreshToken]] = await AsyncStorage.multiGet([
        'authToken',
        'refreshToken'
      ]);

      if (accessToken && refreshToken) {
        return {
          accessToken,
          refreshToken,
          expiresIn: '1h' // Default
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting stored tokens:', error);
      return null;
    }
  }

  // Obtener usuario guardado
  async getStoredUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  // Verificar si está autenticado
  async isAuthenticated(): Promise<boolean> {
    const tokens = await this.getStoredTokens();
    return !!tokens?.accessToken;
  }
}

export const authService = new AuthService();