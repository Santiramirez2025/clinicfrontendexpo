// ============================================================================
// src/styles/index.ts - SISTEMA PROFESIONAL PARA MUJERES 30-50 AÑOS 💼✨
// ============================================================================

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isTablet = SCREEN_WIDTH > 768;
const isIPhoneX = SCREEN_HEIGHT >= 812 && Platform.OS === 'ios';

// ============================================================================
// 🎨 PALETA PROFESIONAL Y ELEGANTE
// ============================================================================
export const colors = {
  // Primarios - Profesionales y confiables
  primary: "#2D3748",      // Azul gris profesional (menos agresivo que negro)
  accent: "#D69E2E",       // Dorado sofisticado (confianza y estatus)
  secondary: "#F7FAFC",    // Gris muy claro (limpieza y claridad)
  
  // Backgrounds - Cálidos y acogedores
  background: "#FEFEFE",      // Blanco puro pero cálido
  backgroundWarm: "#FDF8F4",  // Beige muy sutil (relajante)
  surface: "#FFFFFF",         // Blanco limpio
  surfaceElevated: "#FFFFFF", // Consistencia
  
  // Textos - Legibles y profesionales
  textPrimary: "#2D3748",     // Gris carbón (menos cansador que negro)
  textSecondary: "#4A5568",   // Gris medio (jerarquía clara)
  textDisabled: "#A0AEC0",    // Gris claro
  textPlaceholder: "#9CA3AF", // Gris placeholder
  
  // Estados - Claros y reconocibles
  error: "#E53E3E",      // Rojo elegante (no agresivo)
  success: "#38A169",    // Verde natural (crecimiento)
  warning: "#D69E2E",    // Dorado (coherente con accent)
  info: "#3182CE",       // Azul confiable
  
  // Grises profesionales - Amplia gama para jerarquía
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  
  // Premium - Sofisticados y aspiracionales
  vip: "#B7791F",        // Dorado profundo (lujo accesible)
  premium: "#6B46C1",    // Púrpura elegante (exclusividad)
  beauty: "#EC4899",     // Rosa vibrante pero sofisticado
  wellness: "#059669",   // Verde wellness (salud y bienestar)
  
  // Utilidad - Funcionales
  shadow: "#000000",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderMedium: "#D1D5DB",
  borderDark: "#9CA3AF",
  
  // Transparencias - Sutiles
  overlay: "rgba(0, 0, 0, 0.4)",      // Menos agresivo
  glass: "rgba(255, 255, 255, 0.85)",  // Más opaco para legibilidad
  shimmer: "rgba(255, 255, 255, 0.6)", // Efecto sutil
} as const;

// ============================================================================
// 🔤 TIPOGRAFÍA OPTIMIZADA PARA LEGIBILIDAD
// ============================================================================
export const typography = {
  families: {
    primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    secondary: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    accent: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto Medium',
    mono: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
  },
  
  // Tamaños optimizados para 30-50 años (ligeramente más grandes)
  sizes: {
    xs: isSmallDevice ? 12 : 13,    // Incrementado para legibilidad
    sm: isSmallDevice ? 14 : 15,    // Incrementado
    base: isSmallDevice ? 16 : 17,  // Base más grande
    lg: isSmallDevice ? 18 : 19,    // Incrementado
    xl: isSmallDevice ? 20 : 22,    // Incrementado
    xxl: isSmallDevice ? 24 : 26,   // Incrementado
    title: isSmallDevice ? 28 : 30, // Incrementado
    display: isSmallDevice ? 32 : 36, // Más conservador
    hero: isSmallDevice ? 38 : 42,  // Más conservador
  },
  
  weights: {
    light: '300',
    regular: '400',
    medium: '500',    // Peso estándar para profesionales
    semiBold: '600',  // Para títulos importantes
    bold: '700',      // Uso limitado
    extraBold: '800', // Uso muy limitado
    black: '900',     // Uso excepcional
  },
  
  // Line heights optimizados para lectura cómoda
  lineHeights: {
    tight: 1.3,      // Incrementado para mejor legibilidad
    snug: 1.4,       // Incrementado
    normal: 1.5,     // Estándar cómodo
    relaxed: 1.6,    // Para textos largos
    loose: 1.7,      // Para accesibilidad
    spacious: 1.8,   // Para contenido premium
  },
  
  letterSpacing: {
    tighter: -0.4,   // Menos agresivo
    tight: -0.2,     // Menos agresivo
    normal: 0,
    wide: 0.3,       // Más sutil
    wider: 0.6,      // Más sutil
    widest: 1.0,     // Más sutil
  },
} as const;

// ============================================================================
// 📏 ESPACIADO PROFESIONAL Y GENEROSO
// ============================================================================
export const spacing = {
  // Base - Más generoso para comodidad
  xs: 6,      // Incrementado
  sm: 10,     // Incrementado
  md: 14,     // Incrementado
  lg: 18,     // Incrementado
  xl: 24,     // Incrementado
  xxl: 30,    // Incrementado
  xxxl: 40,   // Incrementado
  massive: 56, // Para separaciones importantes
  
  // Layouts - Espaciados cómodos
  layout: {
    page: isTablet ? 40 : 24,       // Más generoso
    section: isTablet ? 32 : 20,    // Más generoso
    container: isTablet ? 28 : 18,  // Más generoso
    element: isTablet ? 20 : 14,    // Más generoso
  },
  
  // Componentes - Dimensiones cómodas
  component: {
    radiusXS: 6,     // Incrementado para suavidad
    radiusSM: 8,     // Incrementado
    radiusMD: 10,    // Incrementado
    radiusLG: 14,    // Incrementado
    radiusXL: 18,    // Incrementado
    radiusXXL: 24,   // Incrementado
    radiusRound: 9999,
    iconSM: 18,      // Incrementado para visibilidad
    iconMD: 22,      // Incrementado
    iconLG: 26,      // Incrementado
    iconXL: 34,      // Incrementado
  },
  
  // Estética - Espaciados cómodos
  aesthetic: {
    cardSpacing: 20,      // Más generoso
    itemSpacing: 16,      // Más generoso
    sectionPadding: 28,   // Más generoso
    buttonPadding: 18,    // Más generoso para toque fácil
  },
} as const;

// ============================================================================
// 🌟 SOMBRAS ELEGANTES Y SUTILES
// ============================================================================
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  // Sombras sutiles para elegancia
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,    // Más sutil
    shadowRadius: 3,
    elevation: 1,
  },
  
  soft: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,    // Más sutil
    shadowRadius: 5,
    elevation: 2,
  },
  
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,    // Más sutil
    shadowRadius: 8,
    elevation: 3,
  },
  
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,    // Elegante
    shadowRadius: 10,
    elevation: 4,
  },
  
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,    // Profesional
    shadowRadius: 12,
    elevation: 5,
  },
  
  strong: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,    // Para elementos importantes
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,    // Para modales
    shadowRadius: 20,
    elevation: 10,
  },
  
  // Sombras de color elegantes
  premium: {
    shadowColor: colors.vip,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,    // Más sutil
    shadowRadius: 12,
    elevation: 6,
  },
  
  beauty: {
    shadowColor: colors.beauty,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,    // Más sutil
    shadowRadius: 8,
    elevation: 4,
  },
  
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,    // Más sutil
    shadowRadius: 10,
    elevation: 6,
  },
  
  colored: {
    accent: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 8,
      elevation: 4,
    },
    vip: {
      shadowColor: colors.vip,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 8,
      elevation: 4,
    },
    premium: {
      shadowColor: colors.premium,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;

// ============================================================================
// 🎭 GRADIENTES SOFISTICADOS
// ============================================================================
export const gradients = {
  // Gradientes profesionales y elegantes
  signature: ['#B7791F', '#D69E2E', '#ECC94B'], // Dorados elegantes
  sunset: ['#FFF5E6', '#FED7AA', '#FDB366'],    // Cálidos suaves
  pearl: ['#FFFFFF', '#F9FAFB', '#F3F4F6'],     // Neutros elegantes
  roseGold: ['#F7E6D3', '#E6B897', '#D4A574'], // Rosa dorado sutil
  spa: ['#F0FDF4', '#DCFCE7', '#BBF7D0'],       // Verde wellness
  beauty: ['#FDF2F8', '#FCE7F3', '#F9A8D4'],   // Rosa elegante
  vip: ['#FFFBEB', '#FEF3C7', '#FDE68A'],      // Dorado premium
  warm: ['#FFFAF0', '#FEF5E7', '#FED7AA'],     // Cálido acogedor
  cool: ['#F8FAFC', '#F1F5F9', '#E2E8F0'],     // Frío profesional
  
  // Nuevos gradientes profesionales
  executive: ['#1A202C', '#2D3748', '#4A5568'], // Grises ejecutivos
  wellness: ['#F0FDF4', '#ECFDF5', '#D1FAE5'], // Verde bienestar
  trust: ['#EBF8FF', '#BEE3F8', '#90CDF4'],    // Azul confianza
  elegance: ['#FAF5FF', '#E9D8FD', '#D6BCFA'], // Púrpura elegante
} as const;

// ============================================================================
// ⚡ ANIMACIONES PROFESIONALES
// ============================================================================
export const animations = {
  // Duraciones más conservadoras
  duration: {
    instant: 150,    // Incrementado para suavidad
    fast: 250,       // Incrementado
    normal: 350,     // Incrementado
    slow: 500,       // Mantenido
    slower: 650,     // Incrementado
    epic: 1000,      // Mantenido
  },
  
  // Easing más suaves
  easing: {
    ios: { tension: 280, friction: 25 },      // Más suave
    material: { tension: 260, friction: 28 }, // Más suave
    gentle: { tension: 220, friction: 30 },   // Más suave
    bouncy: { tension: 350, friction: 18 },   // Menos agresivo
    smooth: { tension: 180, friction: 32 },   // Muy suave
    entrance: { tension: 280, friction: 22 }, // Suave
    exit: { tension: 240, friction: 28 },     // Suave
    interaction: { tension: 320, friction: 24 }, // Responsivo pero suave
  },
} as const;

// ============================================================================
// 🎯 ACCESIBILIDAD MEJORADA
// ============================================================================
export const accessibility = {
  // Ratios de contraste optimizados
  contrastRatios: {
    normal: 4.5,     // WCAG AA
    large: 3.0,      // WCAG AA para texto grande
    enhanced: 7.0,   // WCAG AAA
  },
  
  // Targets de toque generosos
  touchTargets: {
    minimum: 48,     // Incrementado para comodidad
    comfortable: 52, // Incrementado
    premium: 60,     // Incrementado para facilidad
  },
  
  // Configuraciones para accesibilidad
  screenReader: {
    reducedMotion: true,
    announcements: true,
    landmarks: true,
    semanticMarkup: true,
  },
  
  // Espaciado mínimo entre elementos
  minSpacing: {
    betweenElements: 12, // Mínimo espacio entre elementos
    betweenSections: 24, // Mínimo espacio entre secciones
  },
} as const;

// ============================================================================
// 💎 BACKWARD COMPATIBILITY - MODERNCOLORS
// ============================================================================
export const modernColors = {
  // Principales
  primary: colors.primary,
  primaryDark: colors.gray800,
  accent: colors.accent,
  accentLight: colors.warning,
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
  white: '#FFFFFF',
  black: colors.gray900,
  
  // Estados modernos
  successModern: colors.success,
  errorModern: colors.error,
  warningModern: colors.warning,
  infoModern: colors.info,
  
  // Transparencias
  glass: {
    white: colors.glass,
    warm: 'rgba(255, 249, 246, 0.85)',
    dark: 'rgba(28, 25, 23, 0.85)',
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
  massive: spacing.massive,
  
  // Layout específico
  content: spacing.layout,
  
  // Touch targets
  touch: accessibility.touchTargets,
  
  // Márgenes
  margins: {
    screen: isSmallDevice ? 20 : isTablet ? 40 : 24,
    card: isSmallDevice ? 16 : isTablet ? 24 : 20,
    element: isSmallDevice ? 12 : isTablet ? 16 : 14,
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
  lineHeightModern: typography.lineHeights,
  
  // Letter spacing
  letterSpacing: typography.letterSpacing,
  letterSpacingModern: typography.letterSpacing,
} as const;

// ============================================================================
// 🌟 MODERNSHADOWS COMPLETO
// ============================================================================
export const modernShadows = {
  subtle: shadows.soft,
  soft: shadows.soft,
  sm: shadows.sm,
  small: shadows.sm,
  md: shadows.md,
  medium: shadows.medium,
  lg: shadows.lg,
  large: shadows.lg,
  strong: shadows.strong,
  xl: shadows.xl,
  premium: shadows.premium,
  inset: shadows.soft,
  glow: shadows.glow,
  colored: shadows.colored,
} as const;

// ============================================================================
// 🛠️ UTILIDADES PROFESIONALES
// ============================================================================
export const modernUtils = {
  // Crear sombra personalizada
  createShadow: (color: string = colors.shadow, opacity: number = 0.12, radius: number = 8) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: radius / 2 },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: Math.round(radius / 2),
  }),

  // Font responsive optimizado para target
  responsiveFont: (base: number, factor: number = 1.1) => ({
    fontSize: isSmallDevice ? base * 0.95 : isTablet ? base * factor * 1.15 : base * factor,
  }),

  // Safe area padding
  safePadding: {
    top: isIPhoneX ? 44 : Platform.OS === 'android' ? 24 : 20,
    bottom: isIPhoneX ? 34 : 0,
  },

  // Glassmorphism más sutil
  glassmorphism: (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
    const intensityMap = {
      light: { opacity: 0.08, blur: 8 },
      medium: { opacity: 0.15, blur: 12 },
      strong: { opacity: 0.25, blur: 16 },
    };
    
    const config = intensityMap[intensity];
    
    return {
      backgroundColor: `rgba(255, 255, 255, ${config.opacity})`,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.12)',
    };
  },

  // With opacity
  withOpacity: (color: string, opacity: number) => {
    const hex = color.replace('#', '');
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `#${hex}${alpha}`;
  },

  // Estilo profesional para botones
  professionalButton: (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
    const variantMap = {
      primary: {
        backgroundColor: colors.primary,
        color: '#FFFFFF',
        borderColor: colors.primary,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.primary,
        borderColor: colors.primary,
      },
      accent: {
        backgroundColor: colors.accent,
        color: '#FFFFFF',
        borderColor: colors.accent,
      },
    };
    
    return {
      ...variantMap[variant],
      borderWidth: 1,
      borderRadius: spacing.component.radiusMD,
      paddingVertical: spacing.aesthetic.buttonPadding,
      paddingHorizontal: spacing.aesthetic.buttonPadding * 1.5,
      minHeight: accessibility.touchTargets.comfortable,
      ...shadows.soft,
    };
  },
} as const;

// ============================================================================
// 🎨 ESTILOS GLOBALES PROFESIONALES
// ============================================================================
export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: spacing.component.radiusLG,
    padding: spacing.aesthetic.cardSpacing,
    ...shadows.soft,
  },
  
  button: {
    backgroundColor: modernColors.primary,
    paddingVertical: spacing.aesthetic.buttonPadding,
    paddingHorizontal: spacing.aesthetic.buttonPadding * 1.5,
    borderRadius: spacing.component.radiusMD,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: accessibility.touchTargets.comfortable,
    ...shadows.soft,
  },
  
  input: {
    borderWidth: 1,
    borderColor: modernColors.border,
    borderRadius: spacing.component.radiusMD,
    paddingHorizontal: spacing.aesthetic.itemSpacing,
    paddingVertical: spacing.aesthetic.itemSpacing,
    fontSize: typography.sizes.base,
    color: modernColors.text,
    backgroundColor: modernColors.surface,
    minHeight: accessibility.touchTargets.comfortable,
    ...shadows.subtle,
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
  
  // Nuevos estilos profesionales
  professionalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semiBold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeights.snug * typography.sizes.xl,
    marginBottom: spacing.md,
  },
  
  professionalBody: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
  },
  
  professionalCard: {
    backgroundColor: modernColors.surface,
    borderRadius: spacing.component.radiusLG,
    padding: spacing.aesthetic.cardSpacing,
    marginBottom: spacing.aesthetic.itemSpacing,
    borderWidth: 1,
    borderColor: modernColors.borderLight,
    ...shadows.soft,
  },
} as const;

// ============================================================================
// 🎯 THEME PROFESIONAL COMPLETO
// ============================================================================
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  gradients,
  animations,
  accessibility,
} as const;

export const modernTheme = {
  colors: modernColors,
  spacing: modernSpacing,
  typography: modernTypography,
  shadows: modernShadows,
  utils: modernUtils,
  gradients,
  accessibility,
} as const;

// ============================================================================
// 🔧 VERIFICACIÓN PROFESIONAL
// ============================================================================
if (__DEV__) {
  console.log('✨ Sistema profesional cargado para mujeres 30-50 años');
  console.log('✅ Legibilidad optimizada:', typography.sizes.base, 'px base');
  console.log('✅ Espaciado cómodo:', spacing.aesthetic.cardSpacing, 'px cards');
  console.log('✅ Touch targets:', accessibility.touchTargets.comfortable, 'px');
  console.log('✅ Colores profesionales cargados');
}

// ============================================================================
// 📤 EXPORTS FINALES
// ============================================================================
export default modernTheme;