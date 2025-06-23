// ============================================================================
// components/VIP/index.ts - BARREL EXPORTS VIP
// ============================================================================

// ============================================================================
// 📦 COMPONENTES INDIVIDUALES
// ============================================================================
export { VIPHeader } from './VIPHeader';
export { VIPStatusCard } from './VIPStatusCard';
export { BenefitCard } from './BenefitCard';
export { PricingCard } from './PricingCard';
export { LoadingOverlay } from './LoadingOverlay';

// ============================================================================
// 🏗️ SECCIONES COMPLETAS
// ============================================================================
export { BenefitsSection } from './BenefitsSection';
export { PricingSection } from './PricingSection';

// ============================================================================
// 🎨 ESTILOS
// ============================================================================
export { vipStyles } from './styles';

// ============================================================================
// 🎯 TIPOS E INTERFACES
// ============================================================================
export type {
  // Tipos de datos
  VIPBenefit,
  VIPStatus,
  Testimonial,
  
  // Props de componentes individuales
  VIPHeaderProps,
  VIPStatusCardProps,
  BenefitCardProps,
  TestimonialCardProps,
  PricingCardProps,
  LoadingOverlayProps,
  
  // Props de secciones
  BenefitsSectionProps,
  TestimonialsSectionProps, // ✅ CORREGIDO: Nombre correcto del tipo
  PricingSectionProps,
} from './types';

// ============================================================================
// 🔧 UTILIDADES Y HELPERS (si existen)
// ============================================================================
// export { vipUtils } from './utils';
// export { vipConstants } from './constants';

// ============================================================================
// 🎭 RE-EXPORTS PARA CONVENIENCIA
// ============================================================================
// Si necesitas re-exportar todo como un namespace:
// import * as VIPComponents from './';
// export { VIPComponents };