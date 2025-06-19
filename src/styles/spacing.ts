// ============================================================================
// src/styles/spacing.ts - PREMIUM LEVEL GOD 📐✨
// ============================================================================
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🎯 SISTEMA PREMIUM BASADO EN RATIO ÁUREO + ESCALA MODULAR
const GOLDEN_RATIO = 1.618;
const BASE_UNIT = 8; // Base de 8px para perfect pixel alignment
const PREMIUM_RATIO = 1.5; // Ratio más elegante para espaciado premium

// 📱 FACTOR DE ESCALA RESPONSIVE PREMIUM
const getPremiumScaleFactor = (): number => {
  if (width <= 375) return 0.85;      // iPhone SE - más compacto
  if (width <= 390) return 0.9;       // iPhone 12 mini
  if (width <= 414) return 1.0;       // iPhone 11, XR - baseline
  if (width <= 428) return 1.1;       // iPhone 12 Pro Max
  if (width <= 768) return 1.15;      // iPad mini/portrait
  return 1.25;                        // iPad Pro/landscape
};

const SCALE_FACTOR = getPremiumScaleFactor();
const scale = (value: number): number => Math.round(value * SCALE_FACTOR);

// 🎨 ESCALA PREMIUM MODULAR
export const spacing = {
  // ===== ESCALA PRINCIPAL PREMIUM =====
  // Micro spacing para detalles finos
  micro: scale(2),          // 2px - bordes ultra finos
  tiny: scale(4),           // 4px - separaciones mínimas
  xs: scale(6),             // 6px - spacing muy pequeño
  sm: scale(8),             // 8px - spacing pequeño estándar
  md: scale(12),            // 12px - spacing medio
  base: scale(16),          // 16px - spacing base (golden touch point)
  lg: scale(20),            // 20px - spacing grande
  xl: scale(24),            // 24px - spacing extra grande
  xxl: scale(32),           // 32px - spacing doble extra
  xxxl: scale(40),          // 40px - spacing máximo
  jumbo: scale(48),         // 48px - spacing hero
  mega: scale(64),          // 64px - spacing épico
  
  // ===== LAYOUT PREMIUM =====
  layout: {
    // Screen level spacing
    screenPadding: scale(20),        // Padding horizontal de pantalla
    screenPaddingLarge: scale(24),   // Para tablets
    sectionSpacing: scale(32),       // Entre secciones principales
    sectionSpacingLarge: scale(40),  // Para contenido hero
    
    // Card spacing premium
    cardPadding: scale(20),          // Padding interno de cards
    cardPaddingLarge: scale(24),     // Para cards importantes
    cardSpacing: scale(16),          // Entre cards
    cardSpacingLarge: scale(20),     // Para grids de cards
    
    // List spacing premium
    listItemPadding: scale(16),      // Padding de items de lista
    listItemSpacing: scale(12),      // Entre items de lista
    listSectionSpacing: scale(24),   // Entre secciones de lista
    
    // Button spacing premium
    buttonPadding: scale(16),        // Padding interno de botones
    buttonPaddingLarge: scale(20),   // Para botones principales
    buttonSpacing: scale(12),        // Entre botones
    
    // Input spacing premium
    inputPadding: scale(16),         // Padding interno de inputs
    inputSpacing: scale(16),         // Entre inputs en forms
    inputGroupSpacing: scale(24),    // Entre grupos de inputs
    
    // Navigation spacing
    tabBarHeight: scale(84),         // Altura de tab bar
    headerHeight: scale(64),         // Altura de header
    headerPadding: scale(16),        // Padding horizontal de header
    navigationSpacing: scale(8),     // Entre elementos de nav
  },
  
  // ===== COMPONENTES PREMIUM =====
  component: {
    // Border radius premium system
    radiusNone: 0,
    radiusMicro: scale(2),          // Para bordes muy sutiles
    radiusXS: scale(4),             // Para badges pequeños
    radiusSM: scale(6),             // Para inputs pequeños
    radiusMD: scale(8),             // Para botones estándar
    radiusLG: scale(12),            // Para cards
    radiusXL: scale(16),            // Para modals
    radiusXXL: scale(20),           // Para sheets
    radiusJumbo: scale(24),         // Para hero elements
    radiusRound: 999,               // Completamente redondo
    
    // Border widths premium
    borderHairline: Platform.select({ ios: 0.5, android: 0.5, default: 1 }),
    borderThin: 1,
    borderMedium: scale(2),
    borderThick: scale(3),
    borderBold: scale(4),
    
    // Icon sizes premium
    iconMicro: scale(12),           // Para indicators
    iconXS: scale(14),              // Para texto inline
    iconSM: scale(16),              // Para labels
    iconMD: scale(20),              // Para botones
    iconLG: scale(24),              // Para headers
    iconXL: scale(28),              // Para features
    iconXXL: scale(32),             // Para heros
    iconJumbo: scale(48),           // Para splash/empty states
    
    // Avatar sizes premium
    avatarXS: scale(24),            // Mini avatar
    avatarSM: scale(32),            // Small avatar
    avatarMD: scale(40),            // Default avatar
    avatarLG: scale(48),            // Large avatar
    avatarXL: scale(64),            // Profile avatar
    avatarXXL: scale(80),           // Hero avatar
    avatarJumbo: scale(96),         // Cover/feature avatar
    
    // Interactive zones (44px minimum for touch)
    touchTarget: Math.max(scale(44), 44),  // Mínimo iOS/Android
    touchTargetLarge: scale(56),           // Para elementos principales
    
    // Floating elements
    fabSize: scale(56),             // Floating action button
    fabOffset: scale(16),           // Offset from edges
    
    // Shadows and elevation
    shadowOffset: scale(2),         // Shadow offset base
    shadowBlur: scale(4),           // Shadow blur base
    elevationLow: 2,               // Para cards sutiles
    elevationMedium: 4,            // Para buttons/modals
    elevationHigh: 8,              // Para dropdowns/tooltips
    elevationMax: 16,              // Para overlays/sheets
  },
  
  // ===== ESTÉTICA PREMIUM =====
  aesthetic: {
    // Golden ratio inspired spacing
    goldenSmall: scale(Math.round(BASE_UNIT * GOLDEN_RATIO * 0.5)),     // ~6px
    goldenMedium: scale(Math.round(BASE_UNIT * GOLDEN_RATIO)),           // ~13px
    goldenLarge: scale(Math.round(BASE_UNIT * GOLDEN_RATIO * 1.5)),      // ~19px
    goldenXL: scale(Math.round(BASE_UNIT * GOLDEN_RATIO * 2)),           // ~26px
    
    // Breathing room spacing (luxury spacing)
    breathingMicro: scale(8),       // Micro breathing room
    breathingSmall: scale(16),      // Small breathing room
    breathingMedium: scale(24),     // Medium breathing room
    breathingLarge: scale(32),      // Large breathing room
    breathingXL: scale(48),         // Extra large breathing room
    breathingJumbo: scale(64),      // Jumbo breathing room
    
    // Content spacing premium
    paragraphSpacing: scale(16),    // Entre párrafos
    sectionSpacing: scale(32),      // Entre secciones
    contentPadding: scale(20),      // Padding de contenido
    contentMargin: scale(24),       // Margin de contenido
    
    // Visual hierarchy spacing
    itemSpacing: scale(12),         // Entre items relacionados
    groupSpacing: scale(20),        // Entre grupos de items
    categorySpacing: scale(28),     // Entre categorías
    pageSpacing: scale(36),         // Entre páginas/vistas
    
    // Feature spacing
    featureSpacing: scale(24),      // Entre features
    calloutSpacing: scale(20),      // Para callouts/highlights
    testimonialSpacing: scale(32),  // Para testimonials
    
    // Floating and positioning
    floatingOffset: scale(16),      // Offset para elementos flotantes
    modalPadding: scale(24),        // Padding de modals
    sheetPadding: scale(20),        // Padding de bottom sheets
    overlayPadding: scale(16),      // Padding de overlays
  },
  
  // ===== GRID SYSTEM PREMIUM =====
  grid: {
    // Grid base premium
    columns: 12,                    // 12 column grid
    gutter: scale(16),              // Gutter entre columnas
    margin: scale(20),              // Margin del grid
    
    // Responsive breakpoints spacing
    xs: scale(8),                   // Para pantallas muy pequeñas
    sm: scale(12),                  // Para móviles
    md: scale(16),                  // Para tablets portrait
    lg: scale(20),                  // Para tablets landscape
    xl: scale(24),                  // Para desktop
    
    // Container max widths
    containerXS: scale(320),        // Container mínimo
    containerSM: scale(480),        // Container pequeño
    containerMD: scale(768),        // Container mediano
    containerLG: scale(1024),       // Container grande
    containerXL: scale(1200),       // Container máximo
  },
  
  // ===== ANIMATION SPACING =====
  animation: {
    // Spacing que funciona bien con animaciones
    slideDistance: scale(20),       // Distancia para slide animations
    fadeOffset: scale(8),           // Offset para fade animations
    scaleOffset: scale(4),          // Offset para scale animations
    rippleRadius: scale(40),        // Radio para ripple effects
    
    // Durations que complementan el spacing
    microDuration: 150,             // Para micro interactions
    fastDuration: 200,              // Para transitions rápidas
    normalDuration: 300,            // Para transitions normales
    slowDuration: 500,              // Para transitions complejas
    dramaticDuration: 800,          // Para efectos dramáticos
  },
};

// 🎛️ HELPERS PREMIUM AVANZADOS
export const spacingHelpers = {
  // Crear spacing con ratio custom
  createScale: (baseUnit: number, ratio: number = PREMIUM_RATIO) => {
    const scaleArray = [];
    for (let i = 0; i < 10; i++) {
      scaleArray.push(scale(Math.round(baseUnit * Math.pow(ratio, i))));
    }
    return scaleArray;
  },
  
  // Spacing responsivo inteligente
  responsive: (baseSpacing: number) => ({
    xs: scale(baseSpacing * 0.75),
    sm: scale(baseSpacing * 0.875),
    md: scale(baseSpacing),
    lg: scale(baseSpacing * 1.125),
    xl: scale(baseSpacing * 1.25),
  }),
  
  // Crear padding simétrico
  symmetricPadding: (vertical: number, horizontal: number) => ({
    paddingVertical: scale(vertical),
    paddingHorizontal: scale(horizontal),
  }),
  
  // Crear margin simétrico
  symmetricMargin: (vertical: number, horizontal: number) => ({
    marginVertical: scale(vertical),
    marginHorizontal: scale(horizontal),
  }),
  
  // Spacing para diferentes densidades de contenido
  contentDensity: {
    compact: {
      padding: scale(8),
      margin: scale(4),
      itemSpacing: scale(6),
    },
    comfortable: {
      padding: scale(16),
      margin: scale(12),
      itemSpacing: scale(12),
    },
    spacious: {
      padding: scale(24),
      margin: scale(20),
      itemSpacing: scale(20),
    },
  },
  
  // Safe area helpers
  safeArea: {
    top: Platform.select({ ios: scale(44), android: scale(24), default: 0 }),
    bottom: Platform.select({ ios: scale(34), android: 0, default: 0 }),
    horizontal: scale(20),
  },
  
  // Context-aware spacing
  contextual: {
    onboarding: {
      stepSpacing: scale(32),
      contentPadding: scale(24),
      buttonSpacing: scale(20),
    },
    
    profile: {
      sectionSpacing: scale(24),
      fieldSpacing: scale(16),
      groupSpacing: scale(32),
    },
    
    checkout: {
      stepSpacing: scale(28),
      fieldSpacing: scale(12),
      summarySpacing: scale(20),
    },
    
    dashboard: {
      cardSpacing: scale(16),
      widgetSpacing: scale(12),
      sectionSpacing: scale(28),
    },
  },
};

// 🎨 PRESETS TEMÁTICOS PREMIUM
export const spacingPresets = {
  beauty: {
    cardPadding: spacing.aesthetic.breathingMedium,
    itemSpacing: spacing.aesthetic.goldenMedium,
    sectionSpacing: spacing.aesthetic.breathingLarge,
  },
  
  wellness: {
    cardPadding: spacing.aesthetic.breathingLarge,
    itemSpacing: spacing.aesthetic.breathingSmall,
    sectionSpacing: spacing.aesthetic.breathingXL,
  },
  
  luxury: {
    cardPadding: spacing.aesthetic.breathingLarge,
    itemSpacing: spacing.aesthetic.goldenLarge,
    sectionSpacing: spacing.aesthetic.breathingJumbo,
  },
  
  minimal: {
    cardPadding: spacing.md,
    itemSpacing: spacing.sm,
    sectionSpacing: spacing.xl,
  },
};

// 📏 MEASUREMENT UTILITIES
export const measurements = {
  // Screen dimensions
  screenWidth: width,
  screenHeight: height,
  isSmallScreen: width < 375,
  isMediumScreen: width >= 375 && width < 414,
  isLargeScreen: width >= 414,
  isTablet: width >= 768,
  
  // Calculated dimensions
  contentWidth: width - (spacing.layout.screenPadding * 2),
  halfScreen: width / 2,
  thirdScreen: width / 3,
  quarterScreen: width / 4,
  
  // Common ratios
  goldenWidth: Math.round(width / GOLDEN_RATIO),
  goldenHeight: Math.round(height / GOLDEN_RATIO),
  
  // Safe zone calculations
  safeContentHeight: height - spacingHelpers.safeArea.top - spacingHelpers.safeArea.bottom,
  safeContentWidth: width - (spacingHelpers.safeArea.horizontal * 2),
};

// ✅ VERIFICACIÓN PREMIUM
if (__DEV__) {
  console.log('📐✨ PREMIUM SPACING LOADED');
  console.log('📱 Device info:', {
    width,
    height,
    scaleFactor: SCALE_FACTOR,
    isTablet: measurements.isTablet,
  });
  console.log('🎯 Base spacing scale:', {
    micro: spacing.micro,
    base: spacing.base,
    xl: spacing.xl,
    jumbo: spacing.jumbo,
  });
  console.log('🎨 Aesthetic spacing:', {
    golden: spacing.aesthetic.goldenMedium,
    breathing: spacing.aesthetic.breathingMedium,
  });
  console.log('📏 Component sizes:', {
    touchTarget: spacing.component.touchTarget,
    avatarMD: spacing.component.avatarMD,
    radiusLG: spacing.component.radiusLG,
  });
}

// ✅ EXPORTS PREMIUM
export default spacing;

export const {
  layout: layoutSpacing,
  component: componentSpacing,
  aesthetic: aestheticSpacing,
  grid: gridSpacing,
  animation: animationSpacing,
} = spacing;

// ✅ TYPES PREMIUM
export type SpacingConfig = typeof spacing;
export type LayoutSpacing = typeof spacing.layout;
export type ComponentSpacing = typeof spacing.component;
export type AestheticSpacing = typeof spacing.aesthetic;
export type GridSpacing = typeof spacing.grid;
export type SpacingPreset = keyof typeof spacingPresets;
export type ContentDensity = keyof typeof spacingHelpers.contentDensity;