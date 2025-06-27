// ============================================================================
// src/styles/colors.ts - SIN ERRORES TYPESCRIPT ✅
// ============================================================================

// 🌟 PALETA PREMIUM CORREGIDA Y COMPLETA
const premiumColorsDefinition = {
  // ===== PALETA PRINCIPAL PREMIUM =====
  primary: "#2C2C54",         // Deep navy - sofisticado y elegante
  primaryLight: "#4A5568",    // ✅ AGREGADO - Light variant
  primaryDark: "#1F2937",     // ✅ AGREGADO - Dark variant
  secondary: "#FFF8F0",       // Warm ivory - lujo sutil
  accent: "#E8B4CB",          // Rose gold - feminino premium
  accentLight: "#D69E2E",     // ✅ AGREGADO - Compatible
  accentSecondary: "#D4AF37", // Champagne gold - lujo absoluto

  // ===== FONDOS ESTÉTICOS PREMIUM =====
  background: "#FDFCF8",          // Warm white - acogedor
  backgroundWarm: "#FFF5F0",      // Peach whisper - cálido premium
  backgroundCool: "#F8FAFC",      // Cool white - elegancia
  backgroundNeutral: "#FAFAFA",   // Pure neutral - minimalista
  backgroundDark: "#1A202C",      // ✅ AGREGADO - Dark background
  backgroundLight: "#F8F9FA",     // ✅ AGREGADO - Light background
  surface: "#FFFFFF",             // Pure white - clean
  surfaceDark: "#2D3748",         // ✅ AGREGADO - Dark surface
  surfaceElevated: "#FFFFFF",     // Elevated white - depth
  surfaceOverlay: "#FFFFFF",      // Overlay surface
  surfacePressed: "#F5F5F5",      // Pressed state

  // ===== TEXTO JERÁRQUICO PREMIUM =====
  text: "#1A1A1A",                // ✅ AGREGADO - Alias principal
  textPrimary: "#1A1A1A",         // Deep charcoal - máxima legibilidad
  textSecondary: "#6B6B6B",       // Medium gray - contenido secundario
  textTertiary: "#9CA3AF",        // Light gray - hints y labels
  textLight: "#4A5568",           // ✅ AGREGADO - Light text
  textMuted: "#718096",           // ✅ AGREGADO - Muted text
  textDisabled: "#D1D5DB",        // Disabled gray
  textPlaceholder: "#9CA3AF",     // Placeholder gray
  textInverse: "#FFFFFF",         // White text para fondos oscuros
  textAccent: "#E8B4CB",          // Rose gold text - highlights
  textSuccess: "#059669",         // Success text
  textError: "#DC2626",           // Error text
  textWarning: "#D97706",         // Warning text

  // ===== ESTADOS PREMIUM =====
  error: "#EF4444",           // Modern red - elegante pero visible
  errorLight: "#FEF2F2",      // Error background
  errorBorder: "#FECACA",     // Error border
  
  success: "#10B981",         // Modern green - natural y positivo
  successLight: "#F0FDF4",    // Success background
  successBorder: "#BBF7D0",   // Success border
  
  warning: "#F59E0B",         // Modern amber - cálido
  warningLight: "#FFFBEB",    // Warning background
  warningBorder: "#FDE68A",   // Warning border
  
  info: "#3B82F6",            // Modern blue - confiable
  infoLight: "#EFF6FF",       // Info background
  infoBorder: "#BFDBFE",      // Info border

  // ===== GRISES PREMIUM SYSTEM =====
  gray50: "#FAFAFA",    // Casi blanco
  gray100: "#F5F5F5",   // Super light
  gray200: "#E5E5E5",   // Light borders
  gray300: "#D4D4D4",   // Borders
  gray400: "#A3A3A3",   // Placeholders
  gray500: "#737373",   // Body text light
  gray600: "#525252",   // Body text
  gray700: "#404040",   // Headings light
  gray800: "#262626",   // Headings
  gray900: "#171717",   // Max contrast

  // ===== COLORES ESTÉTICOS ESPECÍFICOS =====
  beauty: {
    primary: "#E8B4CB",      // Rose gold principal
    secondary: "#F4E4EC",    // Rose blush
    tertiary: "#FBEEF2",     // Rose whisper
    accent: "#D4A574",       // Bronze accent
  },
  
  wellness: {
    primary: "#9FD8CB",      // Sage green - tranquilidad
    secondary: "#E8F5F1",    // Sage light
    tertiary: "#F0FAF7",     // Sage whisper
    accent: "#7AC3B3",       // Mint accent
  },
  
  luxury: {
    primary: "#D4AF37",      // Champagne gold
    secondary: "#F4E4BC",    // Gold light
    tertiary: "#FAF0D7",     // Gold whisper
    accent: "#B8941F",       // Deep gold
    400: "#D4AF37",          // ✅ AGREGADO - Variant 400
    50: "#FAF0D7",           // ✅ AGREGADO - Variant 50
  },
  
  premium: {
    primary: "#8B5CF6",      // Premium purple
    secondary: "#EDE9FE",    // Purple light
    tertiary: "#F3F0FF",     // Purple whisper
    accent: "#7C3AED",       // Deep purple
  },

  // ✅ AGREGADO - blush palette para compatibilidad
  blush: {
    400: "#E8B4CB",          // Rose gold
    50: "#FBEEF2",           // Rose whisper
  },

  // ===== GRADIENTES PREMIUM =====
  gradients: {
    beauty: ["#E8B4CB", "#F4E4EC"],
    wellness: ["#9FD8CB", "#E8F5F1"],
    luxury: ["#D4AF37", "#F4E4BC"],
    premium: ["#8B5CF6", "#EDE9FE"],
    sunset: ["#FF8A80", "#FFE082"],
    ocean: ["#81D4FA", "#E1F5FE"],
    forest: ["#A5D6A7", "#F1F8E9"],
    royal: ["#9C27B0", "#E1BEE7"],
    primary: ["#2C2C54", "#4A5568"], // ✅ AGREGADO
    secondary: ["#4A5568", "#2D3748"], // ✅ AGREGADO
    accent: ["#F6E05E", "#D69E2E"], // ✅ AGREGADO
  },

  // ===== SOMBRAS Y OVERLAYS =====
  shadow: "#000000",
  shadowLight: "#00000010",
  shadowMedium: "#00000020",
  shadowDark: "#00000040",
  overlay: "#00000050",
  overlayLight: "#00000020",
  overlayDark: "#00000080",

  // 🔧 FIX CRÍTICO: BORDERS PREMIUM (el que faltaba!)
  border: "#E5E7EB",              // 🚨 FIX: Border principal
  borderLight: "#F3F4F6",         // Border light
  borderMedium: "#D1D5DB",        // Border medium
  borderDark: "#9CA3AF",          // Border dark
  borderAccent: "#E8B4CB",        // Border accent
  borderFocus: "#D4AF37",         // Border focus

  // ===== INTERACTIVE STATES =====
  interactive: {
    hover: "#F9FAFB",
    pressed: "#F3F4F6",
    focus: "#FEF3C7",
    disabled: "#F9FAFB",
    loading: "#F3F4F6",
  },

  // ===== SEMANTIC COLORS =====
  semantic: {
    love: "#FF69B4",          // Hot pink - amor
    calm: "#87CEEB",          // Sky blue - calma
    energy: "#FFD700",        // Gold - energía
    peace: "#98FB98",         // Pale green - paz
    passion: "#FF6347",       // Tomato - pasión
    wisdom: "#9370DB",        // Medium purple - sabiduría
  },

  // 🔧 FIX: ALIASES CRÍTICOS PARA BACKWARD COMPATIBILITY
  disabled: "#D1D5DB",       // Alias para textDisabled
  placeholder: "#9CA3AF",    // Alias para textPlaceholder
  charcoal: "#1A1A1A",       // Alias para textPrimary
  white: "#FFFFFF",          // ✅ AGREGADO - White alias
  divider: "#E2E8F0",        // ✅ AGREGADO - Divider color

  // ===== COLORES PARA ESTADOS ESPECÍFICOS ✅
  pending: "#ED8936",        // ✅ AGREGADO
  confirmed: "#38A169",      // ✅ AGREGADO
  completed: "#3182CE",      // ✅ AGREGADO
  cancelled: "#E53E3E",      // ✅ AGREGADO

  // ===== GLASS EFFECTS =====
  glass: {
    background: "rgba(255, 255, 255, 0.25)",
    backgroundDark: "rgba(45, 55, 72, 0.25)",
    border: "rgba(255, 255, 255, 0.18)",
    borderDark: "rgba(74, 85, 104, 0.18)",
  },
} as const;

// ✅ CREAR COLORES PREMIUM SEGUROS
export const colors = premiumColorsDefinition;

// ✅ COLORES MODERNOS MEJORADOS PREMIUM CON FIX
export const modernColors = {
  // Heredar todos los colores premium
  ...colors,
  
  // Aliases adicionales para compatibilidad
  blush: colors.beauty.secondary,
  sage: colors.wellness.primary,
  lavender: "#EDE9FE",
  peach: colors.backgroundWarm,
  
  // Estados modernos premium
  successModern: colors.success,
  errorModern: colors.error,
  warningModern: colors.warning,
  infoModern: colors.info,
} as const;

// ============================================================================
// TIPOGRAFÍA MODERNA CORREGIDA ✅
// ============================================================================

export const modernTypography = {
  fontSizeModern: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xl2: 24, // ✅ AGREGADO
    xxl: 26,
    title: 28,
    display: 32,
    hero: 38,
  },
  fontWeights: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1,
  }
} as const;

// ============================================================================
// ESPACIADO CORREGIDO ✅
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const modernSpacing = spacing; // ✅ Alias

// ============================================================================
// BORDER RADIUS ✅
// ============================================================================

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// ============================================================================
// SOMBRAS CORREGIDAS ✅
// ============================================================================

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: { // ✅ AGREGADO - CRÍTICO
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 16,
  },
  colored: {
    shadowColor: modernColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
} as const;

export const modernShadows = shadows; // ✅ Alias

// ============================================================================
// HELPERS CORREGIDOS ✅
// ============================================================================

export const getBorder = (type: 'default' | 'light' | 'medium' | 'dark' | 'accent' | 'focus' = 'default'): string => {
  const borderMap = {
    default: colors.border,
    light: colors.borderLight,
    medium: colors.borderMedium,
    dark: colors.borderDark,
    accent: colors.borderAccent,
    focus: colors.borderFocus,
  };
  
  return borderMap[type] || colors.border;
};

export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let value: any = colors;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) {
      console.warn(`⚠️ Color path '${colorPath}' not found, using fallback`);
      return colors.primary;
    }
  }
  
  return typeof value === 'string' ? value : colors.primary;
};

export const getColorPalette = (palette: 'beauty' | 'wellness' | 'luxury' | 'premium') => {
  return colors[palette] || colors.beauty;
};

export const getGradient = (gradientName: keyof typeof colors.gradients) => {
  return colors.gradients[gradientName] || colors.gradients.beauty;
};

export const getInteractiveColor = (state: keyof typeof colors.interactive) => {
  return colors.interactive[state] || colors.interactive.hover;
};

export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `#${hex}${alpha}`;
};

export const getContrastColor = (backgroundColor: string): string => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? colors.textPrimary : colors.textInverse;
};

// ============================================================================
// TEMA COMBINADO ✅
// ============================================================================

export const theme = {
  colors: modernColors,
  typography: modernTypography,
  shadows,
  spacing,
  borderRadius,
} as const;

// ============================================================================
// EXPORTS FINALES ✅
// ============================================================================

export default colors;

// ✅ TYPES PREMIUM
export type ColorKeys = keyof typeof colors;
export type ModernColorKeys = keyof typeof modernColors;
export type PaletteKeys = 'beauty' | 'wellness' | 'luxury' | 'premium';
export type GradientKeys = keyof typeof colors.gradients;
export type InteractiveStateKeys = keyof typeof colors.interactive;
export type SemanticColorKeys = keyof typeof colors.semantic;
export type BorderType = 'default' | 'light' | 'medium' | 'dark' | 'accent' | 'focus';