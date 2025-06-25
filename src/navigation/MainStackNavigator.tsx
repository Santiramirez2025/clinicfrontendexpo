// ============================================================================
// MainStackNavigator.tsx - NAVEGADOR PRINCIPAL CON TABS + MODALS
// ============================================================================
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Navigators
import TabNavigator from './TabNavigator';

// Screens modales/stack
import AppointmentDetailsScreen from '../screens/dashboard/AppointmentDetailsScreen';
import TreatmentsScreen from '../screens/TreatmentsScreen';
import BeautyPointsScreen from '../screens/BeautyPointsScreen';

const Stack = createStackNavigator();

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
      
      {/* Pantallas modales */}
      <Stack.Screen 
        name="AppointmentDetails" 
        component={AppointmentDetailsScreen}
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