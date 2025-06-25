import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';

interface AppointmentCardProps {
  appointment?: any;
  onPress?: () => void;
  onNewAppointment: () => void;
  formatDate?: (date: any) => string;
  formatTime?: (time: any) => string;
}

const NextAppointment = ({ appointment, onPress, onNewAppointment, formatDate, formatTime }: AppointmentCardProps) => {
  // 🔍 DEBUG: Ver qué datos están llegando
  console.log('🔍 NextAppointment received:', JSON.stringify(appointment, null, 2));

  // ✅ VALIDACIÓN MEJORADA
  if (!appointment || (Array.isArray(appointment) && appointment.length === 0)) {
    console.log('❌ No appointment data available');
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar" size={24} color={modernColors.accent} />
          <Text style={styles.cardTitle}>Próximo turno</Text>
        </View>
        <View style={styles.noAppointment}>
          <Text style={styles.noAppointmentText}>No tienes turnos programados</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onNewAppointment}>
            <Text style={styles.primaryButtonText}>Agendar cita</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 🔧 MANEJO FLEXIBLE DE DATOS DEL BACKEND
  const appointmentData = Array.isArray(appointment) ? appointment[0] : appointment;
  
  // ✅ EXTRACCIÓN ROBUSTA DE DATOS
  const treatmentName = appointmentData?.treatment?.name 
    || appointmentData?.treatment 
    || appointmentData?.service?.name
    || appointmentData?.service
    || appointmentData?.treatmentName
    || appointmentData?.serviceName
    || 'Tratamiento';

  const professionalName = appointmentData?.professional?.name
    || appointmentData?.professional
    || appointmentData?.provider?.name
    || appointmentData?.provider
    || appointmentData?.professionalName
    || appointmentData?.providerName
    || 'Especialista';

  const appointmentDate = appointmentData?.date 
    || appointmentData?.appointmentDate
    || appointmentData?.scheduled_date
    || appointmentData?.scheduledDate;

  const appointmentTime = appointmentData?.time
    || appointmentData?.appointmentTime
    || appointmentData?.scheduled_time
    || appointmentData?.scheduledTime;

  const appointmentStatus = appointmentData?.status
    || appointmentData?.appointmentStatus
    || appointmentData?.state
    || 'PENDING';

  // 🔍 DEBUG: Ver datos extraídos
  console.log('📋 Extracted data:', {
    treatmentName,
    professionalName,
    appointmentDate,
    appointmentTime,
    appointmentStatus
  });

  // ✅ VALIDAR DATOS MÍNIMOS REQUERIDOS
  if (!appointmentDate && !appointmentTime) {
    console.log('⚠️ Missing required date/time data');
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar" size={24} color={modernColors.accent} />
          <Text style={styles.cardTitle}>Próximo turno</Text>
        </View>
        <View style={styles.noAppointment}>
          <Text style={styles.noAppointmentText}>Error cargando próximo turno</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onNewAppointment}>
            <Text style={styles.primaryButtonText}>Agendar nueva cita</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ✅ FORMATEO SEGURO DE FECHA Y HORA
  const displayDate = formatDate ? formatDate(appointmentDate) : appointmentDate;
  const displayTime = formatTime ? formatTime(appointmentTime) : appointmentTime;

  // ✅ MAPEO DE ESTADOS
  const getStatusInfo = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'confirmed':
      case 'confirmado':
        return { text: 'Confirmado', color: modernColors.success };
      case 'pending':
      case 'pendiente':
        return { text: 'Pendiente', color: modernColors.warning };
      case 'cancelled':
      case 'cancelado':
        return { text: 'Cancelado', color: modernColors.error };
      default:
        return { text: 'Programado', color: modernColors.primary };
    }
  };

  const statusInfo = getStatusInfo(appointmentStatus);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Ionicons name="calendar" size={24} color={modernColors.accent} />
        <Text style={styles.cardTitle}>Próximo turno</Text>
        <Ionicons name="chevron-forward" size={20} color={modernColors.gray400} />
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.appointmentRow}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTreatment}>{treatmentName}</Text>
            <Text style={styles.appointmentProfessional}>
              con {professionalName}
            </Text>
          </View>
          <View style={styles.appointmentTime}>
            <Text style={styles.appointmentDate}>{displayDate}</Text>
            <Text style={styles.appointmentHour}>{displayTime}</Text>
          </View>
        </View>
        
        <View style={styles.appointmentStatus}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>
      </View>

      {/* 🔍 DEBUG: Mostrar datos en desarrollo */}
      {__DEV__ && (
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            🔍 Debug: {JSON.stringify(appointmentData, null, 1)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const NewAppointmentButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.newAppointmentButton} onPress={onPress}>
    <LinearGradient
      colors={[modernColors.primary, modernColors.primaryDark]}
      style={styles.newAppointmentGradient}
    >
      <Ionicons name="add-circle" size={24} color={modernColors.white} />
      <Text style={styles.newAppointmentText}>Agendar nueva cita</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = {
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...modernShadows.small,
  },
  cardHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginLeft: 12,
    flex: 1,
  },
  noAppointment: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },
  noAppointmentText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  primaryButton: {
    backgroundColor: modernColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: modernColors.white,
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
    paddingTop: 16,
  },
  appointmentRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTreatment: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  appointmentProfessional: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  appointmentTime: {
    alignItems: 'flex-end' as const,
  },
  appointmentDate: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  appointmentHour: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.primary,
  },
  appointmentStatus: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
  },
  newAppointmentButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden' as const,
    ...modernShadows.medium,
  },
  newAppointmentGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  newAppointmentText: {
    color: modernColors.white,
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    marginLeft: 12,
  },
  // 🔍 DEBUG STYLES
  debugInfo: {
    marginTop: 12,
    padding: 8,
    backgroundColor: modernColors.gray100,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 10,
    color: modernColors.gray600,
    fontFamily: 'monospace',
  },
};

export { NextAppointment, NewAppointmentButton };