import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'nurse' | 'admin' | 'receptionist';
  clinicId: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth || {});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('user_data');
      
      if (storedToken && storedUser) {
        setIsAuthenticated(true);
        // dispatch(setUser(JSON.parse(storedUser)));
        // dispatch(setToken(storedToken));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      // Simulated API call
      const response = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Dr. Juan Pérez',
          role: 'doctor' as const,
          clinicId: 'clinic_1'
        },
        token: 'mock_jwt_token_123'
      };

      await AsyncStorage.setItem('auth_token', response.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(response.user));
      
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  };

  const register = async (userData: any) => {
    try {
      // Simulated registration
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  return {
    user,
    token,
    isLoading: isLoading || false,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuthStatus,
  };
};
