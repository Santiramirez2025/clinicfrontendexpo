// ============================================================================
// src/styles/colors.ts - FIX CRÍTICO PARA ERROR border undefined 🔧
// ============================================================================

// 🌟 PALETA PREMIUM CORREGIDA
const premiumColorsDefinition = {
    // ===== PALETA PRINCIPAL PREMIUM =====
    primary: "#2C2C54",         // Deep navy - sofisticado y elegante
    secondary: "#FFF8F0",       // Warm ivory - lujo sutil
    accent: "#E8B4CB",          // Rose gold - feminino premium
    accentSecondary: "#D4AF37", // Champagne gold - lujo absoluto
  
    // ===== FONDOS ESTÉTICOS PREMIUM =====
    background: "#FDFCF8",          // Warm white - acogedor
    backgroundWarm: "#FFF5F0",      // Peach whisper - cálido premium
    backgroundCool: "#F8FAFC",      // Cool white - elegancia
    backgroundNeutral: "#FAFAFA",   // Pure neutral - minimalista
    surface: "#FFFFFF",             // Pure white - clean
    surfaceElevated: "#FFFFFF",     // Elevated white - depth
    surfaceOverlay: "#FFFFFF",      // Overlay surface
    surfacePressed: "#F5F5F5",      // Pressed state
  
    // ===== TEXTO JERÁRQUICO PREMIUM =====
    textPrimary: "#1A1A1A",         // Deep charcoal - máxima legibilidad
    textSecondary: "#6B6B6B",       // Medium gray - contenido secundario
    textTertiary: "#9CA3AF",        // Light gray - hints y labels
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
    },
    
    premium: {
      primary: "#8B5CF6",      // Premium purple
      secondary: "#EDE9FE",    // Purple light
      tertiary: "#F3F0FF",     // Purple whisper
      accent: "#7C3AED",       // Deep purple
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
  
    // 🔧 FIX: ALIASES CRÍTICOS PARA BACKWARD COMPATIBILITY (SIN DUPLICADOS)
    text: "#1A1A1A",           // Alias para textPrimary
    disabled: "#D1D5DB",       // Alias para textDisabled
    placeholder: "#9CA3AF",    // Alias para textPlaceholder
    charcoal: "#1A1A1A",       // Alias para textPrimary
  } as const;
  
  // ✅ SISTEMA DE VERIFICACIÓN PREMIUM CORREGIDO
  const createPremiumColors = () => {
    try {
      // Verificar colores críticos premium + border
      const criticalColors = [
        'primary', 'secondary', 'accent', 'background', 
        'backgroundWarm', 'surface', 'textPrimary', 'error',
        'success', 'beauty', 'wellness', 'luxury', 'border' // 🚨 CRÍTICO!
      ];
  
      const verification = criticalColors.every(color => 
        color in premiumColorsDefinition
      );
  
      if (!verification) {
        console.error('❌ CRITICAL: Premium colors definition incomplete');
        
        // Log specific missing colors
        criticalColors.forEach(color => {
          if (!(color in premiumColorsDefinition)) {
            console.error(`❌ MISSING COLOR: ${color}`);
          }
        });
        
        throw new Error('Premium colors definition incomplete');
      }
  
      if (__DEV__) {
        console.log('🎨✨ PREMIUM COLORS LOADED:', Object.keys(premiumColorsDefinition).length, 'color definitions');
        console.log('✅ CRITICAL VERIFICATION PASSED');
        console.log('✅ border verified:', premiumColorsDefinition.border);
        console.log('💎 Beauty palette verified:', premiumColorsDefinition.beauty);
        console.log('🌿 Wellness palette verified:', premiumColorsDefinition.wellness);
        console.log('👑 Luxury palette verified:', premiumColorsDefinition.luxury);
      }
  
      return premiumColorsDefinition;
    } catch (error) {
      console.error('❌ Premium colors loading error:', error);
      
      // 🚨 FALLBACK PREMIUM MÍNIMO CON TODOS LOS CAMPOS CRÍTICOS
      return {
        primary: "#2C2C54",
        secondary: "#FFF8F0",
        accent: "#E8B4CB",
        background: "#FDFCF8",
        backgroundWarm: "#FFF5F0",
        surface: "#FFFFFF",
        textPrimary: "#1A1A1A",
        textSecondary: "#6B6B6B",
        error: "#EF4444",
        success: "#10B981",
        
        // 🚨 CRÍTICO: BORDER FIELDS
        border: "#E5E7EB",           // 🔧 FIX principal
        borderLight: "#F3F4F6",
        borderMedium: "#D1D5DB",
        borderDark: "#9CA3AF",
        
        // Palettes mínimas
        beauty: { primary: "#E8B4CB", secondary: "#F4E4EC", tertiary: "#FBEEF2" },
        wellness: { primary: "#9FD8CB", secondary: "#E8F5F1", tertiary: "#F0FAF7" },
        luxury: { primary: "#D4AF37", secondary: "#F4E4BC", tertiary: "#FAF0D7" },
        
        shadow: "#000000",
        
        // Aliases críticos
        text: "#1A1A1A",
        disabled: "#D1D5DB",
        placeholder: "#9CA3AF",
        charcoal: "#1A1A1A",
        
        interactive: {
          hover: "#F9FAFB",
          pressed: "#F3F4F6",
          focus: "#FEF3C7",
          disabled: "#F9FAFB",
          loading: "#F3F4F6",
        },
        
        gradients: {
          beauty: ["#E8B4CB", "#F4E4EC"],
          wellness: ["#9FD8CB", "#E8F5F1"],
          luxury: ["#D4AF37", "#F4E4BC"],
          premium: ["#8B5CF6", "#EDE9FE"],
        },
      } as any;
    }
  };
  
  // ✅ CREAR COLORES PREMIUM SEGUROS
  export const colors = createPremiumColors();
  
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
    
    // Fondos temáticos premium
    backgroundCool: colors.backgroundCool,
    backgroundNeutral: colors.backgroundNeutral,
  } as const;
  
  // ✅ HELPER SEGURO PARA BORDER
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
  
  // ✅ HELPERS PREMIUM CORREGIDOS
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
  
  // ✅ HELPER ESPECÍFICO PARA PALETAS
  export const getColorPalette = (palette: 'beauty' | 'wellness' | 'luxury' | 'premium') => {
    return colors[palette] || colors.beauty;
  };
  
  // ✅ HELPER PARA GRADIENTES
  export const getGradient = (gradientName: keyof typeof colors.gradients) => {
    return colors.gradients[gradientName] || colors.gradients.beauty;
  };
  
  // ✅ HELPER PARA ESTADOS INTERACTIVOS
  export const getInteractiveColor = (state: keyof typeof colors.interactive) => {
    return colors.interactive[state] || colors.interactive.hover;
  };
  
  // ✅ HELPER PARA OPACIDAD PREMIUM
  export const withOpacity = (color: string, opacity: number): string => {
    // Remover # si existe
    const hex = color.replace('#', '');
    
    // Convertir opacity a hex (0-1 → 00-FF)
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    
    return `#${hex}${alpha}`;
  };
  
  // ✅ HELPER PARA CONTRASTE AUTOMÁTICO
  export const getContrastColor = (backgroundColor: string): string => {
    // Simple contrast detection
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular luminancia
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? colors.textPrimary : colors.textInverse;
  };
  
  // ✅ VERIFICACIÓN CRÍTICA EN DESARROLLO
  if (__DEV__) {
    // Test específico de border
    console.log('🔧 BORDER VERIFICATION:');
    console.log('border:', colors.border);
    console.log('borderLight:', colors.borderLight);
    console.log('borderMedium:', colors.borderMedium);
    
    if (!colors.border) {
      console.error('🚨 CRITICAL ERROR: colors.border is still undefined!');
      console.error('Available colors:', Object.keys(colors));
    } else {
      console.log('✅ BORDER FIX SUCCESSFUL');
    }
    
    // Test de acceso a paletas
    console.log('🎨 PREMIUM PALETTES TEST:');
    console.log('💄 Beauty:', colors.beauty);
    console.log('🌿 Wellness:', colors.wellness);
    console.log('👑 Luxury:', colors.luxury);
    
    // Test de helpers
    console.log('🔧 HELPERS TEST:');
    console.log('getBorder default:', getBorder());
    console.log('getBorder light:', getBorder('light'));
  }
  
  // ✅ EXPORTS FINALES PREMIUM CORREGIDOS
  export default colors;
  
  // ✅ TYPES PREMIUM
  export type ColorKeys = keyof typeof colors;
  export type ModernColorKeys = keyof typeof modernColors;
  export type PaletteKeys = 'beauty' | 'wellness' | 'luxury' | 'premium';
  export type GradientKeys = keyof typeof colors.gradients;
  export type InteractiveStateKeys = keyof typeof colors.interactive;
  export type SemanticColorKeys = keyof typeof colors.semantic;
  export type BorderType = 'default' | 'light' | 'medium' | 'dark' | 'accent' | 'focus';