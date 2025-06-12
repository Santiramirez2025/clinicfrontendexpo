// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';

// Import your complete screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AppointmentScreen from '../screens/appointments/AppointmentScreen';
import VIPScreen from '../screens/vip/VIPScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Paleta de colores elegante para spa digital
const colors = {
  lavender: '#F5F3FF',          // Lavanda suave
  nude: '#F7F5F3',             // Nude cálido
  rosePale: '#FBEEF5',         // Rosa palo
  warmWhite: '#FEFDFB',        // Blanco cálido
  jade: '#85C4A6',             // Verde jade sutil
  gold: '#D4AF37',             // Dorado elegante
  softGray: '#A8A8A8',         // Gris suave
  charcoal: '#3A3A3A',         // Carbón para texto
  pearl: '#F9F7F4',            // Perla
  sage: '#C8D5B9',             // Salvia
  blush: '#F4E6E1',            // Rubor suave
};

// Screen de logout elegante
const LogoutScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Hasta pronto',
      '¿Segura que deseas cerrar tu sesión de bienestar?',
      [
        {
          text: 'Quedarme',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => dispatch({ type: 'auth/logout' }),
        },
      ],
      { userInterfaceStyle: 'light' }
    );
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.lavender,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    }}>
      <View style={{
        backgroundColor: colors.warmWhite,
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        width: '100%',
        maxWidth: 280,
      }}>
        <View style={{
          width: 60,
          height: 60,
          backgroundColor: colors.blush,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          <Text style={{ fontSize: 24 }}>🌸</Text>
        </View>
        
        <Text style={{ 
          fontSize: 22, 
          color: colors.charcoal, 
          marginBottom: 12, 
          textAlign: 'center',
          fontWeight: '300',
          letterSpacing: 0.5,
        }}>
          Hasta pronto
        </Text>
        
        <Text style={{ 
          fontSize: 15, 
          color: colors.softGray, 
          marginBottom: 32, 
          textAlign: 'center',
          lineHeight: 22,
          fontWeight: '300',
        }}>
          Nos vemos en tu próximo momento de autocuidado
        </Text>
        
        <TouchableOpacity 
          onPress={handleLogout}
          style={{
            backgroundColor: colors.jade,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
            shadowColor: colors.jade,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ 
            fontSize: 15, 
            color: colors.warmWhite,
            fontWeight: '500',
            letterSpacing: 0.3,
          }}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

// Componente de icono personalizado
const TabIcon = ({ 
  emoji, 
  focused, 
  hasNotification = false 
}: { 
  emoji: string; 
  focused: boolean; 
  hasNotification?: boolean;
}) => (
  <View style={{ 
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <View style={{
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: focused ? colors.jade + '20' : 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    }}>
      <Text style={{ 
        fontSize: 20,
        opacity: focused ? 1 : 0.6,
      }}>
        {emoji}
      </Text>
    </View>
    
    {hasNotification && (
      <View style={{
        position: 'absolute',
        top: 2,
        right: 2,
        width: 12,
        height: 12,
        backgroundColor: colors.gold,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.warmWhite,
      }} />
    )}
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.jade,
        tabBarInactiveTintColor: colors.softGray,
        tabBarStyle: {
          backgroundColor: colors.warmWhite,
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          height: 84,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
          letterSpacing: 0.2,
        },
        tabBarIcon: ({ focused }) => {
          let emoji = '🏠';
          let hasNotification = false;
          
          switch (route.name) {
            case 'Inicio':
              emoji = '🏠';
              break;
            case 'Reservar':
              emoji = '✨';
              break;
            case 'Premium':
              emoji = '💎';
              hasNotification = true;
              break;
            case 'Perfil':
              emoji = '🌸';
              break;
            case 'Cerrar':
              emoji = '🌙';
              break;
          }
          
          return (
            <TabIcon 
              emoji={emoji} 
              focused={focused} 
              hasNotification={hasNotification}
            />
          );
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen 
        name="Reservar" 
        component={AppointmentScreen}
        options={{
          tabBarLabel: 'Reservar',
        }}
      />
      <Tab.Screen 
        name="Premium" 
        component={VIPScreen}
        options={{
          tabBarLabel: 'Premium',
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Mi Perfil',
        }}
      />
      <Tab.Screen 
        name="Cerrar" 
        component={LogoutScreen}
        options={{
          tabBarLabel: 'Salir',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;