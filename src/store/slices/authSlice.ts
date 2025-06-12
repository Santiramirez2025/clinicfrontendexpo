import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'nurse' | 'admin' | 'receptionist' | 'patient' | 'demo'; // Agregué patient y demo
  specialization?: string;
  avatar?: string | null;
  license_number?: string;
  // Campos adicionales para pacientes
  phone?: string;
  skinType?: string;
  isDemo?: boolean;
  isNewUser?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log('🔄 AuthSlice: setUser llamado', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
      console.log('✅ AuthSlice: Usuario establecido', { 
        isAuthenticated: state.isAuthenticated,
        user: state.user?.name 
      });
    },
    setToken: (state, action: PayloadAction<string>) => {
      console.log('🔄 AuthSlice: setToken llamado');
      state.token = action.payload;
    },
    // Nueva acción combinada para login completo
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      console.log('🔄 AuthSlice: loginSuccess llamado', action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
      console.log('✅ AuthSlice: Login completado', { 
        isAuthenticated: state.isAuthenticated,
        user: state.user?.name 
      });
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      console.log('🚪 AuthSlice: logout llamado');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Para restore auth (útil para persistencia)
    restoreAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    checkAuthComplete: (state) => {
      state.isLoading = false;
    },
  },
});

export const { 
  setUser, 
  setToken, 
  loginSuccess, // Nueva acción exportada
  loginStart,
  loginFailure,
  logout, 
  setLoading, 
  setError, 
  clearError,
  restoreAuth,
  checkAuthComplete,
} = authSlice.actions;

export default authSlice.reducer;