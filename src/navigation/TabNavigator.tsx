// ============================================================================
// TabNavigator.tsx - VERSIÓN MEJORADA CON COHERENCIA TOTAL
// ============================================================================
import React, { useRef, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { authAPI, handleApiError } from '../services/api';

// ✅ IMPORTAR SISTEMA DE ESTILOS COHERENTE
import { 
  modernColors, 
  modernSpacing,
  modernTypography,
  modernShadows 
} from '../styles';

// Import screens
import HomeScreen from '../screens/dashboard/DashboardScreen'; // ✅ Cambio: HomeScreen en lugar de DashboardScreen
import AppointmentScreen from '../screens/appointments/AppointmentScreen';
import VIPScreen from '../screens/vip/VIPScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const { width } = Dimensions.get('window');

// ✅ ICONOS COHERENTES CON TU DISEÑO
const modernIcons = {
  home: '🏠',        // Casa para Home
  calendar: '📅',     // Calendario para Citas
  premium: '👑',      // Corona para VIP
  profile: '👤',      // Persona para Perfil
  logout: '👋',       // Saludo para Logout
};

// ============================================================================
// COMPONENTE DE LOGOUT MODERNO MEJORADO
// ============================================================================
const ModernLogoutScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      `Hasta pronto, ${user?.firstName || 'bella'} 💖`,
      '¿Estás segura de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            setIsAnimating(true);
            
            try {
              // Animación de salida
              Animated.sequence([
                Animated.timing(scaleAnim, {
                  toValue: 0.95,
                  duration: 150,
                  useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }),
              ]).start();

              // Logout del backend
              await authAPI.logout();
              
              // Logout del store
              dispatch(logout());
              
            } catch (error) {
              const errorMessage = handleApiError(error, 'Error al cerrar sesión');
              Alert.alert('Error', errorMessage);
              setIsAnimating(false);
            }
          },
        },
      ],
      { userInterfaceStyle: 'light' }
    );
  };

  return (
    <View style={styles.logoutContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={modernColors.backgroundWarm} />
      
      <Animated.View 
        style={[
          styles.logoutCard,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        {/* Avatar personalizado */}
        <View style={styles.logoutIconContainer}>
          <Text style={styles.userAvatar}>
            {user?.firstName?.[0]?.toUpperCase() || '💆‍♀️'}
          </Text>
        </View>
        
        {/* Contenido personalizado */}
        <View style={styles.logoutContent}>
          <Text style={styles.logoutTitle}>
            Hasta pronto, {user?.firstName || 'bella'}
          </Text>
          <Text style={styles.logoutSubtitle}>
            Nos vemos en tu próximo momento de bienestar ✨
          </Text>
          
          {/* Stats rápidas */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.beautyPoints || 0}</Text>
              <Text style={styles.statLabel}>Beauty Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.sessionsCompleted || 0}</Text>
              <Text style={styles.statLabel}>Sesiones</Text>
            </View>
          </View>
        </View>
        
        {/* Botón principal */}
        <TouchableOpacity 
          style={[
            styles.logoutButton,
            isAnimating && styles.logoutButtonDisabled
          ]}
          onPress={handleLogout}
          disabled={isAnimating}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonIcon}>
            {isAnimating ? '⏳' : '👋'}
          </Text>
          <Text style={styles.logoutButtonText}>
            {isAnimating ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </Text>
        </TouchableOpacity>
        
        {/* Link de ayuda */}
        <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpLinkText}>¿Necesitas ayuda? 💬</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// ============================================================================
// COMPONENTE DE TAB ICON MEJORADO
// ============================================================================
const ModernTabIcon = ({ 
  icon, 
  label,
  focused, 
  hasNotification = false,
  notificationCount = 0,
  onPress,
}: { 
  icon: string;
  label: string;
  focused: boolean; 
  hasNotification?: boolean;
  notificationCount?: number;
  onPress?: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  // Animación de notificación
  useEffect(() => {
    if (hasNotification) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [hasNotification]);

  const handlePress = () => {
    // Micro-animación en tap
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.1 : 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  return (
    <TouchableOpacity 
      style={styles.tabIconContainer}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Glow effect para tab activo */}
      <Animated.View 
        style={[
          styles.tabIconGlow,
          {
            opacity: glowAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      />
      
      {/* Contenedor del icono */}
      <Animated.View 
        style={[
          styles.tabIconInner,
          {
            backgroundColor: focused ? modernColors.accent : 'transparent',
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={[
          styles.tabIconText,
          { 
            color: focused ? '#FFFFFF' : modernColors.gray600,
          }
        ]}>
          {icon}
        </Text>
      </Animated.View>
      
      {/* Badge de notificación mejorado */}
      {hasNotification && (
        <Animated.View 
          style={[
            styles.notificationBadge,
            { transform: [{ scale: bounceAnim }] }
          ]}
        >
          {notificationCount > 0 ? (
            <Text style={styles.notificationCount}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </Text>
          ) : (
            <View style={styles.notificationDot} />
          )}
        </Animated.View>
      )}
      
      {/* Label del tab */}
      <Text style={[
        styles.tabLabel,
        { 
          color: focused ? modernColors.accent : modernColors.gray600,
          fontWeight: focused ? '600' : '400',
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ============================================================================
// TAB BAR PERSONALIZADO MEJORADO
// ============================================================================
const ModernTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.auth.user);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // ✅ CONFIGURACIÓN MEJORADA DE TABS
  const tabConfig = [
    { 
      key: 'Home', 
      icon: modernIcons.home, 
      label: 'Inicio',
      hasNotification: false,
    },
    { 
      key: 'Appointments', 
      icon: modernIcons.calendar, 
      label: 'Citas',
      hasNotification: false, // Podrías agregar lógica para próximas citas
    },
    { 
      key: 'VIP', 
      icon: "diamond", 
      label: user?.vipStatus ? 'VIP' : 'Premium',
      hasNotification: !user?.vipStatus, // Notificación si no es VIP
    },
    { 
      key: 'Profile', 
      icon: modernIcons.profile, 
      label: 'Perfil',
      hasNotification: false,
    },
    { 
      key: 'Logout', 
      icon: modernIcons.logout, 
      label: 'Salir',
      hasNotification: false,
    },
  ];

  return (
    <Animated.View 
      style={[
        styles.modernTabBar,
        {
          paddingBottom: insets.bottom + 8,
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
      {/* Backdrop con colores coherentes */}
      <View style={styles.tabBarBackdrop} />
      
      {/* Contenedor de tabs */}
      <View style={styles.tabBarContent}>
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
            <ModernTabIcon
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              focused={isFocused}
              hasNotification={tab.hasNotification}
              onPress={onPress}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

// ============================================================================
// NAVIGATOR PRINCIPAL MEJORADO
// ============================================================================
const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <ModernTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true, // ✅ Lazy loading para mejor performance
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Inicio'
        }}
      />
      <Tab.Screen 
        name="Appointments" 
        component={AppointmentScreen}
        options={{
          title: 'Citas'
        }}
      />
      <Tab.Screen 
        name="VIP" 
        component={VIPScreen}
        options={{
          title: 'VIP'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Perfil'
        }}
      />
      <Tab.Screen 
        name="Logout" 
        component={ModernLogoutScreen}
        options={{
          title: 'Salir'
        }}
      />
    </Tab.Navigator>
  );
};

// ============================================================================
// ESTILOS MEJORADOS CON COHERENCIA TOTAL
// ============================================================================
const styles = StyleSheet.create({
  // Logout Screen
  logoutContainer: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
    justifyContent: 'center',
    alignItems: 'center',
    padding: modernSpacing.aesthetic.cardSpacing,
  },
  
  logoutCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusXL,
    padding: modernSpacing.aesthetic.cardSpacing + 8,
    alignItems: 'center',
    ...modernShadows.lg,
    width: '100%',
    maxWidth: 320,
  },
  
  logoutIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: modernColors.accent + '15',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.sm,
  },
  
  userAvatar: {
    fontSize: 32,
    fontWeight: '600',
    color: modernColors.accent,
  },
  
  logoutContent: {
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  logoutTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  logoutSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center',
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.base,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.gray50,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: 12,
    borderRadius: modernSpacing.componentModern.radiusMD,
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  statValue: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '700',
    color: modernColors.accent,
  },
  
  statLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    marginTop: 2,
  },
  
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: modernColors.gray200,
    marginHorizontal: modernSpacing.aesthetic.itemSpacing,
  },
  
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.accent,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    borderRadius: modernSpacing.componentModern.radiusMD,
    ...modernShadows.colored.accent,
    minWidth: 180,
    justifyContent: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  
  logoutButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  
  logoutButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  helpLink: {
    padding: 8,
  },
  
  helpLinkText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    textAlign: 'center',
  },

  // Modern Tab Bar
  modernTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  
  tabBarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: modernColors.surfaceElevated,
    opacity: 0.98,
    borderTopLeftRadius: modernSpacing.componentModern.radiusXL,
    borderTopRightRadius: modernSpacing.componentModern.radiusXL,
    ...modernShadows.lg,
  },
  
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: modernSpacing.aesthetic.itemSpacing,
    paddingHorizontal: 8,
  },

  // Tab Icons
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
    position: 'relative',
  },
  
  tabIconGlow: {
    position: 'absolute',
    top: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: modernColors.accent + '20',
  },
  
  tabIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  
  tabIconText: {
    fontSize: 18,
  },
  
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: '50%',
    marginRight: -18,
    minWidth: 16,
    height: 16,
    backgroundColor: modernColors.errorModern,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    ...modernShadows.sm,
  },
  
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  
  notificationCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  tabLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default TabNavigator;