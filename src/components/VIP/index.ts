// ============================================================================
// components/VIP/index.ts - BARREL EXPORTS VIP
// ============================================================================

// Componentes individuales
export { VIPHeader } from './VIPHeader';
export { VIPStatusCard } from './VIPStatusCard';
export { BenefitCard } from './BenefitCard';
export { TestimonialCard } from './TestimonialCard';
export { PricingCard } from './PricingCard';
export { LoadingOverlay } from './LoadingOverlay';

// Secciones completas
export { BenefitsSection } from './BenefitsSection';
export { TestimonialsSection } from './TestimonialsSection';
export { PricingSection } from './PricingSection';

// Estilos
export { vipStyles } from './styles';

// Tipos e interfaces
export type {
  VIPBenefit,
  VIPStatus,
  Testimonial,
  VIPHeaderProps,
  VIPStatusCardProps,
  BenefitCardProps,
  TestimonialCardProps,
  PricingCardProps,
  BenefitsSectionProps,
  TestimonialsSection as TestimonialsSectionProps,
  PricingSectionProps,
  LoadingOverlayProps
} from './types';