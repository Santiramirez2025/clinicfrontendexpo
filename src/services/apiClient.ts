// ============================================================================
// services/apiClient.ts - CLIENTE API CONFIGURADO
// ============================================================================
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración base
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.174:3000/api'  // Desarrollo
  : 'https://tu-api.com/api';    // Producción

// Crear instancia de axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si es error 401 y no hemos intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken
          });

          if (response.data.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
            
            await AsyncStorage.setItem('authToken', accessToken);
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
            
            // Reintentar la petición original
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir al login
        await AsyncStorage.multiRemove(['authToken', 'refreshToken', 'user']);
        // Aquí podrías disparar una acción para logout
        console.error('Token refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper para manejar errores de API
export const handleApiError = (error: any): string => {
  if (error.response) {
    // El servidor respondió con un código de error
    const message = error.response.data?.error?.message || 
                   error.response.data?.message || 
                   'Error del servidor';
    return message;
  } else if (error.request) {
    // La petición se hizo pero no se recibió respuesta
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  } else {
    // Error en la configuración de la petición
    return error.message || 'Error inesperado';
  }
};

// Helper para verificar si el usuario está autenticado
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  } catch {
    return false;
  }
};

// Helper para obtener headers con token
export const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};