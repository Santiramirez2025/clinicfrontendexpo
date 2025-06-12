import { Platform } from 'react-native';

export const typography = {
  // Font Families
  fontFamily: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    light: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line Heights
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 40,
    '4xl': 44,
    '5xl': 56,
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Text Styles (predefined combinations)
  heading1: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '700' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },
  
  heading2: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },
  
  heading3: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '600' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  
  heading4: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  
  heading5: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  
  heading6: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
};

export default typography;
