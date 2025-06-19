// ============================================================================
// components/login/index.ts - LOGIN INDEX CORREGIDO SIN DUPLICADOS
// ============================================================================

// ✅ COMPONENTES - EXPORTAR SOLO LOS QUE EXISTEN Y TIENEN DEFAULT EXPORT
export { ConnectionStatus } from './ConnectionStatus';
export { LoginHeader } from './LoginHeader';
export { DemoCard } from './DemoCard';
export { ElegantDivider } from './ElegantDivider';
export { LoginForm } from './LoginForm';
export { TestCredentials } from './TestCredentials';
export { LoginFooter } from './LoginFooter';
export { ModernButton } from './ModernButton';
export { ModernInput } from './ModernInput';

// ✅ ESTILOS
export { loginStyles } from './styles';

// ✅ TYPES - UNA SOLA VEZ CADA UNO
export type { ModernButtonProps } from './ModernButton';
export type { ModernInputProps } from './ModernInput';
export type { ConnectionStatusProps } from './ConnectionStatus';
export type { DemoCardProps } from './DemoCard';
export type { LoginFormProps } from './LoginForm';
export type { TestCredentialsProps } from './TestCredentials';