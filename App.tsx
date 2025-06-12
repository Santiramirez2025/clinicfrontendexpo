import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Store
import { store, persistor } from './src/store';
import type { RootState } from './src/store';

// Navigators
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

// Mantener splash visible
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <Text style={{ fontSize: 32, marginBottom: 16 }}>🏥</Text>
        <Text style={{ fontSize: 18, color: '#8E8E93' }}>Cargando...</Text>
      </View>
    );
  }

  return isAuthenticated ? <TabNavigator /> : <AuthNavigator />;
};

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('App initialized successfully');
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <Text style={{ fontSize: 32, marginBottom: 16 }}>🏥</Text>
        <Text style={{ fontSize: 18, color: '#8E8E93' }}>Inicializando...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <AppInitializer>
              <NavigationContainer>
                <AppContent />
              </NavigationContainer>
            </AppInitializer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
