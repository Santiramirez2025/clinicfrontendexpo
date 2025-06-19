// ============================================================================
// components/appointmentscreen/index.ts - EXPORTACIONES CENTRALIZADAS
// ============================================================================

// Tipos e interfaces (PRIMERO para evitar dependencias circulares)
export type { 
    Appointment, 
    AppointmentSection, 
    TabType
  } from './types';
  
  export type { TabButtonProps } from './TabButton';
  export type { AppointmentCardProps } from './AppointmentCard';
  export type { EmptyStateProps } from './EmptyState';
  export type { AppointmentHeaderProps } from './AppointmentHeader';
  export type { AppointmentTabsProps } from './AppointmentTabs';
  export type { AppointmentListProps } from './AppointmentList';
  export type { AppointmentDetailModalProps } from './AppointmentDetailModal';
  
  // Estilos (SEGUNDO para estar disponible en componentes)
  export { appointmentStyles } from './styles';
  
  // Componentes auxiliares (TERCERO en orden de dependencia)
  export { TabButton } from './TabButton';
  export { LoadingScreen } from './LoadingScreen';
  export { AppointmentCard } from './AppointmentCard';
  export { EmptyState } from './EmptyState';
  export { AppointmentHeader } from './AppointmentHeader';
  export { AppointmentTabs } from './AppointmentTabs';
  export { AppointmentList } from './AppointmentList';
  export { AppointmentDetailModal } from './AppointmentDetailModal';
  
  // Hook personalizado (CUARTO)
  export { useAppointments } from '../../hooks/useAppointments';
  
  // Componente principal (ÚLTIMO para que tenga todas las dependencias disponibles)
  // NOTA: Este export está comentado porque AppointmentScreen debe estar en screens/
  // export { default as AppointmentScreen } from './AppointmentScreen';