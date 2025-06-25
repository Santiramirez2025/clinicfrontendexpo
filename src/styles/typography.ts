import { Platform } from 'react-native';

export const modernTypography = {
  fontFamily: {
    primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    secondary: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    accent: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto Medium',
    mono: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
  },
  // Agregar todas las propiedades faltantes
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
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  letterSpacingModern: {
    tight: -0.02,
    normal: 0,
    relaxed: 0.02,
  },
};