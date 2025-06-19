// ============================================================================
// components/VIP/styles.ts - ESTILOS VIP SEPARADOS
// ============================================================================
import { StyleSheet, Dimensions } from 'react-native';
import { 
  modernColors, 
  modernShadows, 
  modernSpacing,
  modernTypography,
} from '../../styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const vipStyles = StyleSheet.create({
  // ============================================================================
  // CONTAINER Y LAYOUT
  // ============================================================================
  container: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: modernColors.backgroundWarm,
  },
  
  loadingText: {
    marginTop: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    fontWeight: '500',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.itemSpacing,
    paddingBottom: 100,
  },

  // ============================================================================
  // HEADER
  // ============================================================================
  header: {
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  headerContent: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusXL,
    padding: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.lg,
    borderWidth: 1,
    borderColor: modernColors.vip + '20',
  },
  
  titleContainer: {
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  crownContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  
  crownIcon: {
    fontSize: 48,
  },
  
  crownGlow: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  
  crownGlowText: {
    fontSize: 16,
  },
  
  vipTitle: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '300',
    color: modernColors.charcoal,
    marginBottom: 4,
    letterSpacing: 2,
  },
  
  vipSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center',
  },
  
  vipActiveBadge: {
    backgroundColor: modernColors.successModern,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: 8,
    borderRadius: modernSpacing.componentModern.radiusRound,
    alignSelf: 'center',
  },
  
  vipActiveText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  upgradeButton: {
    backgroundColor: modernColors.vip,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    borderRadius: modernSpacing.componentModern.radiusMD,
    alignSelf: 'center',
    shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 10,
  },
  
  upgradeButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 8,
  },
  
  upgradeArrow: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: '#FFFFFF',
  },

  // ============================================================================
  // STATUS CARD
  // ============================================================================
  statusCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.md,
  },
  
  statusCardVIP: {
    borderWidth: 1,
    borderColor: modernColors.vip + '30',
    backgroundColor: modernColors.vip + '05',
  },
  
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  statusTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  expirationBadge: {
    backgroundColor: modernColors.warningModern + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: modernSpacing.componentModern.radiusRound,
  },
  
  expirationText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.warningModern,
    fontWeight: '600',
  },
  
  statusBenefits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  statusBenefit: {
    alignItems: 'center',
    flex: 1,
  },
  
  statusBenefitIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  
  statusBenefitText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.charcoal,
    fontWeight: '500',
    textAlign: 'center',
  },

  // ============================================================================
  // SECTION
  // ============================================================================
  section: {
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 8,
  },
  
  sectionSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.sm,
  },

  // ============================================================================
  // BENEFITS
  // ============================================================================
  benefitsGrid: {
    gap: modernSpacing.aesthetic.itemSpacing,
  },
  
  benefitCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.sm,
    borderWidth: 1,
    borderColor: modernColors.gray200,
  },
  
  benefitCardVIP: {
    borderColor: modernColors.vip + '30',
    backgroundColor: modernColors.vip + '05',
  },
  
  benefitCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  
  benefitCardDisabled: {
    opacity: 0.6,
  },
  
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  benefitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  benefitIcon: {
    fontSize: 20,
  },
  
  benefitContent: {
    flex: 1,
  },
  
  benefitTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  
  benefitTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    flex: 1,
  },
  
  availableBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: modernColors.successModern,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  availableBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  benefitCategory: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.vip,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  benefitDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    lineHeight: modernTypography.lineHeightModern.normal * modernTypography.fontSizeModern.sm,
    marginBottom: 12,
  },
  
  benefitFooter: {
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
    paddingTop: 8,
  },
  
  benefitAction: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.vip,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  benefitUnavailable: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray500,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  comingSoonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: modernColors.gray200 + '90',
    borderRadius: modernSpacing.componentModern.radiusLG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  comingSoonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    fontWeight: '600',
  },

  // ============================================================================
  // TESTIMONIALS
  // ============================================================================
  testimonialsContainer: {
    paddingLeft: 4,
    paddingRight: 20,
  },
  
  testimonialCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.itemSpacing,
    marginRight: modernSpacing.aesthetic.itemSpacing,
    width: 260,
    ...modernShadows.sm,
  },
  
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.vip + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  testimonialAvatarText: {
    fontSize: 18,
  },
  
  testimonialInfo: {
    flex: 1,
  },
  
  testimonialName: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  testimonialAge: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
  },
  
  testimonialRating: {
    flexDirection: 'row',
  },
  
  star: {
    fontSize: 12,
  },
  
  testimonialComment: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    fontStyle: 'italic',
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.sm,
  },

  // ============================================================================
  // PRICING
  // ============================================================================
  pricingContainer: {
    gap: modernSpacing.aesthetic.itemSpacing,
  },
  
  pricingCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.md,
    borderWidth: 2,
    borderColor: modernColors.gray200,
    position: 'relative',
  },
  
  pricingCardPopular: {
    borderColor: modernColors.vip,
    backgroundColor: modernColors.vip + '05',
    shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 10,
  },
  
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    right: 16,
    backgroundColor: modernColors.vip,
    paddingVertical: 4,
    borderRadius: modernSpacing.componentModern.radiusRound,
    alignItems: 'center',
  },
  
  popularBadgeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  
  pricingTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  savingsBadge: {
    backgroundColor: modernColors.successModern + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: modernSpacing.componentModern.radiusRound,
  },
  
  savingsText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.successModern,
    fontWeight: '600',
  },
  
  pricingPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  
  price: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '700',
    color: modernColors.charcoal,
  },
  
  pricePeriod: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginLeft: 4,
  },
  
  originalPrice: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray500,
    textDecorationLine: 'line-through',
    marginBottom: 12,
  },
  
  pricingFeatures: {
    gap: 6,
  },
  
  pricingFeature: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.charcoal,
    lineHeight: modernTypography.lineHeightModern.normal * modernTypography.fontSizeModern.sm,
  },

  // ============================================================================
  // GUARANTEE
  // ============================================================================
  guaranteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusMD,
    padding: modernSpacing.aesthetic.itemSpacing,
    marginTop: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.sm,
  },
  
  guaranteeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  
  guaranteeContent: {
    flex: 1,
  },
  
  guaranteeTitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 2,
  },
  
  guaranteeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    lineHeight: modernTypography.lineHeightModern.normal * modernTypography.fontSizeModern.xs,
  },

  // ============================================================================
  // SUBSCRIPTION OVERLAY
  // ============================================================================
  subscriptionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  subscriptionModal: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    alignItems: 'center',
    margin: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.xl,
  },
  
  subscriptionText: {
    marginTop: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.charcoal,
    fontWeight: '500',
  },
});