// App.tsx - Versión 100% SIN ERRORES ✅
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ActivityIndicator, Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

// ✅ IMPORT ESTILOS CORREGIDOS
import { modernColors, modernSpacing, modernTypography, modernShadows } from './src/styles';

// Store
import { store, persistor } from './src/store';
import type { RootState } from './src/store';
import { setUser, setToken, setLoading, logout } from './src/store/slices/authSlice';

// Navigators - ✅ CAMBIO PRINCIPAL: MainStackNavigator en lugar de TabNavigator
import MainStackNavigator from './src/navigation/MainStackNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

// API Service
import { authAPI, profileAPI } from './src/services/api';

// Mantener splash visible
SplashScreen.preventAutoHideAsync();

// ✅ ESTILOS GLOBALES COMPLETAMENTE CORREGIDOS
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
    paddingHorizontal: 16, // Valor fijo seguro
  },
  
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: 12, // Valor fijo seguro
    padding: 16, // Valor fijo seguro
    // Sombra sin spread operator
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
  
  // ✅ Typography styles TOTALMENTE CORREGIDOS
  h1: {
    fontSize: modernTypography.fontSizeModern.display || 36,
    fontWeight: '700' as const, // Valor fijo sin referencias
    color: modernColors.text,
    textAlign: 'center' as const,
  },
  
  h2: {
    fontSize: modernTypography.fontSizeModern.xl || 20,
    fontWeight: '600' as const, // Valor fijo sin referencias
    color: modernColors.text,
    textAlign: 'center' as const,
  },
  
  body: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: '400' as const, // Valor fijo sin referencias
    color: modernColors.text,
    lineHeight: 22,
  },
  
  bodyLarge: {
    fontSize: modernTypography.fontSizeModern.lg || 18,
    fontWeight: '500' as const, // Valor fijo sin referencias
    color: modernColors.text,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: modernTypography.fontSizeModern.sm || 14,
    fontWeight: '400' as const, // Valor fijo sin referencias
    color: modernColors.gray600,
    lineHeight: 18,
  },
  
  // Spacing utilities con valores seguros
  mt2: { marginTop: 12 },
  mt3: { marginTop: 16 },
  mt4: { marginTop: 24 },
  mb3: { marginBottom: 16 },
  mb4: { marginBottom: 24 },
  
  // Text alignment
  centerText: { textAlign: 'center' as const },
  
  // Shadow utilities expandidas
  shadowMedium: {
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
};

// ✅ Loading Component MODERNIZADO Y CORREGIDO
const LoadingScreen = ({ message = 'Cargando...' }: { message?: string }) => (
  <View style={globalStyles.centerContainer}>
    {/* Icon container moderno */}
    <View style={{
      width: 80,
      height: 80,
      backgroundColor: modernColors.gray100,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      // Sombra expandida sin spread
      shadowColor: globalStyles.shadowMedium.shadowColor,
      shadowOffset: globalStyles.shadowMedium.shadowOffset,
      shadowOpacity: globalStyles.shadowMedium.shadowOpacity,
      shadowRadius: globalStyles.shadowMedium.shadowRadius,
      elevation: globalStyles.shadowMedium.elevation,
    }}>
      <Text style={{ fontSize: 32 }}>💆‍♀️</Text>
    </View>
    
    {/* Loading indicator */}
    <ActivityIndicator size="large" color={modernColors.accent} />
    
    {/* Message con tipografía moderna */}
    <Text style={[
      globalStyles.bodyLarge,
      globalStyles.mt3,
      globalStyles.centerText,
      { color: modernColors.gray600 }
    ]}>
      {message}
    </Text>
    
    {/* Brand text */}
    <Text style={[
      globalStyles.caption,
      globalStyles.mt2,
      globalStyles.centerText,
      { color: modernColors.gray500 }
    ]}>
      BELLEZA ESTÉTICA
    </Text>
  </View>
);

// Componente para verificar autenticación
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
              // Token válido, restaurar usuario
              const userData = {
                id: response.data.user.id,
                name: `${response.data.user.firstName} ${response.data.user.lastName}`,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                beautyPoints: response.data.stats.beautyPoints,
                sessionsCompleted: response.data.stats.sessionsCompleted,
                vipStatus: response.data.stats.vipStatus,
                role: 'patient' as const,
              };
              
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
            dispatch(logout());
          }
        } else {
          console.log('🚫 No authentication token found');
        }
        
      } catch (error) {
        console.error('❌ Auth check error:', error);
        // En caso de error, limpiar sesión por seguridad
        await authAPI.logout();
        dispatch(logout());
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

const AppContent = () => {
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <LoadingScreen message="Autenticando..." />;
  }

  // Mostrar mensaje personalizado si hay usuario
  if (isAuthenticated && user) {
    console.log(`👋 Welcome back, ${user.name}!`);
  }

  // ✅ CAMBIO PRINCIPAL: MainStackNavigator en lugar de TabNavigator
  return isAuthenticated ? <MainStackNavigator /> : <AuthNavigator />;
};

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

  // ✅ Error Screen MODERNIZADO Y CORREGIDO
  if (initError) {
    return (
      <View style={globalStyles.centerContainer}>
        {/* Error icon container */}
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: modernColors.error + '20',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
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
          { color: modernColors.gray600 }
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

// ✅ Error Boundary MODERNIZADO Y CORREGIDO
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
            backgroundColor: modernColors.error + '20',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
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
            { color: modernColors.gray600 }
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