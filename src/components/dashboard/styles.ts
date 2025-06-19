// ============================================================================
// components/dashboard/styles.ts - DASHBOARD STYLES LIMPIO SIN ERRORES
// ============================================================================
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { 
  modernColors, 
  modernSpacing, 
  modernTypography, 
  modernShadows,
  modernRadius,
  modernUtils,
  modernAnimations
} from '../../styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isTablet = SCREEN_WIDTH > 768;
const isIPhoneX = SCREEN_HEIGHT >= 812 && Platform.OS === 'ios';

// ============================================================================
// VALORES COMPARTIDOS PREMIUM
// ============================================================================
const premiumValues = {
  goldenRatio: 1.618,
  
  curves: {
    entrance: { tension: 300, friction: 20 },
    interaction: { tension: 400, friction: 15 },
    gentle: { tension: 250, friction: 25 },
  },
  
  glass: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.20)',
    },
    medium: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.30)',
    },
    strong: {
      backgroundColor: 'rgba(255, 255, 255, 0.40)',
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.50)',
    },
  },
  
  gradients: {
    warm: ['#FFF9F6', '#FEF7F0', '#FDF2E9'],
    pearl: ['#FFFFFF', '#FEF7F0', '#F5F5F4'],
    sunset: ['#FFE5CC', '#FFD6AA', '#FFC688'],
    rose: ['#F9C09A', '#E8956B', '#D6845A'],
    spa: ['#F0F9FF', '#E0F2FE', '#BAE6FD'],
  },
};

// ============================================================================
// DASHBOARD STYLES COMPLETO - UNA SOLA VEZ
// ============================================================================
export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: modernUtils.safePadding.bottom + 120,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: modernColors.backgroundWarm,
  },
  
  loadingText: {
    marginTop: modernSpacing.lg,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    fontWeight: modernTypography.fontWeight.medium,
    letterSpacing: modernTypography.letterSpacing.wide,
  },

  // Sistema de espaciado premium con golden ratio
  sectionContainer: {
    paddingHorizontal: modernSpacing.content?.page || 20,
    marginBottom: (modernSpacing.xl || 20) * premiumValues.goldenRatio,
  },
  
  wellnessSection: {
    paddingHorizontal: modernSpacing.content?.page || 20,
    marginBottom: modernSpacing.xxxl || 32,
  },
  
  wellnessItemContainer: {
    marginBottom: modernSpacing.lg || 16,
  },
  
  ctaSection: {
    paddingHorizontal: modernSpacing.content?.page || 20,
    marginBottom: modernSpacing.xxxl || 32,
    marginTop: modernSpacing.md || 12,
  },
  
  recommendationsContainer: {
    marginBottom: modernSpacing.massive || 48,
  },
  
  bottomSafeSpace: {
    height: modernUtils.safePadding.bottom + 120,
  },

  // Header premium con glassmorphism
  headerContainer: {
    position: 'relative',
    zIndex: 1000,
    marginBottom: 0,
  },
  
  headerBlur: {
    borderBottomLeftRadius: modernRadius.xxxl || 24,
    borderBottomRightRadius: modernRadius.xxxl || 24,
    overflow: 'hidden',
    ...modernShadows.soft,
  },
  
  headerGradient: {
    paddingTop: modernUtils.safePadding.top + (isTablet ? 20 : 10),
    paddingHorizontal: modernSpacing.content?.page || 20,
    paddingBottom: (modernSpacing.xl || 20) * premiumValues.goldenRatio,
    position: 'relative',
    minHeight: isTablet ? 160 : 140,
  },
  
  headerContent: {
    position: 'relative',
    zIndex: 10,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: modernSpacing.lg || 16,
  },

  // Bienvenida con tipografia premium
  welcomeContainer: {
    flex: 1,
    marginRight: modernSpacing.lg || 16,
    paddingRight: modernSpacing.sm || 8,
  },
  
  welcomeGreeting: {
    fontSize: modernTypography.fontSizeModern.sm || 14,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.gray600 || '#525252',
    letterSpacing: modernTypography.letterSpacing.widest || 1.2,
    textTransform: 'uppercase',
    marginBottom: modernSpacing.xs || 4,
    opacity: 0.8,
  },
  
  welcomeText: {
    fontSize: isSmallDevice ? 26 : isTablet ? 36 : 30,
    fontWeight: modernTypography.fontWeight.bold || '700',
    color: modernColors.gray900 || '#171717',
    letterSpacing: modernTypography.letterSpacing.tight || -0.4,
    lineHeight: isSmallDevice ? 30 : isTablet ? 42 : 36,
    marginBottom: modernSpacing.lg || 16,
    includeFontPadding: false,
  },

  // VIP badge ultra premium
  vipBadgeContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginTop: modernSpacing.xs || 4,
  },
  
  vipBadgeHeader: {
    paddingHorizontal: modernSpacing.lg || 16,
    paddingVertical: modernSpacing.sm || 8,
    borderRadius: modernRadius.xxl || 20,
    shadowColor: "#8B5CF6", 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 16, 
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  
  vipBadgeHeaderText: {
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: modernTypography.fontWeight.black || '900',
    color: '#FFFFFF',
    letterSpacing: modernTypography.letterSpacing.wider || 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    position: 'relative',
    zIndex: 2,
  },
  
  vipShimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: modernRadius.xxl || 20,
    transform: [{ skewX: '-20deg' }],
  },

  vipPulseRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: (modernRadius.xxl || 20) + 3,
    borderWidth: 2,
    borderColor: modernColors.vip || '#D4AF37',
    opacity: 0.4,
  },

  // Avatar premium con efectos
  avatarContainer: {
    position: 'relative',
    ...modernShadows.medium,
  },
  
  avatarGradient: {
    width: isTablet ? 68 : 60,
    height: isTablet ? 68 : 60,
    borderRadius: modernRadius.circular || 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  
  avatarText: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: modernTypography.fontWeight.bold || '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    position: 'relative',
    zIndex: 2,
  },
  
  avatarRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: modernRadius.circular || 9999,
    borderWidth: 2,
    borderColor: modernColors.accent + '60' || '#E8B4CB60',
    opacity: 0.6,
  },

  avatarGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: modernRadius.circular || 9999,
    backgroundColor: modernColors.primary || '#2C2C54',
    opacity: 0.1,
  },

  // === BEAUTY POINTS CARD ===
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  
  pointsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: modernColors.vip + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: modernSpacing.sm,
  },
  
  pointsIcon: {
    fontSize: 24,
  },
  
  pointsInfo: {
    flex: 1,
  },
  
  pointsTitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.textSecondary,
    marginBottom: 2,
  },
  
  pointsValue: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.vip,
  },
  
  multiplierBadge: {
    backgroundColor: modernColors.vip,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: modernRadius.sm,
    alignSelf: 'flex-start',
  },
  
  multiplierText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.surface,
  },
  
  pointsSubtext: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
    marginTop: modernSpacing.sm,
  },
  
  tapToViewMore: {
    alignItems: 'center',
    marginTop: modernSpacing.sm,
  },
  
  tapToViewMoreText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.textSecondary,
    fontStyle: 'italic',
  },

  // === CLINIC INFO CARD ===
  clinicCardContainer: {
    marginBottom: modernSpacing.xl,
  },
  
  clinicCard: {
    backgroundColor: modernColors.surface,
    borderRadius: modernRadius.card,
    padding: modernSpacing.aesthetic.cardSpacing,
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },
  
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: modernRadius.card,
  },
  
  shimmerOverlay: {
    backgroundColor: modernColors.glass.shimmer,
  },
  
  clinicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.lg,
  },
  
  clinicIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: modernSpacing.md,
    overflow: 'hidden',
  },
  
  clinicIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: modernColors.vip + '15',
  },
  
  clinicIconText: {
    fontSize: 24,
  },
  
  iconPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: modernColors.vip + '20',
  },
  
  clinicTitleContainer: {
    flex: 1,
  },
  
  clinicTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.text,
    marginBottom: 2,
  },
  
  clinicSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
  },
  
  clinicDetails: {
    marginBottom: modernSpacing.lg,
  },
  
  clinicDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: modernSpacing.sm,
    overflow: 'hidden',
  },
  
  detailIconBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: modernColors.gray100,
  },
  
  detailIcon: {
    fontSize: 18,
  },
  
  detailContent: {
    flex: 1,
  },
  
  detailTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.text,
    marginBottom: 2,
  },
  
  detailSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
  },
  
  callIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: modernColors.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  callIndicatorIcon: {
    fontSize: 12,
    color: modernColors.success,
  },
  
  callButtonContainer: {
    borderRadius: modernRadius.button,
    overflow: 'hidden',
  },
  
  callButtonTouch: {
    backgroundColor: 'transparent',
  },
  
  callButton: {
    backgroundColor: modernColors.success,
    paddingVertical: modernSpacing.md,
    paddingHorizontal: modernSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  rippleEffect: {
    backgroundColor: modernColors.success + '20',
  },
  
  callButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  callIconContainer: {
    marginRight: modernSpacing.sm,
  },
  
  callButtonIcon: {
    fontSize: 18,
    color: modernColors.surface,
  },
  
  callButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.surface,
  },
  
  callButtonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: modernColors.surface + '30',
  },

  // === WELLNESS CHECK-IN ===
  wellnessCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.success + '10',
    padding: modernSpacing.md,
    borderRadius: modernRadius.md,
    marginBottom: modernSpacing.lg,
  },
  
  wellnessCompletedIcon: {
    fontSize: 24,
    marginRight: modernSpacing.sm,
  },
  
  wellnessCompletedContent: {
    flex: 1,
  },
  
  wellnessCompletedTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.success,
    marginBottom: 2,
  },
  
  wellnessCompletedText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
  },
  
  wellnessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.lg,
  },
  
  wellnessIcon: {
    fontSize: 24,
    marginRight: modernSpacing.sm,
  },
  
  wellnessHeaderContent: {
    flex: 1,
  },
  
  wellnessTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.text,
    marginBottom: 2,
  },
  
  wellnessSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
  },
  
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: modernSpacing.lg,
  },
  
  moodButton: {
    flex: 1,
    alignItems: 'center',
    padding: modernSpacing.md,
    borderRadius: modernRadius.md,
    marginHorizontal: 4,
    backgroundColor: modernColors.gray100,
  },
  
  moodButtonSelected: {
    backgroundColor: modernColors.accent + '20',
    borderWidth: 2,
    borderColor: modernColors.accent,
  },
  
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  
  moodLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.textSecondary,
    textAlign: 'center',
  },

  // === WELLNESS TIP ===
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.wellness + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: modernSpacing.sm,
  },
  
  tipIcon: {
    fontSize: 18,
  },
  
  tipContent: {
    flex: 1,
  },
  
  tipTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.text,
    marginBottom: 4,
  },
  
  tipText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
    lineHeight: modernTypography.lineHeight.relaxed * modernTypography.fontSizeModern.sm,
  },

  // === RECOMMENDATIONS ===
  recommendationsSection: {
    marginBottom: modernSpacing.massive,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.lg,
  },
  
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.text,
  },
  
  seeAllText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.accent,
    fontWeight: modernTypography.fontWeight.medium,
  },

  // === TREATMENTS ===
  emptyState: {
    alignItems: 'center',
    padding: modernSpacing.xl,
  },
  
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: modernSpacing.md,
  },
  
  emptyStateText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.textSecondary,
    textAlign: 'center',
  },
  
  treatmentScrollContainer: {
    paddingHorizontal: modernSpacing.lg,
  },
  
  treatmentCard: {
    backgroundColor: modernColors.surface,
    borderRadius: modernRadius.card,
    padding: modernSpacing.md,
    marginRight: modernSpacing.md,
    width: 200,
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },
  
  treatmentCardVip: {
    borderWidth: 2,
    borderColor: modernColors.vip,
  },
  
  vipBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: modernColors.vip,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: modernRadius.sm,
  },
  
  vipBadgeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.surface,
  },
  
  treatmentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: modernColors.accent + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: modernSpacing.md,
  },
  
  treatmentIcon: {
    fontSize: 24,
  },
  
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: modernTypography.fontWeight.medium,
    color: modernColors.text,
    marginBottom: 4,
  },
  
  treatmentDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
    marginBottom: modernSpacing.md,
  },
  
  treatmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  treatmentDuration: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.textSecondary,
  },
  
  treatmentPrice: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: modernTypography.fontWeight.bold,
    color: modernColors.accent,
  },

  // Elementos decorativos premium
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: modernColors.accent + '14' || '#E8B4CB14',
    opacity: 0.08,
  },
  
  decorativeCircle2: {
    position: 'absolute',
    top: 30,
    left: -35,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: modernColors.vip + '14' || '#D4AF3714',
    opacity: 0.06,
  },

  decorativeCircle3: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: modernColors.beauty + '14' || '#E8B4CB14',
    opacity: 0.04,
  },

  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    borderBottomLeftRadius: modernRadius.xxxl || 24,
    borderBottomRightRadius: modernRadius.xxxl || 24,
  },
});

// ============================================================================
// APPOINTMENT CARD STYLES ULTRA PREMIUM
// ============================================================================
export const appointmentCardStyles = StyleSheet.create({
  appointmentCardContainer: {
    marginHorizontal: modernSpacing.content?.page || 20,
    marginBottom: modernSpacing.xl || 20,
  },

  appointmentCard: {
    borderRadius: modernRadius.xxxl || 24,
    overflow: 'hidden',
    ...modernShadows.strong,
    position: 'relative',
  },

  appointmentCardGradient: {
    padding: modernSpacing.xl || 20,
    position: 'relative',
    minHeight: 200,
  },

  // Header de appointment
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: modernSpacing.xl || 20,
    position: 'relative',
    zIndex: 10,
  },

  timeContainer: {
    flex: 1,
    marginRight: modernSpacing.lg || 16,
  },

  timeLabel: {
    fontSize: modernTypography.fontSizeModern.sm || 14,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.gray600 || '#525252',
    textTransform: 'uppercase',
    letterSpacing: modernTypography.letterSpacing.widest || 1.2,
    marginBottom: modernSpacing.sm || 8,
    opacity: 0.8,
  },

  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  dateText: {
    fontSize: modernTypography.fontSizeModern.xxl || 24,
    fontWeight: modernTypography.fontWeight.bold || '700',
    color: modernColors.gray900 || '#171717',
    letterSpacing: modernTypography.letterSpacing.tight || -0.4,
  },

  timeDivider: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: modernColors.gray400 || '#A3A3A3',
    marginHorizontal: modernSpacing.md || 12,
    opacity: 0.6,
  },

  timeText: {
    fontSize: modernTypography.fontSizeModern.xxl || 24,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.primary || '#2C2C54',
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  // Status badge premium
  statusContainer: {
    alignSelf: 'flex-start',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.md || 12,
    paddingVertical: modernSpacing.sm || 8,
    borderRadius: modernRadius.xxl || 20,
    ...modernShadows.soft,
    position: 'relative',
    overflow: 'hidden',
  },

  statusIcon: {
    fontSize: 14,
    marginRight: modernSpacing.xs || 4,
  },

  statusText: {
    fontSize: modernTypography.fontSizeModern.sm || 14,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    letterSpacing: modernTypography.letterSpacing.wide || 0.4,
  },

  // === MISSING APPOINTMENT CARD PROPERTIES ===
  noAppointmentContainer: {
    alignItems: 'center',
    paddingVertical: modernSpacing.xxxl || 32,
    position: 'relative',
    zIndex: 10,
  },

  emptyStateIconContainer: {
    position: 'relative',
    marginBottom: modernSpacing.xl || 20,
  },

  emptyStateIconBg: {
    width: 72,
    height: 72,
    borderRadius: modernRadius.xl || 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...modernShadows.strong,
    position: 'relative',
    overflow: 'hidden',
  },

  emptyStateIcon: {
    fontSize: 28,
    position: 'relative',
    zIndex: 2,
  },

  iconRipple: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: (modernRadius.xl || 16) + 6,
    borderWidth: 2,
    borderColor: modernColors.accent + '60' || '#E8B4CB60',
    opacity: 0.3,
  },

  emptyStateContent: {
    alignItems: 'center',
    maxWidth: 300,
  },

  emptyStateTitle: {
    fontSize: (modernTypography.fontSizeModern.xl || 20) * 1.1,
    fontWeight: modernTypography.fontWeight.bold || '700',
    color: modernColors.gray900 || '#171717',
    textAlign: 'center',
    marginBottom: modernSpacing.sm || 8,
    letterSpacing: modernTypography.letterSpacing.tight || -0.4,
    lineHeight: (modernTypography.fontSizeModern.xl || 20) * 1.3,
  },

  emptyStateSubtitle: {
    fontSize: modernTypography.fontSizeModern.lg || 18,
    color: modernColors.gray600 || '#525252',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: modernSpacing.xl || 20,
    fontWeight: modernTypography.fontWeight.medium || '500',
    opacity: 0.9,
  },

  ctaContainer: {
    width: '100%',
    alignItems: 'center',
  },

  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.lg || 16,
    paddingHorizontal: modernSpacing.xl || 20,
    borderRadius: modernRadius.lg || 12,
    width: '100%',
    maxWidth: 280,
    ...modernShadows.strong,
    position: 'relative',
    overflow: 'hidden',
    minHeight: modernSpacing.touch?.comfortable || 48,
  },

  ctaText: {
    fontSize: (modernTypography.fontSizeModern.lg || 18) * 1.1,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: '#FFFFFF',
    marginRight: modernSpacing.sm || 8,
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  ctaIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: modernTypography.fontWeight.bold || '700',
  },

  // Treatment info section
  appointmentContent: {
    marginBottom: modernSpacing.xl || 20,
    position: 'relative',
    zIndex: 10,
  },

  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  treatmentIconContainer: {
    marginRight: modernSpacing.lg || 16,
    marginTop: modernSpacing.xs || 4,
  },

  treatmentIconBg: {
    width: 56,
    height: 56,
    borderRadius: modernRadius.lg || 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...modernShadows.medium,
    position: 'relative',
    overflow: 'hidden',
  },

  treatmentIcon: {
    fontSize: 24,
    position: 'relative',
    zIndex: 2,
  },

  treatmentInfo: {
    flex: 1,
  },

  treatmentTitle: {
    fontSize: (modernTypography.fontSizeModern.xl || 20) * 1.1,
    fontWeight: modernTypography.fontWeight.bold || '700',
    color: modernColors.gray900 || '#171717',
    lineHeight: (modernTypography.fontSizeModern.xl || 20) * 1.3,
    marginBottom: modernSpacing.sm || 8,
    letterSpacing: modernTypography.letterSpacing.tight || -0.4,
  },

  professionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.sm || 8,
  },

  withText: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    color: modernColors.gray500 || '#737373',
    marginRight: modernSpacing.xs || 4,
    fontWeight: modernTypography.fontWeight.medium || '500',
    fontStyle: 'italic',
  },

  professionalName: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.gray700 || '#404040',
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  // Duration y points info
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  durationIcon: {
    fontSize: 16,
    marginRight: modernSpacing.xs || 4,
    color: modernColors.gray600 || '#525252',
  },

  durationText: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: modernTypography.fontWeight.medium || '500',
    color: modernColors.gray600 || '#525252',
  },

  pointsDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: modernColors.gray400 || '#A3A3A3',
    marginHorizontal: modernSpacing.md || 12,
    opacity: 0.6,
  },

  pointsIcon: {
    fontSize: 16,
    marginRight: modernSpacing.xs || 4,
  },

  pointsText: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.primary || '#2C2C54',
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  // Footer actions
  appointmentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.6)',
    paddingTop: modernSpacing.lg || 16,
    position: 'relative',
    zIndex: 10,
  },

  secondaryAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: modernSpacing.md || 12,
    borderRadius: modernRadius.md || 8,
    marginRight: modernSpacing.md || 12,
  },

  secondaryActionText: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: modernColors.gray600 || '#525252',
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  actionDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: modernSpacing.md || 12,
  },

  primaryAction: {
    flex: 1.5,
  },

  primaryActionBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.md || 12,
    paddingHorizontal: modernSpacing.lg || 16,
    borderRadius: modernRadius.md || 8,
    ...modernShadows.medium,
    position: 'relative',
    overflow: 'hidden',
    minHeight: modernSpacing.touch?.minimum || 44,
  },

  primaryActionText: {
    fontSize: modernTypography.fontSizeModern.base || 16,
    fontWeight: modernTypography.fontWeight.semibold || '600',
    color: '#FFFFFF',
    marginRight: modernSpacing.sm || 8,
    letterSpacing: modernTypography.letterSpacing.normal || 0,
  },

  primaryActionIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: modernTypography.fontWeight.bold || '700',
  },
});

// ============================================================================
// UTILIDADES Y EFECTOS PREMIUM
// ============================================================================
export const premiumEffects = StyleSheet.create({
    glassmorphism: {
      backgroundColor: "rgba(255, 255, 255, 0.9)", 
      borderWidth: 1, 
      borderColor: "rgba(255, 255, 255, 0.18)",
      ...modernShadows.soft,
    },
  
    neumorphism: {
      backgroundColor: modernColors.backgroundWarm,
      ...modernShadows.soft,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
    },
  
    gradientOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  
    shimmerEffect: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      position: 'absolute' as const,
      top: 0,
      left: -100,
      right: 0,
      bottom: 0,
      transform: [{ skewX: '-20deg' }],
    },
  });
  
  export default dashboardStyles;