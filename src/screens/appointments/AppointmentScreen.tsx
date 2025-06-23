// screens/appointments/AppointmentsScreen.tsx
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  AppointmentHeader,
  AppointmentTabs,
  AppointmentCard,
  AppointmentFAB,
  EmptyState,
} from '../../components/appointments';
import { useAppointments } from '../../hooks/useAppointments';
import { modernColors, modernSpacing } from '../../styles';
import { Appointment, AppointmentTab } from '../../../types/appointment';

export const AppointmentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming');
  const [refreshing, setRefreshing] = useState(false);
  
  const {
    appointments,
    loading,
    error,
    fetchAppointments,
    cancelAppointment,
    rescheduleAppointment,
  } = useAppointments();

  // Filtrar appointments según la pestaña activa
  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= now && apt.status !== 'CANCELLED';
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      return appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate < now || apt.status === 'CANCELLED';
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [appointments, activeTab]);

  // Handlers
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  }, [fetchAppointments]);

  const handleNewAppointment = useCallback(() => {
    // Navegar a la pantalla de nuevo appointment
    console.log('Navigate to new appointment screen');
  }, []);

  const handleReschedule = useCallback(async (appointmentId: string) => {
    try {
      await rescheduleAppointment(appointmentId);
      // Mostrar modal de reprogramación o navegar
    } catch (error) {
      console.error('Error rescheduling:', error);
    }
  }, [rescheduleAppointment]);

  const handleCancel = useCallback(async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId);
      // Mostrar confirmación
    } catch (error) {
      console.error('Error cancelling:', error);
    }
  }, [cancelAppointment]);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={modernColors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FEF7F0', '#FFFCF8']}
        style={styles.gradient}
      >
        {/* Header */}
        <AppointmentHeader 
          title="Mis Turnos"
          onNewAppointment={handleNewAppointment}
        />

        {/* Tabs */}
        <AppointmentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          upcomingCount={filteredAppointments.length}
        />

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[modernColors.primary]}
              tintColor={modernColors.primary}
            />
          }
        >
          {filteredAppointments.length === 0 ? (
            <EmptyState
              type={activeTab}
              onAction={handleNewAppointment}
            />
          ) : (
            <View style={styles.appointmentsList}>
              {filteredAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={() => handleReschedule(appointment.id)}
                  onCancel={() => handleCancel(appointment.id)}
                  isFirst={index === 0}
                  isLast={index === filteredAppointments.length - 1}
                  isPast={activeTab === 'history'}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* FAB */}
        <AppointmentFAB onPress={handleNewAppointment} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: modernSpacing.xxl * 3, // Espacio para FAB
  },
  appointmentsList: {
    paddingHorizontal: modernSpacing.lg,
    paddingTop: modernSpacing.md,
  },
});

export default AppointmentsScreen;