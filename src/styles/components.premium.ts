// ============================================================================
// styles/components.premium.ts - SISTEMA DE COMPONENTES PREMIUM
// ============================================================================

import { StyleSheet, Platform } from 'react-native';
import { premiumColors } from './colors.premium';
import { premiumTypographyStyles } from './typography.premium';
import { premiumSpacing, premiumComponents } from './spacing.premium';

/**
 * 🌟 FILOSOFÍA DE COMPONENTES
 * Cada componente tiene múltiples variantes (default, wellness, vip, minimal)
 * Estados consistentes (idle, hover, pressed, disabled, loading)
 * Microinteracciones elegantes con shadows y transitions
 * Accessibility-first con contrast ratios optimizados
 */

// ============================================================================
// 🎨 SISTEMA DE SOMBRAS PREMIUM
// ============================================================================
export const premiumShadows = {
  // === ELEVATION SYSTEM ===
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Sombras sutiles y orgánicas
  soft: {
    shadowColor: premiumColors.shadow.soft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },

  medium: {
    shadowColor: premiumColors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },

  strong: {
    shadowColor: premiumColors.shadow.strong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },

  // Sombras temáticas
  vip: {
    shadowColor: premiumColors.vip.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },

  wellness: {
    shadowColor: premiumColors.wellness.accent + '40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Sombras direccionales
  bottom: {
    shadowColor: premiumColors.shadow.soft,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  top: {
    shadowColor: premiumColors.shadow.soft,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },

  // Sombras especiales
  glow: {
    shadowColor: premiumColors.brand.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },

  inset: {
    // Para efectos neumórficos sutiles
    shadowColor: premiumColors.shadow.medium,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: -1, // Simular inset en Android
  },
} as const;

// ============================================================================
// 🔘 BOTONES PREMIUM
// ============================================================================
export const premiumButtons = StyleSheet.create({
  // === BASE BUTTON ===
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: premiumComponents.button.borderRadius,
    paddingHorizontal: premiumComponents.button.paddingHorizontal,
    paddingVertical: premiumComponents.button.paddingVertical,
    minHeight: premiumComponents.button.minHeight,
    flexDirection: 'row',
    gap: premiumSpacing.xs,
    ...premiumShadows.soft,
  },

  // === PRIMARY VARIANTS ===
  primary: {
    backgroundColor: premiumColors.brand.primary,
  },

  secondary: {
    backgroundColor: premiumColors.surface.elevated,
    borderWidth: 1,
    borderColor: premiumColors.brand.primary,
  },

  accent: {
    backgroundColor: premiumColors.brand.accent,
    ...premiumShadows.glow,
  },

  // === THEMED VARIANTS ===
  vip: {
    backgroundColor: premiumColors.vip.accent,
    borderWidth: 1,
    borderColor: premiumColors.vip.border,
    ...premiumShadows.vip,
  },

  wellness: {
    backgroundColor: premiumColors.wellness.accent,
    ...premiumShadows.wellness,
  },

  serenity: {
    backgroundColor: premiumColors.serenity.accent,
  },

  // === SIZE VARIANTS ===
  small: {
    paddingHorizontal: premiumComponents.button.small.paddingHorizontal,
    paddingVertical: premiumComponents.button.small.paddingVertical,
    borderRadius: premiumComponents.button.small.borderRadius,
    minHeight: premiumComponents.button.small.minHeight,
  },

  large: {
    paddingHorizontal: premiumComponents.button.large.paddingHorizontal,
    paddingVertical: premiumComponents.button.large.paddingVertical,
    borderRadius: premiumComponents.button.large.borderRadius,
    minHeight: premiumComponents.button.large.minHeight,
  },

  // === STYLE VARIANTS ===
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: premiumColors.gray[300],
    ...premiumShadows.none,
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: premiumColors.brand.primary,
    ...premiumShadows.none,
  },

  text: {
    backgroundColor: 'transparent',
    ...premiumShadows.none,
    paddingHorizontal: premiumSpacing.sm,
    paddingVertical: premiumSpacing.xs,
  },

  // === STATES ===
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    backgroundColor: premiumColors.gray[200],
    opacity: 0.6,
    ...premiumShadows.none,
  },

  loading: {
    opacity: 0.8,
  },

  // === BUTTON TEXT ===
  textPrimary: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.text.inverse,
  },

  textSecondary: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.brand.primary,
  },

  textAccent: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.text.inverse,
    fontWeight: '600',
  },

  textVip: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.text.inverse,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  textGhost: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.text.primary,
  },

  textDisabled: {
    ...premiumTypographyStyles.buttonMedium,
    color: premiumColors.text.muted,
  },
});

// ============================================================================
// 🎴 CARDS PREMIUM
// ============================================================================
export const premiumCards = StyleSheet.create({
  // === BASE CARD ===
  base: {
    backgroundColor: premiumColors.surface.default,
    borderRadius: premiumComponents.card.borderRadius,
    padding: premiumComponents.card.padding,
    margin: premiumComponents.card.margin,
    ...premiumShadows.soft,
  },

  // === ELEVATION VARIANTS ===
  elevated: {
    backgroundColor: premiumColors.surface.elevated,
    ...premiumShadows.medium,
  },

  floating: {
    backgroundColor: premiumColors.surface.elevated,
    ...premiumShadows.strong,
  },

  // === THEMED VARIANTS ===
  vip: {
    backgroundColor: premiumColors.vip.background,
    borderWidth: 1,
    borderColor: premiumColors.vip.border,
    padding: premiumComponents.card.vip.padding,
    margin: premiumComponents.card.vip.margin,
    borderRadius: premiumComponents.card.vip.borderRadius,
    ...premiumShadows.vip,
  },

  wellness: {
    backgroundColor: premiumColors.wellness.background,
    borderLeftWidth: 4,
    borderLeftColor: premiumColors.wellness.accent,
    ...premiumShadows.wellness,
  },

  serenity: {
    backgroundColor: premiumColors.serenity.background,
    borderTopWidth: 3,
    borderTopColor: premiumColors.serenity.accent,
  },

  // === SIZE VARIANTS ===
  compact: {
    padding: premiumComponents.card.compact.padding,
    borderRadius: premiumComponents.card.compact.borderRadius,
  },

  spacious: {
    padding: premiumComponents.card.spacious.padding,
    borderRadius: premiumComponents.card.spacious.borderRadius,
  },

  // === STYLE VARIANTS ===
  glass: {
    backgroundColor: premiumColors.surface.glass,
    borderWidth: 1,
    borderColor: premiumColors.gray[200],
  },

  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: premiumColors.gray[300],
    ...premiumShadows.none,
  },

  minimal: {
    backgroundColor: premiumColors.background.warm,
    ...premiumShadows.none,
    borderRadius: premiumSpacing.sm,
    padding: premiumSpacing.md,
  },

  // === INTERACTIVE STATES ===
  interactive: {
    // Base interactive card
  },

  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },

  // === CONTENT AREAS ===
  header: {
    paddingBottom: premiumSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: premiumColors.gray[200],
    marginBottom: premiumSpacing.md,
  },

  body: {
    flex: 1,
  },

  footer: {
    paddingTop: premiumSpacing.md,
    borderTopWidth: 1,
    borderTopColor: premiumColors.gray[200],
    marginTop: premiumSpacing.md,
  },
});

// ============================================================================
// 📝 INPUTS PREMIUM
// ============================================================================
export const premiumInputs = StyleSheet.create({
  // === BASE INPUT ===
  base: {
    backgroundColor: premiumColors.surface.default,
    borderRadius: premiumComponents.input.borderRadius,
    paddingHorizontal: premiumComponents.input.paddingHorizontal,
    paddingVertical: premiumComponents.input.paddingVertical,
    minHeight: premiumComponents.input.minHeight,
    borderWidth: 1,
    borderColor: premiumColors.gray[300],
    ...premiumTypographyStyles.bodyLarge,
    color: premiumColors.text.primary,
  },

  // === STATES ===
  focused: {
    borderColor: premiumColors.brand.accent,
    borderWidth: 2,
    backgroundColor: premiumColors.surface.elevated,
    ...premiumShadows.soft,
  },

  error: {
    borderColor: premiumColors.semantic.error,
    borderWidth: 2,
    backgroundColor: premiumColors.surface.elevated,
  },

  disabled: {
    backgroundColor: premiumColors.gray[100],
    borderColor: premiumColors.gray[200],
    color: premiumColors.text.muted,
    opacity: 0.7,
  },

  // === VARIANTS ===
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: premiumColors.gray[300],
  },

  filled: {
    backgroundColor: premiumColors.gray[100],
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: premiumColors.gray[300],
    borderRadius: premiumSpacing.xs,
  },

  underlined: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: premiumColors.gray[300],
    borderRadius: 0,
    paddingHorizontal: 0,
  },

  // === SEARCH SPECIFIC ===
  search: {
    backgroundColor: premiumColors.gray[100],
    borderRadius: premiumSpacing['2xl'], // Pill shape
    paddingHorizontal: premiumSpacing.lg,
    borderWidth: 0,
    ...premiumShadows.none,
  },

  searchFocused: {
    backgroundColor: premiumColors.surface.elevated,
    ...premiumShadows.soft,
  },

  // === SIZES ===
  small: {
    paddingHorizontal: premiumComponents.input.paddingHorizontal * 0.75,
    paddingVertical: premiumComponents.input.paddingVertical * 0.75,
    minHeight: premiumComponents.input.minHeight * 0.8,
    ...premiumTypographyStyles.bodySmall,
  },

  large: {
    paddingHorizontal: premiumComponents.input.paddingHorizontal * 1.25,
    paddingVertical: premiumComponents.input.paddingVertical * 1.25,
    minHeight: premiumComponents.input.minHeight * 1.2,
    ...premiumTypographyStyles.bodyLarge,
  },

  // === LABELS ===
  label: {
    ...premiumTypographyStyles.labelLarge,
    color: premiumColors.text.secondary,
    marginBottom: premiumComponents.input.labelMargin,
  },

  labelRequired: {
    ...premiumTypographyStyles.labelLarge,
    color: premiumColors.text.secondary,
    marginBottom: premiumComponents.input.labelMargin,
  },

  labelError: {
    ...premiumTypographyStyles.labelLarge,
    color: premiumColors.semantic.error,
    marginBottom: premiumComponents.input.labelMargin,
  },

  // === HELPER TEXT ===
  helper: {
    ...premiumTypographyStyles.caption,
    color: premiumColors.text.tertiary,
    marginTop: premiumComponents.input.helperMargin,
  },

  helperError: {
    ...premiumTypographyStyles.caption,
    color: premiumColors.semantic.error,
    marginTop: premiumComponents.input.helperMargin,
  },

  // === PLACEHOLDER ===
  placeholder: {
    color: premiumColors.text.muted,
  },
});

// ============================================================================
// 🏷️ BADGES & CHIPS PREMIUM
// ============================================================================
export const premiumBadges = StyleSheet.create({
  // === BASE BADGE ===
  base: {
    backgroundColor: premiumColors.brand.primary,
    borderRadius: premiumComponents.badge.borderRadius,
    paddingHorizontal: premiumComponents.badge.paddingHorizontal,
    paddingVertical: premiumComponents.badge.paddingVertical,
    minWidth: premiumComponents.badge.minWidth,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  // === SEMANTIC VARIANTS ===
  success: {
    backgroundColor: premiumColors.semantic.success,
  },

  warning: {
    backgroundColor: premiumColors.semantic.warning,
  },

  error: {
    backgroundColor: premiumColors.semantic.error,
  },

  info: {
    backgroundColor: premiumColors.semantic.info,
  },

  // === THEMED VARIANTS ===
  vip: {
    backgroundColor: premiumColors.vip.accent,
    borderWidth: 1,
    borderColor: premiumColors.vip.border,
  },

  wellness: {
    backgroundColor: premiumColors.wellness.accent,
  },

  serenity: {
    backgroundColor: premiumColors.serenity.accent,
  },

  // === STYLE VARIANTS ===
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: premiumColors.brand.primary,
  },

  ghost: {
    backgroundColor: premiumColors.brand.primary + '15',
  },

  // === BADGE TEXT ===
  text: {
    ...premiumTypographyStyles.labelSmall,
    color: premiumColors.text.inverse,
    fontWeight: '600',
  },

  textOutlined: {
    ...premiumTypographyStyles.labelSmall,
    color: premiumColors.brand.primary,
    fontWeight: '600',
  },

  textGhost: {
    ...premiumTypographyStyles.labelSmall,
    color: premiumColors.brand.primary,
    fontWeight: '600',
  },

  textVip: {
    ...premiumTypographyStyles.labelSmall,
    color: premiumColors.text.inverse,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

// ============================================================================
// 🎪 CHIPS PREMIUM
// ============================================================================
export const premiumChips = StyleSheet.create({
  // === BASE CHIP ===
  base: {
    backgroundColor: premiumColors.gray[100],
    borderRadius: premiumComponents.chip.borderRadius,
    paddingHorizontal: premiumComponents.chip.paddingHorizontal,
    paddingVertical: premiumComponents.chip.paddingVertical,
    margin: premiumComponents.chip.margin,
    flexDirection: 'row',
    alignItems: 'center',
    gap: premiumComponents.chip.gap,
    alignSelf: 'flex-start',
  },

  // === SELECTION STATES ===
  selected: {
    backgroundColor: premiumColors.brand.accent,
  },

  unselected: {
    backgroundColor: premiumColors.gray[100],
    borderWidth: 1,
    borderColor: premiumColors.gray[300],
  },

  // === THEMED VARIANTS ===
  vipSelected: {
    backgroundColor: premiumColors.vip.accent,
    borderWidth: 1,
    borderColor: premiumColors.vip.border,
  },

  wellnessSelected: {
    backgroundColor: premiumColors.wellness.accent,
  },

  serenitySelected: {
    backgroundColor: premiumColors.serenity.accent,
  },

  // === INTERACTIVE STATES ===
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  // === CHIP TEXT ===
  text: {
    ...premiumTypographyStyles.labelMedium,
    color: premiumColors.text.primary,
    fontWeight: '500',
  },

  textSelected: {
    ...premiumTypographyStyles.labelMedium,
    color: premiumColors.text.inverse,
    fontWeight: '600',
  },

  textVip: {
    ...premiumTypographyStyles.labelMedium,
    color: premiumColors.text.inverse,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

// ============================================================================
// 🧩 LAYOUT COMPONENTS
// ============================================================================
export const premiumLayouts = StyleSheet.create({
  // === CONTAINERS ===
  screen: {
    flex: 1,
    backgroundColor: premiumColors.background.primary,
    paddingHorizontal: premiumSpacing.lg,
  },

  screenWarm: {
    flex: 1,
    backgroundColor: premiumColors.background.warm,
    paddingHorizontal: premiumSpacing.lg,
  },

  section: {
    marginBottom: premiumSpacing['2xl'],
  },

  // === FLEXBOX UTILITIES ===
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // === DIVIDERS ===
  divider: {
    height: premiumComponents.divider.thickness,
    backgroundColor: premiumColors.gray[200],
    marginVertical: premiumComponents.divider.margin,
  },

  dividerVip: {
    height: premiumComponents.divider.thickness,
    backgroundColor: premiumColors.vip.border,
    marginVertical: premiumComponents.divider.margin,
  },

  // === SPACERS ===
  spacerSmall: {
    height: premiumSpacing.sm,
  },

  spacerMedium: {
    height: premiumSpacing.md,
  },

  spacerLarge: {
    height: premiumSpacing.lg,
  },

  spacerXLarge: {
    height: premiumSpacing.xl,
  },
});

// ============================================================================
// 🎯 SPECIALIZED COMPONENTS
// ============================================================================
export const premiumSpecialized = StyleSheet.create({
  // === FLOATING ACTION BUTTON ===
  fab: {
    position: 'absolute',
    bottom: premiumSpacing['2xl'],
    right: premiumSpacing.lg,
    width: premiumComponents.icon.xlarge + premiumSpacing.md,
    height: premiumComponents.icon.xlarge + premiumSpacing.md,
    borderRadius: (premiumComponents.icon.xlarge + premiumSpacing.md) / 2,
    backgroundColor: premiumColors.brand.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...premiumShadows.strong,
  },

  fabVip: {
    backgroundColor: premiumColors.vip.accent,
    ...premiumShadows.vip,
  },

  // === AVATARS ===
  avatarSmall: {
    width: premiumComponents.avatar.small,
    height: premiumComponents.avatar.small,
    borderRadius: premiumComponents.avatar.small / 2,
    backgroundColor: premiumColors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarMedium: {
    width: premiumComponents.avatar.medium,
    height: premiumComponents.avatar.medium,
    borderRadius: premiumComponents.avatar.medium / 2,
    backgroundColor: premiumColors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarLarge: {
    width: premiumComponents.avatar.large,
    height: premiumComponents.avatar.large,
    borderRadius: premiumComponents.avatar.large / 2,
    backgroundColor: premiumColors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarVip: {
    borderWidth: premiumComponents.avatar.borderWidth,
    borderColor: premiumColors.vip.border,
  },

  // === PROGRESS INDICATORS ===
  progressBar: {
    height: 6,
    backgroundColor: premiumColors.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: premiumColors.brand.accent,
    borderRadius: 3,
  },

  progressVip: {
    backgroundColor: premiumColors.vip.accent,
  },

  // === MODALS ===
  modalOverlay: {
    flex: 1,
    backgroundColor: premiumColors.overlay.modal,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: premiumSpacing.lg,
  },

  modalContent: {
    backgroundColor: premiumColors.surface.elevated,
    borderRadius: premiumSpacing.lg,
    padding: premiumSpacing.xl,
    width: '100%',
    maxWidth: 400,
    ...premiumShadows.strong,
  },

  modalVip: {
    backgroundColor: premiumColors.vip.background,
    borderWidth: 1,
    borderColor: premiumColors.vip.border,
  },
});

// ============================================================================
// 🌟 EXPORTS
// ============================================================================
export default {
  shadows: premiumShadows,
  buttons: premiumButtons,
  cards: premiumCards,
  inputs: premiumInputs,
  badges: premiumBadges,
  chips: premiumChips,
  layouts: premiumLayouts,
  specialized: premiumSpecialized,
};

// Individual exports

// ============================================================================
// 🔤 TYPESCRIPT TYPES
// ============================================================================
export type ShadowVariant = keyof typeof premiumShadows;
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'vip' | 'wellness' | 'serenity' | 'ghost' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonState = 'idle' | 'pressed' | 'disabled' | 'loading';

export type CardVariant = 'base' | 'elevated' | 'floating' | 'vip' | 'wellness' | 'serenity' | 'glass' | 'outlined' | 'minimal';
export type CardSize = 'compact' | 'medium' | 'spacious';

export type InputVariant = 'base' | 'outlined' | 'filled' | 'underlined' | 'search';
export type InputSize = 'small' | 'medium' | 'large';
export type InputState = 'idle' | 'focused' | 'error' | 'disabled';

export type BadgeVariant = 'base' | 'success' | 'warning' | 'error' | 'info' | 'vip' | 'wellness' | 'serenity' | 'outlined' | 'ghost';
export type ChipState = 'selected' | 'unselected';

export type ComponentTheme = 'standard' | 'vip' | 'wellness' | 'serenity' | 'minimal';
// Exportar todo de una vez
export {
  premiumShadows,
  premiumButtons,
  premiumCards,
  premiumInputs,
  premiumBadges,
  premiumChips,
  premiumLayouts,
  premiumSpecialized,
};
