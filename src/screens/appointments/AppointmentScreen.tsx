import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointments, type Appointment, type TabType } from '../../hooks/useAppointments';
import { modernColors, modernTypography } from '../../styles';

// Componentes
import { 
  TabSelector, 
  AppointmentCard, 
  EmptyState, 
  FloatingActionButton 
} from '../../components/appointments/AppointmentComponents';

const AppointmentsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  
  const {
    appointments,
    loading,
    refreshing,
    onRefresh,
    cancelAppointment,
  } = useAppointments();

  // Filtrar citas según el tab activo
  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    if (activeTab === 'upcoming') {
      return appointments.filter(apt => 
        (apt.date >= today && (apt.status === 'CONFIRMED' || apt.status === 'PENDING'))
      ).sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
    } else {
      return appointments.filter(apt => 
        apt.date < today || apt.status === 'COMPLETED' || apt.status === 'CANCELLED'
      ).sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());
    }
  }, [appointments, activeTab]);

  // Funciones de formato
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Hoy';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Mañana';
      } else {
        return date.toLocaleDateString('es-ES', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        });
      }
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      return timeString;
    }
  };

  // Handlers
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    navigation.navigate('AppointmentDetails', { 
      appointmentId: appointment.id 
    });
  };

  const handleCancel = (appointment: Appointment) => {
    Alert.alert(
      'Cancelar cita',
      `¿Estás seguro que deseas cancelar tu cita de ${appointment.treatment}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelAppointment(appointment.id);
              Alert.alert('Cita cancelada', 'Tu cita ha sido cancelada exitosamente.');
            } catch (error) {
              Alert.alert('Error', 'No se pudo cancelar la cita. Intenta nuevamente.');
            }
          },
        },
      ]
    );
  };

  const handleReschedule = (appointment: Appointment) => {
    navigation.navigate('RescheduleAppointment', {
      appointmentId: appointment.id,
      appointmentData: appointment,
    });
  };

  const handleNewAppointment = () => {
    navigation.navigate('BookAppointment');
  };

  // Loading state
  if (loading && !appointments) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>📅</Text>
          <Text style={styles.loadingText}>Cargando tus citas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con flecha de retorno */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Citas</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tabs */}
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenido */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {filteredAppointments.length === 0 ? (
            <EmptyState type={activeTab} onNewAppointment={handleNewAppointment} />
          ) : (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onPress={() => handleAppointmentPress(appointment)}
                onCancel={() => handleCancel(appointment)}
                onReschedule={() => handleReschedule(appointment)}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <FloatingActionButton onPress={handleNewAppointment} />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
    backgroundColor: modernColors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.gray100,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 12,
  },
  backIcon: {
    fontSize: 20,
    color: modernColors.text,
    fontWeight: '600' as const,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '700' as const,
    color: modernColors.text,
    flex: 1,
  },
  headerSpacer: {
    width: 40, // Para equilibrar el botón de atrás
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Espacio para FAB
  },
};

export default AppointmentsScreen;