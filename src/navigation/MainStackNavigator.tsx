// ============================================================================
// MainStackNavigator.tsx - NAVEGADOR PRINCIPAL CON TABS + MODALS - CORREGIDO
// ============================================================================
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

// Navigators
import TabNavigator from './TabNavigator';

// Screens modales/stack
import AppointmentDetailsScreen from '../screens/dashboard/AppointmentDetailsScreen';
import TreatmentsScreen from '../screens/TreatmentsScreen';
import BeautyPointsScreen from '../screens/BeautyPointsScreen';

// ============================================================================
// TIPOS DE NAVEGACIÓN - CORREGIDOS ✅
// ============================================================================
export type MainStackParamList = {
  MainTabs: undefined;
  AppointmentDetails: {
    appointmentId: string;
    appointment?: any; // Objeto appointment completo opcional
  };
  BeautyPoints: undefined;
  Treatments: undefined;
  // Pantallas futuras
  // TreatmentDetails: { treatmentId: string };
  // EditProfile: undefined;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;

// ⭐ TIPOS ESPECÍFICOS PARA AppointmentDetailsScreen - FIX ERROR
export type AppointmentDetailsScreenProps = {
  navigation: StackNavigationProp<MainStackParamList, 'AppointmentDetails'>;
  route: RouteProp<MainStackParamList, 'AppointmentDetails'>;
};

export type BeautyPointsScreenProps = {
  navigation: StackNavigationProp<MainStackParamList, 'BeautyPoints'>;
  route: RouteProp<MainStackParamList, 'BeautyPoints'>;
};

export type TreatmentsScreenProps = {
  navigation: StackNavigationProp<MainStackParamList, 'Treatments'>;
  route: RouteProp<MainStackParamList, 'Treatments'>;
};

// ============================================================================
// COMPONENTE NAVEGADOR PRINCIPAL ✅
// ============================================================================
const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
      }}
    >
      {/* Tabs principales */}
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      
      {/* ⭐ PANTALLA CORREGIDA - AppointmentDetails */}
      <Stack.Screen 
        name="AppointmentDetails" 
        component={AppointmentDetailsScreen as React.ComponentType<any>} // ⭐ FIX TYPE ERROR
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />

      <Stack.Screen 
        name="BeautyPoints" 
        component={BeautyPointsScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />

      {/* ✨ NUEVA: Treatments Screen */}
      <Stack.Screen 
        name="Treatments" 
        component={TreatmentsScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      
      {/* Pantallas futuras */}
      {/* 
      <Stack.Screen 
        name="TreatmentDetails" 
        component={TreatmentDetailsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ presentation: 'modal' }}
      />
      */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;