// ============================================================================
// hooks/useVIP.ts - CUSTOM HOOK PARA LÓGICA VIP (CORREGIDO Y OPTIMIZADO) ✅
// ============================================================================
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { vipAPI, handleApiError } from '../services/api';

// ✅ IMPORTAR TIPOS DESDE auth.ts PARA CONSISTENCIA
import type { User } from '../types/auth';

// ============================================================================
// TIPOS E INTERFACES ✅
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

// ✅ INTERFACE PARA ROOTSTATE
interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
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

// ============================================================================
// CONSTANTES ✅
// ============================================================================
const BENEFIT_ICONS: Record<string, string> = {
  'priority': '🚀',
  'discounts': '🏷️',
  'free-facial': '✨',
  'double-points': '💎',
  'personal-advisor': '👩‍⚕️',
  'birthday-gift': '🎁',
  'custom-guide': '📋',
};

const BENEFIT_CATEGORIES: Record<string, VIPBenefit['category']> = {
  'priority': 'access',
  'discounts': 'discounts', 
  'free-facial': 'services',
  'double-points': 'services',
  'personal-advisor': 'support',
  'birthday-gift': 'events',
  'custom-guide': 'support',
};

// ============================================================================
// HOOK PRINCIPAL ✅
// ============================================================================
export const useVIP = (navigation?: any): UseVIPReturn => {
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
  // HELPERS ✅
  // ============================================================================
  const getIconForBenefit = useCallback((benefitId: string): string => {
    return BENEFIT_ICONS[benefitId] || '⭐';
  }, []);

  const getCategoryForBenefit = useCallback((benefitId: string): VIPBenefit['category'] => {
    const category = BENEFIT_CATEGORIES[benefitId];
    // ✅ VALIDAR QUE EL VALOR SEA DEL TIPO CORRECTO
    if (category && ['access', 'discounts', 'services', 'events', 'support'].includes(category)) {
      return category;
    }
    return 'services'; // Valor por defecto seguro
  }, []);

  const scrollToPlans = useCallback(() => {
    Alert.alert(
      'Planes VIP',
      'Selecciona tu plan preferido más abajo para comenzar a disfrutar de todos los beneficios exclusivos.'
    );
  }, []);

  // ============================================================================
  // FUNCIONES DE API ✅
  // ============================================================================
  const loadVIPData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      console.log('👑 Cargando datos VIP...');

      // Cargar datos en paralelo
      const [statusResponse, benefitsResponse, testimonialsResponse] = await Promise.all([
        vipAPI.getStatus().catch(err => ({ success: false, error: err })),
        vipAPI.getBenefits().catch(err => ({ success: false, error: err })),
        vipAPI.getTestimonials().catch(err => ({ success: false, error: err })),
      ]);

      // ✅ MANEJO SEGURO DE RESPUESTAS
      if (statusResponse.success && statusResponse.data) {
        console.log('✅ Estado VIP cargado:', statusResponse.data);
        setVipStatus(statusResponse.data);
      } else {
        console.warn('⚠️ No se pudo cargar estado VIP');
      }

      if (benefitsResponse.success && benefitsResponse.data?.benefits) {
        console.log('✅ Beneficios VIP cargados:', benefitsResponse.data.benefits.length);
        
        // Mapear beneficios del backend a formato local
        const mappedBenefits: VIPBenefit[] = benefitsResponse.data.benefits.map((benefit: any) => ({
          id: benefit.id || benefit.key || 'unknown',
          title: benefit.title || 'Beneficio VIP',
          description: benefit.description || 'Beneficio exclusivo para miembros VIP',
          icon: getIconForBenefit(benefit.id || benefit.key),
          category: getCategoryForBenefit(benefit.id || benefit.key),
          available: benefit.available !== false, // Default true
        }));
        setBenefits(mappedBenefits);
      } else {
        console.warn('⚠️ No se pudieron cargar beneficios VIP');
        // ✅ BENEFICIOS DE FALLBACK
        setBenefits([
          {
            id: 'priority',
            title: 'Citas Prioritarias',
            description: 'Reserva citas con prioridad y acceso anticipado',
            icon: '🚀',
            category: 'access',
            available: true,
          },
          {
            id: 'discounts',
            title: 'Descuentos Exclusivos',
            description: '20% de descuento en todos los tratamientos',
            icon: '🏷️',
            category: 'discounts',
            available: true,
          },
          {
            id: 'free-facial',
            title: 'Facial Mensual Gratis',
            description: 'Un facial básico gratis cada mes',
            icon: '✨',
            category: 'services',
            available: true,
          },
        ]);
      }

      if (testimonialsResponse.success && testimonialsResponse.data?.testimonials) {
        console.log('✅ Testimonios cargados:', testimonialsResponse.data.testimonials.length);
        setTestimonials(testimonialsResponse.data.testimonials);
      } else {
        console.warn('⚠️ No se pudieron cargar testimonios');
        // ✅ TESTIMONIOS DE FALLBACK
        setTestimonials([
          {
            id: 1,
            name: 'María García',
            age: 32,
            avatar: '👩‍🦳',
            comment: 'Ser VIP ha transformado mi experiencia. Los descuentos y la atención prioritaria valen completamente la pena.',
            rating: 5,
          },
          {
            id: 2,
            name: 'Ana López',
            age: 28,
            avatar: '👱‍♀️',
            comment: 'El facial mensual gratis es increíble. Mi piel nunca se ha visto mejor.',
            rating: 5,
          },
        ]);
      }

    } catch (error) {
      console.error('❌ Error loading VIP data:', error);
      const errorMessage = handleApiError(error, 'No se pudo cargar la información VIP');
      
      // ✅ NO MOSTRAR ALERT EN REFRESH SILENCIOSO
      if (!isRefresh) {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [getIconForBenefit, getCategoryForBenefit]);

  const handleSubscribe = useCallback(async (planType: 'MONTHLY' | 'YEARLY') => {
    try {
      setSubscribing(true);
      console.log('👑 Suscribiendo a plan VIP:', planType);

      const response = await vipAPI.subscribe(planType);
      
      if (response.success) {
        console.log('✅ Suscripción VIP exitosa');
        
        // ✅ ACTUALIZAR USUARIO EN REDUX
        if (user && user.id) {
          const updatedUser: User = {
            ...user, // ✅ MANTENER TODOS LOS CAMPOS ORIGINALES
            vipStatus: true,
            updatedAt: new Date().toISOString(), // ✅ ACTUALIZAR TIMESTAMP
          };
          dispatch(setUser(updatedUser)); // ✅ SIN return
        }

        Alert.alert(
          '¡Bienvenida al Club VIP! 👑',
          response.data?.welcomeMessage || 'Ya puedes disfrutar de todos los beneficios exclusivos.',
          [
            {
              text: 'Explorar beneficios',
              onPress: () => loadVIPData(true),
            }
          ]
        );
      } else {
        throw new Error(response.error?.message || 'Error en la suscripción');
      }

    } catch (error) {
      console.error('❌ Error subscribing to VIP:', error);
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
      // Solo navegar si navigation está disponible
      if (!navigation) {
        Alert.alert(benefit.title, benefit.description);
        return;
      }

      // Navegar según el tipo de beneficio
      switch (benefit.category) {
        case 'access':
          navigation.navigate('Appointments', { vipAccess: true });
          break;
        case 'discounts':
          navigation.navigate('Treatments', { showVIPPrices: true });
          break;
        case 'services':
          // ✅ NAVIGATION SEGURO - VERIFICAR SI EXISTE LA PANTALLA
          if (navigation.navigate) {
            try {
              navigation.navigate('VIPServices');
            } catch (error) {
              console.warn('⚠️ VIPServices screen not found');
              Alert.alert(benefit.title, benefit.description);
            }
          } else {
            Alert.alert(benefit.title, benefit.description);
          }
          break;
        case 'events':
          try {
            navigation.navigate('VIPEvents');
          } catch (error) {
            console.warn('⚠️ VIPEvents screen not found');
            Alert.alert(benefit.title, benefit.description);
          }
          break;
        case 'support':
          try {
            navigation.navigate('VIPSupport');
          } catch (error) {
            console.warn('⚠️ VIPSupport screen not found');
            Alert.alert(benefit.title, benefit.description);
          }
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
  // EFFECTS ✅
  // ============================================================================
  useEffect(() => {
    loadVIPData();
  }, [loadVIPData]);

  // ============================================================================
  // RETURN ✅
  // ============================================================================
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

// ============================================================================
// EXPORT DEFAULT ✅
// ============================================================================
export default useVIP;