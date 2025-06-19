// ============================================================================
// components/appointmentscreen/EmptyState.tsx
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { appointmentStyles } from './styles';
import { TabType } from './types';

export interface EmptyStateProps {
  activeTab: TabType;
  onBookAppointment: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeTab, onBookAppointment }) => {
  const getEmptyStateConfig = () => {
    switch (activeTab) {
      case 'upcoming':
        return {
          icon: '📅',
          title: 'No tienes citas próximas',
          subtitle: '¿Qué tal si agendamos tu próximo momento de bienestar?',
          actionText: 'Agendar cita',
          showAction: true
        };
      case 'past':
        return {
          icon: '✨',
          title: 'Aún no tienes historial',
          subtitle: 'Aquí aparecerán tus citas completadas y sus resultados',
          actionText: 'Agendar primera cita',
          showAction: true
        };
      case 'cancelled':
        return {
          icon: '🌿',
          title: 'No hay citas canceladas',
          subtitle: 'Mantén un registro perfecto de asistencia',
          actionText: '',
          showAction: false
        };
      default:
        return {
          icon: '💆‍♀️',
          title: 'No hay citas',
          subtitle: 'Comienza tu viaje de bienestar',
          actionText: 'Agendar cita',
          showAction: true
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <View style={appointmentStyles.emptyState}>
      <Text style={appointmentStyles.emptyStateIcon}>{config.icon}</Text>
      <Text style={appointmentStyles.emptyStateTitle}>{config.title}</Text>
      <Text style={appointmentStyles.emptyStateSubtitle}>{config.subtitle}</Text>
      
      {config.showAction && (
        <TouchableOpacity
          style={appointmentStyles.emptyStateButton}
          onPress={onBookAppointment}
          activeOpacity={0.8}
        >
          <Text style={appointmentStyles.emptyStateButtonText}>{config.actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};