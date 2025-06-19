// ============================================================================
// components/profile/index.ts - BARREL EXPORTS COMPLETOS
// ============================================================================

// Componentes principales
export { default as ProfileScreen } from '../../screens/ProfileScreen';

// Componentes básicos
export { SectionHeader } from './SectionHeader';
export { InputField } from './InputField';
export { TagSelector } from './TagSelector';
export { NotificationToggle } from './NotificationToggle';
export { ClinicSelector } from './ClinicSelector';
export { ProfileHeader } from './ProfileHeader';
export { NotesInput } from './NotesInput';
export { SaveButton } from './SaveButton';
export { LegalCard } from './LegalCard';
export { ActionButton } from './ActionButton';
export { ClinicSelectionModal } from './ClinicSelectionModal';

// Componentes nuevos con API
export { ProfileStatsCard } from './ProfileStatsCard';
export { InviteFriendCard } from './InviteFriendCard';
export { ChangePasswordCard } from './ChangePasswordCard';
export { RecentActivityCard } from './RecentActivityCard';
export { SkinTypeSelector } from './SkinTypeSelector';

// Estilos y constantes
export { profileStyles } from './styles';
export { treatmentOptions, scheduleOptions } from './constants';

// ============================================================================
// hooks/index.ts - BARREL EXPORTS PARA HOOKS
// ============================================================================

// Hooks principales
export { useProfile } from './useProfile';
export { useClinicSelector } from './useClinicSelector';
export { useProfileActions } from './useProfileActions';

// Hooks nuevos
export { useProfileStats } from './useProfileStats';
export { useProfileHistory } from './useProfileHistory';

// Tipos
export type { UserProfile, NotificationSettings } from './useProfile';
export type { Clinic } from './useClinicSelector';
