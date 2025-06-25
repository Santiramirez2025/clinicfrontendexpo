// ============================================================================
// styles/index.premium.ts - SISTEMA PREMIUM COMPLETO
// ============================================================================

import { premiumColors, premiumGradients, premiumHelpers } from './colors.premium';
import { 
  premiumTypographyStyles, 
  premiumTypographyUtils,
  contextStyles,
  themedTypography,
  fontFamilies,
  premiumWeights,
  premiumLineHeights,
  responsiveSizes
} from './typography.premium';
import { 
  premiumSpacing, 
  premiumLayout, 
  premiumComponents, 
  premiumAesthetic,
  premiumSpacingUtils
} from './spacing.premium';
import {
  premiumShadows,
  premiumButtons,
  premiumCards,
  premiumInputs,
  premiumBadges,
  premiumChips,
  premiumLayouts,
  premiumSpecialized
} from './components.premium';

/**
 * 🌟 PREMIUM DESIGN SYSTEM
 * Sistema de diseño completo para app de clínicas estéticas
 * Inspirado en spas de lujo, apps de bienestar y diseño premium
 * Responsive, accesible y elegante
 */

// ============================================================================
// 🎨 THEME PREMIUM PRINCIPAL
// ============================================================================
export const premiumTheme = {
  // === IDENTIDAD VISUAL ===
  colors: premiumColors,
  gradients: premiumGradients,
  
  // === TIPOGRAFÍA ===
  typography: {
    families: fontFamilies,
    weights: premiumWeights,
    lineHeights: premiumLineHeights,
    sizes: responsiveSizes,
    styles: premiumTypographyStyles,
    context: contextStyles,
    themed: themedTypography,
    utils: premiumTypographyUtils,
  },
  
  // === ESPACIADO ===
  spacing: {
    scale: premiumSpacing,
    layout: premiumLayout,
    components: premiumComponents,
    aesthetic: premiumAesthetic,
    utils: premiumSpacingUtils,
  },
  
  // === COMPONENTES ===
  components: {
    shadows: premiumShadows,
    buttons: premiumButtons,
    cards: premiumCards,
    inputs: premiumInputs,
    badges: premiumBadges,
    chips: premiumChips,
    layouts: premiumLayouts,
    specialized: premiumSpecialized,
  },
  
  // === UTILITIES ===
  utils: {
    colors: premiumHelpers,
    typography: premiumTypographyUtils,
    spacing: premiumSpacingUtils,
  },
} as const;

// ============================================================================
// 🎯 VARIANTES TEMÁTICAS ESPECÍFICAS
// ============================================================================
export const themeVariants = {
  // === STANDARD THEME ===
  standard: {
    colors: {
      primary: premiumColors.brand.primary,
      secondary: premiumColors.brand.secondary,
      accent: premiumColors.brand.accent,
      background: premiumColors.background.primary,
      surface: premiumColors.surface.default,
      text: premiumColors.text.primary,
    },
    components: {
      button: premiumButtons.primary,
      card: premiumCards.base,
      input: premiumInputs.base,
    },
  },

  // === VIP LUXURY THEME ===
  vip: {
    colors: {
      primary: premiumColors.vip.accent,
      secondary: premiumColors.vip.background,
      accent: premiumColors.vip.border,
      background: premiumColors.vip.background,
      surface: premiumColors.surface.premium,
      text: premiumColors.vip.text,
    },
    components: {
      button: premiumButtons.vip,
      card: premiumCards.vip,
      input: premiumInputs.base, // Con override de colors
    },
    typography: themedTypography.vip,
    spacing: premiumAesthetic.vip,
  },

  // === WELLNESS THEME ===
  wellness: {
    colors: {
      primary: premiumColors.wellness.accent,
      secondary: premiumColors.wellness.background,
      accent: premiumColors.wellness.border,
      background: premiumColors.wellness.background,
      surface: premiumColors.wellness.surface,
      text: premiumColors.wellness.text,
    },
    components: {
      button: premiumButtons.wellness,
      card: premiumCards.wellness,
      input: premiumInputs.base,
    },
    typography: themedTypography.wellness,
    spacing: premiumAesthetic.wellness,
  },

  // === SERENITY THEME ===
  serenity: {
    colors: {
      primary: premiumColors.serenity.accent,
      secondary: premiumColors.serenity.background,
      accent: premiumColors.serenity.border,
      background: premiumColors.serenity.background,
      surface: premiumColors.serenity.surface,
      text: premiumColors.serenity.text,
    },
    components: {
      button: premiumButtons.serenity,
      card: premiumCards.serenity,
      input: premiumInputs.base,
    },
    typography: themedTypography.minimal, // Serenity usa tipografía minimal
    spacing: premiumAesthetic.minimal,
  },

  // === MINIMAL THEME ===
  minimal: {
    colors: {
      primary: premiumColors.gray[700],
      secondary: premiumColors.gray[100],
      accent: premiumColors.brand.accent,
      background: premiumColors.background.primary,
      surface: premiumColors.surface.elevated,
      text: premiumColors.text.primary,
    },
    components: {
      button: premiumButtons.ghost,
      card: premiumCards.minimal,
      input: premiumInputs.outlined,
    },
    typography: themedTypography.minimal,
    spacing: premiumAesthetic.minimal,
  },
} as const;

// ============================================================================
// 🎪 CONTEXT HELPERS PREMIUM
// ============================================================================
export const premiumContextHelpers = {
  // === OBTENER TEMA POR CONTEXTO ===
  getThemeForContext: (context: 'onboarding' | 'dashboard' | 'appointment' | 'vip' | 'profile') => {
    const contextThemes = {
      onboarding: themeVariants.serenity,    // Calmo y acogedor
      dashboard: themeVariants.standard,     // Profesional y claro
      appointment: themeVariants.wellness,   // Relajante y confiable
      vip: themeVariants.vip,               // Lujoso y exclusivo
      profile: themeVariants.minimal,       // Limpio y personal
    };
    
    return contextThemes[context];
  },

  // === OBTENER COLORES POR ESTADO EMOCIONAL ===
  getEmotionalColors: (emotion: 'calm' | 'energetic' | 'luxurious' | 'trustworthy' | 'playful') => {
    const emotionalPalettes = {
      calm: {
        primary: premiumColors.serenity.accent,
        background: premiumColors.serenity.background,
        accent: premiumColors.wellness.accent,
      },
      energetic: {
        primary: premiumColors.brand.accent,
        background: premiumColors.background.warm,
        accent: premiumColors.brand.primary,
      },
      luxurious: {
        primary: premiumColors.vip.accent,
        background: premiumColors.vip.background,
        accent: premiumColors.vip.border,
      },
      trustworthy: {
        primary: premiumColors.wellness.accent,
        background: premiumColors.wellness.background,
        accent: premiumColors.serenity.accent,
      },
      playful: {
        primary: premiumColors.blush[400],
        background: premiumColors.blush[50],
        accent: premiumColors.luxury[400],
      },
    };
    
    return emotionalPalettes[emotion];
  },

  // === OBTENER SPACING POR DENSIDAD ===
  getSpacingByDensity: (density: 'compact' | 'comfortable' | 'spacious') => {
    const densitySpacing = {
      compact: {
        section: premiumSpacing.md,
        card: premiumSpacing.sm,
        item: premiumSpacing.xs,
      },
      comfortable: {
        section: premiumSpacing.lg,
        card: premiumSpacing.md,
        item: premiumSpacing.sm,
      },
      spacious: {
        section: premiumSpacing['2xl'],
        card: premiumSpacing.xl,
        item: premiumSpacing.lg,
      },
    };
    
    return densitySpacing[density];
  },

  // === CREAR COMPONENTE TEMÁTICO ===
  createThemedComponent: (baseStyle: any, theme: keyof typeof themeVariants) => {
    const themeConfig = themeVariants[theme];
    
    return {
      ...baseStyle,
      backgroundColor: themeConfig.colors.surface,
      borderColor: themeConfig.colors.accent,
      // Aplicar overrides específicos del tema
    };
  },
} as const;

// ============================================================================
// 🎨 PRESET COMBINATIONS PREMIUM
// ============================================================================
export const premiumPresets = {
  // === HERO SECTIONS ===
  heroWelcome: {
    colors: themeVariants.serenity.colors,
    typography: premiumTypographyStyles.displayLarge,
    spacing: premiumAesthetic.breathe.hero,
    components: {
      title: premiumTypographyStyles.displayLarge,
      subtitle: contextStyles.heroSubtitle,
      button: premiumButtons.accent,
    },
  },

  heroVip: {
    colors: themeVariants.vip.colors,
    typography: themedTypography.vip.display,
    spacing: premiumAesthetic.vip.sectionSpacing,
    components: {
      title: themedTypography.vip.display,
      subtitle: themedTypography.vip.body,
      button: premiumButtons.vip,
    },
  },

  // === CARD COLLECTIONS ===
  treatmentCards: {
    card: premiumCards.wellness,
    title: contextStyles.cardTitle,
    body: contextStyles.cardBody,
    spacing: premiumAesthetic.wellness.cardSpacing,
    shadow: premiumShadows.wellness,
  },

  vipBenefitCards: {
    card: premiumCards.vip,
    title: themedTypography.vip.title,
    body: themedTypography.vip.body,
    spacing: premiumAesthetic.vip.cardPadding,
    shadow: premiumShadows.vip,
  },

  // === FORM SECTIONS ===
  appointmentForm: {
    container: premiumLayouts.screenWarm,
    input: premiumInputs.base,
    button: premiumButtons.wellness,
    spacing: premiumAesthetic.wellness.contentPadding,
    typography: themedTypography.professional,
  },

  profileForm: {
    container: premiumLayouts.screen,
    input: premiumInputs.outlined,
    button: premiumButtons.primary,
    spacing: premiumAesthetic.minimal.padding,
    typography: themedTypography.minimal,
  },

  // === NAVIGATION PRESETS ===
  mainNavigation: {
    background: premiumColors.surface.elevated,
    active: premiumColors.brand.accent,
    inactive: premiumColors.text.tertiary,
    typography: contextStyles.tabLabel,
    spacing: premiumComponents.navigation.tabBar,
  },

  vipNavigation: {
    background: premiumColors.vip.background,
    active: premiumColors.vip.accent,
    inactive: premiumColors.vip.text,
    typography: themedTypography.vip.label,
    spacing: premiumComponents.navigation.tabBar,
  },
} as const;

// ============================================================================
// 🛠️ DESIGN TOKENS EXPORT
// ============================================================================
export const designTokens = {
  // === COLOR TOKENS ===
  color: {
    brand: {
      primary: premiumColors.brand.primary,
      secondary: premiumColors.brand.secondary,
      accent: premiumColors.brand.accent,
    },
    semantic: {
      success: premiumColors.semantic.success,
      warning: premiumColors.semantic.warning,
      error: premiumColors.semantic.error,
      info: premiumColors.semantic.info,
    },
    neutral: {
      0: premiumColors.background.primary,
      50: premiumColors.gray[50],
      100: premiumColors.gray[100],
      200: premiumColors.gray[200],
      300: premiumColors.gray[300],
      400: premiumColors.gray[400],
      500: premiumColors.gray[500],
      600: premiumColors.gray[600],
      700: premiumColors.gray[700],
      800: premiumColors.gray[800],
      900: premiumColors.gray[900],
    },
  },

  // === TYPOGRAPHY TOKENS ===
  typography: {
    fontFamily: {
      display: fontFamilies.display,
      text: fontFamilies.text,
      rounded: fontFamilies.rounded,
    },
    fontSize: responsiveSizes,
    fontWeight: premiumWeights,
    lineHeight: premiumLineHeights,
  },

  // === SPACING TOKENS ===
  spacing: premiumSpacing,

  // === BORDER RADIUS TOKENS ===
  borderRadius: {
    none: 0,
    sm: premiumComponents.border.thin,
    md: premiumSpacing.sm,
    lg: premiumSpacing.md,
    xl: premiumSpacing.lg,
    full: 9999,
  },

  // === SHADOW TOKENS ===
  shadow: {
    sm: premiumShadows.soft,
    md: premiumShadows.medium,
    lg: premiumShadows.strong,
    colored: premiumShadows.vip,
  },
} as const;

// ============================================================================
// 🔧 UTILITIES FINALES
// ============================================================================
export const premiumUtils = {
  // === RESPONSIVE HELPERS ===
  responsive: {
    getStyleForScreen: (screenSize: 'small' | 'medium' | 'large') => {
      const sizeMultipliers = {
        small: 0.85,
        medium: 1.0,
        large: 1.15,
      };
      
      return {
        fontSize: responsiveSizes.base * sizeMultipliers[screenSize],
        spacing: premiumSpacing.md * sizeMultipliers[screenSize],
      };
    },
  },

  // === ACCESSIBILITY HELPERS ===
  accessibility: {
    getContrastRatio: premiumHelpers.hasGoodContrast,
    getMinimumTouchTarget: () => premiumComponents.button.minHeight,
    getFocusStyle: () => ({
      borderWidth: 2,
      borderColor: premiumColors.brand.accent,
      ...premiumShadows.glow,
    }),
  },

  // === ANIMATION HELPERS ===
  animations: {
    timing: {
      fast: 200,
      normal: 300,
      slow: 500,
      vip: 800,
    },
    
    easing: {
      easeOut: 'ease-out',
      easeIn: 'ease-in',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },

  // === THEME SWITCHING ===
  theming: {
    switchTheme: (newTheme: keyof typeof themeVariants) => {
      return themeVariants[newTheme];
    },
    
    createCustomTheme: (overrides: Partial<typeof premiumTheme>) => {
      return {
        ...premiumTheme,
        ...overrides,
      };
    },
  },
} as const;

// ============================================================================
// 🔧 DEVELOPMENT HELPERS
// ============================================================================
if (__DEV__) {
  console.log('🌟 PREMIUM DESIGN SYSTEM LOADED');
  console.log('🎨 Theme variants available:', Object.keys(themeVariants).length);
  console.log('🛠️ Design tokens count:', Object.keys(designTokens).length);
  console.log('📦 Preset combinations:', Object.keys(premiumPresets).length);
  console.log('⚡ Utils available:', Object.keys(premiumUtils).length);
  
  // Validate critical paths
  const criticalCheck = {
    hasColors: !!premiumColors.brand.primary,
    hasTypography: !!premiumTypographyStyles.bodyLarge,
    hasSpacing: !!premiumSpacing.md,
    hasComponents: !!premiumButtons.primary,
  };
  
  const allCriticalPassed = Object.values(criticalCheck).every(Boolean);
  console.log('✅ Critical systems check:', allCriticalPassed ? 'PASSED' : 'FAILED');
  
  if (!allCriticalPassed) {
    console.error('❌ Critical check details:', criticalCheck);
  }
}

// ============================================================================
// 🌟 MAIN EXPORTS
// ============================================================================

// Default export - complete theme
export default premiumTheme;

// Named exports for flexibility

// Re-export individual systems




// ============================================================================
// 🔤 COMPREHENSIVE TYPESCRIPT TYPES
// ============================================================================
export type PremiumTheme = typeof premiumTheme;
export type ThemeVariant = keyof typeof themeVariants;
export type ContextTheme = Parameters<typeof premiumContextHelpers.getThemeForContext>[0];
export type EmotionalTheme = Parameters<typeof premiumContextHelpers.getEmotionalColors>[0];
export type SpacingDensity = Parameters<typeof premiumContextHelpers.getSpacingByDensity>[0];
export type PresetName = keyof typeof premiumPresets;
export type DesignToken = keyof typeof designTokens;

// Component system types
export type ComponentTheme = 'standard' | 'vip' | 'wellness' | 'serenity' | 'minimal';
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentState = 'idle' | 'hover' | 'pressed' | 'disabled' | 'loading' | 'focused';

// Utility types
export type ResponsiveSize = 'small' | 'medium' | 'large';
export type AnimationTiming = keyof typeof premiumUtils.animations.timing;
export type AnimationEasing = keyof typeof premiumUtils.animations.easing;
// Exportar todo de una vez
export {
  premiumTheme,
  themeVariants,
  premiumContextHelpers,
  premiumPresets,
  designTokens,
  premiumUtils,
};
