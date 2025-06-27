// App.tsx - Versión 100% SIN ERRORES ✅
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ActivityIndicator, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

// ✅ IMPORT ESTILOS CORREGIDOS
import { modernColors, modernTypography } from './src/styles/colors';

// ✅ IMPORT TIPOS CORREGIDOS
import type { User } from './src/types/auth';
import { createUserWithDefaults } from './src/types/auth';

// Store
import { store, persistor } from './src/store';
import type { RootState } from './src/store';
import { setUser, setToken, setLoading, clearUser } from './src/store/slices/authSlice';

// Navigators
import MainStackNavigator from './src/navigation/MainStackNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

// API Service
import { authAPI, profileAPI } from './src/services/api';

// Mantener splash visible
SplashScreen.preventAutoHideAsync();

// ✅ ESTILOS GLOBALES CORREGIDOS SIN REFERENCIAS PROBLEMÁTICAS
const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.background,
    paddingHorizontal: 16,
  },
  
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  
  // ✅ Typography styles SEGUROS
  h1: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: modernColors.textPrimary,
    textAlign: 'center' as const,
  },
  
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: modernColors.textPrimary,
    textAlign: 'center' as const,
  },
  
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: modernColors.textPrimary,
    lineHeight: 22,
  },
  
  bodyLarge: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: modernColors.textPrimary,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: modernColors.textSecondary,
    lineHeight: 18,
  },
  
  // Spacing utilities seguros
  mt2: { marginTop: 12 },
  mt3: { marginTop: 16 },
  mt4: { marginTop: 24 },
  mb3: { marginBottom: 16 },
  mb4: { marginBottom: 24 },
  
  // Text alignment
  centerText: { textAlign: 'center' as const },
};

// ✅ Loading Component CORREGIDO
const LoadingScreen = ({ message = 'Cargando...' }: { message?: string }) => (
  <View style={globalStyles.centerContainer}>
    {/* Icon container */}
    <View style={{
      width: 80,
      height: 80,
      backgroundColor: modernColors.backgroundCool,
      borderRadius: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <Text style={{ fontSize: 32 }}>💆‍♀️</Text>
    </View>
    
    {/* Loading indicator */}
    <ActivityIndicator size="large" color={modernColors.accent} />
    
    {/* Message */}
    <Text style={[
      globalStyles.bodyLarge,
      globalStyles.mt3,
      globalStyles.centerText,
      { color: modernColors.textSecondary }
    ]}>
      {message}
    </Text>
    
    {/* Brand text */}
    <Text style={[
      globalStyles.caption,
      globalStyles.mt2,
      globalStyles.centerText,
      { color: modernColors.textTertiary }
    ]}>
      BELLEZA ESTÉTICA
    </Text>
  </View>
);

// ✅ Componente para verificar autenticación CORREGIDO
const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('🔐 Checking authentication status...');
        
        // Verificar si hay token guardado
        const isAuthenticated = await authAPI.isAuthenticated();
        
        if (isAuthenticated) {
          console.log('🎫 Token found, verifying with server...');
          
          try {
            // Intentar obtener datos del usuario para verificar que el token es válido
            const response = await profileAPI.get();
            
            if (response.success) {
              // ✅ Token válido, restaurar usuario CON DEFAULTS
              const userData = createUserWithDefaults({
                id: response.data.user.id,
                name: `${response.data.user.firstName} ${response.data.user.lastName}`,
                email: response.data.user.email,
                role: 'patient',
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                beautyPoints: response.data.stats?.beautyPoints || 0,
                sessionsCompleted: response.data.stats?.sessionsCompleted || 0,
                vipStatus: response.data.stats?.vipStatus || false,
              });
              
              const token = await SecureStore.getItemAsync('accessToken');
              
              dispatch(setUser(userData));
              if (token) {
                dispatch(setToken(token));
              }
              
              console.log('✅ User session restored:', userData.email);
            }
          } catch (error: any) {
            console.log('❌ Token validation failed:', error.message);
            
            // Token inválido o expirado, limpiar datos
            await authAPI.logout();
            dispatch(clearUser());
          }
        } else {
          console.log('🚫 No authentication token found');
        }
        
      } catch (error) {
        console.error('❌ Auth check error:', error);
        // En caso de error, limpiar sesión por seguridad
        await authAPI.logout();
        dispatch(clearUser());
      } finally {
        setIsChecking(false);
        dispatch(setLoading(false));
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (isChecking) {
    return <LoadingScreen message="Verificando sesión..." />;
  }

  return <>{children}</>;
};

// ✅ AppContent CORREGIDO
const AppContent = () => {
  // ✅ CAMBIO: usar 'loading' en lugar de 'isLoading'
  const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <LoadingScreen message="Autenticando..." />;
  }

  // Mostrar mensaje personalizado si hay usuario
  if (isAuthenticated && user) {
    console.log(`👋 Welcome back, ${user.name}!`);
  }

  return isAuthenticated ? <MainStackNavigator /> : <AuthNavigator />;
};

// ✅ AppInitializer CORREGIDO
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing Belleza Estética app...');
        
        // Verificar conectividad de API (opcional en desarrollo)
        if (__DEV__) {
          try {
            const apiService = await import('./src/services/api');
            const isConnected = await apiService.default.checkConnection();
            console.log(`🔌 API Connection: ${isConnected ? 'OK' : 'FAILED'}`);
            
            if (!isConnected) {
              console.warn('⚠️ API not reachable. App will work in offline mode.');
            }
          } catch (error: any) {
            console.warn('⚠️ API check failed:', error.message);
          }
        }
        
        // Simular tiempo de carga mínimo para UX suave
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('✅ App initialized successfully');
        
      } catch (error) {
        console.error('❌ App initialization failed:', error);
        setInitError('Error al inicializar la aplicación');
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  // ✅ Error Screen CORREGIDO
  if (initError) {
    return (
      <View style={globalStyles.centerContainer}>
        {/* Error icon container */}
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: modernColors.errorLight,
          borderRadius: 40,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          marginBottom: 24,
        }}>
          <Text style={{ fontSize: 32 }}>⚠️</Text>
        </View>
        
        {/* Error title */}
        <Text style={[
          globalStyles.h2,
          globalStyles.centerText,
          globalStyles.mb3,
          { color: modernColors.error }
        ]}>
          {initError}
        </Text>
        
        {/* Error description */}
        <Text style={[
          globalStyles.body,
          globalStyles.centerText,
          globalStyles.mb4,
          { color: modernColors.textSecondary }
        ]}>
          Por favor, verifica tu conexión a internet e intenta nuevamente.
        </Text>
      </View>
    );
  }

  if (!isAppReady) {
    return <LoadingScreen message="Preparando tu spa digital..." />;
  }

  return <>{children}</>;
};

// ✅ Error Boundary CORREGIDO
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('💥 App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={globalStyles.centerContainer}>
          {/* Error icon */}
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: modernColors.errorLight,
            borderRadius: 40,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            marginBottom: 24,
          }}>
            <Text style={{ fontSize: 32 }}>💥</Text>
          </View>
          
          {/* Error title */}
          <Text style={[
            globalStyles.h2,
            globalStyles.centerText,
            globalStyles.mb3,
            { color: modernColors.error }
          ]}>
            Algo salió mal
          </Text>
          
          {/* Error description */}
          <Text style={[
            globalStyles.body,
            globalStyles.centerText,
            globalStyles.mb4,
            { color: modernColors.textSecondary }
          ]}>
            Reinicia la aplicación para continuar.
          </Text>
          
          {/* Dev error details */}
          {__DEV__ && this.state.error && (
            <View style={[globalStyles.card, globalStyles.mt4]}>
              <Text style={[
                globalStyles.caption,
                { 
                  color: modernColors.error,
                  fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
                }
              ]}>
                {this.state.error.toString()}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

// ✅ App Principal TOTALMENTE CORREGIDO
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={globalStyles.container}>
        <Provider store={store}>
          <PersistGate 
            loading={<LoadingScreen message="Restaurando sesión..." />} 
            persistor={persistor}
          >
            <SafeAreaProvider>
              {/* ✅ StatusBar CORREGIDO */}
              <StatusBar 
                barStyle="dark-content" 
                backgroundColor={modernColors.background}
                translucent={false}
              />
              <AppInitializer>
                <NavigationContainer>
                  <AuthChecker>
                    <AppContent />
                  </AuthChecker>
                </NavigationContainer>
              </AppInitializer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;