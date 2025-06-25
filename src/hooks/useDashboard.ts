// ============================================================================
// hooks/useDashboard.ts - HOOK ACTUALIZADO CON AUTO-REFRESH ✅
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { RootState } from '../store';
import { dashboardAPI, handleApiError } from '../services/api';

export interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    vipStatus: boolean;
    beautyPoints: number;
  };
  nextAppointment?: {
    id: string;
    treatment: string;
    date: string;
    time: string;
    professional: string;
    clinic: string;
  };
  featuredTreatments: Array<{
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    iconName: string;
    emoji?: string;
    isVipExclusive?: boolean;
  }>;
  wellnessTip?: {
    title: string;
    content: string;
    category: string;
    iconName: string;
  };
  stats: {
    totalSessions: number;
    beautyPoints: number;
    totalInvestment: number;
    vipStatus: boolean;
  };
  timestamp?: number; // ✅ NUEVO: Para control de refresh
}

export const useDashboard = (navigation: any) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0); // ✅ NUEVO

  // Obtener usuario del store
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Clínica seleccionada (en el futuro puede venir del store)
  const [selectedClinic] = useState('Belleza Estética Premium');

  // Función para obtener emoji basado en iconName
  const getEmojiForTreatment = useCallback((iconName: string): string => {
    const emojiMap: { [key: string]: string } = {
      'sparkles': '✨',
      'waves': '🌊',
      'droplets': '💧',
      'star': '⭐',
      'heart': '💖',
      'flower': '🌸',
      'leaf': '🍃',
      'crown': '👑',
      'gem': '💎',
      'fire': '🔥',
    };
    
    return emojiMap[iconName] || '💆‍♀️';
  }, []);

  // ✅ FUNCIÓN DE CARGA MEJORADA CON TIMESTAMP
  const loadDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      console.log('📊 Loading dashboard data...');
      const response = await dashboardAPI.getDashboard();
      
      if (response.success && response.data) {
        // Transformar los datos del backend al formato esperado por el frontend
        const data = response.data;
        const currentTimestamp = Date.now();
        
        const transformedData: DashboardData = {
          user: {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            vipStatus: data.user.vipStatus,
            beautyPoints: data.user.beautyPoints,
          },
          nextAppointment: data.nextAppointment ? {
            id: data.nextAppointment.id,
            treatment: data.nextAppointment.treatment,
            date: data.nextAppointment.date,
            time: data.nextAppointment.time,
            professional: data.nextAppointment.professional,
            clinic: data.nextAppointment.clinic,
          } : undefined,
          featuredTreatments: data.featuredTreatments.map((treatment: any) => ({
            id: treatment.id,
            name: treatment.name,
            description: treatment.description,
            duration: treatment.duration,
            price: treatment.price,
            iconName: treatment.iconName,
            emoji: getEmojiForTreatment(treatment.iconName),
            isVipExclusive: treatment.isVipExclusive || false,
          })),
          wellnessTip: data.wellnessTip ? {
            title: data.wellnessTip.title,
            content: data.wellnessTip.content,
            category: data.wellnessTip.category,
            iconName: data.wellnessTip.iconName,
          } : undefined,
          stats: data.stats,
          timestamp: currentTimestamp, // ✅ NUEVO
        };

        setDashboardData(transformedData);
        setLastRefreshTime(currentTimestamp); // ✅ NUEVO
        console.log('✅ Dashboard data loaded successfully');
        console.log('🔍 NextAppointment data:', transformedData.nextAppointment);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('❌ Error loading dashboard:', err);
      const errorMessage = handleApiError(err, 'Error al cargar el dashboard');
      setError(errorMessage);
      
      if (!isRefresh) {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getEmojiForTreatment]);

  // ✅ NUEVO: Función de refresh manual
  const refreshDashboard = useCallback(() => {
    console.log('🔄 Manual dashboard refresh triggered');
    loadDashboardData(true);
  }, [loadDashboardData]);

  // ✅ NUEVO: Auto-refresh inteligente en focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('📱 Dashboard screen focused');
      
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshTime;
      const REFRESH_THRESHOLD = 10000; // 10 segundos
      
      if (timeSinceLastRefresh > REFRESH_THRESHOLD || !dashboardData) {
        console.log('🔄 Auto-refreshing dashboard (data is stale or missing)');
        refreshDashboard();
      } else {
        console.log(`⏭️ Skipping refresh (last refresh: ${Math.round(timeSinceLastRefresh/1000)}s ago)`);
      }
    });

    return unsubscribe;
  }, [navigation, lastRefreshTime, dashboardData, refreshDashboard]);

  // ✅ MEJORADO: Efecto inicial
  useEffect(() => {
    if (!dashboardData) {
      loadDashboardData();
    }
  }, [loadDashboardData, dashboardData]);

  // Handlers de navegación
  const handleNewAppointment = useCallback(() => {
    navigation.navigate('BookAppointment');
  }, [navigation]);

  const handleNextAppointmentPress = useCallback(() => {
    if (dashboardData?.nextAppointment) {
      navigation.navigate('AppointmentDetails', {
        appointmentId: dashboardData.nextAppointment.id
      });
    }
  }, [navigation, dashboardData]);

  const handleChangeClinic = useCallback(() => {
    Alert.alert(
      'Cambiar clínica',
      'Esta función estará disponible próximamente',
      [{ text: 'Entendido', style: 'default' }]
    );
  }, []);

  const handleProfilePress = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const handleBeautyPointsPress = useCallback(async () => {
    try {
      console.log('💎 Loading beauty points...');
      const response = await dashboardAPI.getBeautyPoints();
      
      if (response.success) {
        navigation.navigate('BeautyPoints', { pointsData: response.data });
      } else {
        throw new Error('Failed to load beauty points');
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err, 'No se pudieron cargar los Beauty Points');
      Alert.alert('Error', errorMessage);
    }
  }, [navigation]);

  const handleTreatmentPress = useCallback((treatment: any) => {
    navigation.navigate('TreatmentDetails', { 
      treatmentId: treatment.id,
      treatment 
    });
  }, [navigation]);

  const handleSeeAllTreatments = useCallback(() => {
    navigation.navigate('Treatments');
  }, [navigation]);

  // ✅ MEJORADO: Refresh con timestamp update
  const onRefresh = useCallback(() => {
    console.log('🔄 Pull-to-refresh triggered');
    loadDashboardData(true);
  }, [loadDashboardData]);

  // Retry
  const retryLoad = useCallback(() => {
    console.log('🔄 Retry load triggered');
    loadDashboardData();
  }, [loadDashboardData]);

  // Formatear fecha
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
        return date.toLocaleDateString('es-ES', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        });
      }
    } catch (error) {
      return dateString;
    }
  }, []);

  // Formatear hora
  const formatAppointmentTime = useCallback((timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      return timeString;
    }
  }, []);

  // ✅ NUEVO: Función para forzar refresh desde otras pantallas
  const triggerRefresh = useCallback(() => {
    console.log('🎯 External refresh trigger received');
    setLastRefreshTime(0); // Resetear timestamp para forzar refresh
    refreshDashboard();
  }, [refreshDashboard]);

  return {
    // Estado
    dashboardData,
    loading,
    refreshing,
    error,
    user,
    selectedClinic,
    lastRefreshTime, // ✅ NUEVO
    
    // Handlers
    handleNewAppointment,
    handleNextAppointmentPress,
    handleChangeClinic,
    handleProfilePress,
    handleBeautyPointsPress,
    handleTreatmentPress,
    handleSeeAllTreatments,
    
    // Utilidades
    onRefresh,
    retryLoad,
    refreshDashboard, // ✅ NUEVO
    triggerRefresh, // ✅ NUEVO
    formatAppointmentDate,
    formatAppointmentTime,
  };
};