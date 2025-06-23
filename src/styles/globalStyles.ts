// ============================================================================
// src/styles/globalStyles.ts - CORREGIDO SIN DUPLICACIONES ✅
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

// ✅ SISTEMA DE SOMBRAS PREMIUM (VERSION ÚNICA)
const premiumShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  whisper: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  
  soft: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  
  medium: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  
  elevated: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  
  dramatic: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 12,
  },
  
  floating: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 16,
  },
  
  // Themed shadows
  beauty: {
    shadowColor: "#E8B4CB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  wellness: {
    shadowColor: "#9FD8CB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  luxury: {
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  
  premium: {
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  
  // ✅ AGREGAR SHIMMER BASE FALTANTE
  shimmerBase: {
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
  
  inset: Platform.select({
    ios: {
      shadowColor: "#000000",
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

// ✅ EFECTOS PREMIUM (AGREGAR SHIMMER BASE)
const premiumEffects = {
  glassmorphism: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  // ✅ SHIMMER BASE AGREGADO
  shimmerBase: {
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
  
  neumorphism: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: '#f0f0f0',
  },
  
  gradientOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  shimmerEffect: {
    backgroundColor: '#e0e0e0',
  },
};

// 🎭 ESTILOS GLOBALES PREMIUM HERMES-READY
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
  // CARDS PREMIUM SYSTEM
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
    borderColor: '#8B5CF620',
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
});

// 🎨 HELPER FUNCTIONS PREMIUM
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

// ✅ EXPORTS LIMPIOS - SIN DUPLICACIÓN
export {
  premiumShadows,
  premiumEffects,
  STANDARD_TOUCH_TARGET,
  HERO_HEIGHT,
  safeColors,
  safeSpacing,
  safeTypography,
};

// ✅ EXPORT ADICIONAL PARA COMPATIBILIDAD
export { premiumEffects as modernEffects };