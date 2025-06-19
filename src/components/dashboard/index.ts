// ============================================================================
// components/dashboard/index.ts - EXPORTS ACTUALIZADOS CON NUEVO COMPONENTE
// ============================================================================

// Componentes principales
export { ModernCard } from './ModernCard';
export { ActionButton } from './ActionButton';

// Header y componentes de información
export { DashboardHeader } from './DashboardHeader';
export { ClinicInfoCard } from './ClinicInfoCard'; // ← NUEVO COMPONENTE

// Cards de contenido
export { NextAppointmentCard } from './NextAppointmentCard';
export { BeautyPointsCard } from './BeautyPointsCard';
export { WellnessCheckInCard } from './WellnessCheckInCard';
export { WellnessTipCard } from './WellnessTipCard';

// Secciones y carruseles
export { TreatmentCarousel } from './TreatmentCarousel';
export { RecommendationsSection } from './RecommendationsSection';

// Estilos optimizados
export { dashboardStyles, appointmentCardStyles, commonStyles } from './styles';

// Tipos completos
export type * from './types';

// ============================================================================
// EXPORTS ORGANIZADOS POR CATEGORÍA (OPCIONAL - PARA IMPORTS ESPECÍFICOS)
// ============================================================================

// Headers y navegación
export const HeaderComponents = {
  DashboardHeader,
  ClinicInfoCard,
} as const;

// Cards de contenido principal
export const ContentCards = {
  NextAppointmentCard,
  BeautyPointsCard,
  WellnessCheckInCard,
  WellnessTipCard,
} as const;

// Componentes de UI base
export const BaseComponents = {
  ModernCard,
  ActionButton,
} as const;

// Secciones complejas
export const SectionComponents = {
  TreatmentCarousel,
  RecommendationsSection,
} as const;

// ============================================================================
// ALIASES PARA IMPORTS CONVENIENTES
// ============================================================================

// Para imports grupales convenientes
export const Dashboard = {
  // Headers
  Header: DashboardHeader,
  ClinicInfo: ClinicInfoCard,
  
  // Cards principales
  Appointment: NextAppointmentCard,
  Points: BeautyPointsCard,
  Wellness: WellnessCheckInCard,
  Tip: WellnessTipCard,
  
  // UI Base
  Card: ModernCard,
  Button: ActionButton,
  
  // Secciones
  Treatments: TreatmentCarousel,
  Recommendations: RecommendationsSection,
  
  // Estilos
  styles: dashboardStyles,
} as const;

// ============================================================================
// TIPOS DE CONVENIENCIA PARA DESARROLLO
// ============================================================================

// Tipo que incluye todos los componentes disponibles
export type DashboardComponentType = 
  | typeof DashboardHeader
  | typeof ClinicInfoCard
  | typeof NextAppointmentCard
  | typeof BeautyPointsCard
  | typeof WellnessCheckInCard
  | typeof WellnessTipCard
  | typeof ModernCard
  | typeof ActionButton
  | typeof TreatmentCarousel
  | typeof RecommendationsSection;

// Tipo para props de componentes principales
export type DashboardComponentProps = 
  | React.ComponentProps<typeof DashboardHeader>
  | React.ComponentProps<typeof ClinicInfoCard>
  | React.ComponentProps<typeof NextAppointmentCard>
  | React.ComponentProps<typeof BeautyPointsCard>;

// ============================================================================
// EJEMPLOS DE USO CONVENIENTE:
// ============================================================================

/*
// Uso tradicional (recomendado para producción)
import { 
  DashboardHeader, 
  ClinicInfoCard, 
  NextAppointmentCard 
} from '../../components/dashboard';

// Uso con alias Dashboard (conveniente para desarrollo)
import { Dashboard } from '../../components/dashboard';
const Header = Dashboard.Header;
const ClinicInfo = Dashboard.ClinicInfo;

// Uso de categorías específicas
import { HeaderComponents, ContentCards } from '../../components/dashboard';
const { DashboardHeader, ClinicInfoCard } = HeaderComponents;
const { NextAppointmentCard, BeautyPointsCard } = ContentCards;

// Import de estilos separados
import { 
  dashboardStyles, 
  appointmentCardStyles, 
  commonStyles 
} from '../../components/dashboard';
*/

// ============================================================================
// VERSIÓN Y METADATA (OPCIONAL)
// ============================================================================
export const DASHBOARD_VERSION = '2.0.0';
export const DASHBOARD_METADATA = {
  version: DASHBOARD_VERSION,
  components: [
    'DashboardHeader',
    'ClinicInfoCard', // ← Nuevo
    'NextAppointmentCard',
    'BeautyPointsCard',
    'WellnessCheckInCard',
    'WellnessTipCard',
    'ModernCard',
    'ActionButton',
    'TreatmentCarousel',
    'RecommendationsSection',
  ],
  lastUpdated: '2024-12-19',
  architecture: 'modular-separated',
} as const;