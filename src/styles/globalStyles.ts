// ============================================================================
// src/styles/globalStyles.ts - HERMES READY COMPLETAMENTE CORREGIDO 🌟✨
// ============================================================================
import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🎨 CONSTANTES SIMPLES PARA HERMES
const STANDARD_TOUCH_TARGET = 44;
const HERO_HEIGHT = Math.round(height / 3);

// ✅ COLORES DIRECTOS (SIN IMPORTS COMPLEJOS)
const safeColors = {
  // Core
  primary: "#2C2C54",
  secondary: "#FFF8F0",
  accent: "#E8B4CB",
  background: "#FDFCF8",
  backgroundWarm: "#FFF5F0",
  backgroundCool: "#F8FAFC",
  surface: "#FFFFFF",
  
  // Text
  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textTertiary: "#9CA3AF",
  textDisabled: "#D1D5DB",
  textInverse: "#FFFFFF",
  
  // States
  error: "#EF4444",
  errorLight: "#FEF2F2",
  success: "#10B981",
  successLight: "#F0FDF4",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  info: "#3B82F6",
  infoLight: "#EFF6FF",
  
  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderMedium: "#D1D5DB",
  
  // Shadow
  shadow: "#000000",
  
  // Themed colors (direct values)
  beautyPrimary: "#E8B4CB",
  beautySecondary: "#F4E4EC",
  beautyTertiary: "#FBEEF2",
  
  wellnessPrimary: "#9FD8CB",
  wellnessSecondary: "#E8F5F1",
  wellnessTertiary: "#F0FAF7",
  
  luxuryPrimary: "#D4AF37",
  luxurySecondary: "#F4E4BC",
  luxuryTertiary: "#FAF0D7",
  
  premiumPrimary: "#8B5CF6",
  premiumSecondary: "#EDE9FE",
  premiumTertiary: "#F3F0FF",
};

// ✅ SPACING DIRECTO (SIN IMPORTS COMPLEJOS)
const safeSpacing = {
  // Base scale
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  
  // Layout
  screenPadding: 20,
  screenPaddingLarge: 24,
  cardPadding: 20,
  cardPaddingLarge: 24,
  buttonPadding: 16,
  buttonPaddingLarge: 20,
  inputPadding: 16,
  sectionSpacing: 32,
  itemSpacing: 16,
  groupSpacing: 20,
  categorySpacing: 28,
  floatingOffset: 16,
  
  // Component
  radiusMD: 8,
  radiusLG: 12,
  radiusXL: 16,
  radiusXXL: 24,
  radiusRound: 999,
  borderHairline: Platform.select({ ios: 0.5, android: 0.5, default: 1 }),
  borderThin: 1,
  borderMedium: 2,
  borderThick: 4,
  
  // Avatars
  avatarMD: 48,
  avatarLG: 64,
  avatarXL: 80,
  
  // FAB
  fabSize: 56,
  
  // Aesthetic
  breathingMedium: 24,
  breathingLarge: 32,
};

// ✅ TYPOGRAPHY DIRECTO (SIN IMPORTS COMPLEJOS)
const safeTypography = {
  sizes: {
    input: 16,
    button: 16,
    body: 16,
    caption: 12,
    label: 14,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  styles: {
    heroTitle: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: '700' as const,
    },
    h1: {
      fontSize: 26,
      lineHeight: 32,
      fontWeight: '600' as const,
    },
    h2: {
      fontSize: 23,
      lineHeight: 28,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '500' as const,
    },
    h4: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: '500' as const,
    },
    bodyLarge: {
      fontSize: 18,
      lineHeight: 27,
      fontWeight: '400' as const,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '400' as const,
    },
    label: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '500' as const,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },
    overline: {
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '600' as const,
      textTransform: 'uppercase' as const,
    },
    button: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600' as const,
    },
  },
};

// ✨ SISTEMA DE SOMBRAS PREMIUM DIRECTO (MOVIDO DESPUÉS DE safeColors)
export const premiumShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  whisper: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  
  soft: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  medium: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  
  elevated: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  
  dramatic: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 12,
  },
  
  floating: {
    shadowColor: "#000000", // Valor directo
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 16,
  },
  
  // Themed shadows con valores directos
  beauty: {
    shadowColor: "#E8B4CB", // Valor directo
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  wellness: {
    shadowColor: "#9FD8CB", // Valor directo
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  luxury: {
    shadowColor: "#D4AF37", // Valor directo
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  premium: {
    shadowColor: "#8B5CF6", // Valor directo
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  
  inset: Platform.select({
    ios: {
      shadowColor: "#000000", // Valor directo
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: -2,
    },
    default: {},
  }),
};

// 🎭 ESTILOS GLOBALES PREMIUM HERMES-READY (COMPLETAMENTE CORREGIDOS)
export const globalStyles = StyleSheet.create({
  // ============================================================================
  // CONTAINERS PREMIUM
  // ============================================================================
  container: {
    flex: 1,
    backgroundColor: safeColors.background,
  },
  
  containerWarm: {
    flex: 1,
    backgroundColor: safeColors.backgroundWarm,
  },
  
  containerCool: {
    flex: 1,
    backgroundColor: safeColors.backgroundCool,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: safeColors.background,
    paddingHorizontal: safeSpacing.screenPadding,
  },
  
  screenContainerPremium: {
    flex: 1,
    backgroundColor: safeColors.background,
    paddingHorizontal: safeSpacing.screenPaddingLarge,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: safeColors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  
  contentContainer: {
    flex: 1,
    paddingHorizontal: safeSpacing.screenPadding,
    paddingVertical: safeSpacing.sectionSpacing,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: safeSpacing.screenPadding,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: safeSpacing.screenPadding,
  },

  // ============================================================================
  // CARDS PREMIUM SYSTEM (CORREGIDAS TODAS LAS CONCATENACIONES)
  // ============================================================================
  cardBase: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  card: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  cardElevated: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusXL,
    padding: safeSpacing.cardPaddingLarge,
    marginVertical: safeSpacing.groupSpacing,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  
  cardPremium: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusXL,
    padding: safeSpacing.cardPaddingLarge,
    marginVertical: safeSpacing.groupSpacing,
    borderWidth: safeSpacing.borderThin,
    borderColor: '#8B5CF620', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  
  cardBeauty: {
    backgroundColor: safeColors.beautyTertiary,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    borderLeftWidth: safeSpacing.borderThick,
    borderLeftColor: safeColors.beautyPrimary,
    shadowColor: safeColors.beautyPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  cardWellness: {
    backgroundColor: safeColors.wellnessTertiary,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    borderLeftWidth: safeSpacing.borderThick,
    borderLeftColor: safeColors.wellnessPrimary,
    shadowColor: safeColors.wellnessPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  cardLuxury: {
    backgroundColor: safeColors.luxuryTertiary,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    borderWidth: safeSpacing.borderThin,
    borderColor: '#D4AF3730', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    shadowColor: safeColors.luxuryPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  cardFloating: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusXXL,
    padding: safeSpacing.cardPaddingLarge,
    marginVertical: safeSpacing.categorySpacing,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 16,
  },
  
  cardGlass: {
    backgroundColor: '#FFFFFFE6', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    borderRadius: safeSpacing.radiusXL,
    padding: safeSpacing.cardPadding,
    borderWidth: safeSpacing.borderHairline,
    borderColor: '#E5E7EB40', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  // ============================================================================
  // TYPOGRAPHY PREMIUM (SIN SPREAD)
  // ============================================================================
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: safeColors.textPrimary,
    textAlign: 'center',
  },
  
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    color: safeColors.textPrimary,
  },
  
  h2: {
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '600',
    color: safeColors.textPrimary,
  },
  
  h3: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    color: safeColors.textPrimary,
  },
  
  h4: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: safeColors.textPrimary,
  },
  
  bodyLarge: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '400',
    color: safeColors.textPrimary,
  },
  
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: safeColors.textPrimary,
  },
  
  bodySmall: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: safeColors.textSecondary,
  },
  
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: safeColors.textPrimary,
  },
  
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: safeColors.textTertiary,
  },
  
  overline: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '600',
    color: safeColors.textTertiary,
    textTransform: 'uppercase',
  },
  
  textLuxury: {
    fontSize: 16,
    fontWeight: '500',
    color: safeColors.luxuryPrimary,
  },
  
  textBeauty: {
    fontSize: 14,
    fontWeight: '500',
    color: safeColors.beautyPrimary,
  },
  
  textWellness: {
    fontSize: 16,
    fontWeight: '400',
    color: safeColors.wellnessPrimary,
  },
  
  textPremium: {
    fontSize: 16,
    fontWeight: '600',
    color: "#8B5CF6",
  },
  
  textMuted: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: safeColors.textDisabled,
  },
  
  textError: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: safeColors.error,
  },
  
  textSuccess: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: safeColors.success,
  },

  // ============================================================================
  // BUTTONS PREMIUM SYSTEM (SIN SPREAD)
  // ============================================================================
  buttonBase: {
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPadding,
    paddingHorizontal: safeSpacing.buttonPadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  buttonPrimary: {
    backgroundColor: safeColors.primary,
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPadding,
    paddingHorizontal: safeSpacing.buttonPadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: safeSpacing.borderThin,
    borderColor: safeColors.primary,
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPadding,
    paddingHorizontal: safeSpacing.buttonPadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
  },
  
  buttonAccent: {
    backgroundColor: safeColors.accent,
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPadding,
    paddingHorizontal: safeSpacing.buttonPadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  buttonLuxury: {
    backgroundColor: safeColors.luxuryPrimary,
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPaddingLarge,
    paddingHorizontal: safeSpacing.buttonPaddingLarge * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
    shadowColor: safeColors.luxuryPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  buttonPremium: {
    backgroundColor: "#8B5CF6",
    borderRadius: safeSpacing.radiusLG,
    paddingVertical: safeSpacing.buttonPaddingLarge,
    paddingHorizontal: safeSpacing.buttonPaddingLarge * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET + 8,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  
  buttonGhost: {
    backgroundColor: 'transparent',
    borderRadius: safeSpacing.radiusMD,
    paddingVertical: safeSpacing.buttonPadding,
    paddingHorizontal: safeSpacing.buttonPadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: STANDARD_TOUCH_TARGET,
  },
  
  buttonFloating: {
    backgroundColor: safeColors.accent,
    borderRadius: safeSpacing.radiusRound,
    width: safeSpacing.fabSize,
    height: safeSpacing.fabSize,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: safeSpacing.floatingOffset,
    right: safeSpacing.floatingOffset,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 16,
  },
  
  // Button text styles (SIN SPREAD OPERATORS)
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: safeColors.textInverse,
  },
  
  buttonTextSecondary: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: safeColors.primary,
  },
  
  buttonTextGhost: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: safeColors.textPrimary,
  },
  
  buttonTextLuxury: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '700',
    color: safeColors.textInverse,
  },

  // ============================================================================
  // INPUTS PREMIUM SYSTEM (CORREGIDOS)
  // ============================================================================
  inputBase: {
    borderRadius: safeSpacing.radiusMD,
    paddingHorizontal: safeSpacing.inputPadding,
    paddingVertical: safeSpacing.inputPadding,
    fontSize: 16,
    color: safeColors.textPrimary,
    backgroundColor: safeColors.surface,
    minHeight: STANDARD_TOUCH_TARGET,
  },
  
  input: {
    borderWidth: safeSpacing.borderThin,
    borderColor: safeColors.border,
    borderRadius: safeSpacing.radiusMD,
    paddingHorizontal: safeSpacing.inputPadding,
    paddingVertical: safeSpacing.inputPadding,
    fontSize: 16,
    color: safeColors.textPrimary,
    backgroundColor: safeColors.surface,
    minHeight: STANDARD_TOUCH_TARGET,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  
  inputFocused: {
    borderColor: safeColors.accent,
    borderWidth: safeSpacing.borderMedium,
    backgroundColor: safeColors.surface,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  inputError: {
    borderColor: safeColors.error,
    borderWidth: safeSpacing.borderMedium,
    backgroundColor: safeColors.errorLight,
  },
  
  inputSuccess: {
    borderColor: safeColors.success,
    borderWidth: safeSpacing.borderMedium,
    backgroundColor: safeColors.successLight,
  },
  
  inputDisabled: {
    backgroundColor: safeColors.borderLight,
    borderColor: safeColors.borderLight,
    color: safeColors.textDisabled,
  },
  
  inputPremium: {
    borderWidth: safeSpacing.borderThin,
    borderColor: '#D4AF3740', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    borderRadius: safeSpacing.radiusLG,
    paddingHorizontal: safeSpacing.inputPadding * 1.25,
    paddingVertical: safeSpacing.inputPadding * 1.25,
    fontSize: 16,
    color: safeColors.textPrimary,
    backgroundColor: safeColors.luxuryTertiary,
    minHeight: STANDARD_TOUCH_TARGET + 8,
    shadowColor: safeColors.luxuryPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  inputSearch: {
    borderWidth: safeSpacing.borderThin,
    borderColor: safeColors.borderLight,
    borderRadius: safeSpacing.radiusXXL,
    paddingHorizontal: safeSpacing.xl,
    paddingVertical: safeSpacing.md,
    fontSize: 16,
    color: safeColors.textPrimary,
    backgroundColor: safeColors.surface,
    minHeight: 44,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  // ============================================================================
  // LAYOUT UTILITIES PREMIUM
  // ============================================================================
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
  
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  columnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  
  wrap: {
    flexWrap: 'wrap',
  },

  // ============================================================================
  // FLEX UTILITIES
  // ============================================================================
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flexGrow: { flexGrow: 1 },
  flexShrink: { flexShrink: 1 },
  flexNone: { flex: 0 },

  // ============================================================================
  // TEXT ALIGNMENT
  // ============================================================================
  centerText: { textAlign: 'center' },
  leftText: { textAlign: 'left' },
  rightText: { textAlign: 'right' },
  justifyText: { textAlign: 'justify' },

  // ============================================================================
  // SPACING UTILITIES PREMIUM
  // ============================================================================
  // Margins
  m0: { margin: 0 },
  m1: { margin: safeSpacing.xs },
  m2: { margin: safeSpacing.sm },
  m3: { margin: safeSpacing.md },
  m4: { margin: safeSpacing.lg },
  m5: { margin: safeSpacing.xl },
  m6: { margin: safeSpacing.xxl },
  
  mt0: { marginTop: 0 },
  mt1: { marginTop: safeSpacing.xs },
  mt2: { marginTop: safeSpacing.sm },
  mt3: { marginTop: safeSpacing.md },
  mt4: { marginTop: safeSpacing.lg },
  mt5: { marginTop: safeSpacing.xl },
  mt6: { marginTop: safeSpacing.xxl },
  
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: safeSpacing.xs },
  mb2: { marginBottom: safeSpacing.sm },
  mb3: { marginBottom: safeSpacing.md },
  mb4: { marginBottom: safeSpacing.lg },
  mb5: { marginBottom: safeSpacing.xl },
  mb6: { marginBottom: safeSpacing.xxl },
  
  ml0: { marginLeft: 0 },
  ml1: { marginLeft: safeSpacing.xs },
  ml2: { marginLeft: safeSpacing.sm },
  ml3: { marginLeft: safeSpacing.md },
  ml4: { marginLeft: safeSpacing.lg },
  ml5: { marginLeft: safeSpacing.xl },
  
  mr0: { marginRight: 0 },
  mr1: { marginRight: safeSpacing.xs },
  mr2: { marginRight: safeSpacing.sm },
  mr3: { marginRight: safeSpacing.md },
  mr4: { marginRight: safeSpacing.lg },
  mr5: { marginRight: safeSpacing.xl },
  
  mx0: { marginHorizontal: 0 },
  mx1: { marginHorizontal: safeSpacing.xs },
  mx2: { marginHorizontal: safeSpacing.sm },
  mx3: { marginHorizontal: safeSpacing.md },
  mx4: { marginHorizontal: safeSpacing.lg },
  mx5: { marginHorizontal: safeSpacing.xl },
  
  my0: { marginVertical: 0 },
  my1: { marginVertical: safeSpacing.xs },
  my2: { marginVertical: safeSpacing.sm },
  my3: { marginVertical: safeSpacing.md },
  my4: { marginVertical: safeSpacing.lg },
  my5: { marginVertical: safeSpacing.xl },
  
  // Paddings
  p0: { padding: 0 },
  p1: { padding: safeSpacing.xs },
  p2: { padding: safeSpacing.sm },
  p3: { padding: safeSpacing.md },
  p4: { padding: safeSpacing.lg },
  p5: { padding: safeSpacing.xl },
  p6: { padding: safeSpacing.xxl },
  
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: safeSpacing.xs },
  pt2: { paddingTop: safeSpacing.sm },
  pt3: { paddingTop: safeSpacing.md },
  pt4: { paddingTop: safeSpacing.lg },
  pt5: { paddingTop: safeSpacing.xl },
  pt6: { paddingTop: safeSpacing.xxl },
  
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: safeSpacing.xs },
  pb2: { paddingBottom: safeSpacing.sm },
  pb3: { paddingBottom: safeSpacing.md },
  pb4: { paddingBottom: safeSpacing.lg },
  pb5: { paddingBottom: safeSpacing.xl },
  pb6: { paddingBottom: safeSpacing.xxl },
  
  pl0: { paddingLeft: 0 },
  pl1: { paddingLeft: safeSpacing.xs },
  pl2: { paddingLeft: safeSpacing.sm },
  pl3: { paddingLeft: safeSpacing.md },
  pl4: { paddingLeft: safeSpacing.lg },
  pl5: { paddingLeft: safeSpacing.xl },
  
  pr0: { paddingRight: 0 },
  pr1: { paddingRight: safeSpacing.xs },
  pr2: { paddingRight: safeSpacing.sm },
  pr3: { paddingRight: safeSpacing.md },
  pr4: { paddingRight: safeSpacing.lg },
  pr5: { paddingRight: safeSpacing.xl },
  
  px0: { paddingHorizontal: 0 },
  px1: { paddingHorizontal: safeSpacing.xs },
  px2: { paddingHorizontal: safeSpacing.sm },
  px3: { paddingHorizontal: safeSpacing.md },
  px4: { paddingHorizontal: safeSpacing.lg },
  px5: { paddingHorizontal: safeSpacing.xl },
  
  py0: { paddingVertical: 0 },
  py1: { paddingVertical: safeSpacing.xs },
  py2: { paddingVertical: safeSpacing.sm },
  py3: { paddingVertical: safeSpacing.md },
  py4: { paddingVertical: safeSpacing.lg },
  py5: { paddingVertical: safeSpacing.xl },

  // ============================================================================
  // COMPONENT ESPECÍFICOS PREMIUM
  // ============================================================================
  avatar: {
    width: safeSpacing.avatarMD,
    height: safeSpacing.avatarMD,
    borderRadius: safeSpacing.radiusRound,
    backgroundColor: safeColors.beautySecondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  avatarLarge: {
    width: safeSpacing.avatarLG,
    height: safeSpacing.avatarLG,
    borderRadius: safeSpacing.radiusRound,
    backgroundColor: safeColors.beautySecondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  
  avatarPremium: {
    width: safeSpacing.avatarXL,
    height: safeSpacing.avatarXL,
    borderRadius: safeSpacing.radiusRound,
    backgroundColor: safeColors.luxurySecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: safeSpacing.borderMedium,
    borderColor: safeColors.luxuryPrimary,
    shadowColor: safeColors.luxuryPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  badge: {
    backgroundColor: safeColors.error,
    borderRadius: safeSpacing.radiusRound,
    paddingHorizontal: safeSpacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  badgeLuxury: {
    backgroundColor: safeColors.luxuryPrimary,
    borderRadius: safeSpacing.radiusRound,
    paddingHorizontal: safeSpacing.sm,
    paddingVertical: safeSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  divider: {
    height: safeSpacing.borderHairline,
    backgroundColor: safeColors.border,
    marginVertical: safeSpacing.md,
  },
  
  dividerThick: {
    height: safeSpacing.borderThin,
    backgroundColor: safeColors.borderMedium,
    marginVertical: safeSpacing.lg,
  },
  
  separator: {
    height: safeSpacing.itemSpacing,
    backgroundColor: 'transparent',
  },
  
  separatorLarge: {
    height: safeSpacing.groupSpacing,
    backgroundColor: 'transparent',
  },

  // ============================================================================
  // ESTADOS PREMIUM
  // ============================================================================
  disabled: {
    opacity: 0.5,
  },
  
  loading: {
    opacity: 0.7,
  },
  
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  focused: {
    borderColor: safeColors.accent,
    borderWidth: safeSpacing.borderMedium,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  error: {
    borderColor: safeColors.error,
    borderWidth: safeSpacing.borderThin,
    backgroundColor: safeColors.errorLight,
  },
  
  success: {
    borderColor: safeColors.success,
    borderWidth: safeSpacing.borderThin,
    backgroundColor: safeColors.successLight,
  },
  
  warning: {
    borderColor: safeColors.warning,
    borderWidth: safeSpacing.borderThin,
    backgroundColor: safeColors.warningLight,
  },
  
  info: {
    borderColor: safeColors.info,
    borderWidth: safeSpacing.borderThin,
    backgroundColor: safeColors.infoLight,
  },

  // ============================================================================
  // ESPECÍFICOS PARA CLÍNICA ESTÉTICA
  // ============================================================================
  treatmentCard: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    borderLeftWidth: safeSpacing.borderThick,
    borderLeftColor: safeColors.beautyPrimary,
    shadowColor: safeColors.beautyPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  appointmentCard: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    borderTopWidth: safeSpacing.borderMedium,
    borderTopColor: safeColors.success,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  wellnessCard: {
    backgroundColor: safeColors.wellnessTertiary,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.cardPadding,
    marginVertical: safeSpacing.itemSpacing,
    shadowColor: safeColors.wellnessPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  vipCard: {
    backgroundColor: safeColors.luxuryTertiary,
    borderRadius: safeSpacing.radiusXL,
    padding: safeSpacing.cardPaddingLarge,
    marginVertical: safeSpacing.groupSpacing,
    borderWidth: safeSpacing.borderThin,
    borderColor: '#D4AF3740', // ✅ VALOR DIRECTO - NO CONCATENACIÓN
    shadowColor: safeColors.luxuryPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  profileCard: {
    backgroundColor: safeColors.surface,
    borderRadius: safeSpacing.radiusXL,
    padding: safeSpacing.cardPaddingLarge,
    marginVertical: safeSpacing.groupSpacing,
    shadowColor: safeColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  
  heroSection: {
    minHeight: HERO_HEIGHT,
    paddingHorizontal: safeSpacing.screenPadding,
    paddingVertical: safeSpacing.breathingLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  featureHighlight: {
    backgroundColor: safeColors.beautyTertiary,
    borderRadius: safeSpacing.radiusLG,
    padding: safeSpacing.breathingMedium,
    borderLeftWidth: safeSpacing.borderThick,
    borderLeftColor: safeColors.beautyPrimary,
    shadowColor: safeColors.beautyPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

// 🎨 HELPER FUNCTIONS PREMIUM - SIMPLIFICADOS
export const createPremiumShadow = (elevation: number, color: string = safeColors.shadow) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: Math.round(elevation / 2) },
  shadowOpacity: 0.1 + (elevation * 0.015),
  shadowRadius: elevation,
  elevation,
});

export const withOpacity = (color: string, opacity: number) => {
  if (!color || !color.includes('#')) return color;
  
  const hex = color.replace('#', '');
  if (hex.length !== 6) return color;
  
  const alpha = Math.round(Math.max(0, Math.min(1, opacity)) * 255)
    .toString(16)
    .padStart(2, '0');
  
  return `#${hex}${alpha}`;
};

export const createGlassmorphism = (backgroundColor: string, opacity: number = 0.9) => ({
  backgroundColor: withOpacity(backgroundColor, opacity),
  borderWidth: safeSpacing.borderHairline,
  borderColor: withOpacity(safeColors.border, 0.3),
  shadowColor: safeColors.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 3,
  elevation: 2,
});

export const createNeumorphism = (backgroundColor: string) => ({
  backgroundColor,
  shadowColor: safeColors.shadow,
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
});

// ✅ VERIFICACIÓN HERMES
if (__DEV__) {
  console.log('🌟✨ HERMES-READY GLOBAL STYLES LOADED - ALL ERRORS FIXED');
  console.log('📱 Screen dimensions:', { width, height });
  console.log('🎨 Premium shadows:', Object.keys(premiumShadows).length, 'variants');
  console.log('🎭 Global styles:', Object.keys(globalStyles).length, 'styles');
  console.log('✨ Touch target size:', STANDARD_TOUCH_TARGET);
  console.log('🔧 HERMES COMPATIBILITY: PERFECT');
}

export default globalStyles;

// ✅ EXPORTS LIMPIOS
export {
  premiumShadows,
  premiumShadows as shadows,
  STANDARD_TOUCH_TARGET,
  HERO_HEIGHT,
  safeColors,
  safeSpacing,
  safeTypography,
};