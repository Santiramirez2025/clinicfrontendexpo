// ============================================================================
// components/common/index.ts - EXPORTS ACTUALIZADOS
// ============================================================================
// Re-exportar desde login (que ya funcionan)
export { ModernButton } from '../login/ModernButton';
export { ModernInput } from '../login/ModernInput';
export { ConnectionStatus } from '../login/ConnectionStatus';

// Nuevo componente
export { AuthHeader } from './AuthHeader';

// Tipos
export type { 
  ModernButtonProps,
  ModernInputProps,
  ConnectionStatusProps
} from '../login';

export type { AuthHeaderProps } from './AuthHeader';
