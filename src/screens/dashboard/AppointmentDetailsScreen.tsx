import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';
import { appointmentAPI, handleApiError } from '../../services/api';

interface AppointmentDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      appointmentId: string;
      appointment?: any; // Si viene del dashboard
    };
  };
}

const AppointmentDetailsScreen = ({ navigation, route }: AppointmentDetailsScreenProps) => {
  const { appointmentId, appointment: passedAppointment } = route.params;
  const [appointment, setAppointment] = useState(passedAppointment || null);
  const [loading, setLoading] = useState(!passedAppointment);

  useEffect(() => {
    if (!appointment) {
      loadAppointmentDetails();
    }
  }, [appointmentId]);

  const loadAppointmentDetails = async () => {
    try {
      setLoading(true);
      const response = await appointmentAPI.getDetails(appointmentId);
      
      if (response.success) {
        setAppointment(response.data.appointment);
      }
    } catch (error) {
      const errorMessage = handleApiError(error, 'Error al cargar los detalles');
      Alert.alert('Error', errorMessage);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    const phone = '+54 11 1234-5678'; // Del backend en el futuro
    Linking.openURL(`tel:${phone}`);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar cita',
      '¿Estás segura de que quieres cancelar esta cita?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí, cancelar', style: 'destructive', onPress: confirmCancel }
      ]
    );
  };

  const confirmCancel = async () => {
    try {
      await appointmentAPI.cancel(appointmentId);
      Alert.alert('Cita cancelada', 'Tu cita ha sido cancelada exitosamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      const errorMessage = handleApiError(error, 'Error al cancelar la cita');
      Alert.alert('Error', errorMessage);
    }
  };

  const handleReschedule = () => {
    navigation.navigate('BookAppointment', { 
      reschedule: true, 
      appointmentId 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED': return modernColors.success;
      case 'PENDING': return modernColors.warning;
      case 'CANCELLED': return modernColors.error;
      default: return modernColors.primary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED': return 'Confirmado';
      case 'PENDING': return 'Pendiente';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return timeString.substring(0, 5); // "14:30:00" -> "14:30"
    } catch {
      return timeString;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={modernColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles de la cita</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={modernColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cita no encontrada</Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={modernColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de la cita</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Estado */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(appointment.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
            {getStatusText(appointment.status)}
          </Text>
        </View>

        {/* Información principal */}
        <View style={styles.card}>
          <View style={styles.treatmentHeader}>
            <Text style={styles.treatmentEmoji}>💆‍♀️</Text>
            <View style={styles.treatmentInfo}>
              <Text style={styles.treatmentName}>
                {appointment.treatment?.name || appointment.treatment}
              </Text>
              <Text style={styles.treatmentDuration}>
                {appointment.treatment?.duration || appointment.durationMinutes} minutos
              </Text>
            </View>
          </View>
        </View>

        {/* Fecha y hora */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color={modernColors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Fecha</Text>
              <Text style={styles.infoValue}>
                {formatDate(appointment.scheduledDate || appointment.date)}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time" size={20} color={modernColors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Hora</Text>
              <Text style={styles.infoValue}>
                {formatTime(appointment.scheduledTime || appointment.time)}
              </Text>
            </View>
          </View>
        </View>

        {/* Profesional */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={20} color={modernColors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Profesional</Text>
              <Text style={styles.infoValue}>
                {appointment.professional?.name || appointment.professional}
              </Text>
            </View>
          </View>
        </View>

        {/* Clínica */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={20} color={modernColors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Clínica</Text>
              <Text style={styles.infoValue}>
                {appointment.clinic?.name || appointment.clinic}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call" size={16} color={modernColors.primary} />
            <Text style={styles.actionButtonText}>Llamar</Text>
          </TouchableOpacity>
        </View>

        {/* Notas */}
        {appointment.notes && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notas</Text>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        )}

        {/* Botones de acción */}
        {appointment.status !== 'CANCELLED' && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleReschedule}>
              <Ionicons name="calendar" size={20} color={modernColors.primary} />
              <Text style={styles.secondaryButtonText}>Reprogramar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dangerButton} onPress={handleCancel}>
              <Ionicons name="close-circle" size={20} color={modernColors.white} />
              <Text style={styles.dangerButtonText}>Cancelar cita</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 24,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
  },
  card: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...modernShadows.small,
  },
  treatmentHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  treatmentEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '700' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  treatmentDuration: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  infoRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: modernColors.primaryLight + '20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.primary,
    fontWeight: '500' as const,
    marginLeft: 4,
  },
  cardTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 12,
  },
  notesText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    lineHeight: 22,
  },
  actionsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  secondaryButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: modernColors.surface,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: modernColors.primary,
    ...modernShadows.small,
  },
  secondaryButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.primary,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
  dangerButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: modernColors.error,
    paddingVertical: 16,
    borderRadius: 12,
    ...modernShadows.small,
  },
  dangerButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.white,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
};

export default AppointmentDetailsScreen;