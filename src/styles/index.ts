// ============================================================================
// src/styles/index.ts - SISTEMA FINAL PREMIUM CORREGIDO 🧹✨
// ============================================================================

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isTablet = SCREEN_WIDTH > 768;
const isIPhoneX = SCREEN_HEIGHT >= 812 && Platform.OS === 'ios';

// ============================================================================
// 🎨 PALETA DE COLORES PREMIUM
// ============================================================================
export const colors = {
  // Primarios
  primary: "#2C2C54",
  accent: "#E8B4CB", 
  secondary: "#FFF8F0",
  
  // Backgrounds
  background: "#FDFCF8",
  backgroundWarm: "#FFF5F0",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  
  // Textos
  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textDisabled: "#D1D5DB",
  textPlaceholder: "#9CA3AF",
  
  // Estados
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Grises
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#E5E5E5",
  gray300: "#D4D4D4",
  gray400: "#A3A3A3",
  gray500: "#737373",
  gray600: "#525252",
  gray700: "#404040",
  gray800: "#262626",
  gray900: "#171717",
  
  // Premium
  vip: "#D4AF37",
  premium: "#8B5CF6",
  beauty: "#E8B4CB",
  wellness: "#9FD8CB",
  
  // Utilidad
  shadow: "#000000",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderMedium: "#D1D5DB",
  borderDark: "#9CA3AF",
  
  // Transparencias
  overlay: "rgba(0, 0, 0, 0.5)",
  glass: "rgba(255, 255, 255, 0.25)",
  shimmer: "rgba(255, 255, 255, 0.4)",
} as const;

// ============================================================================
// 🔤 TIPOGRAFÍA MODERNA
// ============================================================================
export const typography = {
  families: {
    primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    secondary: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    accent: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto Medium',
    mono: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
  },
  
  sizes: {
    xs: isSmallDevice ? 11 : 12,
    sm: isSmallDevice ? 13 : 14,
    base: isSmallDevice ? 15 : 16,
    lg: isSmallDevice ? 17 : 18,
    xl: isSmallDevice ? 19 : 20,
    xxl: isSmallDevice ? 23 : 24,
    title: isSmallDevice ? 27 : 28,
    display: isSmallDevice ? 35 : 36,
    hero: isSmallDevice ? 41 : 42,
  },
  
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
  
  lineHeights: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.6,
    spacious: 1.8,
  },
  
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.2,
  },
} as const;

// ============================================================================
// 📏 ESPACIADO PREMIUM
// ============================================================================
export const spacing = {
  // Base
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  massive: 48, // ✅ AÑADIDO
  
  // Layouts
  layout: {
    page: isTablet ? 32 : 20,
    section: isTablet ? 28 : 18,
    container: isTablet ? 24 : 16,
    element: isTablet ? 16 : 12,
  },
  
  // Componentes
  component: {
    radiusXS: 4,
    radiusSM: 6,
    radiusMD: 8,
    radiusLG: 12,
    radiusXL: 16,
    radiusXXL: 20,
    radiusRound: 9999,
    iconSM: 16,
    iconMD: 20,
    iconLG: 24,
    iconXL: 32,
  },
  
  // Estética
  aesthetic: {
    cardSpacing: 16,
    itemSpacing: 12,
    sectionPadding: 24,
    buttonPadding: 16,
  },
} as const;

// ============================================================================
// 🌟 SOMBRAS PREMIUM COMPLETAS
// ============================================================================
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  // ✅ AÑADIDAS LAS PROPIEDADES FALTANTES
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  
  soft: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  
  strong: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.20,
    shadowRadius: 20,
    elevation: 10,
  },
  
  premium: {
    shadowColor: colors.vip,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 6,
  },
  
  beauty: {
    shadowColor: colors.beauty,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // ✅ AÑADIDO COLORED SHADOWS
  colored: {
    accent: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    vip: {
      shadowColor: colors.vip,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    premium: {
      shadowColor: colors.premium,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;

// ============================================================================
// 🎭 GRADIENTES PREMIUM
// ============================================================================
export const gradients = {
  signature: [colors.vip, '#E8956B', '#D6845A'],
  sunset: ['#FFE5CC', '#FFD6AA', '#FFC688'],
  pearl: ['#FFFFFF', '#FEF7F0', '#F5F5F4'],
  roseGold: ['#F9C09A', '#E8956B', '#C4734A'],
  spa: ['#F0F9FF', '#E0F2FE', '#BAE6FD'],
  beauty: [colors.beauty, '#F8BBD9', '#E879F9'],
  vip: [colors.vip, '#F6CC6B', '#E6B85C'],
  warm: ['#FFF9F6', '#FEF7F0', '#FDF2E9'],
  cool: ['#F8FAFC', '#F1F5F9', '#E2E8F0'],
} as const;

// ============================================================================
// ⚡ ANIMACIONES PREMIUM
// ============================================================================
export const animations = {
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    epic: 1000,
  },
  
  easing: {
    ios: { tension: 300, friction: 20 },
    material: { tension: 280, friction: 22 },
    gentle: { tension: 250, friction: 25 },
    bouncy: { tension: 400, friction: 15 },
    smooth: { tension: 200, friction: 30 },
    entrance: { tension: 300, friction: 18 },
    exit: { tension: 250, friction: 25 },
    interaction: { tension: 400, friction: 20 },
  },
} as const;

// ============================================================================
// 💎 BACKWARD COMPATIBILITY - MODERNCOLORS
// ============================================================================
export const modernColors = {
  // Principales
  primary: colors.primary,
  accent: colors.accent,
  secondary: colors.secondary,
  
  // Backgrounds
  background: colors.background,
  backgroundWarm: colors.backgroundWarm,
  surface: colors.surface,
  surfaceElevated: colors.surfaceElevated,
  
  // Textos
  text: colors.textPrimary,
  textSecondary: colors.textSecondary,
  disabled: colors.textDisabled,
  placeholder: colors.textPlaceholder,
  
  // Estados
  error: colors.error,
  success: colors.success,
  warning: colors.warning,
  info: colors.info,
  
  // Grises completos
  gray50: colors.gray50,
  gray100: colors.gray100,
  gray200: colors.gray200,
  gray300: colors.gray300,
  gray400: colors.gray400,
  gray500: colors.gray500,
  gray600: colors.gray600,
  gray700: colors.gray700,
  gray800: colors.gray800,
  gray900: colors.gray900,
  
  // Premium
  vip: colors.vip,
  premium: colors.premium,
  beauty: colors.beauty,
  wellness: colors.wellness,
  
  // Borders
  border: colors.border,
  borderLight: colors.borderLight,
  borderMedium: colors.borderMedium,
  borderDark: colors.borderDark,
  
  // Utilidad
  shadow: colors.shadow,
  charcoal: colors.textPrimary,
  
  // Estados modernos
  successModern: colors.success,
  errorModern: colors.error,
  warningModern: colors.warning,
  infoModern: colors.info,
  
  // Transparencias
  glass: {
    white: colors.glass,
    warm: 'rgba(255, 249, 246, 0.80)',
    dark: 'rgba(28, 25, 23, 0.80)',
    shimmer: colors.shimmer,
  },
} as const;

// ============================================================================
// 📐 MODERNSPACING COMPLETO
// ============================================================================
export const modernSpacing = {
  // Base
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  base: spacing.lg,
  lg: spacing.xl,
  xl: spacing.xxl,
  xxl: spacing.xxxl,
  xxxl: spacing.massive,
  massive: spacing.massive, // ✅ AÑADIDO
  
  // Layout específico
  content: spacing.layout,
  
  // Touch targets
  touch: {
    minimum: 44,
    comfortable: 48,
    premium: 56,
  },
  
  // Márgenes
  margins: {
    screen: isSmallDevice ? 16 : isTablet ? 32 : 20,
    card: isSmallDevice ? 12 : isTablet ? 20 : 16,
    element: isSmallDevice ? 8 : isTablet ? 12 : 10,
  },
  
  // Aesthetic backwards
  aesthetic: spacing.aesthetic,
  
  // Component backwards
  componentModern: spacing.component,
} as const;

// ============================================================================
// ✍️ MODERNTYPOGRAPHY COMPLETO
// ============================================================================
export const modernTypography = {
  // Font families
  fontFamily: typography.families,
  
  // Sizes modernos
  fontSizeModern: typography.sizes,
  
  // Weights modernos
  fontWeight: {
    light: typography.weights.light,
    regular: typography.weights.regular,
    normal: typography.weights.regular,
    medium: typography.weights.medium,
    semibold: typography.weights.semiBold,
    bold: typography.weights.bold,
    heavy: typography.weights.extraBold,
    black: typography.weights.black,
  },
  
  // ✅ AÑADIDAS LAS PROPIEDADES FALTANTES
  fontWeightModern: {
    light: typography.weights.light,
    regular: typography.weights.regular,
    normal: typography.weights.regular,
    medium: typography.weights.medium,
    semibold: typography.weights.semiBold,
    bold: typography.weights.bold,
    heavy: typography.weights.extraBold,
    black: typography.weights.black,
  },
  
  // Line heights
  lineHeight: typography.lineHeights,
  
  // ✅ AÑADIDO lineHeightModern
  lineHeightModern: typography.lineHeights,
  
  // Letter spacing
  letterSpacing: typography.letterSpacing,
  
  // ✅ AÑADIDO letterSpacingModern
  letterSpacingModern: typography.letterSpacing,
} as const;

// ============================================================================
// 🌟 MODERNSHADOWS COMPLETO
// ============================================================================
export const modernShadows = {
  subtle: shadows.soft,
  soft: shadows.soft,
  sm: shadows.sm, // ✅ AÑADIDO
  md: shadows.md, // ✅ AÑADIDO
  medium: shadows.medium,
  lg: shadows.lg, // ✅ AÑADIDO
  strong: shadows.strong,
  xl: shadows.xl, // ✅ AÑADIDO
  premium: shadows.premium,
  inset: shadows.soft,
  glow: shadows.glow,
  colored: shadows.colored, // ✅ AÑADIDO
} as const;

// ============================================================================
// 🔄 MODERNRADIUS
// ============================================================================
export const modernRadius = {
  none: 0,
  xs: spacing.component.radiusXS,
  sm: spacing.component.radiusSM,
  md: spacing.component.radiusMD,
  lg: spacing.component.radiusLG,
  xl: spacing.component.radiusXL,
  xxl: spacing.component.radiusXXL,
  xxxl: 24,
  pill: spacing.component.radiusRound,
  circular: spacing.component.radiusRound,
  
  // Contextuales
  button: spacing.component.radiusMD,
  card: spacing.component.radiusLG,
  modal: spacing.component.radiusXL,
  image: spacing.component.radiusSM,
  
  // Device responsive
  device: {
    small: isSmallDevice ? 8 : 12,
    medium: isSmallDevice ? 12 : 16,
    large: isSmallDevice ? 16 : 20,
  },
} as const;

// ============================================================================
// ⚡ MODERNANIMATIONS
// ============================================================================
export const modernAnimations = {
  duration: animations.duration,
  easing: animations.easing,
  
  // Presets
  presets: {
    fadeIn: {
      duration: animations.duration.normal,
      easing: animations.easing.entrance,
    },
    slideUp: {
      duration: animations.duration.slow,
      easing: animations.easing.material,
    },
    scale: {
      duration: animations.duration.fast,
      easing: animations.easing.bouncy,
    },
    bounce: {
      duration: animations.duration.slower,
      easing: animations.easing.bouncy,
    },
  },
} as const;

// ============================================================================
// 🛠️ UTILIDADES PREMIUM
// ============================================================================
export const modernUtils = {
  // Crear sombra personalizada
  createShadow: (color: string = colors.shadow, opacity: number = 0.15, radius: number = 8) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: radius / 2 },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: Math.round(radius / 2),
  }),

  // Font responsive
  responsiveFont: (base: number, factor: number = 1.2) => ({
    fontSize: isSmallDevice ? base : isTablet ? base * factor * 1.1 : base * factor,
  }),

  // Safe area padding
  safePadding: {
    top: isIPhoneX ? 44 : Platform.OS === 'android' ? 24 : 20,
    bottom: isIPhoneX ? 34 : 0,
  },

  // Glassmorphism effect
  glassmorphism: (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
    const intensityMap = {
      light: { opacity: 0.1, blur: 10 },
      medium: { opacity: 0.25, blur: 20 },
      strong: { opacity: 0.4, blur: 30 },
    };
    
    const config = intensityMap[intensity];
    
    return {
      backgroundColor: `rgba(255, 255, 255, ${config.opacity})`,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
    };
  },

  // With opacity
  withOpacity: (color: string, opacity: number) => {
    const hex = color.replace('#', '');
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `#${hex}${alpha}`;
  },
} as const;

// ============================================================================
// 📱 BREAKPOINTS
// ============================================================================
export const modernBreakpoints = {
  sm: 375,  // iPhone SE
  md: 414,  // iPhone Pro
  lg: 768,  // iPad mini
  xl: 1024, // iPad
  xxl: 1280, // iPad Pro
} as const;

// ============================================================================
// 🎯 ACCESIBILIDAD
// ============================================================================
export const modernA11y = {
  contrastRatios: {
    normal: 4.5,
    large: 3.0,
    enhanced: 7.0,
  },
  
  touchTargets: modernSpacing.touch,
  
  screenReader: {
    reducedMotion: true,
    announcements: true,
    landmarks: true,
  },
} as const;

// ============================================================================
// 🎨 ESTILOS GLOBALES
// ============================================================================
export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: modernRadius.card,
    padding: modernSpacing.aesthetic.cardSpacing,
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },
  
  button: {
    backgroundColor: modernColors.primary,
    paddingVertical: modernSpacing.aesthetic.buttonPadding,
    paddingHorizontal: modernSpacing.aesthetic.buttonPadding * 1.5,
    borderRadius: modernRadius.button,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: modernSpacing.touch.minimum,
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },
  
  input: {
    borderWidth: 1,
    borderColor: modernColors.border,
    borderRadius: modernRadius.md,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    backgroundColor: modernColors.surface,
    minHeight: modernSpacing.touch.minimum,
    shadowColor: modernShadows.subtle.shadowColor,
    shadowOffset: modernShadows.subtle.shadowOffset,
    shadowOpacity: modernShadows.subtle.shadowOpacity,
    shadowRadius: modernShadows.subtle.shadowRadius,
    elevation: modernShadows.subtle.elevation,
  },
  
  // Layout helpers
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  
  column: {
    flexDirection: 'column' as const,
  },
  
  centerText: {
    textAlign: 'center' as const,
  },
  
  flex1: { 
    flex: 1 
  },
} as const;

// ============================================================================
// 🎯 HELPERS Y VARIANTES
// ============================================================================
export const helpers = {
  createShadow: modernUtils.createShadow,
  withOpacity: modernUtils.withOpacity,
  responsiveSize: modernUtils.responsiveFont,
  
  getVipGradient: () => gradients.vip,
  getBeautyGradient: () => gradients.beauty,
  getSignatureGradient: () => gradients.signature,
} as const;

export const variants = {
  login: {
    background: modernColors.backgroundWarm,
    card: modernColors.surface,
    accent: modernColors.accent,
  },
  
  dashboard: {
    primary: modernColors.primary,
    cards: modernColors.surface,
    vip: modernColors.vip,
  },
  
  vip: {
    background: modernColors.vip,
    accent: modernColors.vip,
    text: modernColors.text,
  },
  
  profile: {
    background: modernColors.background,
    sections: modernColors.surface,
    accent: modernColors.accent,
  },
} as const;

export const getVIPStyles = (isVIP: boolean) => ({
  backgroundColor: isVIP ? modernColors.vip + '10' : modernColors.surface,
  borderColor: isVIP ? modernColors.vip + '30' : modernColors.border,
  borderWidth: isVIP ? 1 : 0,
});

export const getResponsiveStyle = (baseSize: number) => 
  isSmallDevice ? baseSize * 0.9 : isTablet ? baseSize * 1.2 : baseSize;

// ============================================================================
// 🎯 THEME PRINCIPAL
// ============================================================================
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  gradients,
  animations,
} as const;

// ============================================================================
// 🌟 THEME MODERNO COMPLETO
// ============================================================================
export const modernTheme = {
  colors: modernColors,
  spacing: modernSpacing,
  typography: modernTypography,
  shadows: modernShadows,
  radius: modernRadius,
  animations: modernAnimations,
  utils: modernUtils,
  breakpoints: modernBreakpoints,
  a11y: modernA11y,
  gradients,
} as const;

// ============================================================================
// 🔧 VERIFICACIÓN FINAL CORREGIDA
// ============================================================================
if (__DEV__) {
  console.log('✨ Sistema de estilos cargado correctamente');
  console.log('✅ modernColors.premium:', modernColors.premium);
  console.log('✅ modernColors.vip:', modernColors.vip);
  console.log('✅ modernSpacing disponible:', !!modernSpacing);
  console.log('✅ modernTypography disponible:', !!modernTypography);
  console.log('✅ modernShadows.md disponible:', !!modernShadows.md);
  console.log('✅ modernShadows.lg disponible:', !!modernShadows.lg);
  console.log('✅ Todos los sistemas listos');
}

// ============================================================================
// 🔷 TYPES
// ============================================================================
export type Theme = typeof theme;
export type ModernTheme = typeof modernTheme;
export type ModernColors = typeof modernColors;
export type ModernSpacing = typeof modernSpacing;
export type ModernTypography = typeof modernTypography;
export type ModernShadows = typeof modernShadows;
export type Gradients = typeof gradients;

// ============================================================================
// 📤 EXPORTS FINALES
// ============================================================================

// Export por defecto
export default modernTheme;