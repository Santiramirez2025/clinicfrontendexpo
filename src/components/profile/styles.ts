// ============================================================================
// components/profile/styles.ts - ESTILOS DEL PROFILE SCREEN
// ============================================================================
import { StyleSheet, Dimensions } from 'react-native';
import { 
  modernColors, 
  modernSpacing,
  modernTypography,
  modernShadows as modernShadows
} from '../../styles';

const { width: screenWidth } = Dimensions.get('window');

export const profileStyles = StyleSheet.create({
  // ============================================================================
  // CONTENEDORES PRINCIPALES
  // ============================================================================
  container: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    marginTop: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    fontWeight: '500',
  },

  // ============================================================================
  // HEADER
  // ============================================================================
  header: {
    backgroundColor: modernColors.surfaceElevated,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.itemSpacing,
    paddingBottom: modernSpacing.aesthetic.cardSpacing,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: modernColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: modernSpacing.aesthetic.itemSpacing,
    ...modernShadows.md,
  },
  
  avatarText: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  headerInfo: {
    flex: 1,
  },
  
  headerName: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 4,
  },
  
  headerEmail: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 8,
  },
  
  vipBadge: {
    alignSelf: 'flex-start',
    backgroundColor: modernColors.vip + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: modernSpacing.componentModern.radiusRound,
  },
  
  vipBadgeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '700',
    color: modernColors.vip,
  },

  // ============================================================================
  // SCROLL
  // ============================================================================
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.cardSpacing,
  },

  // ============================================================================
  // SECTIONS
  // ============================================================================
  section: {
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  sectionIcon: {
    fontSize: 18,
  },
  
  sectionTitleContainer: {
    flex: 1,
  },
  
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 2,
  },
  
  sectionSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  
  sectionContent: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    ...modernShadows.sm,
  },

  // ============================================================================
  // INPUT FIELDS
  // ============================================================================
  inputContainer: {
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  inputLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    color: modernColors.charcoal,
    marginBottom: 8,
  },
  
  requiredAsterisk: {
    color: modernColors.errorModern,
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
    minHeight: 48,
  },
  
  inputFocused: {
    borderColor: modernColors.accent,
    backgroundColor: modernColors.surfaceElevated,
    ...modernShadows.sm,
  },
  
  inputError: {
    borderColor: modernColors.errorModern,
  },
  
  inputDisabled: {
    backgroundColor: modernColors.gray100,
    color: modernColors.gray500,
  },
  
  errorText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.errorModern,
    marginTop: 4,
    marginLeft: 4,
  },

  // ============================================================================
  // TAG SELECTOR
  // ============================================================================
  tagSelectorContainer: {
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  tagSelectorLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    color: modernColors.charcoal,
    marginBottom: 12,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: modernSpacing.componentModern.radiusRound,
    backgroundColor: modernColors.gray100,
    borderWidth: 1,
    borderColor: modernColors.gray200,
  },
  
  tagSelected: {
    backgroundColor: modernColors.accent + '15',
    borderColor: modernColors.accent,
  },
  
  tagIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  
  tagText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    color: modernColors.charcoal,
  },
  
  tagTextSelected: {
    color: modernColors.accent,
    fontWeight: '600',
  },

  // ============================================================================
  // NOTES
  // ============================================================================
  notesContainer: {
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  notesLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    color: modernColors.charcoal,
    marginBottom: 8,
  },
  
  notesInput: {
    backgroundColor: modernColors.gray50,
    borderRadius: modernSpacing.componentModern.radiusMD,
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.charcoal,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  notesCounter: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray500,
    textAlign: 'right',
    marginTop: 4,
  },

  // ============================================================================
  // CLINIC SELECTOR
  // ============================================================================
  clinicSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  clinicIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.infoModern + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  clinicIcon: {
    fontSize: 18,
  },
  
  clinicDetails: {
    flex: 1,
  },
  
  clinicLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  
  clinicName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  changeClinicButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: modernSpacing.componentModern.radiusMD,
    backgroundColor: modernColors.accent,
  },
  
  changeClinicButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ============================================================================
  // NOTIFICATION TOGGLE
  // ============================================================================
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  notificationIcon: {
    fontSize: 16,
  },
  
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  
  notificationLabel: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 2,
  },
  
  notificationDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.sm,
  },
  
  notificationSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },

  // ============================================================================
  // SAVE SECTION
  // ============================================================================
  saveSection: {
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: modernColors.successModern,
    paddingVertical: modernSpacing.aesthetic.itemSpacing + 4,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    borderRadius: modernSpacing.componentModern.radiusMD,
    ...modernShadows.md,
  },
  
  saveButtonDisabled: {
    opacity: 0.7,
  },
  
  saveButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  
  saveButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ============================================================================
  // LEGAL CARD
  // ============================================================================
  legalCard: {
    backgroundColor: modernColors.gray50,
    borderRadius: modernSpacing.componentModern.radiusMD,
    padding: modernSpacing.aesthetic.itemSpacing,
  },
  
  legalText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    lineHeight: modernTypography.lineHeightModern.relaxed * modernTypography.fontSizeModern.sm,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  legalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  
  legalButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: modernColors.accent,
    flex: 1,
  },
  
  legalButtonIcon: {
    fontSize: 16,
  },

  // ============================================================================
  // ACTION BUTTONS
  // ============================================================================
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  
  dangerButton: {
    borderBottomWidth: 0,
  },
  
  actionButtonIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  
  actionButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.charcoal,
    flex: 1,
  },
  
  dangerButtonText: {
    color: modernColors.errorModern,
  },
  
  actionButtonArrow: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray400,
  },

  // ============================================================================
  // MODAL
  // ============================================================================
  modalContainer: {
    flex: 1,
    backgroundColor: modernColors.backgroundWarm,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  
  modalTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: modernColors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalCloseButtonText: {
    fontSize: 16,
    color: modernColors.gray600,
    fontWeight: '600',
  },
  
  modalContent: {
    flex: 1,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.itemSpacing,
  },

  // ============================================================================
  // CLINIC OPTIONS
  // ============================================================================
  clinicOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: modernSpacing.componentModern.radiusLG,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    ...modernShadows.sm,
  },
  
  clinicOptionSelected: {
    borderColor: modernColors.accent,
    backgroundColor: modernColors.accent + '05',
  },
  
  clinicOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: modernColors.infoModern + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  clinicOptionIconText: {
    fontSize: 20,
  },
  
  clinicOptionInfo: {
    flex: 1,
  },
  
  clinicOptionName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 4,
  },
  
  clinicOptionAddress: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  
  clinicOptionPhone: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray500,
  },
  
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: modernColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  selectedIndicatorText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});