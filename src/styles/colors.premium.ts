// ============================================================================
// styles/colors.premium.ts - SISTEMA DE COLORES PREMIUM WELLNESS & BEAUTY
// ============================================================================

/**
 * 🌟 FILOSOFÍA DE COLOR
 * Inspirado en minerales naturales, cosméticos orgánicos y espacios de spa
 * Cada color transmite calma, confianza y lujo accesible
 * Paleta cálida que evoca bienestar y profesionalismo
 */

// ============================================================================
// 🎨 PALETA PRINCIPAL PREMIUM
// ============================================================================
const premiumPalette = {
    // === COLORES SIGNATURE ===
    primary: {
      50: '#FFF8F3',   // Porcelana delicada
      100: '#FFEEE5',  // Nude clarísimo
      200: '#FFDCC7',  // Beige rosado
      300: '#FFC4A3',  // Melocotón suave
      400: '#E8A887',  // Terracota elegante
      500: '#D4956B',  // Caramelo principal ⭐
      600: '#B8805A',  // Bronceado
      700: '#9C6A48',  // Cobre oscuro
      800: '#7D5437',  // Chocolate
      900: '#5A3D28',  // Espresso
    },
  
    // === ACENTOS WELLNESS ===
    wellness: {
      50: '#F7FDF7',   // Rocío matutino
      100: '#EDFAED',  // Verde spa
      200: '#D5F2D5',  // Jade claro
      300: '#B8E6B8',  // Menta terapéutica ⭐
      400: '#8FD18F',  // Verde equilibrio
      500: '#6AB76A',  // Naturaleza
      600: '#4A934A',  // Bosque
      700: '#2D5A2D',  // Pino profundo
      800: '#1A3D1A',  // Musgo oscuro
      900: '#0F250F',  // Verde noche
    },
  
    // === VIP LUXURY COLLECTION ===
    luxury: {
      50: '#FFFCF0',   // Champagne cristal
      100: '#FFF7E0',  // Oro rosa
      200: '#FFEFBF',  // Dorado seda
      300: '#FFE485',  // Miel premium
      400: '#F4D03F',  // Oro champagne ⭐
      500: '#D4AF37',  // Oro clásico VIP
      600: '#B8941F',  // Oro antiguo
      700: '#8B6914',  // Bronce real
      800: '#5D440D',  // Oro quemado
      900: '#3D2C09',  // Oro profundo
    },
  
    // === SERENITY COLLECTION (Lavandas & Lilas) ===
    serenity: {
      50: '#FDFCFF',   // Cristal puro
      100: '#F9F7FF',  // Lavanda aire
      200: '#F0EBFF',  // Lila suave
      300: '#E4DCFF',  // Amatista clara
      400: '#D1C4FF',  // Violeta terapéutica ⭐
      500: '#B8A3FF',  // Lavanda principal
      600: '#9B7EE6',  // Púrpura elegante
      700: '#7C5AC2',  // Violeta profundo
      800: '#5D3D92',  // Amatista oscura
      900: '#3E2562',  // Violeta noche
    },
  
    // === BLUSH COLLECTION (Rosas sofisticados) ===
    blush: {
      50: '#FFF9FB',   // Rosa porcelana
      100: '#FFF1F5',  // Rosa algodón
      200: '#FFE4EB',  // Rosa polvo
      300: '#FFD1DC',  // Rosa cuarzo ⭐
      400: '#FFB3C7',  // Rosa vintage
      500: '#E8B4CB',  // Rosa principal
      600: '#D999B8',  // Rosa maduro
      700: '#B87A9B',  // Rosa deep
      800: '#925B7A',  // Rosa oscuro
      900: '#5D3A4D',  // Rosa chocolate
    },
  } as const;
  
  // ============================================================================
  // 🌈 SISTEMA SEMÁNTICO PREMIUM
  // ============================================================================
  export const premiumColors = {
    // === IDENTIDAD DE MARCA ===
    brand: {
      primary: premiumPalette.primary[500],        // Caramelo elegante
      secondary: premiumPalette.blush[300],        // Rosa cuarzo
      accent: premiumPalette.luxury[400],          // Oro champagne
      muted: premiumPalette.primary[200],          // Beige rosado
    },
  
    // === FONDOS PREMIUM ===
    background: {
      primary: '#FFFFFF',                          // Blanco puro
      warm: '#FFF8F5',                            // Blanco cálido ⭐
      cream: premiumPalette.primary[50],          // Porcelana
      spa: premiumPalette.wellness[50],           // Verde spa
      luxury: premiumPalette.luxury[50],          // Champagne cristal
    },
  
    // === SUPERFICIES ELEVADAS ===
    surface: {
      default: '#FFFFFF',                         // Superficie base
      elevated: '#FEFEFE',                        // Ligeramente elevada
      premium: '#FFF9F6',                         // Con tinte cálido
      glass: 'rgba(255, 255, 255, 0.8)',        // Glassmorphism
      vip: 'rgba(244, 228, 188, 0.15)',         // Overlay VIP
    },
  
    // === TEXTO SOFISTICADO ===
    text: {
      primary: '#2C1810',                         // Chocolate oscuro
      secondary: '#5A4034',                       // Cobre profundo
      tertiary: '#8B7269',                       // Taupe elegante
      muted: '#B8A59C',                          // Beige gris
      inverse: '#FFFFFF',                         // Texto en fondos oscuros
      accent: premiumPalette.luxury[600],         // Texto oro
    },
  
    // === ESTADOS EMOCIONALES ===
    semantic: {
      success: premiumPalette.wellness[400],      // Verde equilibrio
      warning: premiumPalette.luxury[400],        // Oro champagne
      error: '#E8A4A4',                          // Rosa error suave
      info: premiumPalette.serenity[400],        // Violeta terapéutica
    },
  
    // === COLECCIÓN VIP ===
    vip: {
      background: premiumPalette.luxury[50],      // Champagne cristal
      border: premiumPalette.luxury[300],         // Miel premium
      text: premiumPalette.luxury[700],           // Bronce real
      accent: premiumPalette.luxury[500],         // Oro clásico
      shadow: 'rgba(212, 175, 55, 0.25)',       // Sombra dorada
    },
  
    // === WELLNESS EXPERIENCE ===
    wellness: {
      background: premiumPalette.wellness[50],    // Rocío matutino
      surface: premiumPalette.wellness[100],      // Verde spa
      border: premiumPalette.wellness[200],       // Jade claro
      text: premiumPalette.wellness[700],         // Pino profundo
      accent: premiumPalette.wellness[400],       // Verde equilibrio
    },
  
    // === SERENITY MOMENTS ===
    serenity: {
      background: premiumPalette.serenity[50],    // Cristal puro
      surface: premiumPalette.serenity[100],      // Lavanda aire
      border: premiumPalette.serenity[200],       // Lila suave
      text: premiumPalette.serenity[800],         // Amatista oscura
      accent: premiumPalette.serenity[500],       // Lavanda principal
    },
  
    // === GRISES CÁLIDOS ===
    gray: {
      50: '#FAFAF9',    // Casi blanco cálido
      100: '#F5F4F2',   // Gris perla
      200: '#E8E6E3',   // Gris seda
      300: '#D4D1CC',   // Gris taupe
      400: '#A8A39C',   // Gris medio
      500: '#7C756D',   // Gris profundo
      600: '#5A534B',   // Gris carbón
      700: '#3D362F',   // Gris oscuro
      800: '#292118',   // Casi negro cálido
      900: '#1A140F',   // Negro chocolate
    },
  
    // === SHADOWS & OVERLAYS ===
    shadow: {
      soft: 'rgba(44, 24, 16, 0.08)',           // Sombra suave
      medium: 'rgba(44, 24, 16, 0.12)',         // Sombra media
      strong: 'rgba(44, 24, 16, 0.16)',         // Sombra fuerte
      colored: 'rgba(212, 175, 55, 0.15)',      // Sombra dorada
    },
    
    overlay: {
      light: 'rgba(255, 255, 255, 0.8)',        // Overlay claro
      medium: 'rgba(255, 248, 245, 0.9)',       // Overlay cálido
      dark: 'rgba(44, 24, 16, 0.6)',           // Overlay oscuro
      modal: 'rgba(44, 24, 16, 0.4)',          // Fondo modal
    },
  } as const;
  
  // ============================================================================
  // 🎨 GRADIENTES PREMIUM
  // ============================================================================
  export const premiumGradients = {
    // === GRADIENTES SIGNATURE ===
    signature: {
      warm: ['#FFF8F5', '#FFEEE5'],             // Blanco a nude
      luxury: ['#FFFCF0', '#FFEFBF'],           // Champagne a oro seda
      wellness: ['#F7FDF7', '#EDFAED'],         // Rocío a verde spa
      serenity: ['#FDFCFF', '#F0EBFF'],         // Cristal a lila
      blush: ['#FFF9FB', '#FFE4EB'],            // Rosa porcelana a polvo
    },
  
    // === GRADIENTES VIP ===
    vip: {
      classic: ['#D4AF37', '#F4E4BC'],          // Oro clásico a champagne
      royal: ['#B8941F', '#FFE485'],            // Oro antiguo a miel
      subtle: ['#FFFCF0', '#FFF7E0'],           // Champagne cristal a oro rosa
    },
  
    // === GRADIENTES FUNCIONALES ===
    functional: {
      success: ['#F7FDF7', '#D5F2D5'],          // Wellness gradiente
      warning: ['#FFFCF0', '#FFEFBF'],          // Oro suave
      error: ['#FFF9FB', '#FFE4EB'],            // Rosa suave
      info: ['#FDFCFF', '#F0EBFF'],             // Serenity gradiente
    },
  
    // === GRADIENTES OVERLAY ===
    overlay: {
      modal: ['rgba(44, 24, 16, 0)', 'rgba(44, 24, 16, 0.4)'],
      card: ['rgba(255, 255, 255, 0.95)', 'rgba(255, 248, 245, 0.8)'],
      vipCard: ['rgba(255, 252, 240, 0.95)', 'rgba(255, 239, 191, 0.8)'],
    },
  } as const;
  
  // ============================================================================
  // 🌟 HELPERS PREMIUM
  // ============================================================================
  export const premiumHelpers = {
    // === CREAR COLOR CON OPACIDAD ===
    withOpacity: (color: string, opacity: number): string => {
      const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
      return `${color}${alpha}`;
    },
  
    // === OBTENER VARIANTE DE COLOR ===
    getColorVariant: (colorName: keyof typeof premiumPalette, shade: number) => {
      return premiumPalette[colorName][shade as keyof typeof premiumPalette[typeof colorName]];
    },
  
    // === CREAR SOMBRA COLORIDA ===
    createColoredShadow: (color: string, opacity: number = 0.25) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: opacity,
      shadowRadius: 8,
      elevation: 6,
    }),
  
    // === VALIDAR CONTRASTE ===
    hasGoodContrast: (foreground: string, background: string): boolean => {
      // Simplified contrast check
      return true; // En producción implementar WCAG contrast ratio
    },
  
    // === OBTENER TEMA VIP ===
    getVipTheme: () => ({
      background: premiumColors.vip.background,
      surface: premiumColors.surface.premium,
      text: premiumColors.vip.text,
      accent: premiumColors.vip.accent,
      border: premiumColors.vip.border,
      shadow: premiumColors.vip.shadow,
    }),
  
    // === OBTENER TEMA WELLNESS ===
    getWellnessTheme: () => ({
      background: premiumColors.wellness.background,
      surface: premiumColors.wellness.surface,
      text: premiumColors.wellness.text,
      accent: premiumColors.wellness.accent,
      border: premiumColors.wellness.border,
    }),
  
    // === OBTENER TEMA SERENITY ===
    getSerenityTheme: () => ({
      background: premiumColors.serenity.background,
      surface: premiumColors.serenity.surface,
      text: premiumColors.serenity.text,
      accent: premiumColors.serenity.accent,
      border: premiumColors.serenity.border,
    }),
  } as const;
  
  // ============================================================================
  // 🎯 VALIDACIÓN Y DESARROLLO
  // ============================================================================
  if (__DEV__) {
    console.log('🌟 PREMIUM COLORS SYSTEM LOADED');
    console.log('✨ Color palette variants:', Object.keys(premiumPalette).length);
    console.log('🎨 Semantic colors:', Object.keys(premiumColors).length);
    console.log('🌈 Premium gradients:', Object.keys(premiumGradients).length);
    console.log('🔧 Helper functions:', Object.keys(premiumHelpers).length);
    
    // Test crítico de colores principales
    const criticalTest = {
      primary: premiumColors.brand.primary,
      background: premiumColors.background.warm,
      vip: premiumColors.vip.accent,
      text: premiumColors.text.primary,
    };
    
    console.log('✅ Critical colors test:', criticalTest);
  }
  
  // ============================================================================
  // 🌟 EXPORTS
  // ============================================================================
  export default premiumColors;
  
  // Export individual palettes
  export { premiumPalette };
  
  // Types para TypeScript
  export type PremiumColorPalette = typeof premiumPalette;
  export type PremiumColors = typeof premiumColors;
  export type PremiumGradients = typeof premiumGradients;
  export type ColorVariant = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;