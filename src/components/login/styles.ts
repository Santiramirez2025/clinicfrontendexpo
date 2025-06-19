// ============================================================================
// components/login/styles.ts - ESTILOS SEPARADOS
// ============================================================================
import { StyleSheet, Platform } from 'react-native';
import { 
  modernColors, 
  modernSpacing, 
  modernTypography, 
  modernShadows 
} from '../../styles';

export const loginStyles = StyleSheet.create({
  // Base Container
  container: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.sectionPadding,
    paddingBottom: 120,
  },

  // Connection Status
  connectionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    borderRadius: modernSpacing.componentModern.radiusMD,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
    gap: 8,
  },
  
  connectionText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    letterSpacing: modernTypography.letterSpacingModern.tight,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: modernSpacing.componentModern.radiusXXL,
    backgroundColor: modernColors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.lg,
  },
  
  logoEmoji: {
    fontSize: 36,
  },
  
  title: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '300',
    color: modernColors.charcoal,
    letterSpacing: modernTypography.letterSpacingModern.wide,
    marginBottom: 4,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.gray600,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.lg,
  },

  // Demo Card
  demoCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusXL,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.lg,
    borderWidth: 1,
    borderColor: modernColors.vip + '20',
  },
  
  demoHeader: {
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  demoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: modernSpacing.componentModern.radiusRound,
    backgroundColor: modernColors.vip + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  demoIcon: {
    fontSize: 28,
  },
  
  demoTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 4,
  },
  
  demoSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.vip,
    fontWeight: '500',
  },
  
  demoDescription: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.base,
  },
  
  features: {
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: modernColors.successModern,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  checkIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  featureText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.charcoal,
    flex: 1,
    lineHeight: modernTypography.lineHeightModern.normal * modernTypography.fontSizeModern.sm,
  },

  // Buttons
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: modernSpacing.aesthetic.cardSpacing,
  },
  
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: modernColors.gray200,
  },
  
  dividerTextContainer: {
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  dividerText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray500,
    fontWeight: '600',
    letterSpacing: modernTypography.letterSpacingModern.wider,
  },

  // Login Card
  loginCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.md,
  },
  
  formTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    textAlign: 'center',
  },

  // Inputs
  inputContainer: {
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  inputLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    color: modernColors.charcoal,
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: modernColors.gray50,
    borderRadius: modernSpacing.componentModern.radiusMD,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.charcoal,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    minHeight: 52,
  },
  
  inputFocused: {
    borderColor: modernColors.accent,
    backgroundColor: modernColors.surfaceElevated,
    ...modernShadows.sm,
  },
  
  inputError: {
    borderColor: modernColors.errorModern,
  },
  
  errorText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.errorModern,
    marginTop: 4,
    marginLeft: 4,
  },

  // Login Options
  loginOptions: {
    alignItems: 'center',
    marginTop: modernSpacing.aesthetic.itemSpacing,
    gap: 12,
  },
  
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  linkText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  
  primaryLinkText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.accent,
    fontWeight: '600',
  },

  // Test Section
  testSection: {
    backgroundColor: modernColors.gray50,
    borderRadius: modernSpacing.componentModern.radiusMD,
    padding: modernSpacing.aesthetic.itemSpacing,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  
  testIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  
  testTitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  credentialsContainer: {
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  
  credentialLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    fontWeight: '500',
  },
  
  credentialValue: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.charcoal,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: modernColors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: modernSpacing.aesthetic.cardSpacing,
  },
  
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.surfaceElevated,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: 12,
    borderRadius: modernSpacing.componentModern.radiusRound,
    ...modernShadows.sm,
  },
  
  securityIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  
  securityText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    fontWeight: '500',
  },
});
