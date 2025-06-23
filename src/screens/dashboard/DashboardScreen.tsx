// screens/dashboard/DashboardScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Animated,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  DashboardHeader,
  ClinicInfoCard,
  NextAppointmentCard,
  WellnessCheckIn,
  RecommendedTreatments,
  VIPUpgradeCard,
} from '../../components/dashboard';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';
import { modernColors, modernSpacing } from '../../styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  
  const {
    dashboardData,
    loading,
    error,
    refreshDashboard,
    markWellnessComplete,
  } = useDashboard(navigation); // ✅

  // Resto del código permanece igual...
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.1, 1],
    extrapolate: 'clamp',
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleAppointmentPress = () => {
    navigation.navigate('Appointments');
  };

  const handleNewAppointment = () => {
    navigation.navigate('BookAppointment');
  };

  const handleCallClinic = () => {
    console.log('Calling clinic...');
  };

  const handleDirections = () => {
    console.log('Getting directions...');
  };

  const handleTreatmentPress = (treatmentId: string) => {
    navigation.navigate('TreatmentDetail', { treatmentId });
  };

  const handleBookTreatment = (treatmentId: string) => {
    navigation.navigate('BookAppointment', { treatmentId });
  };

  const handleVIPUpgrade = () => {
    navigation.navigate('VIPMembership');
  };

  // Resto del código permanece exactamente igual...
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const formatAppointmentTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  if (loading && !dashboardData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={modernColors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      <LinearGradient
        colors={['#FFFFFF', '#FEF7F0', '#FFFCF8']}
        style={styles.gradient}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[modernColors.primary]}
              tintColor={modernColors.primary}
            />
          }
        >
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: headerOpacity,
                transform: [{ scale: headerScale }],
              },
            ]}
          >
            <DashboardHeader
              userName={user?.firstName || 'Usuario'}
              isVIP={user?.vipStatus || false}
              profileImage={user?.profileImage}
              beautyPoints={dashboardData?.beautyPoints || 0}
              onProfilePress={handleProfilePress}
            />
          </Animated.View>

          <View style={styles.section}>
            <ClinicInfoCard
              clinicInfo={{
                name: 'Beauty Center Plaza',
                address: 'Av. Principal 123, Plaza Central',
                phone: '+34 123 456 789',
                schedule: 'Lun-Vie: 9:00-20:00 | Sáb: 10:00-18:00',
                isOpen: true,
              }}
              onCall={handleCallClinic}
              onDirections={handleDirections}
            />
          </View>

          <View style={styles.section}>
            <NextAppointmentCard
              appointment={dashboardData?.nextAppointment || null}
              onAppointmentPress={handleAppointmentPress}
              onModifyPress={handleNewAppointment}
              onDetailsPress={handleAppointmentPress}
              formatAppointmentDate={formatAppointmentDate}
              formatAppointmentTime={formatAppointmentTime}
              userVipStatus={user?.vipStatus || false}
            />
          </View>

          <View style={styles.section}>
            <WellnessCheckIn
              completed={dashboardData?.wellnessCompleted || false}
              currentStreak={dashboardData?.wellnessStreak || 0}
              todayTip={{
                title: 'Hidratación es clave',
                description: 'Bebe al menos 8 vasos de agua al día para mantener tu piel radiante y saludable.',
                icon: '💧',
                category: 'skincare',
              }}
              onComplete={markWellnessComplete}
            />
          </View>

          <View style={styles.sectionNoHorizontalPadding}>
            <View style={styles.sectionHeader}>
              <RecommendedTreatments
                treatments={[
                  {
                    id: '1',
                    name: 'Hydrafacial Premium',
                    description: 'Limpieza profunda con tecnología de punta',
                    price: 120,
                    duration: 60,
                    discount: 20,
                    image: 'https://example.com/hydrafacial.jpg',
                    category: 'facial',
                    isVipExclusive: false,
                  },
                  {
                    id: '2',
                    name: 'Masaje Piedras Calientes',
                    description: 'Relajación total con piedras volcánicas',
                    price: 150,
                    duration: 90,
                    discount: 0,
                    image: 'https://example.com/massage.jpg',
                    category: 'massage',
                    isVipExclusive: true,
                  },
                  {
                    id: '3',
                    name: 'Manicure Spa Deluxe',
                    description: 'Tratamiento completo de manos',
                    price: 80,
                    duration: 45,
                    discount: 15,
                    image: 'https://example.com/manicure.jpg',
                    category: 'manicure',
                    isVipExclusive: false,
                  },
                ]}
                onTreatmentPress={handleTreatmentPress}
                onBookNow={handleBookTreatment}
                userVipStatus={user?.vipStatus || false}
              />
            </View>
          </View>

          {!user?.vipStatus && (
            <View style={styles.section}>
              <VIPUpgradeCard
                userName={user?.firstName || 'Usuario'}
                currentPoints={dashboardData?.beautyPoints || 0}
                onUpgrade={handleVIPUpgrade}
              />
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </Animated.ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingTop: modernSpacing.md,
  },
  section: {
    paddingHorizontal: modernSpacing.lg,
    marginBottom: modernSpacing.lg,
  },
  sectionNoHorizontalPadding: {
    marginBottom: modernSpacing.lg,
  },
  sectionHeader: {
    paddingHorizontal: modernSpacing.lg,
  },
  bottomSpacing: {
    height: modernSpacing.xxl * 2,
  },
});

export default DashboardScreen;