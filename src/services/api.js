// ============================================================================
// services/api.js - VERSIÓN FINAL COMPLETA Y LISTA
// ============================================================================
import * as SecureStore from 'expo-secure-store';

// ⚠️ CAMBIAR POR TU IP LOCAL (ipconfig en Windows, ifconfig en Mac/Linux)
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.174:3000/api' // 🔄 CAMBIAR ESTA IP POR LA TUYA
  : 'https://tu-backend-production.railway.app/api';

class ApiService {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  async request(endpoint, options = {}) {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      console.log(`🌐 ${config.method} ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      // Manejar respuestas 401 (token expirado)
      if (response.status === 401 && token) {
        console.log('🔄 Token expirado, intentando renovar...');
        return this.handleTokenRefresh(endpoint, options);
      }

      const data = await response.json();
      console.log(`📡 Status: ${response.status}`);

      if (!response.ok) {
        const errorMessage = data.error?.message || data.message || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      console.log(`✅ Success: ${endpoint}`);
      return data;
      
    } catch (error) {
      console.error(`❌ API Error [${endpoint}]:`, error.message);
      
      // Personalizar mensajes de error para mejor UX
      if (error.message.includes('fetch')) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      }
      
      if (error.message.includes('Network')) {
        throw new Error('Error de conexión. Intenta nuevamente.');
      }
      
      throw error;
    }
  }

  async handleTokenRefresh(originalEndpoint, originalOptions) {
    if (this.isRefreshing) {
      // Si ya se está renovando, agregar a la cola
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject, endpoint: originalEndpoint, options: originalOptions });
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.data?.tokens) {
          await SecureStore.setItemAsync('accessToken', data.data.tokens.accessToken);
          await SecureStore.setItemAsync('refreshToken', data.data.tokens.refreshToken);
          
          console.log('✅ Token renovado exitosamente');
          
          // Procesar cola de requests fallidos
          this.failedQueue.forEach(({ resolve, endpoint, options }) => {
            resolve(this.request(endpoint, options));
          });
          this.failedQueue = [];
          
          // Reintentar request original
          return this.request(originalEndpoint, originalOptions);
        }
      }
      
      throw new Error('Failed to refresh token');
      
    } catch (error) {
      console.error('❌ Error renovando token:', error);
      
      // Limpiar tokens y rechazar cola
      await this.logout();
      this.failedQueue.forEach(({ reject }) => {
        reject(new Error('Session expired'));
      });
      this.failedQueue = [];
      
      throw new Error('Sesión expirada. Inicia sesión nuevamente.');
    } finally {
      this.isRefreshing = false;
    }
  }

  // ========================================================================
  // AUTENTICACIÓN
  // ========================================================================

  async demoLogin() {
    console.log('🎭 Demo login...');
    const response = await this.request('/auth/demo-login', { method: 'POST' });
    
    if (response.success && response.data?.tokens) {
      await SecureStore.setItemAsync('accessToken', response.data.tokens.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.data.tokens.refreshToken);
      console.log('🎫 Demo tokens saved');
    }
    
    return response;
  }

  async login(email, password) {
    console.log('🔐 Login:', email);
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: email.toLowerCase().trim(), 
        password 
      }),
    });
    
    if (response.success && response.data?.tokens) {
      await SecureStore.setItemAsync('accessToken', response.data.tokens.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.data.tokens.refreshToken);
      console.log('🎫 Login tokens saved');
    }
    
    return response;
  }

  async register(userData) {
    console.log('📝 Register:', userData.email);
    
    // Asegurar que el payload coincida exactamente con las validaciones del backend
    const payload = {
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone.trim(),
      password: userData.password,
      // Incluir preferencias de notificación si existen
      ...(userData.notificationPreferences && { 
        notificationPreferences: userData.notificationPreferences 
      }),
    };

    console.log('📤 Payload enviado:', { ...payload, password: '[HIDDEN]' });

    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    if (response.success && response.data?.tokens) {
      await SecureStore.setItemAsync('accessToken', response.data.tokens.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.data.tokens.refreshToken);
      console.log('🎫 Register tokens saved');
    }
    
    return response;
  }

  async logout() {
    console.log('👋 Logout...');
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.log('⚠️ Logout endpoint failed, continuing cleanup');
    }
    
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    console.log('🧹 Tokens cleared');
  }

  // ========================================================================
  // 🔑 FORGOT PASSWORD METHODS
  // ========================================================================

  async forgotPassword(email) {
    console.log('🔑 API: Forgot password for:', email);
    
    const response = await this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ 
        email: email.toLowerCase().trim() 
      }),
    });
    
    console.log('📧 API: Forgot password response:', response.success);
    return response;
  }

  async verifyResetToken(token) {
    console.log('🔍 API: Verifying reset token...');
    
    const response = await this.request(`/auth/verify-reset-token/${token}`);
    
    console.log('✅ API: Token verification:', response.success);
    return response;
  }

  async resetPassword(token, newPassword) {
    console.log('🔑 API: Resetting password...');
    
    const response = await this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token,
        newPassword
      }),
    });
    
    console.log('✅ API: Password reset:', response.success);
    return response;
  }

  // ========================================================================
  // DASHBOARD
  // ========================================================================

  async getDashboard() {
    console.log('📊 Getting dashboard data...');
    return this.request('/dashboard');
  }

  async getBeautyPoints() {
    console.log('💎 Getting beauty points...');
    return this.request('/dashboard/beauty-points');
  }

  // ========================================================================
  // VIP
  // ========================================================================

  async getVIPBenefits() {
    console.log('👑 Getting VIP benefits...');
    return this.request('/vip/benefits');
  }

  async getVIPStatus() {
    console.log('👑 Getting VIP status...');
    return this.request('/vip/status');
  }

  async getVIPTestimonials() {
    console.log('👑 Getting VIP testimonials...');
    return this.request('/vip/testimonials');
  }

  async getVIPOffers() {
    console.log('👑 Getting VIP offers...');
    return this.request('/vip/offers');
  }

  async subscribeVIP(planType = 'MONTHLY', paymentMethodId = null) {
    console.log('👑 Subscribing to VIP:', planType);
    const payload = { planType };
    if (paymentMethodId) {
      payload.paymentMethodId = paymentMethodId;
    }
    
    return this.request('/vip/subscribe', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async cancelVIPSubscription() {
    console.log('👑 Canceling VIP subscription...');
    return this.request('/vip/cancel', { method: 'PUT' });
  }

  // ========================================================================
  // CITAS / APPOINTMENTS
  // ========================================================================

  async getAppointments(params = {}) {
    console.log('📅 Getting appointments...');
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/appointments?${queryString}` : '/appointments';
    return this.request(endpoint);
  }

  async getAvailability(treatmentId, date) {
    console.log('📅 Getting availability for:', treatmentId, date);
    return this.request(`/appointments/availability?treatmentId=${treatmentId}&date=${date}`);
  }

  async createAppointment(appointmentData) {
    console.log('📅 Creating appointment:', appointmentData);
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(appointmentId, updateData) {
    console.log('📅 Updating appointment:', appointmentId);
    return this.request(`/appointments/${appointmentId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async cancelAppointment(appointmentId) {
    console.log('📅 Canceling appointment:', appointmentId);
    return this.request(`/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // PERFIL / PROFILE
  // ========================================================================

  async getProfile() {
    console.log('👤 Getting profile...');
    return this.request('/profile');
  }

  async updateProfile(profileData) {
    console.log('👤 Updating profile...');
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getProfileStats() {
    console.log('👤 Getting profile stats...');
    return this.request('/profile/stats');
  }

  async getProfileHistory(params = {}) {
    console.log('👤 Getting profile history...');
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/profile/history?${queryString}` : '/profile/history';
    return this.request(endpoint);
  }

  async updateNotificationPreferences(preferences) {
    console.log('👤 Updating notification preferences...');
    return this.request('/profile/notifications', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async inviteFriend(email, personalMessage = '') {
    console.log('👤 Inviting friend:', email);
    return this.request('/profile/invite', {
      method: 'POST',
      body: JSON.stringify({ email, personalMessage }),
    });
  }

  async changePassword(currentPassword, newPassword) {
    console.log('👤 Changing password...');
    return this.request('/profile/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ========================================================================
  // TRATAMIENTOS
  // ========================================================================

  async getTreatments() {
    console.log('💆‍♀️ Getting treatments...');
    return this.request('/treatments');
  }

  async getTreatment(treatmentId) {
    console.log('💆‍♀️ Getting treatment:', treatmentId);
    return this.request(`/treatments/${treatmentId}`);
  }

  // ========================================================================
  // UTILIDADES
  // ========================================================================

  async checkConnection() {
    try {
      const healthUrl = API_BASE_URL.replace('/api', '/health');
      console.log('🔌 Verificando conexión:', healthUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const isConnected = response.ok;
      console.log(`🔌 Conexión: ${isConnected ? 'OK' : 'FAIL'}`);
      return isConnected;
      
    } catch (error) {
      console.error('🔌 Connection failed:', error.message);
      return false;
    }
  }

  async isAuthenticated() {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) return null;

      return await this.getProfile();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

// ============================================================================
// INSTANCIA ÚNICA
// ============================================================================
const apiService = new ApiService();

// ============================================================================
// EXPORTACIÓN PRINCIPAL PARA DASHBOARDSCREEN Y OTRAS PANTALLAS
// ============================================================================
export const api = apiService; // ✅ Esta es la exportación principal

// Exportar instancia por defecto
export default apiService;

// ============================================================================
// EXPORTACIONES ESPECÍFICAS PARA IMPORTS FÁCILES
// ============================================================================

export const authAPI = {
  login: (email, password) => apiService.login(email, password),
  register: (userData) => apiService.register(userData),
  demoLogin: () => apiService.demoLogin(),
  logout: () => apiService.logout(),
  isAuthenticated: () => apiService.isAuthenticated(),
  getCurrentUser: () => apiService.getCurrentUser(),
  
  // 🔑 FORGOT PASSWORD METHODS
  forgotPassword: (email) => apiService.forgotPassword(email),
  verifyResetToken: (token) => apiService.verifyResetToken(token),
  resetPassword: (token, newPassword) => apiService.resetPassword(token, newPassword),
};

export const dashboardAPI = {
  getDashboard: () => apiService.getDashboard(),
  getBeautyPoints: () => apiService.getBeautyPoints(),
};

export const vipAPI = {
  getBenefits: () => apiService.getVIPBenefits(),
  getStatus: () => apiService.getVIPStatus(),
  getTestimonials: () => apiService.getVIPTestimonials(),
  getOffers: () => apiService.getVIPOffers(),
  subscribe: (planType, paymentMethodId) => apiService.subscribeVIP(planType, paymentMethodId),
  cancel: () => apiService.cancelVIPSubscription(),
};

export const appointmentAPI = {
  getAll: (params) => apiService.getAppointments(params),
  getAvailability: (treatmentId, date) => apiService.getAvailability(treatmentId, date),
  create: (data) => apiService.createAppointment(data),
  update: (id, data) => apiService.updateAppointment(id, data),
  cancel: (id) => apiService.cancelAppointment(id),
};

export const profileAPI = {
  get: () => apiService.getProfile(),
  update: (data) => apiService.updateProfile(data),
  getStats: () => apiService.getProfileStats(),
  getHistory: (params) => apiService.getProfileHistory(params),
  updateNotifications: (preferences) => apiService.updateNotificationPreferences(preferences),
  inviteFriend: (email, message) => apiService.inviteFriend(email, message),
  changePassword: (current, newPass) => apiService.changePassword(current, newPass),
};

export const treatmentAPI = {
  getAll: () => apiService.getTreatments(),
  getById: (id) => apiService.getTreatment(id),
};

// ============================================================================
// UTILIDADES ADICIONALES
// ============================================================================

export const apiUtils = {
  checkConnection: () => apiService.checkConnection(),
  isAuthenticated: () => apiService.isAuthenticated(),
  getCurrentUser: () => apiService.getCurrentUser(),
};

// Hook personalizado para manejo de errores
export const handleApiError = (error, defaultMessage = 'Ocurrió un error inesperado') => {
  console.error('API Error:', error);
  
  let userMessage = defaultMessage;
  
  if (error?.message) {
    userMessage = error.message;
  } else if (typeof error === 'string') {
    userMessage = error;
  }

  // Personalizar mensajes según el tipo de error
  if (userMessage.includes('Network') || userMessage.includes('fetch')) {
    userMessage = 'Error de conexión. Verifica tu internet.';
  } else if (userMessage.includes('401') || userMessage.includes('Unauthorized')) {
    userMessage = 'Sesión expirada. Inicia sesión nuevamente.';
  } else if (userMessage.includes('403') || userMessage.includes('Forbidden')) {
    userMessage = 'No tienes permisos para realizar esta acción.';
  } else if (userMessage.includes('404') || userMessage.includes('Not Found')) {
    userMessage = 'El recurso solicitado no existe.';
  } else if (userMessage.includes('500') || userMessage.includes('Internal Server')) {
    userMessage = 'Error del servidor. Intenta más tarde.';
  }

  return userMessage;
};

// ============================================================================
// EJEMPLOS DE USO PARA DEBUGGING
// ============================================================================

/*
// EJEMPLO 1: Login
import { authAPI } from './services/api';

const handleLogin = async () => {
  try {
    const response = await authAPI.login('user@email.com', 'password123');
    console.log('Login exitoso:', response.data.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// EJEMPLO 2: Dashboard
import { dashboardAPI } from './services/api';

const loadDashboard = async () => {
  try {
    const response = await dashboardAPI.getDashboard();
    console.log('Dashboard data:', response.data);
  } catch (error) {
    console.error('Dashboard error:', error.message);
  }
};

// EJEMPLO 3: API Principal
import { api } from './services/api';

const checkConnection = async () => {
  const isConnected = await api.checkConnection();
  console.log('Connected:', isConnected);
};
*/