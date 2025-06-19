// ============================================================================
// screens/AppointmentScreen.tsx - SCREEN PRINCIPAL LISTO PARA USAR
// ============================================================================
import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Importar sistema de estilos
import { modernColors } from '../../styles';

// Importar custom hook
import { useAppointments } from '../../hooks/useAppointments';

// Importar componentes modularizados
import {
  LoadingScreen,
  AppointmentHeader,
  AppointmentTabs,
  AppointmentList,
  AppointmentDetailModal,
  appointmentStyles
} from '../../components/appointmentscreen';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
const AppointmentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Custom hook con toda la lógica
  const {
    // Estados
    appointments,
    loading,
    refreshing,
    activeTab,
    selectedAppointment,
    detailsModalVisible,
    sections,
    currentSection,

    // Setters
    setActiveTab,
    setDetailsModalVisible,

    // Funciones
    loadAppointments,
    onRefresh,
    handleRescheduleAppointment,
    handleCancelAppointment,
    handleWhatsAppReminder,
    handleAppointmentPress,
  } = useAppointments();

  // ============================================================================
  // HANDLERS ESPECÍFICOS DE NAVEGACIÓN
  // ============================================================================
  const handleBookAppointment = () => {
    navigation.navigate('BookAppointment');
  };

  const handleReschedule = (appointment: any) => {
    handleRescheduleAppointment(appointment, navigation);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={appointmentStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={modernColors.backgroundWarm} />
      
      {/* Header */}
      <AppointmentHeader onBookAppointment={handleBookAppointment} />

      {/* Tabs */}
      <AppointmentTabs
        sections={sections}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      <View style={appointmentStyles.content}>
        <AppointmentList
          appointments={currentSection?.data || []}
          activeTab={activeTab}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onBookAppointment={handleBookAppointment}
          onAppointmentPress={handleAppointmentPress}
          onReschedule={handleReschedule}
          onCancel={handleCancelAppointment}
          onWhatsAppReminder={handleWhatsAppReminder}
        />
      </View>

      {/* Modal de detalles */}
      <AppointmentDetailModal
        visible={detailsModalVisible}
        appointment={selectedAppointment}
        onClose={() => setDetailsModalVisible(false)}
        onReschedule={handleReschedule}
        onCancel={handleCancelAppointment}
        onWhatsAppReminder={handleWhatsAppReminder}
      />
    </SafeAreaView>
  );
};

export default AppointmentScreen;