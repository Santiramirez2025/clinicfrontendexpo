import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../../hooks/useDashboard';
import { modernColors, modernTypography } from '../../styles';

// Componentes
import WelcomeHeader from '../../components/dashboard/WelcomeHeader';
import { NextAppointment, NewAppointmentButton } from '../../components/dashboard/AppointmentCard';
import { BeautyPointsCard, FeaturedTreatments, WellnessTip } from '../../components/dashboard/PointsAndTreatments';

const DashboardScreen = ({ navigation }: any) => {
  const {
    dashboardData,
    loading,
    refreshing,
    user,
    error,
    selectedClinic,
    handleNewAppointment,
    handleNextAppointmentPress,
    handleChangeClinic,
    handleProfilePress,
    handleBeautyPointsPress,
    handleTreatmentPress,
    handleSeeAllTreatments,
    onRefresh,
    formatAppointmentDate,
    formatAppointmentTime,
    retryLoad
  } = useDashboard(navigation);

  if (loading && !dashboardData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>💆‍♀️</Text>
          <Text style={styles.loadingText}>Cargando tu espacio de belleza...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !dashboardData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>⚠️</Text>
          <Text style={styles.errorTitle}>Algo salió mal</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retryLoad}>
            <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <WelcomeHeader
            user={user}
            onProfilePress={handleProfilePress}
            selectedClinic={selectedClinic}
            onChangeClinic={handleChangeClinic}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.appointmentSection}>
            <NextAppointment
              appointment={dashboardData?.nextAppointment}
              onPress={handleNextAppointmentPress}
              onNewAppointment={handleNewAppointment}
              formatDate={formatAppointmentDate}
              formatTime={formatAppointmentTime}
            />

            <NewAppointmentButton onPress={handleNewAppointment} />
          </View>

          <View style={styles.pointsSection}>
            <BeautyPointsCard 
              user={dashboardData?.user || user} 
              onPress={handleBeautyPointsPress} 
            />
          </View>

          <View style={styles.treatmentsSection}>
            <FeaturedTreatments
              treatments={dashboardData?.featuredTreatments}
              onTreatmentPress={handleTreatmentPress}
              onSeeAll={handleSeeAllTreatments}
            />
          </View>

          <View style={styles.wellnessSection}>
            <WellnessTip tip={dashboardData?.wellnessTip} />
          </View>

          {/* Espaciado para navbar */}
          <View style={styles.navbarSpacer} />
        </View>
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  errorText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center' as const,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: modernColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: modernColors.white,
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: modernColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentSection: {
    marginTop: 15,
    marginBottom: 25,
  },
  pointsSection: {
    marginBottom: 25,
  },
  treatmentsSection: {
    marginBottom: 30,
  },
  wellnessSection: {
    marginBottom: 30,
  },
  navbarSpacer: {
    height: 140, // Más espacio para navbar elegante + margen
    backgroundColor: 'transparent',
  },
};

export default DashboardScreen;