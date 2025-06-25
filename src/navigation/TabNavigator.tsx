// ============================================================================
// TabNavigator.tsx - VERSIÓN ELEGANTE PARA MUJERES PROFESIONALES 30-50
// ============================================================================
import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState } from '../store';

// ✅ SISTEMA DE ESTILOS ELEGANTE
import { 
  modernColors, 
  modernSpacing,
  modernTypography,
  modernShadows 
} from '../styles';

// ✅ PANTALLAS
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AppointmentsScreen from '../screens/appointments/AppointmentScreen';
import BookAppointmentScreen from '../screens/appointments/BookAppointmentScreen';
import VIPScreen from '../screens/vip/VIPScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// ✅ ICONOS ELEGANTES Y SOFISTICADOS
const elegantIcons = {
  dashboard: '◊',     // Diamante elegante
  calendar: '◐',      // Media luna sofisticada  
  add: '⊕',          // Plus refinado
  premium: '♦',       // Diamante premium
  profile: '◉',       // Círculo elegante
};

// ============================================================================
// COMPONENTE DE TAB ICON ELEGANTE
// ============================================================================
const ElegantTabIcon = ({ 
  icon, 
  label,
  focused, 
  hasNotification = false,
  notificationCount = 0,
  isFloating = false,
  onPress,
}: { 
  icon: string;
  label: string;
  focused: boolean; 
  hasNotification?: boolean;
  notificationCount?: number;
  isFloating?: boolean;
  onPress?: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: isFloating ? 1.05 : 1.1,
          tension: 200,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: isFloating ? 0.3 : 0.2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 200,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, isFloating]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: focused ? (isFloating ? 1.05 : 1.1) : 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    onPress?.();
  };

  // Botón flotante central refinado
  if (isFloating) {
    return (
      <TouchableOpacity 
        style={styles.floatingContainer}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Animated.View 
          style={[
            styles.floatingGlow,
            {
              opacity: glowAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingButton,
            {
              transform: [{ scale: scaleAnim }],
              backgroundColor: focused ? '#B8956F' : '#D4B896',
              shadowColor: '#D4A574',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 12,
            }
          ]}
        >
          <Text style={[styles.floatingIcon, { color: focused ? '#FFFFFF' : '#8B7355' }]}>
            {icon}
          </Text>
        </Animated.View>
        <Text style={[
          styles.floatingLabel,
          { color: focused ? '#6B5B47' : '#8B7355' }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.tabContainer}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Glow sutil */}
      <Animated.View 
        style={[
          styles.iconGlow,
          {
            opacity: glowAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      />
      
      {/* Contenedor del icono */}
      <Animated.View 
        style={[
          styles.iconContainer,
          {
            backgroundColor: focused ? '#F5F1EC' : 'transparent',
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.iconText,
            { 
              color: focused ? '#6B5B47' : '#A0937D',
              opacity: opacityAnim,
            }
          ]}
        >
          {icon}
        </Animated.Text>
      </Animated.View>
      
      {/* Badge de notificación elegante */}
      {hasNotification && (
        <View style={styles.notificationBadge}>
          {notificationCount > 0 ? (
            <Text style={styles.notificationText}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </Text>
          ) : (
            <View style={styles.notificationDot} />
          )}
        </View>
      )}
      
      {/* Label elegante */}
      <Animated.Text 
        style={[
          styles.tabLabel,
          { 
            color: focused ? '#6B5B47' : '#A0937D',
            opacity: opacityAnim,
            fontWeight: focused ? '600' : '400',
          }
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

// ============================================================================
// TAB BAR ELEGANTE Y PROFESIONAL
// ============================================================================
const ElegantTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.auth.user);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // ✅ OCULTAR TABBAR EN PANTALLAS DE APPOINTMENTS
  const currentRoute = state.routes[state.index].name;
  if (currentRoute === 'Appointments' || currentRoute === 'BookAppointment') {
    return null;
  }

  // ✅ CONFIGURACIÓN ELEGANTE
  const tabConfig = [
    { 
      key: 'Dashboard', 
      icon: elegantIcons.dashboard, 
      label: 'Inicio',
      hasNotification: false,
    },
    { 
      key: 'Appointments', 
      icon: elegantIcons.calendar, 
      label: 'Citas',
      hasNotification: false,
    },
    { 
      key: 'BookAppointment', 
      icon: elegantIcons.add, 
      label: 'Reservar',
      hasNotification: false,
      isFloating: true,
    },
    { 
      key: 'VIP', 
      icon: elegantIcons.premium, 
      label: 'Premium',
      hasNotification: !user?.vipStatus,
    },
    { 
      key: 'Profile', 
      icon: elegantIcons.profile, 
      label: 'Perfil',
      hasNotification: false,
    },
  ];

  return (
    <Animated.View 
      style={[
        styles.tabBar,
        {
          paddingBottom: insets.bottom + 12,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        }
      ]}
    >
      {/* Backdrop elegante */}
      <View style={styles.backdrop} />
      
      {/* Línea decorativa superior */}
      <View style={styles.topLine} />
      
      {/* Contenido de tabs */}
      <View style={styles.tabContent}>
        {tabConfig.map((tab, index) => {
          const route = state.routes.find((r: any) => r.name === tab.key);
          if (!route) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <ElegantTabIcon
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              focused={isFocused}
              hasNotification={tab.hasNotification}
              isFloating={tab.isFloating}
              onPress={onPress}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

// ============================================================================
// NAVIGATOR PRINCIPAL
// ============================================================================
const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <ElegantTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Tab.Screen name="VIP" component={VIPScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// ============================================================================
// ESTILOS ELEGANTES Y SOFISTICADOS
// ============================================================================
const styles = StyleSheet.create({
  // Tab Bar Principal
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FEFCF9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#8B7355',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#E8D5B7',
  },
  
  topLine: {
    height: 3,
    backgroundColor: '#E8D5B7',
    marginHorizontal: 60,
    marginTop: 8,
    borderRadius: 2,
    opacity: 0.6,
  },
  
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 18,
    paddingHorizontal: 12,
  },

  // Botón Flotante Central
  floatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    position: 'relative',
  },
  
  floatingGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E8D5B7',
    top: -7,
  },
  
  floatingButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#D4B896',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#FEFCF9',
  },
  
  floatingIcon: {
    fontSize: 22,
    fontWeight: '300',
  },
  
  floatingLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // Tabs Regulares
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
    position: 'relative',
  },
  
  iconGlow: {
    position: 'absolute',
    top: 6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8D5B7',
  },
  
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  
  iconText: {
    fontSize: 16,
    fontWeight: '300',
  },
  
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: '50%',
    marginRight: -16,
    minWidth: 14,
    height: 14,
    backgroundColor: '#B8956F',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FEFCF9',
    shadowColor: '#8B7355',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  notificationDot: {
    width: 6,
    height: 6,
    backgroundColor: '#FEFCF9',
    borderRadius: 3,
  },
  
  notificationText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FEFCF9',
    textAlign: 'center',
  },
  
  tabLabel: {
    fontSize: 10.5,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});

export default TabNavigator;