// ============================================================================
// components/appointmentscreen/AppointmentList.tsx
// ============================================================================
import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { modernColors } from '../../styles';
import { appointmentStyles } from './styles';
import { AppointmentCard } from './AppointmentCard';
import { EmptyState } from './EmptyState';
import { Appointment, TabType } from './types';

export interface AppointmentListProps {
  appointments: Appointment[];
  activeTab: TabType;
  refreshing: boolean;
  onRefresh: () => void;
  onBookAppointment: () => void;
  onAppointmentPress: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onWhatsAppReminder: (appointment: Appointment) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  activeTab,
  refreshing,
  onRefresh,
  onBookAppointment,
  onAppointmentPress,
  onReschedule,
  onCancel,
  onWhatsAppReminder,
}) => {
  if (appointments.length === 0) {
    return (
      <EmptyState
        activeTab={activeTab}
        onBookAppointment={onBookAppointment}
      />
    );
  }

  return (
    <ScrollView
      style={appointmentStyles.scrollView}
      contentContainerStyle={appointmentStyles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[modernColors.accent]}
          tintColor={modernColors.accent}
        />
      }
    >
      {appointments.map((appointment, index) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onPress={() => onAppointmentPress(appointment)}
          onReschedule={appointment.canReschedule ? () => onReschedule(appointment) : undefined}
          onCancel={appointment.canCancel ? () => onCancel(appointment) : undefined}
          onWhatsAppReminder={() => onWhatsAppReminder(appointment)}
        />
      ))}
      
      {/* Espaciado final */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};