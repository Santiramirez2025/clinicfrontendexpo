// ============================================================================
// components/VIP/types.ts - TIPOS E INTERFACES VIP
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
  
  // Props interfaces
  export interface VIPHeaderProps {
    isVIP: boolean;
    onUpgradePress: () => void;
  }
  
  export interface VIPStatusCardProps {
    vipStatus: VIPStatus;
  }
  
  export interface BenefitCardProps {
    benefit: VIPBenefit;
    isVIP: boolean;
    onPress: (benefit: VIPBenefit) => void;
  }
  
  export interface TestimonialCardProps {
    testimonial: Testimonial;
  }
  
  export interface PricingCardProps {
    planType: 'MONTHLY' | 'YEARLY';
    price: number;
    originalPrice?: number;
    isPopular?: boolean;
    onSelect: (planType: 'MONTHLY' | 'YEARLY') => void;
  }
  
  export interface BenefitsSectionProps {
    benefits: VIPBenefit[];
    isVIP: boolean;
    onBenefitPress: (benefit: VIPBenefit) => void;
  }
  
  export interface TestimonialsSectionProps {
    testimonials: Testimonial[];
  }
  
  export interface PricingSectionProps {
    isVIP: boolean;
    onSubscribe: (planType: 'MONTHLY' | 'YEARLY') => void;
  }
  
  export interface LoadingOverlayProps {
    visible: boolean;
    text?: string;
  }