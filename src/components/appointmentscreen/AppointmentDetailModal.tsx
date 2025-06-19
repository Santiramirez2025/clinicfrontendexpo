// ============================================================================
// components/appointmentscreen/AppointmentDetailModal.tsx
// ============================================================================
import React from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { appointmentStyles } from './styles';
import { AppointmentCard } from './AppointmentCard';
import { Appointment } from './types';

export interface AppointmentDetailModalProps {
  visible: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onWhatsAppReminder: (appointment: Appointment) => void;
}

export const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
  visible,
  appointment,
  onClose,
  onReschedule,
  onCancel,
  onWhatsAppReminder,
}) => {
  if (!appointment) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={appointmentStyles.modalContainer}>
        <View style={appointmentStyles.modalHeader}>
          <Text style={appointmentStyles.modalTitle}>Detalles de la Cita</Text>
          <TouchableOpacity
            style={appointmentStyles.modalCloseButton}
            onPress={onClose}
          >
            <Text style={appointmentStyles.modalCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={appointmentStyles.modalContent}>
          <AppointmentCard
            appointment={appointment}
            onPress={() => {}}
            onReschedule={appointment.canReschedule ? () => {
              onClose();
              onReschedule(appointment);
            } : undefined}
            onCancel={appointment.canCancel ? () => {
              onClose();
              onCancel(appointment);
            } : undefined}
            onWhatsAppReminder={() => onWhatsAppReminder(appointment)}
          />
          
          {/* Información adicional */}
          <View style={appointmentStyles.additionalInfo}>
            <Text style={appointmentStyles.additionalInfoTitle}>Información Adicional</Text>
            
            <View style={appointmentStyles.infoRow}>
              <Text style={appointmentStyles.infoLabel}>Precio:</Text>
              <Text style={appointmentStyles.infoValue}>${appointment.treatment.price}</Text>
            </View>
            
            <View style={appointmentStyles.infoRow}>
              <Text style={appointmentStyles.infoLabel}>Duración:</Text>
              <Text style={appointmentStyles.infoValue}>{appointment.treatment.duration} minutos</Text>
            </View>
            
            <View style={appointmentStyles.infoRow}>
              <Text style={appointmentStyles.infoLabel}>Creada:</Text>
              <Text style={appointmentStyles.infoValue}>
                {new Date(appointment.createdAt).toLocaleDateString('es-AR')}
              </Text>
            </View>
            
            {appointment.beautyPointsEarned > 0 && (
              <View style={appointmentStyles.infoRow}>
                <Text style={appointmentStyles.infoLabel}>Beauty Points:</Text>
                <Text style={appointmentStyles.infoValue}>+{appointment.beautyPointsEarned} 💎</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
