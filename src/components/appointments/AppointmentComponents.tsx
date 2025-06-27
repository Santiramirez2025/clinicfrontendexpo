import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography } from '../../styles/colors';
import type { AppointmentStatus, TabType } from '../../types/auth';

// ============================================================================
// INTERFACES CORREGIDAS ✅
// ============================================================================

// Appointment extendida con campos que usa tu app
interface AppointmentExtended {
  id: string;
  treatmentId: string;
  professionalId?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  
  // Campos adicionales renderizables
  treatment?: string | { name: string }; // ✅ String o objeto
  professional?: string | { name: string }; // ✅ String o objeto
  clinic?: string;
  duration?: number;
  price?: number;
  rating?: number;
  isVipExclusive?: boolean;
}

// ============================================================================
// HELPERS SEGUROS PARA RENDERIZADO ✅
// ============================================================================

const renderTreatmentName = (treatment?: string | { name: string }): string => {
  if (typeof treatment === 'string') return treatment;
  if (treatment && typeof treatment === 'object' && 'name' in treatment) return treatment.name;
  return 'Sin tratamiento';
};

const renderProfessionalName = (professional?: string | { name: string }): string => {
  if (typeof professional === 'string') return professional;
  if (professional && typeof professional === 'object' && 'name' in professional) return professional.name;
  return 'Sin profesional';
};

const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'CONFIRMED': return modernColors.success;
    case 'PENDING': return modernColors.warning;
    case 'CANCELLED': return modernColors.error;
    case 'COMPLETED': return modernColors.info;
    default: return modernColors.textSecondary;
  }
};

const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'CONFIRMED': return 'Confirmado';
    case 'PENDING': return 'Pendiente';
    case 'CANCELLED': return 'Cancelado';
    case 'COMPLETED': return 'Completado';
    default: return 'Desconocido';
  }
};

const getStatusIcon = (status: AppointmentStatus): keyof typeof Ionicons.glyphMap => {
  switch (status) {
    case 'CONFIRMED': return 'checkmark-circle';
    case 'PENDING': return 'time';
    case 'CANCELLED': return 'close-circle';
    case 'COMPLETED': return 'checkmark-circle';
    default: return 'help-circle';
  }
};

// ============================================================================
// TAB SELECTOR ✅
// ============================================================================
interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
      onPress={() => onTabChange('upcoming')}
    >
      <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
        Próximos turnos
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'history' && styles.activeTab]}
      onPress={() => onTabChange('history')}
    >
      <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
        Historial
      </Text>
    </TouchableOpacity>
  </View>
);

// ============================================================================
// APPOINTMENT CARD ✅
// ============================================================================
interface AppointmentCardProps {
  appointment: AppointmentExtended;
  onPress: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  formatDate: (date: string) => string;
  formatTime: (time: string) => string;
}

export const AppointmentCard = ({ 
  appointment, 
  onPress, 
  onCancel, 
  onReschedule,
  formatDate,
  formatTime 
}: AppointmentCardProps) => {
  const canCancel = appointment.status === 'CONFIRMED' || appointment.status === 'PENDING';
  const canReschedule = appointment.status === 'CONFIRMED' || appointment.status === 'PENDING';

  return (
    <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
      {/* Header con fecha y estado */}
      <View style={styles.cardHeader}>
        <View style={styles.dateSection}>
          <Text style={styles.cardDate}>{formatDate(appointment.date)}</Text>
          <Text style={styles.cardTime}>{formatTime(appointment.time)}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
          <Ionicons 
            name={getStatusIcon(appointment.status)} 
            size={12} 
            color={getStatusColor(appointment.status)} 
          />
          <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
            {getStatusText(appointment.status)}
          </Text>
        </View>
      </View>

      {/* Información del tratamiento */}
      <View style={styles.cardBody}>
        <View style={styles.treatmentInfo}>
          {/* ✅ RENDERIZADO SEGURO */}
          <Text style={styles.treatmentName}>
            {renderTreatmentName(appointment.treatment)}
          </Text>
          {appointment.isVipExclusive && (
            <View style={styles.vipBadge}>
              <Ionicons name="diamond" size={10} color={modernColors.accent} />
              <Text style={styles.vipText}>VIP</Text>
            </View>
          )}
        </View>
        
        <View style={styles.professionalInfo}>
          <Ionicons name="person" size={14} color={modernColors.textSecondary} />
          {/* ✅ RENDERIZADO SEGURO */}
          <Text style={styles.professionalName}>
            {renderProfessionalName(appointment.professional)}
          </Text>
        </View>
        
        {appointment.clinic && (
          <View style={styles.clinicInfo}>
            <Ionicons name="location" size={14} color={modernColors.textSecondary} />
            <Text style={styles.clinicName}>{appointment.clinic}</Text>
          </View>
        )}

        {/* Información adicional */}
        {appointment.duration && (
          <View style={styles.additionalInfo}>
            <Ionicons name="time" size={14} color={modernColors.textSecondary} />
            <Text style={styles.durationText}>{appointment.duration} min</Text>
            {appointment.price && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.priceText}>${appointment.price}</Text>
              </>
            )}
          </View>
        )}

        {/* Rating para citas completadas */}
        {appointment.status === 'COMPLETED' && appointment.rating && (
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < appointment.rating! ? "star" : "star-outline"}
                size={16}
                color={modernColors.warning}
              />
            ))}
          </View>
        )}
      </View>

      {/* Acciones (solo para citas futuras) */}
      {(canCancel || canReschedule) && (
        <View style={styles.cardActions}>
          {canReschedule && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={(e) => {
                e.stopPropagation();
                onReschedule?.();
              }}
            >
              <Ionicons name="calendar" size={16} color={modernColors.primary} />
              <Text style={styles.actionText}>Reprogramar</Text>
            </TouchableOpacity>
          )}
          
          {canCancel && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]}
              onPress={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
            >
              <Ionicons name="close" size={16} color={modernColors.error} />
              <Text style={[styles.actionText, { color: modernColors.error }]}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

// ============================================================================
// EMPTY STATE ✅
// ============================================================================
interface EmptyStateProps {
  type: TabType;
  onNewAppointment: () => void;
}

export const EmptyState = ({ type, onNewAppointment }: EmptyStateProps) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyEmoji}>
      {type === 'upcoming' ? '📅' : '📋'}
    </Text>
    <Text style={styles.emptyTitle}>
      {type === 'upcoming' ? 'No tienes turnos programados' : 'No hay historial de citas'}
    </Text>
    <Text style={styles.emptySubtitle}>
      {type === 'upcoming' 
        ? 'Agenda tu próximo tratamiento de belleza' 
        : 'Tus citas completadas aparecerán aquí'
      }
    </Text>
    {type === 'upcoming' && (
      <TouchableOpacity style={styles.emptyButton} onPress={onNewAppointment}>
        <Text style={styles.emptyButtonText}>Agendar primera cita</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ============================================================================
// FLOATING ACTION BUTTON ✅
// ============================================================================
interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Ionicons name="add" size={24} color={modernColors.textInverse} />
  </TouchableOpacity>
);

// ============================================================================
// ESTILOS CORREGIDOS ✅
// ============================================================================
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: modernColors.backgroundCool,
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: modernColors.surface,
    shadowColor: modernColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.textSecondary,
  },
  activeTabText: {
    color: modernColors.primary,
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: modernColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateSection: {
    flex: 1,
  },
  cardDate: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.textPrimary,
    marginBottom: 2,
  },
  cardTime: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500',
    marginLeft: 4,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: modernColors.border,
    paddingTop: 16,
  },
  treatmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.textPrimary,
    flex: 1,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.accent + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  vipText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.accent,
    fontWeight: '600',
    marginLeft: 2,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  professionalName: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.textSecondary,
    marginLeft: 6,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clinicName: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.textSecondary,
    marginLeft: 6,
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  durationText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
    marginLeft: 4,
  },
  separator: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textTertiary,
    marginHorizontal: 8,
  },
  priceText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.success,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: modernColors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: modernColors.backgroundCool,
  },
  cancelButton: {
    backgroundColor: modernColors.error + '10',
  },
  actionText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: modernColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: modernColors.textInverse,
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: modernColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: modernColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 16,
  },
});

export default AppointmentCard;