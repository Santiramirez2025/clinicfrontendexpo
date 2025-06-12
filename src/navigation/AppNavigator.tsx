/**
 * Main App Navigator for ClinicSaasRN
 * Handles authentication flow and main app navigation
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Components
import Loading from '../components/common/Loading';

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth);

  // Check for stored authentication on app start
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        
        dispatch({
          type: 'auth/restoreAuth',
          payload: {
            user: userData,
            token: storedToken,
          },
        });
      } else {
        // No stored auth, set loading to false
        dispatch({ type: 'auth/checkAuthComplete' });
      }
    } catch (error) {
      console.error('Error checking stored auth:', error);
      dispatch({ type: 'auth/checkAuthComplete' });
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading message="Iniciando aplicación..." />;
  }

  // NO NavigationContainer aquí - ya está en App.tsx
  return (
    <>
      {isAuthenticated && user ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppNavigator;