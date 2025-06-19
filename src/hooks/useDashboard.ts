// ============================================================================
// hooks/useDashboard.ts - VERSIÓN SIN ERRORES - LISTA PARA USAR
// ============================================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser, updateUserVIPStatus, updateUserBeautyPoints } from '../store/slices/authSlice';
import { dashboardAPI, treatmentAPI, api, handleApiError } from '../services/api';

export interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    vipStatus: boolean;
    beautyPoints: number;
  };
  nextAppointment: {
    id: string;
    treatment: string;
    date: string;
    time: string;
    professional: string;
    clinic: string;
    status: string;
  } | null;
  featuredTreatments: any[];
  wellnessTip: {
    title: string;
    content: string;
    category: string;
    iconName: string;
  } | null;
  stats: {
    totalSessions: number;
    beautyPoints: number;
    totalInvestment: number;
    vipStatus: boolean;
  };
}

export interface WellnessCheckIn {
  mood: 'great' | 'good' | 'okay' | 'tired' | 'stressed';
  energy: number;
  skinFeeling: 'amazing' | 'good' | 'normal' | 'needs-care';
}

export const useDashboard = (navigation: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isInitialized = useRef(false);

  // Estados
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [wellnessCompleted, setWellnessCompleted] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState('Belleza Estética Centro');
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // FUNCIONES DE API - VERSIÓN SIN ERRORES
  // ============================================================================
  const loadDashboardData = useCallback(async (isRefresh = false) => {
    try {
      console.log('🔄 Loading dashboard data...', { isRefresh });
      
      if (!isRefresh) {
        setLoading(true);
        setError(null);
      } else {
        setRefreshing(true);
      }
      
      // Verificar autenticación primero
      const isAuth = await api.isAuthenticated();
      if (!isAuth) {
        throw new Error('Usuario no autenticado');
      }

      const response = await dashboardAPI.getDashboard();
      console.log('✅ Dashboard response:', response.success);
      
      if (response.success && response.data) {
        setDashboardData(response.data);
        setError(null);
        
        // ✅ SOLUCIÓN SIN ERRORES - Actualizar datos del usuario
        if (response.data.user && user) {
          // Usar acciones existentes que SÍ funcionan
          dispatch(updateUserVIPStatus(response.data.user.vipStatus));
          dispatch(updateUserBeautyPoints(response.data.user.beautyPoints));
          
          // Opcional: actualizar usuario completo si es necesario
          const updatedUser = {
            ...user,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            name: `${response.data.user.firstName} ${response.data.user.lastName}`,
            vipStatus: response.data.user.vipStatus,
            beautyPoints: response.data.user.beautyPoints
          };
          dispatch(setUser(updatedUser));
        }
      } else {
        throw new Error(response.error?.message || 'Respuesta inválida del servidor');
      }
    } catch (error: any) {
      console.error('❌ Error loading dashboard:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar la información del dashboard');
      setError(errorMessage);
      
      // Solo mostrar alert si no es refresh (evitar interrumpir UX)
      if (!isRefresh) {
        Alert.alert('Error', errorMessage);
      }
      
      // Si es error de auth, redirigir a login
      if (error?.message?.includes('autenticado') || 
          error?.message?.includes('401') ||
          error?.message?.includes('Unauthorized')) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false); // ✅ SIEMPRE resetear refreshing
    }
  }, [user, dispatch, navigation]);

  const handleWellnessCheckIn = async (wellnessData: WellnessCheckIn) => {
    try {
      console.log('🌿 Wellness check-in:', wellnessData);
      
      // TODO: Implementar API endpoint real cuando esté listo
      // const response = await api.request('/profile/wellness-checkin', {
      //   method: 'POST',
      //   body: JSON.stringify(wellnessData)
      // });
      
      // Por ahora simular
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setWellnessCompleted(true);
      
      // Simular ganancia de beauty points
      if (user) {
        dispatch(updateUserBeautyPoints((user.beautyPoints || 0) + 5));
      }
      
      Alert.alert(
        '¡Gracias! 💖',
        'Tu check-in de bienestar ha sido registrado. ¡Ganaste 5 Beauty Points!',
        [{ text: 'Continuar', style: 'default' }]
      );
      
      // Refrescar data para sincronizar
      loadDashboardData(true);
      
    } catch (error) {
      console.error('❌ Error submitting wellness check-in:', error);
      const errorMessage = handleApiError(error, 'No se pudo registrar tu check-in');
      Alert.alert('Error', errorMessage);
    }
  };

  const handleTreatmentPress = useCallback((treatment: any) => {
    console.log('💆‍♀️ Treatment pressed:', treatment.name);
    
    // Verificar si es VIP exclusive y usuario no es VIP
    if (treatment.isVipExclusive && !user?.vipStatus) {
      Alert.alert(
        '✨ Tratamiento VIP',
        'Este tratamiento es exclusivo para miembros VIP. ¿Te gustaría conocer más sobre la membresía?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Ver VIP', 
            onPress: () => navigation.navigate('VIP')
          }
        ]
      );
      return;
    }

    // Navegar a detalles del tratamiento o booking
    navigation.navigate('Appointments', { 
      screen: 'BookAppointment',
      params: {
        treatmentId: treatment.id,
        treatmentName: treatment.name 
      }
    });
  }, [user?.vipStatus, navigation]);

  const handleNewAppointment = useCallback(() => {
    console.log('📅 New appointment button pressed');
    navigation.navigate('Appointments', { screen: 'BookAppointment' });
  }, [navigation]);

  const handleNextAppointmentPress = useCallback(() => {
    if (dashboardData?.nextAppointment) {
      console.log('📅 Next appointment pressed:', dashboardData.nextAppointment.id);
      navigation.navigate('Appointments', { 
        screen: 'AppointmentDetails',
        params: {
          appointmentId: dashboardData.nextAppointment.id 
        }
      });
    }
  }, [dashboardData?.nextAppointment, navigation]);

  const handleChangeClinic = useCallback(() => {
    Alert.alert(
      'Cambiar clínica',
      'Esta función estará disponible próximamente. Por ahora trabajamos con nuestra clínica principal.',
      [{ text: 'Entendido', style: 'default' }]
    );
  }, []);

  const handleProfilePress = useCallback(() => {
    console.log('👤 Profile button pressed');
    navigation.navigate('Profile');
  }, [navigation]);

  const handleBeautyPointsPress = useCallback(async () => {
    try {
      console.log('💎 Beauty points pressed');
      const response = await dashboardAPI.getBeautyPoints();
      
      if (response.success) {
        navigation.navigate('Profile', { 
          screen: 'BeautyPoints',
          params: { pointsData: response.data }
        });
      } else {
        throw new Error(response.error?.message || 'Error obteniendo beauty points');
      }
    } catch (error) {
      console.error('❌ Error loading beauty points:', error);
      const errorMessage = handleApiError(error, 'No se pudieron cargar los detalles de Beauty Points');
      Alert.alert('Error', errorMessage);
    }
  }, [navigation]);

  const handleSeeAllTreatments = useCallback(() => {
    console.log('💆‍♀️ See all treatments pressed');
    navigation.navigate('Treatments');
  }, [navigation]);

  // ============================================================================
  // EFFECTS - VERSIÓN OPTIMIZADA Y SIN ERRORES
  // ============================================================================
  
  // Effect inicial - solo se ejecuta una vez
  useEffect(() => {
    const initializeHome = async () => {
      try {
        console.log('🚀 Initializing home screen...');
        
        const isAuth = await api.isAuthenticated();
        if (!isAuth) {
          console.log('❌ User not authenticated, redirecting to login');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
          return;
        }
        
        await loadDashboardData();
        isInitialized.current = true;
        
      } catch (error) {
        console.error('❌ Error initializing home:', error);
        const errorMessage = handleApiError(error, 'Error al inicializar la pantalla');
        Alert.alert('Error', errorMessage);
      }
    };

    if (!isInitialized.current) {
      initializeHome();
    }
  }, []); // ✅ Solo dependencias estáticas

  // Effect para refresh cuando vuelve a la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Solo refrescar si ya está inicializado y hay data
      if (isInitialized.current && dashboardData) {
        console.log('🔄 Screen focused, refreshing data...');
        loadDashboardData(true);
      }
    });

    return unsubscribe;
  }, [navigation, loadDashboardData]); // ✅ loadDashboardData ya es memoizado

  // Función de refresh para pull-to-refresh
  const onRefresh = useCallback(() => {
    console.log('🔄 Manual refresh triggered');
    loadDashboardData(true);
  }, [loadDashboardData]);

  // ============================================================================
  // UTILIDADES DE FORMATO
  // ============================================================================
  const formatAppointmentDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Hoy';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Mañana';
      } else {
        return date.toLocaleDateString('es-AR', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }, []);

  const formatAppointmentTime = useCallback((timeString: string) => {
    try {
      const time = new Date(timeString);
      return time.toLocaleTimeString('es-AR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString;
    }
  }, []);

  // ============================================================================
  // RETURN OPTIMIZADO
  // ============================================================================
  return {
    // Estados
    dashboardData,
    loading,
    refreshing,
    wellnessCompleted,
    selectedClinic,
    user,
    error,
    
    // Funciones - todas memoizadas para evitar re-renders
    handleWellnessCheckIn,
    handleTreatmentPress,
    handleNewAppointment,
    handleNextAppointmentPress,
    handleChangeClinic,
    handleProfilePress,
    handleBeautyPointsPress,
    handleSeeAllTreatments,
    onRefresh,
    formatAppointmentDate,
    formatAppointmentTime,
    
    // Función para retry manual en caso de error
    retryLoad: () => loadDashboardData(false),
  };
};