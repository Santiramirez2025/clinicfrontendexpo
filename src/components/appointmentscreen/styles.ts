// ============================================================================
// components/appointmentscreen/styles.ts - ESTILOS SIN ERRORES ✅
// ============================================================================
import { StyleSheet } from 'react-native';
import {
    modernColors,
    modernSpacing,
    modernTypography,
    modernShadows
  } from '../../styles';

export const appointmentStyles = StyleSheet.create({
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

  // Header
  header: {
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.itemSpacing,
    paddingBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '300',
    color: modernColors.charcoal,
  },
  
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: modernColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
  
  addButtonIcon: {
    fontSize: 20,
  },
  
  headerSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    fontWeight: '400',
  },

  // Tabs
  tabsContainer: {
    backgroundColor: modernColors.surface,
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
  },
  
  tabsContent: {
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
  },
  
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.aesthetic.itemSpacing,
    paddingVertical: 8,
    marginRight: modernSpacing.aesthetic.itemSpacing,
    borderRadius: 999,
    backgroundColor: modernColors.gray100,
  },
  
  tabButtonActive: {
    backgroundColor: modernColors.accent,
  },
  
  tabButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
    color: modernColors.gray600,
  },
  
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  
  tabBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: modernColors.gray300,
  },
  
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  tabBadgeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '700',
    color: modernColors.gray700,
  },
  
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },

  // Content
  content: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingTop: modernSpacing.aesthetic.itemSpacing,
  },

  // Appointment Card
  appointmentCard: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: 12,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
  
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  appointmentDateContainer: {
    flex: 1,
  },
  
  appointmentDate: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 2,
  },
  
  appointmentTime: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    fontWeight: '500',
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  
  statusIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  
  statusText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600',
  },
  
  treatmentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  treatmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: modernColors.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  treatmentIcon: {
    fontSize: 20,
  },
  
  treatmentDetails: {
    flex: 1,
  },
  
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 4,
  },
  
  professionalName: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  
  clinicName: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray500,
  },
  
  treatmentMeta: {
    alignItems: 'flex-end',
  },
  
  durationText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    fontWeight: '500',
    marginBottom: 4,
  },
  
  pointsText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.vip,
    fontWeight: '600',
  },

  // Notes
  notesContainer: {
    backgroundColor: modernColors.gray50,
    borderRadius: 8,
    padding: modernSpacing.aesthetic.itemSpacing,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  notesLabel: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  notesText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.charcoal,
    lineHeight: 21, // 14 * 1.5 - VALOR FIJO SIN ERRORES
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: modernSpacing.aesthetic.itemSpacing,
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: modernColors.gray100,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: 'center',
  },
  
  cancelButton: {
    backgroundColor: modernColors.errorModern + '10',
  },
  
  actionButtonIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  
  actionButtonText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '600',
    color: modernColors.charcoal,
  },
  
  cancelButtonText: {
    color: modernColors.errorModern,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
  },
  
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  emptyStateTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  emptyStateSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center',
    lineHeight: 24, // 16 * 1.5 - VALOR FIJO SIN ERRORES
    marginBottom: modernSpacing.aesthetic.cardSpacing,
  },
  
  emptyStateButton: {
    backgroundColor: modernColors.accent,
    paddingHorizontal: modernSpacing.aesthetic.cardSpacing,
    paddingVertical: modernSpacing.aesthetic.itemSpacing,
    borderRadius: 8,
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
  
  emptyStateButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Modal
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

  // Additional Info
  additionalInfo: {
    backgroundColor: modernColors.surfaceElevated,
    borderRadius: 12,
    padding: modernSpacing.aesthetic.cardSpacing,
    marginTop: modernSpacing.aesthetic.itemSpacing,
    shadowColor: modernShadows.medium.shadowColor,
    shadowOffset: modernShadows.medium.shadowOffset,
    shadowOpacity: modernShadows.medium.shadowOpacity,
    shadowRadius: modernShadows.medium.shadowRadius,
    elevation: modernShadows.medium.elevation,
  },
  
  additionalInfoTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.charcoal,
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  infoLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    fontWeight: '500',
  },
  
  infoValue: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.charcoal,
    fontWeight: '600',
  },
});