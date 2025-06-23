// ============================================================================
// src/components/profile/index.ts - BARREL EXPORTS
// ============================================================================

// COMPONENTES PRINCIPALES
// Descomenta cuando ProfileScreen esté en la ruta correcta
// export { default as ProfileScreen } from '../../screens/profile/ProfileScreen';

// COMPONENTES BÁSICOS (verificar que existan)
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

// COMPONENTES CON API
export { ProfileStatsCard } from './ProfileStatsCard';
export { InviteFriendCard } from './InviteFriendCard';
export { ChangePasswordCard } from './ChangePasswordCard';
export { SkinTypeSelector } from './SkinTypeSelector';

// RecentActivityCard - TEMPORAL: comentado hasta verificar el tipo de export
// export { default as RecentActivityCard } from './RecentActivityCard';
// O si es export nombrado, usar:
// export { RecentActivityCard } from './RecentActivityCard';

// ESTILOS Y CONSTANTES
export { profileStyles } from './styles';
export { treatmentOptions, scheduleOptions } from './constants';