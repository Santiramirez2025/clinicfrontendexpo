// ============================================================================
// components/appointmentscreen/AppointmentCard.tsx
// ============================================================================
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { modernColors } from '../../styles';
import { appointmentStyles } from './styles';
import { Appointment } from './types';

export interface AppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  onWhatsAppReminder?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onPress, 
  onReschedule, 
  onCancel,
  onWhatsAppReminder 
}) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { color: modernColors.warningModern, text: 'Pendiente', icon: '⏳' };
      case 'CONFIRMED':
        return { color: modernColors.successModern, text: 'Confirmada', icon: '✅' };
      case 'COMPLETED':
        return { color: modernColors.infoModern, text: 'Completada', icon: '✨' };
      case 'CANCELLED':
        return { color: modernColors.errorModern, text: 'Cancelada', icon: '❌' };
      case 'NO_SHOW':
        return { color: modernColors.gray600, text: 'No asistió', icon: '👻' };
      default:
        return { color: modernColors.gray500, text: status, icon: '❓' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-AR', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const statusInfo = getStatusInfo(appointment.status);
  const showActions = appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';

  return (
    <TouchableOpacity
      style={appointmentStyles.appointmentCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header con fecha y estado */}
      <View style={appointmentStyles.appointmentHeader}>
        <View style={appointmentStyles.appointmentDateContainer}>
          <Text style={appointmentStyles.appointmentDate}>
            {formatDate(appointment.date)}
          </Text>
          <Text style={appointmentStyles.appointmentTime}>
            {formatTime(appointment.time)}
          </Text>
        </View>
        
        <View style={[
          appointmentStyles.statusBadge,
          { backgroundColor: statusInfo.color + '15' }
        ]}>
          <Text style={appointmentStyles.statusIcon}>{statusInfo.icon}</Text>
          <Text style={[
            appointmentStyles.statusText,
            { color: statusInfo.color }
          ]}>
            {statusInfo.text}
          </Text>
        </View>
      </View>

      {/* Información del tratamiento */}
      <View style={appointmentStyles.treatmentInfo}>
        <View style={appointmentStyles.treatmentIconContainer}>
          <Text style={appointmentStyles.treatmentIcon}>
            {appointment.treatment.iconName === 'sparkles' ? '✨' : 
             appointment.treatment.iconName === 'heart' ? '💖' : 
             appointment.treatment.iconName === 'star' ? '⭐' : '💆‍♀️'}
          </Text>
        </View>
        
        <View style={appointmentStyles.treatmentDetails}>
          <Text style={appointmentStyles.treatmentName}>
            {appointment.treatment.name}
          </Text>
          <Text style={appointmentStyles.professionalName}>
            con {appointment.professional}
          </Text>
          <Text style={appointmentStyles.clinicName}>
            📍 {appointment.clinic}
          </Text>
        </View>
        
        <View style={appointmentStyles.treatmentMeta}>
          <Text style={appointmentStyles.durationText}>
            {appointment.treatment.duration}min
          </Text>
          {appointment.beautyPointsEarned > 0 && (
            <Text style={appointmentStyles.pointsText}>
              +{appointment.beautyPointsEarned} 💎
            </Text>
          )}
        </View>
      </View>

      {/* Notas si existen */}
      {appointment.notes && (
        <View style={appointmentStyles.notesContainer}>
          <Text style={appointmentStyles.notesLabel}>Notas:</Text>
          <Text style={appointmentStyles.notesText}>{appointment.notes}</Text>
        </View>
      )}

      {/* Acciones */}
      {showActions && (
        <View style={appointmentStyles.actionsContainer}>
          {appointment.canReschedule && onReschedule && (
            <TouchableOpacity
              style={appointmentStyles.actionButton}
              onPress={onReschedule}
            >
              <Text style={appointmentStyles.actionButtonIcon}>📅</Text>
              <Text style={appointmentStyles.actionButtonText}>Reprogramar</Text>
            </TouchableOpacity>
          )}
          
          {onWhatsAppReminder && (
            <TouchableOpacity
              style={appointmentStyles.actionButton}
              onPress={onWhatsAppReminder}
            >
              <Text style={appointmentStyles.actionButtonIcon}>💬</Text>
              <Text style={appointmentStyles.actionButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          )}
          
          {appointment.canCancel && onCancel && (
            <TouchableOpacity
              style={[appointmentStyles.actionButton, appointmentStyles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={appointmentStyles.actionButtonIcon}>❌</Text>
              <Text style={[appointmentStyles.actionButtonText, appointmentStyles.cancelButtonText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};