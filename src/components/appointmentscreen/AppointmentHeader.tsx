// ============================================================================
// components/appointmentscreen/AppointmentHeader.tsx
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { appointmentStyles } from './styles';

export interface AppointmentHeaderProps {
  onBookAppointment: () => void;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({ onBookAppointment }) => {
  return (
    <View style={appointmentStyles.header}>
      <View style={appointmentStyles.headerTop}>
        <Text style={appointmentStyles.headerTitle}>Mis Citas</Text>
        <TouchableOpacity
          style={appointmentStyles.addButton}
          onPress={onBookAppointment}
          activeOpacity={0.7}
        >
          <Text style={appointmentStyles.addButtonIcon}>➕</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={appointmentStyles.headerSubtitle}>
        Gestiona y programa tus citas de belleza
      </Text>
    </View>
  );
};