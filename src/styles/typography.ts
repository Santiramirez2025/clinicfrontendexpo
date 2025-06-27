import { Platform } from 'react-native';

// ============================================================================
// TIPOGRAFÍA MODERNA COMPLETA ✅
// ============================================================================

export const modernTypography = {
  // ===== FONT FAMILIES =====
  fontFamily: {
    primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    secondary: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    accent: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto Medium',
    mono: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
  },

  // ===== FONT SIZES MODERNOS ✅
  fontSizeModern: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xl2: 24, // ✅ CRÍTICO - YA AGREGADO
    xxl: 26,
    title: 28,
    display: 32,
    hero: 38,
  },

  // ===== FONT WEIGHTS =====
  fontWeights: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // ===== LINE HEIGHTS =====
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // ===== LETTER SPACING MODERNO ✅
  letterSpacingModern: {
    tight: -0.02,
    normal: 0,
    relaxed: 0.02,
  },

  // ===== LEGACY LETTER SPACING (compatibilidad) =====
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1,
  },

  // ===== HEADING STYLES ✅
  headingLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  headingMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
  },
  headingSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },

  // ===== BODY STYLES ✅
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },

  // ===== CAPTION STYLE ✅
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  // ===== ESTILOS PREMIUM ADICIONALES =====
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  
  overline: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },

  // ===== ESTILOS ESPECIALES =====
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },

  // ===== RESPONSIVE TYPOGRAPHY =====
  responsive: {
    h1: {
      fontSize: Platform.OS === 'ios' ? 34 : 32,
      lineHeight: Platform.OS === 'ios' ? 42 : 40,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: Platform.OS === 'ios' ? 28 : 26,
      lineHeight: Platform.OS === 'ios' ? 36 : 34,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: Platform.OS === 'ios' ? 22 : 20,
      lineHeight: Platform.OS === 'ios' ? 30 : 28,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: Platform.OS === 'ios' ? 17 : 16,
      lineHeight: Platform.OS === 'ios' ? 25 : 24,
      fontWeight: '400' as const,
    },
  },

  // ===== TEXTO PREMIUM PARA BEAUTY APP =====
  beauty: {
    hero: {
      fontSize: 42,
      lineHeight: 50,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    tagline: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '400' as const,
      letterSpacing: 0.2,
    },
    price: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
    },
    service: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500' as const,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: '400' as const,
      letterSpacing: 0.1,
    },
  },
} as const;

// ============================================================================
// HELPERS DE TIPOGRAFÍA ✅
// ============================================================================

export const getTypographyStyle = (variant: keyof typeof modernTypography) => {
  return modernTypography[variant] || modernTypography.bodyMedium;
};

export const getFontSize = (size: keyof typeof modernTypography.fontSizeModern) => {
  return modernTypography.fontSizeModern[size] || modernTypography.fontSizeModern.base;
};

export const getFontWeight = (weight: keyof typeof modernTypography.fontWeights) => {
  return modernTypography.fontWeights[weight] || modernTypography.fontWeights.normal;
};

export const getLineHeight = (height: keyof typeof modernTypography.lineHeights) => {
  return modernTypography.lineHeights[height] || modernTypography.lineHeights.normal;
};

export const getLetterSpacing = (spacing: keyof typeof modernTypography.letterSpacingModern) => {
  return modernTypography.letterSpacingModern[spacing] || modernTypography.letterSpacingModern.normal;
};

// ============================================================================
// TYPES ✅
// ============================================================================

export type FontSizeKeys = keyof typeof modernTypography.fontSizeModern;
export type FontWeightKeys = keyof typeof modernTypography.fontWeights;
export type LineHeightKeys = keyof typeof modernTypography.lineHeights;
export type LetterSpacingKeys = keyof typeof modernTypography.letterSpacingModern;
export type TypographyVariantKeys = keyof typeof modernTypography;

// ============================================================================
// EXPORT DEFAULT ✅
// ============================================================================

export default modernTypography;