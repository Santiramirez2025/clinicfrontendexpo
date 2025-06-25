// ============================================================================
// store/slices/authSlice.ts - SLICE CORREGIDO FINAL
// ============================================================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ============================================================================
// TIPOS - DEBE COINCIDIR CON TU ESTRUCTURA EXISTENTE
// ============================================================================
export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  beautyPoints: number;
  sessionsCompleted: number;
  vipStatus: boolean;
  role: 'patient' | 'admin' | 'professional' | 'demo';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// ESTADO INICIAL
// ============================================================================
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Inicialmente true para verificar sesión
  error: null,
};

// ============================================================================
// SLICE CON TODAS LAS ACCIONES NECESARIAS
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
      state.isLoading = false;
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
      state.isLoading = false;
      state.error = null;
    },

    // ✅ ESTABLECER ESTADO DE CARGA
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // ✅ ESTABLECER ERROR
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // ✅ LIMPIAR ERROR
    clearError: (state) => {
      state.error = null;
    },

    // ✅ LOGOUT
    logout: (state) => {
      console.log('🔄 AuthSlice: logout called');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
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

    // ✅ ACTUALIZAR ESTADO VIP
    updateVipStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.vipStatus = action.payload;
      }
    },

    // ✅ ESTABLECER AUTENTICACIÓN
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.user = null;
        state.token = null;
      }
    },
  },
});

// ============================================================================
// EXPORTAR TODAS LAS ACCIONES - ESTO ES CRÍTICO
// ============================================================================
export const {
  setUser,           // ✅ Esta debe existir
  setToken,          // ✅ Esta debe existir
  loginSuccess,      // ✅ Alternativa que combina ambas
  setLoading,
  setError,
  clearError,
  logout,
  updateUser,
  updateBeautyPoints,
  updateVipStatus,
  setAuthenticated,
} = authSlice.actions;

// ============================================================================
// EXPORTAR REDUCER
// ============================================================================
export default authSlice.reducer;

// ============================================================================
// SELECTORES ÚTILES
// ============================================================================
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;