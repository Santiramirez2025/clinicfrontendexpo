// ============================================================================
// styles/spacing.premium.ts - SISTEMA DE SPACING PREMIUM CON GOLDEN RATIO
// ============================================================================

import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * 🌟 FILOSOFÍA DE SPACING
 * Basado en Golden Ratio (1.618) para proporciones armónicas
 * Sistema de 8pt grid para consistencia pixel-perfect
 * Responsive scaling que mantiene proporción visual
 * Inspirado en espacios de spa y diseño de lujo
 */

// ============================================================================
// 📱 CONSTANTES MATEMÁTICAS
// ============================================================================
const GOLDEN_RATIO = 1.618;
const BASE_UNIT = 8;                    // 8pt grid system
const SPA_FACTOR = 1.2;                 // Factor "spa" para más breathing room

// ============================================================================
// 📐 RESPONSIVE SCALING INTELIGENTE
// ============================================================================
const getSpacingScale = (): number => {
  // Compact devices (iPhone SE, mini)
  if (screenWidth <= 375) return 0.85;
  
  // Standard devices (iPhone 12/13/14)
  if (screenWidth <= 390) return 0.9;
  
  // Large devices (iPhone Pro)
  if (screenWidth <= 414) return 1.0;
  
  // Extra large devices (iPhone Pro Max)
  if (screenWidth <= 428) return 1.05;
  
  // Tablet landscape
  if (screenWidth >= 480) return 1.15;
  
  return 1.0; // Default fallback
};

const SPACING_SCALE = getSpacingScale();

// Función para escalar valores manteniendo grid de 8pt
const scaleSpace = (value: number): number => {
  const scaled = value * SPACING_SCALE;
  return Math.round(scaled / BASE_UNIT) * BASE_UNIT; // Mantener grid
};

// ============================================================================
// 🎯 ESCALA BASE PREMIUM (Golden Ratio Based)
// ============================================================================
const createSpacingScale = () => {
  const base = BASE_UNIT; // 8px
  
  return {
    none: 0,
    micro: scaleSpace(2),                              // 2px
    xxs: scaleSpace(4),                                // 4px
    xs: scaleSpace(base),                              // 8px
    sm: scaleSpace(base * 1.5),                        // 12px
    md: scaleSpace(base * 2),                          // 16px
    lg: scaleSpace(base * 3),                          // 24px
    xl: scaleSpace(base * 4),                          // 32px
    '2xl': scaleSpace(base * 6),                       // 48px
    '3xl': scaleSpace(base * 8),                       // 64px
    '4xl': scaleSpace(base * 12),                      // 96px
    '5xl': scaleSpace(base * 16),                      // 128px
    
    // Golden ratio variations
    golden: scaleSpace(base * GOLDEN_RATIO),           // ~13px
    goldenLg: scaleSpace(base * GOLDEN_RATIO * 2),     // ~26px
    goldenXl: scaleSpace(base * GOLDEN_RATIO * 3),     // ~39px
    
    // Spa-inspired (extra breathing room)
    spa: scaleSpace(base * SPA_FACTOR),                // ~10px
    spaLg: scaleSpace(base * SPA_FACTOR * 3),          // ~29px
    spaXl: scaleSpace(base * SPA_FACTOR * 5),          // ~48px
  };
};

// ============================================================================
// 🏗️ SPACING PREMIUM PRINCIPAL
// ============================================================================
export const premiumSpacing = createSpacingScale();

// ============================================================================
// 📱 LAYOUT CONTEXTUAL PREMIUM
// ============================================================================
export const premiumLayout = {
  // === SCREEN LEVEL ===
  screen: {
    paddingHorizontal: premiumSpacing.lg,             // 24px - Padding lateral estándar
    paddingVertical: premiumSpacing.xl,               // 32px - Padding vertical estándar
    paddingTop: premiumSpacing['2xl'],                // 48px - Top safe area
    paddingBottom: premiumSpacing.xl,                 // 32px - Bottom safe area
  },

  // === SECTION LEVEL ===
  section: {
    marginBottom: premiumSpacing.goldenXl,            // ~39px - Entre secciones
    paddingHorizontal: premiumSpacing.lg,             // 24px - Padding interno
    paddingVertical: premiumSpacing.xl,               // 32px - Padding vertical
    headerMargin: premiumSpacing.goldenLg,            // ~26px - Header spacing
  },

  // === CONTAINER LEVEL ===
  container: {
    maxWidth: 428,                                    // Max width para legibilidad
    centerMargin: 'auto',
    paddingHorizontal: premiumSpacing.md,             // 16px - Padding mínimo
  },

  // === SAFE AREAS ===
  safeArea: {
    top: Platform.select({
      ios: premiumSpacing['2xl'],                     // 48px
      android: premiumSpacing.xl,                     // 32px
    }),
    bottom: Platform.select({
      ios: premiumSpacing.xl,                         // 32px
      android: premiumSpacing.lg,                     // 24px
    }),
    horizontal: premiumSpacing.lg,                    // 24px
  },

  // === FLOATING ELEMENTS ===
  floating: {
    fab: {
      bottom: premiumSpacing.spaXl,                   // ~48px - FAB from bottom
      right: premiumSpacing.lg,                       // 24px - FAB from right
    },
    modal: {
      margin: premiumSpacing.lg,                      // 24px - Modal margins
      padding: premiumSpacing.xl,                     // 32px - Modal padding
    },
    toast: {
      margin: premiumSpacing.md,                      // 16px - Toast margins
      padding: premiumSpacing.md,                     // 16px - Toast padding
    },
  },
} as const;

// ============================================================================
// 🎨 COMPONENT SPACING PREMIUM
// ============================================================================
export const premiumComponents = {
  // === BUTTONS ===
  button: {
    paddingHorizontal: premiumSpacing.goldenLg,      // ~26px - Horizontal button padding
    paddingVertical: premiumSpacing.golden,          // ~13px - Vertical button padding
    marginVertical: premiumSpacing.sm,               // 12px - Between buttons
    borderRadius: premiumSpacing.sm,                 // 12px - Button radius
    minHeight: scaleSpace(48),                       // Minimum touch target
    
    // Size variants
    small: {
      paddingHorizontal: premiumSpacing.md,          // 16px
      paddingVertical: premiumSpacing.xs,            // 8px
      borderRadius: premiumSpacing.xs,               // 8px
      minHeight: scaleSpace(36),
    },
    large: {
      paddingHorizontal: premiumSpacing['2xl'],      // 48px
      paddingVertical: premiumSpacing.md,            // 16px
      borderRadius: premiumSpacing.md,               // 16px
      minHeight: scaleSpace(56),
    },
  },

  // === CARDS ===
  card: {
    padding: premiumSpacing.goldenLg,                // ~26px - Card padding
    margin: premiumSpacing.md,                       // 16px - Card margins
    borderRadius: premiumSpacing.md,                 // 16px - Card radius
    gap: premiumSpacing.md,                          // 16px - Content gap
    
    // Card variants
    compact: {
      padding: premiumSpacing.md,                    // 16px
      borderRadius: premiumSpacing.sm,               // 12px
    },
    spacious: {
      padding: premiumSpacing.xl,                    // 32px
      borderRadius: premiumSpacing.lg,               // 24px
    },
    vip: {
      padding: premiumSpacing.spaLg,                 // ~29px - VIP luxury spacing
      borderRadius: premiumSpacing.goldenLg,         // ~26px
      margin: premiumSpacing.goldenLg,               // ~26px
    },
  },

  // === INPUTS ===
  input: {
    paddingHorizontal: premiumSpacing.md,            // 16px
    paddingVertical: premiumSpacing.golden,          // ~13px
    marginVertical: premiumSpacing.sm,               // 12px
    borderRadius: premiumSpacing.sm,                 // 12px
    minHeight: scaleSpace(48),                       // Touch target
    
    // Label spacing
    labelMargin: premiumSpacing.xs,                  // 8px - Label to input
    helperMargin: premiumSpacing.xxs,                // 4px - Input to helper
  },

  // === LISTS ===
  list: {
    itemPadding: premiumSpacing.md,                  // 16px - List item padding
    itemMargin: premiumSpacing.xxs,                  // 4px - Between items
    sectionSpacing: premiumSpacing.lg,               // 24px - Between sections
    headerPadding: premiumSpacing.sm,                // 12px - Section header padding
  },

  // === NAVIGATION ===
  navigation: {
    tabBar: {
      height: scaleSpace(84),                        // Tab bar height
      paddingHorizontal: premiumSpacing.lg,          // 24px
      paddingVertical: premiumSpacing.sm,            // 12px
    },
    header: {
      height: scaleSpace(64),                        // Header height
      paddingHorizontal: premiumSpacing.md,          // 16px
      titleMargin: premiumSpacing.sm,                // 12px
    },
  },

  // === ICONS & AVATARS ===
  icon: {
    small: scaleSpace(16),                           // Small icon size
    medium: scaleSpace(24),                          // Medium icon size
    large: scaleSpace(32),                           // Large icon size
    xlarge: scaleSpace(48),                          // Extra large icon size
    
    // Spacing around icons
    margin: premiumSpacing.xs,                       // 8px
    padding: premiumSpacing.xs,                      // 8px
  },
  
  avatar: {
    small: scaleSpace(32),                           // Small avatar
    medium: scaleSpace(48),                          // Medium avatar
    large: scaleSpace(64),                           // Large avatar
    xlarge: scaleSpace(96),                          // Extra large avatar
    
    // Avatar spacing
    margin: premiumSpacing.sm,                       // 12px
    borderWidth: scaleSpace(2),                      // 2px border
  },

  // === BADGES & CHIPS ===
  badge: {
    paddingHorizontal: premiumSpacing.xs,            // 8px
    paddingVertical: premiumSpacing.xxs,             // 4px
    borderRadius: premiumSpacing['2xl'],             // 48px (pill)
    minWidth: scaleSpace(24),                        // Minimum badge size
    
    // Spacing around badges
    margin: premiumSpacing.xxs,                      // 4px
  },

  chip: {
    paddingHorizontal: premiumSpacing.sm,            // 12px
    paddingVertical: premiumSpacing.xs,              // 8px
    borderRadius: premiumSpacing.lg,                 // 24px
    margin: premiumSpacing.xxs,                      // 4px
    gap: premiumSpacing.xs,                          // 8px between icon and text
  },

  // === BORDERS & DIVIDERS ===
  border: {
    thin: 1,                                         // Thin border
    medium: 2,                                       // Medium border
    thick: 4,                                        // Thick border
    vip: 3,                                          // VIP border (special)
  },

  divider: {
    thickness: 1,                                    // Divider thickness
    margin: premiumSpacing.lg,                       // 24px around dividers
  },
} as const;

// ============================================================================
// 🌟 AESTHETIC SPACING (Spa-inspired)
// ============================================================================
export const premiumAesthetic = {
  // === BREATHING ROOM ===
  breathe: {
    micro: premiumSpacing.xxs,                       // 4px - Minimal breathing
    small: premiumSpacing.sm,                        // 12px - Small breathing
    medium: premiumSpacing.spaLg,                    // ~29px - Medium breathing
    large: premiumSpacing.spaXl,                     // ~48px - Large breathing
    hero: premiumSpacing['4xl'],                     // 96px - Hero breathing
  },

  // === WELLNESS SPECIFIC ===
  wellness: {
    sectionGap: premiumSpacing.goldenXl,             // ~39px - Between wellness sections
    contentPadding: premiumSpacing.spaLg,            // ~29px - Wellness content padding
    cardSpacing: premiumSpacing.goldenLg,            // ~26px - Wellness card spacing
  },

  // === VIP LUXURY ===
  vip: {
    cardPadding: premiumSpacing.spaXl,               // ~48px - VIP card padding
    sectionSpacing: premiumSpacing['3xl'],           // 64px - VIP section spacing
    contentMargin: premiumSpacing.goldenXl,          // ~39px - VIP content margins
  },

  // === MINIMALIST ===
  minimal: {
    gap: premiumSpacing.golden,                      // ~13px - Minimal consistent gap
    padding: premiumSpacing.lg,                      // 24px - Clean padding
    margin: premiumSpacing.xl,                       // 32px - Clean margins
  },
} as const;

// ============================================================================
// 🛠️ SPACING UTILITIES
// ============================================================================
export const premiumSpacingUtils = {
  // === RESPONSIVE HELPERS ===
  responsive: {
    // Get spacing based on screen size
    getSpacing: (spacingKey: keyof typeof premiumSpacing): number => {
      return premiumSpacing[spacingKey];
    },

    // Scale any value responsively
    scale: (value: number): number => {
      return scaleSpace(value);
    },

    // Get optimal spacing for touch targets
    getTouchTarget: (): number => {
      return scaleSpace(44); // iOS HIG minimum
    },
  },

  // === MATHEMATICAL HELPERS ===
  golden: {
    // Create golden ratio spacing
    create: (base: number): number => {
      return scaleSpace(base * GOLDEN_RATIO);
    },

    // Get harmonious spacing sequence
    sequence: (base: number, steps: number): number[] => {
      return Array.from({ length: steps }, (_, i) => 
        scaleSpace(base * Math.pow(GOLDEN_RATIO, i))
      );
    },
  },

  // === GRID HELPERS ===
  grid: {
    // Snap to 8pt grid
    snap: (value: number): number => {
      return Math.round(value / BASE_UNIT) * BASE_UNIT;
    },

    // Check if value is on grid
    isOnGrid: (value: number): boolean => {
      return value % BASE_UNIT === 0;
    },

    // Get nearest grid value
    nearest: (value: number): number => {
      return Math.round(value / BASE_UNIT) * BASE_UNIT;
    },
  },

  // === CONTEXTUAL SPACING ===
  contextual: {
    // Get spacing for component size
    forComponent: (component: 'button' | 'card' | 'input', size: 'small' | 'medium' | 'large' = 'medium') => {
      const sizeMaps = {
        button: {
          small: { horizontal: premiumSpacing.md, vertical: premiumSpacing.xs },
          medium: { horizontal: premiumSpacing.goldenLg, vertical: premiumSpacing.golden },
          large: { horizontal: premiumSpacing['2xl'], vertical: premiumSpacing.md },
        },
        card: {
          small: { padding: premiumSpacing.md },
          medium: { padding: premiumSpacing.goldenLg },
          large: { padding: premiumSpacing.xl },
        },
        input: {
          small: { horizontal: premiumSpacing.sm, vertical: premiumSpacing.xs },
          medium: { horizontal: premiumSpacing.md, vertical: premiumSpacing.golden },
          large: { horizontal: premiumSpacing.lg, vertical: premiumSpacing.md },
        },
      };
      
      return sizeMaps[component][size];
    },

    // Get themed spacing
    forTheme: (theme: 'minimal' | 'wellness' | 'vip' | 'standard' = 'standard') => {
      const themes = {
        minimal: premiumAesthetic.minimal,
        wellness: premiumAesthetic.wellness,
        vip: premiumAesthetic.vip,
        standard: { 
          gap: premiumSpacing.md, 
          padding: premiumSpacing.lg, 
          margin: premiumSpacing.md 
        },
      };
      
      return themes[theme];
    },
  },
} as const;

// ============================================================================
// 🔧 DEVELOPMENT & DEBUGGING
// ============================================================================
if (__DEV__) {
  console.log('📐 PREMIUM SPACING SYSTEM LOADED');
  console.log('🌟 Golden ratio factor:', GOLDEN_RATIO);
  console.log('📱 Spacing scale factor:', SPACING_SCALE);
  console.log('📏 Base unit (8pt grid):', BASE_UNIT);
  console.log('🎯 Spa factor:', SPA_FACTOR);
  
  // Log sample spacing values
  console.log('Sample spacing values:', {
    xs: premiumSpacing.xs,
    md: premiumSpacing.md,
    lg: premiumSpacing.lg,
    golden: premiumSpacing.golden,
    spa: premiumSpacing.spa,
  });

  // Verify 8pt grid compliance
  const testValues = [premiumSpacing.xs, premiumSpacing.md, premiumSpacing.lg];
  const gridCompliance = testValues.every(val => val % BASE_UNIT === 0);
  console.log('✅ 8pt grid compliance:', gridCompliance);
}

// ============================================================================
// 🌟 EXPORTS
// ============================================================================
export default premiumSpacing;

// Individual exports

// ============================================================================
// 🔤 TYPESCRIPT TYPES
// ============================================================================
export type SpacingKey = keyof typeof premiumSpacing;
export type SpacingValue = typeof premiumSpacing[SpacingKey];
export type ComponentSize = 'small' | 'medium' | 'large';
export type SpacingTheme = 'minimal' | 'wellness' | 'vip'
// Exportar todo de una vez
export {
  premiumLayout,
  premiumComponents,
  premiumAesthetic,
  premiumSpacingUtils,
};
