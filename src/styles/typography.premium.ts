// ============================================================================
// styles/typography.premium.ts - SISTEMA TIPOGRÁFICO PREMIUM WELLNESS & BEAUTY
// ============================================================================

import { Platform, Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

/**
 * 🌟 FILOSOFÍA TIPOGRÁFICA
 * Inspirado en revistas de lujo, spas premium y apps de bienestar
 * Prioriza legibilidad, elegancia y jerarquía visual clara
 * Responsive scaling que mantiene proporiones áureas
 */

// ============================================================================
// 📱 RESPONSIVE BREAKPOINTS
// ============================================================================
const breakpoints = {
  xs: 320,  // iPhone SE (1st gen)
  sm: 375,  // iPhone SE (2nd/3rd gen)
  md: 390,  // iPhone 12/13 mini
  lg: 414,  // iPhone 11/XR
  xl: 428,  // iPhone 12/13/14 Pro Max
  xxl: 480, // iPad mini landscape
} as const;

// ============================================================================
// 🎨 FAMILIAS DE FUENTES PREMIUM
// ============================================================================
const fontFamilies = {
  // === DISPLAY (Headlines, Hero text) ===
  display: Platform.select({
    ios: 'SF Pro Display',
    android: 'sans-serif-medium',
    default: 'System',
  }),

  // === TEXT (Body, UI elements) ===
  text: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto',
    default: 'System',
  }),

  // === ROUNDED (Friendly, wellness vibes) ===
  rounded: Platform.select({
    ios: 'SF Pro Rounded',
    android: 'sans-serif',
    default: 'System',
  }),

  // === SERIF (Luxury touch, editorial) ===
  serif: Platform.select({
    ios: 'New York',
    android: 'serif',
    default: 'serif',
  }),

  // === MONO (Códigos, detalles técnicos) ===
  mono: Platform.select({
    ios: 'SF Mono',
    android: 'monospace',
    default: 'monospace',
  }),
} as const;

// ============================================================================
// 📏 ESCALA TIPOGRÁFICA PREMIUM (Golden Ratio Based)
// ============================================================================
const GOLDEN_RATIO = 1.618;
const BASE_SIZE = 16; // Base óptimo para legibilidad móvil

// Función para crear escala armónica
const createScale = (base: number) => ({
  xs: Math.round(base / (GOLDEN_RATIO * 1.2)),      // ~11px
  sm: Math.round(base / GOLDEN_RATIO),               // ~13px  
  base: base,                                        // 16px
  md: Math.round(base * 1.125),                      // ~18px
  lg: Math.round(base * 1.25),                       // 20px
  xl: Math.round(base * GOLDEN_RATIO),               // ~26px
  '2xl': Math.round(base * (GOLDEN_RATIO * 1.25)),  // ~32px
  '3xl': Math.round(base * (GOLDEN_RATIO * 1.5)),   // ~39px
  '4xl': Math.round(base * (GOLDEN_RATIO * 2)),     // ~52px
  '5xl': Math.round(base * (GOLDEN_RATIO * 2.5)),   // ~65px
});

// ============================================================================
// 📐 RESPONSIVE SCALING INTELIGENTE
// ============================================================================
const getResponsiveScale = (): number => {
  const pixelDensity = PixelRatio.get();
  
  // Escala base por ancho de pantalla
  if (screenWidth <= breakpoints.xs) return 0.85;      // iPhone SE 1st
  if (screenWidth <= breakpoints.sm) return 0.9;       // iPhone SE 2nd/3rd
  if (screenWidth <= breakpoints.md) return 0.95;      // iPhone 12 mini
  if (screenWidth <= breakpoints.lg) return 1.0;       // iPhone 11/XR
  if (screenWidth <= breakpoints.xl) return 1.05;      // iPhone Pro Max
  if (screenWidth >= breakpoints.xxl) return 1.1;      // iPad landscape
  
  return 1.0; // Default
};

const RESPONSIVE_SCALE = getResponsiveScale();

// Aplicar escala responsive
const scaleSize = (size: number): number => 
  Math.round(size * RESPONSIVE_SCALE);

// ============================================================================
// 🎯 TAMAÑOS PREMIUM RESPONSIVOS
// ============================================================================
export const premiumSizes = createScale(BASE_SIZE);

// Aplicar responsive scaling
export const responsiveSizes = Object.entries(premiumSizes).reduce((acc, [key, value]) => ({
  ...acc,
  [key]: scaleSize(value)
}), {} as typeof premiumSizes);

// ============================================================================
// ⚖️ PESOS TIPOGRÁFICOS PREMIUM
// ============================================================================
export const premiumWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',     // Body text standard
  medium: '500',      // UI elements, labels
  semiBold: '600',    // Headings, emphasis
  bold: '700',        // Strong emphasis
  extraBold: '800',   // Display text
  black: '900',       // Hero text
} as const;

// ============================================================================
// 📏 LINE HEIGHTS ARMÓNICOS
// ============================================================================
export const premiumLineHeights = {
  none: 1,
  tight: 1.2,         // Headlines grandes
  snug: 1.3,          // Headlines medianos
  normal: 1.4,        // UI text
  relaxed: 1.5,       // Body text
  loose: 1.6,         // Reading text
  extraLoose: 1.8,    // Wellness content
} as const;

// ============================================================================
// 🔤 LETTER SPACING PREMIUM
// ============================================================================
export const premiumLetterSpacing = {
  tighter: -1.2,      // Display text grande
  tight: -0.8,        // Headlines
  snug: -0.4,         // Subheadings
  normal: 0,          // Body text
  wide: 0.4,          // UI labels
  wider: 0.8,         // Buttons, badges
  widest: 1.6,        // All caps text
  luxury: 2.4,        // VIP headers
} as const;

// ============================================================================
// 🎨 ESTILOS SEMÁNTICOS PREMIUM
// ============================================================================
export const premiumTypographyStyles = {
  // === DISPLAY STYLES (Hero sections) ===
  displayLarge: {
    fontFamily: fontFamilies.display,
    fontSize: responsiveSizes['5xl'],
    fontWeight: premiumWeights.black,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.tighter,
  },

  displayMedium: {
    fontFamily: fontFamilies.display,
    fontSize: responsiveSizes['4xl'],
    fontWeight: premiumWeights.extraBold,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.tight,
  },

  displaySmall: {
    fontFamily: fontFamilies.display,
    fontSize: responsiveSizes['3xl'],
    fontWeight: premiumWeights.bold,
    lineHeight: premiumLineHeights.snug,
    letterSpacing: premiumLetterSpacing.tight,
  },

  // === HEADLINE STYLES ===
  headlineLarge: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes['2xl'],
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.snug,
    letterSpacing: premiumLetterSpacing.snug,
  },

  headlineMedium: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.xl,
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.normal,
  },

  headlineSmall: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.lg,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.normal,
  },

  // === TITLE STYLES ===
  titleLarge: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.md,
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.normal,
  },

  titleMedium: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.base,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wide,
  },

  titleSmall: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.sm,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wide,
  },

  // === BODY STYLES ===
  bodyLarge: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.base,
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.relaxed,
    letterSpacing: premiumLetterSpacing.normal,
  },

  bodyMedium: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.sm,
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.relaxed,
    letterSpacing: premiumLetterSpacing.normal,
  },

  bodySmall: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.xs,
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wide,
  },

  // === LABEL STYLES ===
  labelLarge: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.sm,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wide,
  },

  labelMedium: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.xs,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wider,
  },

  labelSmall: {
    fontFamily: fontFamilies.text,
    fontSize: scaleSize(10),
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.widest,
  },

  // === SPECIALTY STYLES ===
  
  // VIP Luxury
  vipDisplay: {
    fontFamily: fontFamilies.serif,
    fontSize: responsiveSizes['3xl'],
    fontWeight: premiumWeights.bold,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.luxury,
  },

  vipTitle: {
    fontFamily: fontFamilies.display,
    fontSize: responsiveSizes.xl,
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.snug,
    letterSpacing: premiumLetterSpacing.wider,
  },

  // Wellness gentle
  wellnessHeading: {
    fontFamily: fontFamilies.rounded,
    fontSize: responsiveSizes.lg,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.relaxed,
    letterSpacing: premiumLetterSpacing.wide,
  },

  wellnessBody: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.base,
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.extraLoose,
    letterSpacing: premiumLetterSpacing.normal,
  },

  // Button text
  buttonLarge: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.base,
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.wider,
  },

  buttonMedium: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.sm,
    fontWeight: premiumWeights.semiBold,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.wider,
  },

  buttonSmall: {
    fontFamily: fontFamilies.text,
    fontSize: responsiveSizes.xs,
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.widest,
  },

  // Caption/Fine print
  caption: {
    fontFamily: fontFamilies.text,
    fontSize: scaleSize(11),
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.normal,
    letterSpacing: premiumLetterSpacing.wide,
  },

  overline: {
    fontFamily: fontFamilies.text,
    fontSize: scaleSize(10),
    fontWeight: premiumWeights.medium,
    lineHeight: premiumLineHeights.tight,
    letterSpacing: premiumLetterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
} as const;

// ============================================================================
// 🛠️ UTILITIES PREMIUM
// ============================================================================
export const premiumTypographyUtils = {
  // === RESPONSIVE FONT SIZE ===
  getResponsiveSize: (baseSizeKey: keyof typeof premiumSizes): number => {
    return responsiveSizes[baseSizeKey];
  },

  // === DYNAMIC LINE HEIGHT ===
  getDynamicLineHeight: (fontSize: number): number => {
    // Fórmula para line height óptimo basado en tamaño
    if (fontSize <= 12) return 1.4;
    if (fontSize <= 16) return 1.5;
    if (fontSize <= 24) return 1.3;
    if (fontSize <= 32) return 1.2;
    return 1.1;
  },

  // === LETTER SPACING AUTOMÁTICO ===
  getOptimalLetterSpacing: (fontSize: number, fontWeight: string): number => {
    const weight = parseInt(fontWeight) || 400;
    
    // Letras más espaciadas para pesos ligeros y tamaños grandes
    if (fontSize >= 32) return weight <= 400 ? -0.8 : -1.2;
    if (fontSize >= 24) return weight <= 400 ? -0.4 : -0.8;
    if (fontSize >= 18) return weight <= 400 ? 0 : -0.4;
    if (fontSize >= 14) return weight >= 600 ? 0.4 : 0;
    return weight >= 600 ? 0.8 : 0.4;
  },

  // === CONTRAST RATIO CALCULATOR ===
  getContrastRatio: (foreground: string, background: string): number => {
    // Simplified - en producción usar algoritmo WCAG real
    return 4.5; // Mock contrast ratio
  },

  // === ACCESSIBLE FONT SIZE ===
  getAccessibleSize: (baseSize: number, userPreference: 'small' | 'medium' | 'large' | 'xl'): number => {
    const multipliers = {
      small: 0.85,
      medium: 1.0,
      large: 1.15,
      xl: 1.3,
    };
    return Math.round(baseSize * multipliers[userPreference]);
  },

  // === TRUNCATE TEXT STYLES ===
  getTruncateStyle: (lines: number = 1) => ({
    numberOfLines: lines,
    ellipsizeMode: 'tail' as const,
    ...(lines === 1 && {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
  }),

  // === THEME SPECIFIC STYLES ===
  getVipTypography: () => ({
    fontFamily: fontFamilies.serif,
    letterSpacing: premiumLetterSpacing.luxury,
    fontWeight: premiumWeights.semiBold,
  }),

  getWellnessTypography: () => ({
    fontFamily: fontFamilies.rounded,
    letterSpacing: premiumLetterSpacing.wide,
    fontWeight: premiumWeights.regular,
    lineHeight: premiumLineHeights.extraLoose,
  }),

  getMinimalistTypography: () => ({
    fontFamily: fontFamilies.text,
    letterSpacing: premiumLetterSpacing.normal,
    fontWeight: premiumWeights.light,
    lineHeight: premiumLineHeights.relaxed,
  }),
} as const;

// ============================================================================
// 📱 CONTEXT SPECIFIC STYLES
// ============================================================================
export const contextStyles = {
  // === ONBOARDING & MARKETING ===
  hero: {
    ...premiumTypographyStyles.displayLarge,
    textAlign: 'center' as const,
  },

  heroSubtitle: {
    ...premiumTypographyStyles.bodyLarge,
    textAlign: 'center' as const,
    lineHeight: premiumLineHeights.loose,
  },

  // === NAVIGATION ===
  tabLabel: {
    ...premiumTypographyStyles.labelMedium,
    textAlign: 'center' as const,
  },

  headerTitle: {
    ...premiumTypographyStyles.titleLarge,
    textAlign: 'center' as const,
  },

  // === FORMS ===
  inputLabel: {
    ...premiumTypographyStyles.labelLarge,
    marginBottom: scaleSize(6),
  },

  inputText: {
    ...premiumTypographyStyles.bodyLarge,
  },

  inputPlaceholder: {
    ...premiumTypographyStyles.bodyLarge,
    fontWeight: premiumWeights.regular,
  },

  inputError: {
    ...premiumTypographyStyles.bodySmall,
    color: '#E8A4A4', // Error color from premium colors
  },

  inputHelper: {
    ...premiumTypographyStyles.caption,
  },

  // === CARDS & CONTENT ===
  cardTitle: {
    ...premiumTypographyStyles.titleMedium,
    marginBottom: scaleSize(8),
  },

  cardSubtitle: {
    ...premiumTypographyStyles.bodyMedium,
    marginBottom: scaleSize(12),
  },

  cardBody: {
    ...premiumTypographyStyles.bodyMedium,
    lineHeight: premiumLineHeights.relaxed,
  },

  // === LISTS ===
  listTitle: {
    ...premiumTypographyStyles.titleSmall,
  },

  listSubtitle: {
    ...premiumTypographyStyles.bodySmall,
  },

  listMeta: {
    ...premiumTypographyStyles.caption,
  },

  // === BADGES & TAGS ===
  badgeText: {
    ...premiumTypographyStyles.labelSmall,
    textTransform: 'uppercase' as const,
  },

  tagText: {
    ...premiumTypographyStyles.labelMedium,
  },

  // === PRICING ===
  priceDisplay: {
    ...premiumTypographyStyles.displaySmall,
    fontFamily: fontFamilies.display,
    fontWeight: premiumWeights.bold,
  },

  priceCurrency: {
    ...premiumTypographyStyles.titleMedium,
    fontWeight: premiumWeights.medium,
  },

  priceFrequency: {
    ...premiumTypographyStyles.bodySmall,
  },
} as const;

// ============================================================================
// 🎨 THEMED TYPOGRAPHY SETS
// ============================================================================
export const themedTypography = {
  // === VIP EXPERIENCE ===
  vip: {
    display: {
      ...premiumTypographyStyles.vipDisplay,
    },
    title: {
      ...premiumTypographyStyles.vipTitle,
    },
    body: {
      ...premiumTypographyStyles.bodyLarge,
      fontFamily: fontFamilies.serif,
    },
    label: {
      ...premiumTypographyStyles.labelLarge,
      letterSpacing: premiumLetterSpacing.luxury,
      textTransform: 'uppercase' as const,
    },
  },

  // === WELLNESS EXPERIENCE ===
  wellness: {
    heading: {
      ...premiumTypographyStyles.wellnessHeading,
    },
    body: {
      ...premiumTypographyStyles.wellnessBody,
    },
    caption: {
      ...premiumTypographyStyles.caption,
      fontFamily: fontFamilies.rounded,
      lineHeight: premiumLineHeights.relaxed,
    },
  },

  // === MINIMALIST/CLEAN ===
  minimal: {
    display: {
      ...premiumTypographyStyles.displayMedium,
      fontWeight: premiumWeights.light,
      letterSpacing: premiumLetterSpacing.tight,
    },
    title: {
      ...premiumTypographyStyles.titleLarge,
      fontWeight: premiumWeights.regular,
    },
    body: {
      ...premiumTypographyStyles.bodyLarge,
      fontWeight: premiumWeights.light,
      lineHeight: premiumLineHeights.loose,
    },
  },

  // === PROFESSIONAL/MEDICAL ===
  professional: {
    title: {
      ...premiumTypographyStyles.titleLarge,
      fontFamily: fontFamilies.text,
      fontWeight: premiumWeights.semiBold,
      letterSpacing: premiumLetterSpacing.normal,
    },
    body: {
      ...premiumTypographyStyles.bodyMedium,
      lineHeight: premiumLineHeights.relaxed,
    },
    metadata: {
      ...premiumTypographyStyles.caption,
      fontFamily: fontFamilies.mono,
      letterSpacing: premiumLetterSpacing.wide,
    },
  },
} as const;

// ============================================================================
// 🔧 DEVELOPMENT HELPERS
// ============================================================================
if (__DEV__) {
  console.log('✨ PREMIUM TYPOGRAPHY SYSTEM LOADED');
  console.log('📏 Responsive scale factor:', RESPONSIVE_SCALE);
  console.log('📱 Screen width:', screenWidth);
  console.log('🎯 Font sizes available:', Object.keys(responsiveSizes).length);
  console.log('🎨 Typography styles:', Object.keys(premiumTypographyStyles).length);
  console.log('🛠️ Utility functions:', Object.keys(premiumTypographyUtils).length);
  
  // Log sample sizes for verification
  console.log('Sample responsive sizes:', {
    xs: responsiveSizes.xs,
    base: responsiveSizes.base,
    xl: responsiveSizes.xl,
    '4xl': responsiveSizes['4xl'],
  });
}

// ============================================================================
// 🌟 EXPORTS
// ============================================================================
export default premiumTypographyStyles;

// Individual exports
export {
  fontFamilies,
  premiumWeights,
  premiumLineHeights,
  premiumLetterSpacing,
  contextStyles,
  themedTypography,
  responsiveSizes,
  breakpoints,
};

// ============================================================================
// 🔤 TYPESCRIPT TYPES
// ============================================================================
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof premiumWeights;
export type FontSize = keyof typeof premiumSizes;
export type LineHeight = keyof typeof premiumLineHeights;
export type LetterSpacing = keyof typeof premiumLetterSpacing;
export type TypographyStyle = keyof typeof premiumTypographyStyles;
export type ContextStyle = keyof typeof contextStyles;
export type ThemedTypography = keyof typeof themedTypography;
export type ResponsiveSize = keyof typeof responsiveSizes;

// Utility types
export type TypographyConfig = {
  fontFamily?: FontFamily;
  fontSize?: number;
  fontWeight?: FontWeight;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: string;
};

export type AccessibilityPreference = 'small' | 'medium' | 'large' | 'xl';