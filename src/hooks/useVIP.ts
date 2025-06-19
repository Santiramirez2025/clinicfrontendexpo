// ============================================================================
// hooks/useVIP.ts - CUSTOM HOOK PARA LÓGICA VIP (CORREGIDO)
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/slices/authSlice';
import { vipAPI, handleApiError } from '../services/api';

// ============================================================================
// TIPOS LOCALES (evita importar desde components para evitar dependencias circulares)
// ============================================================================
export interface VIPBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'access' | 'discounts' | 'services' | 'events' | 'support';
  available: boolean;
}

export interface VIPStatus {
  isVIP: boolean;
  subscription?: {
    id: string;
    planType: 'MONTHLY' | 'YEARLY';
    price: number;
    status: string;
    expiresAt: string;
    daysRemaining: number;
  };
  benefits: {
    discountPercentage: number;
    pointsMultiplier: number;
    priorityBooking: boolean;
    freeMonthlyFacial: boolean;
    personalAdvisor: boolean;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  age: number;
  avatar: string;
  comment: string;
  rating: number;
}

interface UseVIPReturn {
  // Estado
  loading: boolean;
  refreshing: boolean;
  subscribing: boolean;
  vipStatus: VIPStatus | null;
  benefits: VIPBenefit[];
  testimonials: Testimonial[];
  
  // Funciones
  loadVIPData: (isRefresh?: boolean) => Promise<void>;
  handleSubscribe: (planType: 'MONTHLY' | 'YEARLY') => Promise<void>;
  handleBenefitPress: (benefit: VIPBenefit) => void;
  handleUpgrade: () => void;
  onRefresh: () => void;
  
  // Helpers
  getIconForBenefit: (benefitId: string) => string;
  getCategoryForBenefit: (benefitId: string) => VIPBenefit['category'];
}

export const useVIP = (navigation: any): UseVIPReturn => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Estados
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [vipStatus, setVipStatus] = useState<VIPStatus | null>(null);
  const [benefits, setBenefits] = useState<VIPBenefit[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [subscribing, setSubscribing] = useState(false);

  // ============================================================================
  // HELPERS (definidos antes de ser usados)
  // ============================================================================
  const getIconForBenefit = useCallback((benefitId: string): string => {
    const icons = {
      'priority': '🚀',
      'discounts': '🏷️',
      'free-facial': '✨',
      'double-points': '💎',
      'personal-advisor': '👩‍⚕️',
      'birthday-gift': '🎁',
      'custom-guide': '📋',
    };
    return icons[benefitId as keyof typeof icons] || '⭐';
  }, []);

  const getCategoryForBenefit = useCallback((benefitId: string): VIPBenefit['category'] => {
    const categories = {
      'priority': 'access',
      'discounts': 'discounts', 
      'free-facial': 'services',
      'double-points': 'services',
      'personal-advisor': 'support',
      'birthday-gift': 'events',
      'custom-guide': 'support',
    };
    return categories[benefitId as keyof typeof categories] || 'services';
  }, []);

  const scrollToPlans = useCallback(() => {
    // En una implementación real, harías scroll a la sección de planes
    Alert.alert(
      'Planes VIP',
      'Selecciona tu plan preferido más abajo para comenzar a disfrutar de todos los beneficios exclusivos.'
    );
  }, []);

  // ============================================================================
  // FUNCIONES DE API
  // ============================================================================
  const loadVIPData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      // Cargar datos en paralelo
      const [statusResponse, benefitsResponse, testimonialsResponse] = await Promise.all([
        vipAPI.getStatus(),
        vipAPI.getBenefits(),
        vipAPI.getTestimonials(),
      ]);

      if (statusResponse.success) {
        setVipStatus(statusResponse.data);
      }

      if (benefitsResponse.success) {
        // Mapear beneficios del backend a formato local
        const mappedBenefits: VIPBenefit[] = benefitsResponse.data.benefits.map((benefit: any) => ({
          id: benefit.id,
          title: benefit.title,
          description: benefit.description,
          icon: getIconForBenefit(benefit.id),
          category: getCategoryForBenefit(benefit.id),
          available: true,
        }));
        setBenefits(mappedBenefits);
      }

      if (testimonialsResponse.success) {
        setTestimonials(testimonialsResponse.data.testimonials);
      }

    } catch (error) {
      console.error('Error loading VIP data:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar la información VIP');
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [getIconForBenefit, getCategoryForBenefit]);

  const handleSubscribe = useCallback(async (planType: 'MONTHLY' | 'YEARLY') => {
    try {
      setSubscribing(true);

      const response = await vipAPI.subscribe(planType);
      
      if (response.success) {
        // Actualizar estado del usuario
        const updatedUser = {
          ...user,
          vipStatus: true,
        };
        dispatch(setUser(updatedUser));

        Alert.alert(
          '¡Bienvenida al Club VIP! 👑',
          response.data.welcomeMessage || 'Ya puedes disfrutar de todos los beneficios exclusivos.',
          [
            {
              text: 'Explorar beneficios',
              onPress: () => loadVIPData(true), // Recargar datos
            }
          ]
        );
      }

    } catch (error) {
      console.error('Error subscribing to VIP:', error);
      const errorMessage = handleApiError(error, 'No se pudo procesar la suscripción');
      Alert.alert('Error en suscripción', errorMessage);
    } finally {
      setSubscribing(false);
    }
  }, [user, dispatch, loadVIPData]);

  const handleBenefitPress = useCallback((benefit: VIPBenefit) => {
    if (!vipStatus?.isVIP && benefit.available) {
      Alert.alert(
        `${benefit.icon} ${benefit.title}`,
        'Este beneficio está disponible con la membresía VIP. ¿Te gustaría suscribirte?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ver planes', onPress: scrollToPlans }
        ]
      );
      return;
    }

    if (vipStatus?.isVIP && benefit.available) {
      // Navegar según el tipo de beneficio
      switch (benefit.category) {
        case 'access':
          navigation.navigate('Appointments', { vipAccess: true });
          break;
        case 'discounts':
          navigation.navigate('Treatments', { showVIPPrices: true });
          break;
        case 'services':
          navigation.navigate('VIPServices');
          break;
        case 'events':
          navigation.navigate('VIPEvents');
          break;
        case 'support':
          navigation.navigate('VIPSupport');
          break;
        default:
          Alert.alert(benefit.title, benefit.description);
      }
    }
  }, [vipStatus, navigation, scrollToPlans]);

  const handleUpgrade = useCallback(() => {
    scrollToPlans();
  }, [scrollToPlans]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadVIPData(true);
  }, [loadVIPData]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    loadVIPData();
  }, [loadVIPData]);

  return {
    // Estado
    loading,
    refreshing,
    subscribing,
    vipStatus,
    benefits,
    testimonials,
    
    // Funciones
    loadVIPData,
    handleSubscribe,
    handleBenefitPress,
    handleUpgrade,
    onRefresh,
    
    // Helpers
    getIconForBenefit,
    getCategoryForBenefit,
  };
};