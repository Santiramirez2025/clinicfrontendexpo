// ============================================================================
// src/store/slices/authSlice.ts - INTEGRADO CON API SERVICE - CORREGIDO
// ============================================================================
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, handleApiError } from '../../services/api'; // ✅ Usar tu API service

// ============================================================================
// INTERFACES MEJORADAS
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isDemo?: boolean;
  vipStatus: boolean;
  beautyPoints: number;
  sessionsCompleted: number;
  avatarUrl?: string;
  phone?: string;
  skinType?: string;
  totalInvestment?: number;
  memberSince?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastLoginTime?: string;
  tokenExpiresAt?: string;
}

// ============================================================================
// ESTADO INICIAL
// ============================================================================

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastLoginTime: undefined,
  tokenExpiresAt: undefined,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Función para transformar datos del backend al formato de la app
const transformBackendUser = (backendUser: any, isDemo = false): User => {
  return {
    id: backendUser.id,
    name: `${backendUser.firstName} ${backendUser.lastName}`,
    email: backendUser.email,
    firstName: backendUser.firstName,
    lastName: backendUser.lastName,
    role: isDemo ? 'demo' : 'patient',
    isDemo: isDemo,
    vipStatus: backendUser.vipStatus || false,
    beautyPoints: backendUser.beautyPoints || 0,
    sessionsCompleted: backendUser.sessionsCompleted || 0,
    avatarUrl: backendUser.avatarUrl || undefined,
    phone: backendUser.phone || undefined,
    skinType: backendUser.skinType || undefined,
    totalInvestment: backendUser.totalInvestment || 0,
    memberSince: backendUser.memberSince || backendUser.createdAt || new Date().toISOString(),
  };
};

// Función para calcular expiración del token
const calculateTokenExpiration = (expiresIn: string = '1h'): string => {
  const now = new Date();
  const duration = expiresIn.includes('h') 
    ? parseInt(expiresIn) * 60 * 60 * 1000 
    : parseInt(expiresIn) * 60 * 1000;
  
  return new Date(now.getTime() + duration).toISOString();
};

// ============================================================================
// ASYNC THUNKS - USANDO API SERVICE (SIN DUPLICACIÓN)
// ============================================================================

export const demoLogin = createAsyncThunk(
  'auth/demoLogin',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🎭 Redux: Iniciando demo login...');
      
      // ✅ Usar tu API service en lugar de fetch directo
      const response = await authAPI.demoLogin();
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error en demo login');
      }

      console.log('✅ Redux: Demo login exitoso');
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Redux: Demo login error:', error);
      const errorMessage = handleApiError(error, 'Error en demo login');
      return rejectWithValue(errorMessage);
    }
  }
);

export const regularLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('🔐 Redux: Iniciando login regular...');
      
      // ✅ Usar tu API service
      const response = await authAPI.login(email, password);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error en credenciales');
      }

      console.log('✅ Redux: Login regular exitoso');
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Redux: Login regular error:', error);
      const errorMessage = handleApiError(error, 'Error en login');
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }, { rejectWithValue }) => {
    try {
      console.log('📝 Redux: Iniciando registro...');
      
      // ✅ Usar tu API service
      const response = await authAPI.register(userData);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error en registro');
      }

      console.log('✅ Redux: Registro exitoso');
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Redux: Registro error:', error);
      const errorMessage = handleApiError(error, 'Error en registro');
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🚪 Redux: Iniciando logout...');
      
      // ✅ Usar tu API service
      await authAPI.logout();
      
      console.log('✅ Redux: Logout exitoso');
      return true;
      
    } catch (error: any) {
      console.warn('⚠️ Redux: Error en logout, pero continuando limpieza local');
      // Continuar con logout local aunque falle el servidor
      return true;
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Redux: Verificando estado de autenticación...');
      
      const isAuth = await authAPI.isAuthenticated();
      
      if (isAuth) {
        const currentUser = await authAPI.getCurrentUser();
        if (currentUser && currentUser.success) {
          console.log('✅ Redux: Usuario autenticado encontrado');
          return currentUser.data;
        }
      }
      
      throw new Error('No authenticated');
      
    } catch (error: any) {
      console.log('ℹ️ Redux: No hay sesión activa');
      return rejectWithValue('No authenticated');
    }
  }
);

// ============================================================================
// SLICE PRINCIPAL
// ============================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ ACCIONES SÍNCRONAS PRINCIPALES (compatibles con tu LoginScreen)
    setUser: (state, action: PayloadAction<User>) => {
      console.log('✅ Redux: setUser llamado:', action.payload.firstName);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      state.lastLoginTime = new Date().toISOString();
    },
    
    setToken: (state, action: PayloadAction<string>) => {
      console.log('✅ Redux: setToken llamado');
      state.token = action.payload;
      state.tokenExpiresAt = calculateTokenExpiration('1h');
    },

    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    
    // Acciones de estado
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Logout síncrono (para casos de emergencia)
    logout: (state) => {
      console.log('🚪 Redux: Logout síncrono');
      return { ...initialState };
    },
    
    clearAuth: (state) => {
      console.log('🧹 Redux: Limpiando autenticación');
      return { ...initialState };
    },
    
    // ✅ ACCIONES PARA ACTUALIZAR DATOS DEL USUARIO (desde dashboard)
    updateUserVIPStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.vipStatus = action.payload;
        console.log(`👑 Redux: VIP status actualizado: ${action.payload}`);
      }
    },
    
    updateUserBeautyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.beautyPoints = action.payload;
        console.log(`💎 Redux: Beauty Points actualizados: ${action.payload}`);
      }
    },

    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        console.log('👤 Redux: Perfil de usuario actualizado');
      }
    },

    incrementSessionsCompleted: (state) => {
      if (state.user) {
        state.user.sessionsCompleted += 1;
        console.log(`📈 Redux: Sesiones completadas: ${state.user.sessionsCompleted}`);
      }
    },

    addBeautyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.beautyPoints += action.payload;
        console.log(`💎 Redux: Puntos agregados: +${action.payload} (Total: ${state.user.beautyPoints})`);
      }
    },

    // ✅ NUEVA: Actualizar usuario completo desde dashboard API
    updateUserFromDashboard: (state, action: PayloadAction<any>) => {
      if (state.user && action.payload) {
        const updatedUser = transformBackendUser({
          ...action.payload,
          id: state.user.id,
          email: state.user.email,
        }, state.user.isDemo);
        
        state.user = updatedUser;
        console.log('🔄 Redux: Usuario actualizado desde dashboard');
      }
    },

    // Verificar si el token está próximo a expirar
    checkTokenExpiration: (state) => {
      if (state.tokenExpiresAt) {
        const now = new Date();
        const expiresAt = new Date(state.tokenExpiresAt);
        const minutesUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60);
        
        if (minutesUntilExpiry < 10 && minutesUntilExpiry > 0) {
          console.warn('⚠️ Redux: Token próximo a expirar, considerar renovación');
        } else if (minutesUntilExpiry <= 0) {
          console.error('❌ Redux: Token expirado');
          return { ...initialState };
        }
      }
    },
  },
  
  extraReducers: (builder) => {
    builder
      // ============================================================================
      // DEMO LOGIN CASES
      // ============================================================================
      .addCase(demoLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('⏳ Redux: Demo login en progreso...');
      })
      .addCase(demoLogin.fulfilled, (state, action) => {
        console.log('✅ Redux: Demo login exitoso');
        
        const user = transformBackendUser(action.payload.user, true);
        
        state.user = user;
        state.token = action.payload.tokens?.accessToken || null;
        state.refreshToken = action.payload.tokens?.refreshToken || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.lastLoginTime = new Date().toISOString();
        state.tokenExpiresAt = calculateTokenExpiration(action.payload.tokens?.expiresIn);
      })
      .addCase(demoLogin.rejected, (state, action) => {
        console.error('❌ Redux: Demo login falló:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      
      // ============================================================================
      // REGULAR LOGIN CASES
      // ============================================================================
      .addCase(regularLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('⏳ Redux: Login regular en progreso...');
      })
      .addCase(regularLogin.fulfilled, (state, action) => {
        console.log('✅ Redux: Login regular exitoso');
        
        const user = transformBackendUser(action.payload.user, false);
        
        state.user = user;
        state.token = action.payload.tokens?.accessToken || null;
        state.refreshToken = action.payload.tokens?.refreshToken || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.lastLoginTime = new Date().toISOString();
        state.tokenExpiresAt = calculateTokenExpiration(action.payload.tokens?.expiresIn);
      })
      .addCase(regularLogin.rejected, (state, action) => {
        console.error('❌ Redux: Login regular falló:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })

      // ============================================================================
      // REGISTER CASES
      // ============================================================================
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('⏳ Redux: Registro en progreso...');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('✅ Redux: Registro exitoso');
        
        const user = transformBackendUser(action.payload.user, false);
        
        state.user = user;
        state.token = action.payload.tokens?.accessToken || null;
        state.refreshToken = action.payload.tokens?.refreshToken || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.lastLoginTime = new Date().toISOString();
        state.tokenExpiresAt = calculateTokenExpiration(action.payload.tokens?.expiresIn);
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.error('❌ Redux: Registro falló:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })

      // ============================================================================
      // CHECK AUTH STATUS CASES
      // ============================================================================
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
        console.log('⏳ Redux: Verificando autenticación...');
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        console.log('✅ Redux: Usuario autenticado encontrado');
        
        const user = transformBackendUser(action.payload.user, false);
        
        state.user = user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        console.log('ℹ️ Redux: No hay sesión activa');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })

      // ============================================================================
      // LOGOUT CASES
      // ============================================================================
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        console.log('⏳ Redux: Cerrando sesión...');
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('✅ Redux: Logout exitoso');
        return { ...initialState };
      })
      .addCase(logoutUser.rejected, (state) => {
        console.warn('⚠️ Redux: Logout con advertencias, pero limpiando estado local');
        return { ...initialState };
      });
  },
});

// ============================================================================
// EXPORTS - SIN DUPLICACIÓN
// ============================================================================

// ✅ ACTIONS del slice (solo estas)
export const { 
  // Acciones principales (usadas por LoginScreen)
  setUser,
  setToken,
  setRefreshToken,
  
  // Acciones de estado
  setLoading, 
  setError, 
  clearError,
  logout,
  clearAuth,
  
  // Acciones de actualización de usuario
  updateUserVIPStatus,
  updateUserBeautyPoints,
  updateUserProfile,
  updateUserFromDashboard,
  incrementSessionsCompleted,
  addBeautyPoints,
  
  // Utilidades
  checkTokenExpiration,
} = authSlice.actions;

// ✅ Los async thunks ya están exportados arriba con 'export const'
// NO necesitamos volver a exportarlos aquí

// ✅ Reducer por defecto
export default authSlice.reducer;

// ============================================================================
// SELECTORS ÚTILES
// ============================================================================

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUserVIPStatus = (state: { auth: AuthState }) => state.auth.user?.vipStatus || false;
export const selectUserBeautyPoints = (state: { auth: AuthState }) => state.auth.user?.beautyPoints || 0;
export const selectUserName = (state: { auth: AuthState }) => state.auth.user?.firstName || '';
export const selectUserFullName = (state: { auth: AuthState }) => state.auth.user?.name || '';

// Selector para verificar si el token está próximo a expirar
export const selectTokenExpirationStatus = (state: { auth: AuthState }) => {
  const { tokenExpiresAt } = state.auth;
  if (!tokenExpiresAt) return { isExpired: false, minutesUntilExpiry: null };
  
  const now = new Date();
  const expiresAt = new Date(tokenExpiresAt);
  const minutesUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60);
  
  return {
    isExpired: minutesUntilExpiry <= 0,
    minutesUntilExpiry: Math.max(0, Math.floor(minutesUntilExpiry)),
    needsRefresh: minutesUntilExpiry < 10 && minutesUntilExpiry > 0
  };
};