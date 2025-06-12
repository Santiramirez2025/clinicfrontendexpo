// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        // Animaciones suaves para mejor UX
        animation: 'slide_from_right',
        animationDuration: 300,
        // Gesture navigation habilitado
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // Optimización de performance
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          // Para Login, sin gestos hacia atrás
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          // Para Register, permitir swipe back
          gestureEnabled: true,
          animation: 'slide_from_bottom', // Animación desde abajo para registro
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          // Para ForgotPassword, permitir swipe back
          gestureEnabled: true,
          animation: 'slide_from_right', // Animación estándar
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;