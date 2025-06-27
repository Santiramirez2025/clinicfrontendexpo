// ============================================================================
// store/slices/authSlice.ts - SLICE CORREGIDO FINAL ✅
// ============================================================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ============================================================================
// TIPOS - COMPATIBLE CON types/auth.ts ✅
// ============================================================================
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'admin' | 'professional' | 'demo';
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
  
  // Campos específicos de la app
  firstName?: string;
  lastName?: string;
  beautyPoints?: number;
  sessionsCompleted?: number;
  vipStatus?: boolean;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// ESTADO INICIAL ✅
// ============================================================================
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// ============================================================================
// SLICE CON TODAS LAS ACCIONES NECESARIAS ✅
// ============================================================================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ ESTABLECER USUARIO
    setUser: (state, action: PayloadAction<User>) => {
      console.log('🔄 AuthSlice: setUser called with:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },

    // ✅ ESTABLECER TOKEN
    setToken: (state, action: PayloadAction<string>) => {
      console.log('🔄 AuthSlice: setToken called');
      state.token = action.payload;
    },

    // ✅ LOGIN EXITOSO (COMBINA USUARIO Y TOKEN)
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      console.log('🔄 AuthSlice: loginSuccess called');
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    // ✅ ESTABLECER ESTADO DE CARGA - CORREGIDO
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ✅ ESTABLECER ERROR
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ LIMPIAR ERROR
    clearError: (state) => {
      state.error = null;
    },

    // ✅ LOGOUT / CLEAR USER
    logout: (state) => {
      console.log('🔄 AuthSlice: logout called');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    // ✅ ALIAS PARA LOGOUT
    clearUser: (state) => {
      console.log('🔄 AuthSlice: clearUser called');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    // ✅ ACTUALIZAR USUARIO
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // ✅ ACTUALIZAR PUNTOS DE BELLEZA
    updateBeautyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.beautyPoints = action.payload;
      }
    },

    // ✅ INCREMENTAR PUNTOS DE BELLEZA
    incrementBeautyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.beautyPoints = (state.user.beautyPoints || 0) + action.payload;
      }
    },

    // ✅ ACTUALIZAR ESTADO VIP
    updateVipStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.vipStatus = action.payload;
      }
    },

    // ✅ INCREMENTAR SESIONES COMPLETADAS
    incrementSessions: (state) => {
      if (state.user) {
        state.user.sessionsCompleted = (state.user.sessionsCompleted || 0) + 1;
      }
    },

    // ✅ ESTABLECER AUTENTICACIÓN
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.loading = false;
      if (!action.payload) {
        state.user = null;
        state.token = null;
      }
    },

    // ✅ RESTABLECER ESTADO (ÚTIL PARA DESARROLLO)
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },

    // ✅ ACTUALIZAR PERFIL
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { 
          ...state.user, 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },

    // ✅ ESTABLECER SESIÓN COMPLETA
    setSession: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
  },
});

// ============================================================================
// EXPORTAR TODAS LAS ACCIONES ✅
// ============================================================================
export const {
  setUser,
  setToken,
  loginSuccess,
  setLoading,
  setError,
  clearError,
  logout,
  clearUser,
  updateUser,
  updateBeautyPoints,
  incrementBeautyPoints,
  updateVipStatus,
  incrementSessions,
  setAuthenticated,
  resetAuthState,
  updateProfile,
  setSession,
} = authSlice.actions;

// ============================================================================
// EXPORTAR REDUCER ✅
// ============================================================================
export default authSlice.reducer;

// ============================================================================
// SELECTORES ÚTILES ✅
// ============================================================================
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

// Selectores específicos del usuario
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectBeautyPoints = (state: { auth: AuthState }) => state.auth.user?.beautyPoints || 0;
export const selectVipStatus = (state: { auth: AuthState }) => state.auth.user?.vipStatus || false;
export const selectUserName = (state: { auth: AuthState }) => state.auth.user?.name;
export const selectUserEmail = (state: { auth: AuthState }) => state.auth.user?.email;

// Selectores calculados
export const selectIsVip = (state: { auth: AuthState }) => state.auth.user?.vipStatus === true;
export const selectCanBookVip = (state: { auth: AuthState }) => {
  const points = state.auth.user?.beautyPoints || 0;
  return points >= 100;
};

// ============================================================================
// TIPOS PARA TYPESCRIPT ✅
// ============================================================================
export type AuthActions = typeof authSlice.actions;
export type AuthActionTypes = keyof AuthActions;