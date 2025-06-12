import { StyleSheet, Platform, StatusBar } from 'react-native';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

export const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.layout.screenPadding,
  },
  
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  // Card Styles
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.component.radiusLG,
    padding: spacing.layout.cardPadding,
    marginVertical: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  // Text Styles
  heading1: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  
  heading2: {
    ...typography.heading2,
    color: colors.textPrimary,
  },
  
  heading3: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  
  heading4: {
    ...typography.heading4,
    color: colors.textPrimary,
  },
  
  body1: {
    ...typography.body1,
    color: colors.textPrimary,
  },
  
  body2: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  
  caption: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  
  // Button Styles
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.layout.buttonPadding,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.component.radiusMD,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  
  buttonSecondary: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: spacing.component.borderThin,
    borderColor: colors.border,
    paddingVertical: spacing.layout.buttonPadding,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.component.radiusMD,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  buttonSecondaryText: {
    ...typography.button,
    color: colors.primary,
  },
  
  // Input Styles
  input: {
    borderWidth: spacing.component.borderThin,
    borderColor: colors.border,
    borderRadius: spacing.component.radiusMD,
    paddingHorizontal: spacing.layout.inputPadding,
    paddingVertical: spacing.layout.inputPadding,
    fontSize: typography.fontSize.base,
    backgroundColor: colors.white,
    minHeight: 48,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: spacing.component.borderMedium,
  },
  
  inputError: {
    borderColor: colors.error,
  },
  
  inputLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  // List Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.layout.listItemPadding,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: spacing.component.borderThin,
    borderBottomColor: colors.borderLight,
  },
  
  listItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  
  // Medical Specific Styles
  medicalCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.component.radiusLG,
    padding: spacing.medical.cardSpacing,
    marginVertical: spacing.medical.itemSpacing,
    borderLeftWidth: spacing.component.borderThick,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  statusBadge: {
    paddingHorizontal: spacing.medical.badgeSpacing,
    paddingVertical: spacing.xs,
    borderRadius: spacing.component.radiusRound,
    alignSelf: 'flex-start',
  },
  
  statusBadgeText: {
    ...typography.caption,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
  },
  
  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  centerText: {
    textAlign: 'center',
  },
  
  // Spacing Utilities
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.lg },
  mt5: { marginTop: spacing.xl },
  
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.lg },
  mb5: { marginBottom: spacing.xl },
  
  ml1: { marginLeft: spacing.xs },
  ml2: { marginLeft: spacing.sm },
  ml3: { marginLeft: spacing.md },
  ml4: { marginLeft: spacing.lg },
  ml5: { marginLeft: spacing.xl },
  
  mr1: { marginRight: spacing.xs },
  mr2: { marginRight: spacing.sm },
  mr3: { marginRight: spacing.md },
  mr4: { marginRight: spacing.lg },
  mr5: { marginRight: spacing.xl },
  
  // Shadow utilities
  shadowSmall: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  
  shadowMedium: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  
  shadowLarge: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
});

export default globalStyles;

// Export individual style modules
export { colors, typography, spacing };
