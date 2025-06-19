// ============================================================================
// src/styles/typography.ts - PREMIUM LEVEL GOD ✍️✨
// ============================================================================
import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🎨 SISTEMA DE FUENTES PREMIUM INSPIRADO EN APPLE + GOOGLE + NOTION
const premiumFontFamily = {
  // Fuentes principales premium
  primary: Platform.select({ 
    ios: 'SF Pro Text', 
    android: 'Roboto', 
    default: 'System' 
  }),
  
  display: Platform.select({ 
    ios: 'SF Pro Display', 
    android: 'Roboto', 
    default: 'System' 
  }),
  
  rounded: Platform.select({ 
    ios: 'SF Pro Rounded', 
    android: 'Roboto', 
    default: 'System' 
  }),
  
  mono: Platform.select({ 
    ios: 'SF Mono', 
    android: 'Roboto Mono', 
    default: 'monospace' 
  }),
  
  // Fuentes específicas premium
  elegant: Platform.select({ 
    ios: 'New York', 
    android: 'serif', 
    default: 'serif' 
  }),
  
  luxury: Platform.select({ 
    ios: 'Avenir Next', 
    android: 'Roboto', 
    default: 'sans-serif' 
  }),
  
  beauty: Platform.select({ 
    ios: 'SF Pro Text', 
    android: 'Roboto', 
    default: 'System' 
  }),
};

// 📏 ESCALA TIPOGRÁFICA PREMIUM (Ratio áureo + responsive)
const getBaseSize = (): number => {
  if (width <= 375) return 14;      // iPhone SE, small screens
  if (width <= 390) return 15;      // iPhone 12 mini
  if (width <= 414) return 16;      // iPhone 11, XR
  if (width <= 428) return 17;      // iPhone 12 Pro Max
  return 18;                        // iPad, large screens
};

const BASE_SIZE = getBaseSize();
const SCALE_RATIO = 1.25; // Ratio más elegante que el 1.618 dorado

const premiumSizes = {
  // Micro sizes para details
  micro: Math.round(BASE_SIZE * 0.625),    // 10-11px
  tiny: Math.round(BASE_SIZE * 0.75),      // 12px
  
  // Core sizes
  xs: Math.round(BASE_SIZE * 0.8125),      // 13px
  sm: Math.round(BASE_SIZE * 0.875),       // 14px
  base: BASE_SIZE,                         // 16px (base)
  md: Math.round(BASE_SIZE * 1.0625),      // 17px
  lg: Math.round(BASE_SIZE * 1.125),       // 18px
  xl: Math.round(BASE_SIZE * 1.1875),      // 19px
  
  // Header hierarchy
  h6: Math.round(BASE_SIZE * 1.0625),      // 17px
  h5: Math.round(BASE_SIZE * 1.125),       // 18px
  h4: Math.round(BASE_SIZE * 1.25),        // 20px
  h3: Math.round(BASE_SIZE * 1.4375),      // 23px
  h2: Math.round(BASE_SIZE * 1.625),       // 26px
  h1: Math.round(BASE_SIZE * 1.875),       // 30px
  
  // Display sizes para hero content
  display: Math.round(BASE_SIZE * 2.25),   // 36px
  hero: Math.round(BASE_SIZE * 2.8125),    // 45px
  jumbo: Math.round(BASE_SIZE * 3.75),     // 60px
  
  // Contextual sizes
  caption: Math.round(BASE_SIZE * 0.75),   // 12px
  overline: Math.round(BASE_SIZE * 0.6875), // 11px
  button: BASE_SIZE,                       // 16px
  input: BASE_SIZE,                        // 16px (iOS requirement)
  label: Math.round(BASE_SIZE * 0.875),    // 14px
  body2: Math.round(BASE_SIZE * 0.9375),   // 15px
};

// ⚖️ PESOS PREMIUM CON CONTEXTO SEMÁNTICO
const premiumWeights = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
  
  // Semantic weights para diferentes contextos
  body: '400',           // Regular para body text
  bodyEmphasis: '500',   // Medium para emphasis
  heading: '600',        // SemiBold para headings
  heroHeading: '700',    // Bold para hero
  label: '500',          // Medium para labels
  button: '600',         // SemiBold para buttons
  caption: '400',        // Regular para captions
  overline: '600',       // SemiBold para overlines
} as const;

// 📐 ALTURAS DE LÍNEA PREMIUM (Optimizadas para legibilidad)
const premiumLineHeights = {
  none: 1,
  tight: 1.15,          // Para headings grandes
  snug: 1.25,           // Para headings medianos
  normal: 1.4,          // Para headings pequeños
  relaxed: 1.5,         // Para body text
  loose: 1.6,           // Para texto largo
  extraLoose: 1.75,     // Para espaciado máximo
  
  // Contextual line heights
  heading: 1.2,         // Optimizado para titles
  body: 1.5,            // Optimizado para lectura
  caption: 1.4,         // Optimizado para texto pequeño
  button: 1.2,          // Optimizado para botones
} as const;

// 🔤 ESPACIADO ENTRE LETRAS PREMIUM
const premiumLetterSpacing = {
  tightest: -1.5,
  tighter: -1.2,
  tight: -0.8,
  snug: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
  
  // Contextual letter spacing
  heading: -0.4,        // Más tight para headings
  body: 0,              // Normal para body
  button: 0.5,          // Más wide para buttons
  overline: 2,          // Muy wide para overlines
  luxury: 1.2,          // Espaciado lujoso
} as const;

// 🎭 ESTILOS PREDEFINIDOS PREMIUM
const premiumStyles = {
  // ===== HEADINGS HIERARCHY =====
  heroTitle: {
    fontSize: premiumSizes.hero,
    lineHeight: premiumLineHeights.tight,
    fontWeight: premiumWeights.black,
    letterSpacing: premiumLetterSpacing.tighter,
    fontFamily: premiumFontFamily.display,
  },
  
  h1: {
    fontSize: premiumSizes.h1,
    lineHeight: premiumLineHeights.heading,
    fontWeight: premiumWeights.bold,
    letterSpacing: premiumLetterSpacing.heading,
    fontFamily: premiumFontFamily.display,
  },
  
  h2: {
    fontSize: premiumSizes.h2,
    lineHeight: premiumLineHeights.heading,
    fontWeight: premiumWeights.bold,
    letterSpacing: premiumLetterSpacing.heading,
    fontFamily: premiumFontFamily.display,
  },
  
  h3: {
    fontSize: premiumSizes.h3,
    lineHeight: premiumLineHeights.snug,
    fontWeight: premiumWeights.semiBold,
    letterSpacing: premiumLetterSpacing.snug,
    fontFamily: premiumFontFamily.primary,
  },
  
  h4: {
    fontSize: premiumSizes.h4,
    lineHeight: premiumLineHeights.snug,
    fontWeight: premiumWeights.semiBold,
    letterSpacing: premiumLetterSpacing.snug,
    fontFamily: premiumFontFamily.primary,
  },
  
  h5: {
    fontSize: premiumSizes.h5,
    lineHeight: premiumLineHeights.normal,
    fontWeight: premiumWeights.medium,
    letterSpacing: premiumLetterSpacing.normal,
    fontFamily: premiumFontFamily.primary,
  },
  
  h6: {
    fontSize: premiumSizes.h6,
    lineHeight: premiumLineHeights.normal,
    fontWeight: premiumWeights.medium,
    letterSpacing: premiumLetterSpacing.normal,
    fontFamily: premiumFontFamily.primary,
  },

  // ===== BODY TEXT =====
  bodyLarge: {
    fontSize: premiumSizes.lg,
    lineHeight: premiumLineHeights.body,
    fontWeight: premiumWeights.body,
    letterSpacing: premiumLetterSpacing.body,
    fontFamily: premiumFontFamily.primary,
  },
  
  body: {
    fontSize: premiumSizes.base,
    lineHeight: premiumLineHeights.body,
    fontWeight: premiumWeights.body,
    letterSpacing: premiumLetterSpacing.body,
    fontFamily: premiumFontFamily.primary,
  },
  
  bodySmall: {
    fontSize: premiumSizes.sm,
    lineHeight: premiumLineHeights.relaxed,
    fontWeight: premiumWeights.body,
    letterSpacing: premiumLetterSpacing.body,
    fontFamily: premiumFontFamily.primary,
  },

  // ===== LABELS & CAPTIONS =====
  label: {
    fontSize: premiumSizes.label,
    lineHeight: premiumLineHeights.caption,
    fontWeight: premiumWeights.label,
    letterSpacing: premiumLetterSpacing.wide,
    fontFamily: premiumFontFamily.primary,
  },
  
  labelLarge: {
    fontSize: premiumSizes.base,
    lineHeight: premiumLineHeights.caption,
    fontWeight: premiumWeights.label,
    letterSpacing: premiumLetterSpacing.wide,
    fontFamily: premiumFontFamily.primary,
  },
  
  caption: {
    fontSize: premiumSizes.caption,
    lineHeight: premiumLineHeights.caption,
    fontWeight: premiumWeights.caption,
    letterSpacing: premiumLetterSpacing.normal,
    fontFamily: premiumFontFamily.primary,
  },
  
  overline: {
    fontSize: premiumSizes.overline,
    lineHeight: premiumLineHeights.caption,
    fontWeight: premiumWeights.overline,
    letterSpacing: premiumLetterSpacing.overline,
    fontFamily: premiumFontFamily.primary,
    textTransform: 'uppercase' as const,
  },

  // ===== INTERACTIVE ELEMENTS =====
  button: {
    fontSize: premiumSizes.button,
    lineHeight: premiumLineHeights.button,
    fontWeight: premiumWeights.button,
    letterSpacing: premiumLetterSpacing.button,
    fontFamily: premiumFontFamily.primary,
  },
  
  buttonLarge: {
    fontSize: premiumSizes.lg,
    lineHeight: premiumLineHeights.button,
    fontWeight: premiumWeights.button,
    letterSpacing: premiumLetterSpacing.button,
    fontFamily: premiumFontFamily.primary,
  },
  
  buttonSmall: {
    fontSize: premiumSizes.sm,
    lineHeight: premiumLineHeights.button,
    fontWeight: premiumWeights.button,
    letterSpacing: premiumLetterSpacing.button,
    fontFamily: premiumFontFamily.primary,
  },

  // ===== SPECIALTY STYLES =====
  luxury: {
    fontSize: premiumSizes.lg,
    lineHeight: premiumLineHeights.relaxed,
    fontWeight: premiumWeights.light,
    letterSpacing: premiumLetterSpacing.luxury,
    fontFamily: premiumFontFamily.luxury,
  },
  
  elegant: {
    fontSize: premiumSizes.xl,
    lineHeight: premiumLineHeights.relaxed,
    fontWeight: premiumWeights.light,
    letterSpacing: premiumLetterSpacing.wide,
    fontFamily: premiumFontFamily.elegant,
  },
  
  monospace: {
    fontSize: premiumSizes.sm,
    lineHeight: premiumLineHeights.relaxed,
    fontWeight: premiumWeights.regular,
    letterSpacing: premiumLetterSpacing.normal,
    fontFamily: premiumFontFamily.mono,
  },

  // ===== CONTEXTUAL PREMIUM =====
  vipTitle: {
    fontSize: premiumSizes.h2,
    lineHeight: premiumLineHeights.heading,
    fontWeight: premiumWeights.bold,
    letterSpacing: premiumLetterSpacing.luxury,
    fontFamily: premiumFontFamily.luxury,
  },
  
  beautyLabel: {
    fontSize: premiumSizes.sm,
    lineHeight: premiumLineHeights.caption,
    fontWeight: premiumWeights.medium,
    letterSpacing: premiumLetterSpacing.wide,
    fontFamily: premiumFontFamily.beauty,
  },
  
  wellnessText: {
    fontSize: premiumSizes.base,
    lineHeight: premiumLineHeights.loose,
    fontWeight: premiumWeights.light,
    letterSpacing: premiumLetterSpacing.wide,
    fontFamily: premiumFontFamily.primary,
  },
};

// 📱 RESPONSIVE SYSTEM PREMIUM
const getResponsiveSize = (baseSize: number, factor: number = 1): number => {
  const deviceFactor = width < 375 ? 0.9 : width > 428 ? 1.1 : 1;
  return Math.round(baseSize * deviceFactor * factor);
};

const getResponsiveLineHeight = (baseLineHeight: number): number => {
  return width < 375 ? baseLineHeight + 0.1 : baseLineHeight;
};

// 🎯 SEMANTIC HELPERS PREMIUM
const createSemanticStyle = (
  size: keyof typeof premiumSizes,
  weight: keyof typeof premiumWeights,
  family: keyof typeof premiumFontFamily = 'primary'
) => ({
  fontSize: premiumSizes[size],
  fontWeight: premiumWeights[weight],
  fontFamily: premiumFontFamily[family],
  lineHeight: premiumLineHeights.body,
  letterSpacing: premiumLetterSpacing.normal,
});

// 🔄 ANIMATION AWARE TYPOGRAPHY
const getAnimationOptimizedStyle = (baseStyle: any) => ({
  ...baseStyle,
  // Optimizaciones para animaciones smooth
  textDecorationLine: 'none' as const,
  textDecorationStyle: 'solid' as const,
  writingDirection: 'ltr' as const,
});

// ✅ VERIFICACIÓN PREMIUM
if (__DEV__) {
  console.log('✍️✨ PREMIUM TYPOGRAPHY LOADED');
  console.log('📏 Base size:', BASE_SIZE);
  console.log('📱 Screen width:', width);
  console.log('🎨 Font families:', Object.keys(premiumFontFamily));
  console.log('📐 Size scale:', Object.keys(premiumSizes).length, 'sizes');
  console.log('⚖️ Weight scale:', Object.keys(premiumWeights).length, 'weights');
  console.log('🎭 Predefined styles:', Object.keys(premiumStyles).length, 'styles');
}

// ===== EXPORT FINAL PREMIUM =====
const typography = {
  families: premiumFontFamily,
  sizes: premiumSizes,
  weights: premiumWeights,
  lineHeights: premiumLineHeights,
  letterSpacing: premiumLetterSpacing,
  styles: premiumStyles,
  
  // Advanced helpers
  getResponsiveSize,
  getResponsiveLineHeight,
  createSemanticStyle,
  getAnimationOptimizedStyle,
  
  // Presets para contextos específicos
  presets: {
    luxury: {
      family: premiumFontFamily.luxury,
      weight: premiumWeights.light,
      letterSpacing: premiumLetterSpacing.luxury,
    },
    beauty: {
      family: premiumFontFamily.beauty,
      weight: premiumWeights.medium,
      letterSpacing: premiumLetterSpacing.wide,
    },
    wellness: {
      family: premiumFontFamily.primary,
      weight: premiumWeights.light,
      letterSpacing: premiumLetterSpacing.wide,
    },
    premium: {
      family: premiumFontFamily.display,
      weight: premiumWeights.bold,
      letterSpacing: premiumLetterSpacing.heading,
    },
  },
  
  // Utility functions
  utils: {
    // Crear estilo con override fácil
    create: (baseStyle: keyof typeof premiumStyles, overrides?: any) => ({
      fontSize: 16, fontWeight: "600",
      ...overrides,
    }),
    
    // Combinar estilos de forma segura
    combine: (...styles: any[]) => Object.assign({}, ...styles),
    
    // Aplicar tema a estilo
    withTheme: (style: any, theme: 'beauty' | 'wellness' | 'luxury' | 'premium') => ({
      ...style,
      ...typography.presets[theme],
    }),
    
    // Hacer responsive cualquier estilo
    makeResponsive: (style: any) => ({
      ...style,
      fontSize: getResponsiveSize(style.fontSize || premiumSizes.base),
      lineHeight: getResponsiveLineHeight(style.lineHeight || premiumLineHeights.body),
    }),
  },
};

export default typography;

// ✅ EXPORTS PREMIUM ADICIONALES
export const {
  families: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
  letterSpacing,
  styles: typographyStyles,
  presets: typographyPresets,
  utils: typographyUtils,
} = typography;

// ✅ TYPES PREMIUM
export type TypographyConfig = typeof typography;
export type FontSize = keyof typeof premiumSizes;
export type FontWeight = keyof typeof premiumWeights;
export type LineHeight = keyof typeof premiumLineHeights;
export type LetterSpacing = keyof typeof premiumLetterSpacing;
export type FontFamily = keyof typeof premiumFontFamily;
export type TypographyStyle = keyof typeof premiumStyles;
export type TypographyPreset = keyof typeof typography.presets;