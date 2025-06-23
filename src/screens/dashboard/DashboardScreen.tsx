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
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing } from '../../styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dashboard simplificado y funcional
const DashboardScreen: React.FC<any> = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Usuario mock por ahora
  const user = { 
    firstName: 'María', 
    vipStatus: false,
    beautyPoints: 1250 
  };

  // Datos mock del dashboard
  const dashboardData = {
    nextAppointment: {
      id: '1',
      treatment: 'Limpieza Facial Profunda',
      date: '2024-06-25',
      time: '10:00:00',
      professional: 'Dra. García',
      clinic: 'Beauty Center',
      status: 'CONFIRMED' as const,
    },
    clinicInfo: {
      name: 'Beauty Center Plaza',
      address: 'Av. Principal 123',
      phone: '+34 123 456 789',
      schedule: 'Lun-Vie: 9:00-20:00',
      isOpen: true,
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simular carga
    setTimeout(() => setRefreshing(false), 1000);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={modernColors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <LinearGradient
        colors={['#FFFFFF', '#FEF7F0', '#FFFCF8'] as const}
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
          {/* Header Simple */}
          <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
            <View>
              <Text style={styles.greeting}>Buenos días,</Text>
              <Text style={styles.userName}>{user.firstName}</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>💎 {user.beautyPoints} puntos</Text>
              </View>
            </View>
          </Animated.View>

          {/* Info Clínica */}
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📍 {dashboardData.clinicInfo.name}</Text>
              <Text style={styles.cardText}>{dashboardData.clinicInfo.address}</Text>
              <Text style={styles.cardText}>📞 {dashboardData.clinicInfo.phone}</Text>
              <Text style={styles.cardText}>🕐 {dashboardData.clinicInfo.schedule}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {dashboardData.clinicInfo.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                </Text>
              </View>
            </View>
          </View>

          {/* Próxima Cita */}
          <View style={styles.section}>
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentLabel}>Próxima cita</Text>
                <View style={[styles.statusBadge, styles.confirmedBadge]}>
                  <Text style={styles.statusText}>✓ Confirmada</Text>
                </View>
              </View>
              
              <Text style={styles.appointmentTitle}>
                {dashboardData.nextAppointment.treatment}
              </Text>
              <Text style={styles.appointmentInfo}>
                📅 25 de Junio • 10:00 AM
              </Text>
              <Text style={styles.appointmentInfo}>
                👩‍⚕️ {dashboardData.nextAppointment.professional}
              </Text>
              
              <View style={styles.appointmentActions}>
                <View style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Modificar</Text>
                </View>
                <View style={styles.primaryButton}>
                  <LinearGradient
                    colors={[modernColors.primary, '#E8956B'] as const}
                    style={styles.primaryButtonGradient}
                  >
                    <Text style={styles.primaryButtonText}>Ver detalles</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>

          {/* Check-in Bienestar */}
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>☀️ Check-in Diario</Text>
              <Text style={styles.cardSubtitle}>Mantén tu rutina de bienestar</Text>
              
              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>💧 Tip del día</Text>
                <Text style={styles.tipText}>
                  Bebe al menos 8 vasos de agua al día para mantener tu piel radiante
                </Text>
              </View>
              
              <View style={styles.checkInButton}>
                <LinearGradient
                  colors={[modernColors.primary, '#E8956B'] as const}
                  style={styles.checkInGradient}
                >
                  <Text style={styles.checkInText}>Hacer Check-in</Text>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* CTA VIP */}
          {!user.vipStatus && (
            <View style={styles.section}>
              <LinearGradient
                colors={['#FFD700', '#FFA500', '#FF8C00'] as const}
                style={styles.vipCard}
              >
                <Text style={styles.vipEmoji}>👑</Text>
                <Text style={styles.vipTitle}>
                  {user.firstName}, es hora de brillar
                </Text>
                <Text style={styles.vipSubtitle}>
                  Únete al Club VIP y duplica tus puntos
                </Text>
                
                <View style={styles.vipButton}>
                  <Text style={styles.vipButtonText}>Descubre el Club VIP</Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Botón Flotante de Reservar */}
          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => {
                if (navigation?.navigate) {
                  navigation.navigate('Appointments');
                }
              }}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[modernColors.primary, '#E8956B', '#D6845A'] as const}
                style={styles.floatingButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.floatingButtonIcon}>+</Text>
                <Text style={styles.floatingButtonText}>Reservar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

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
  header: {
    padding: modernSpacing.lg,
    paddingTop: modernSpacing.xl,
  },
  greeting: {
    fontSize: 16,
    color: modernColors.gray600,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: modernColors.gray900,
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: modernSpacing.lg,
    marginBottom: modernSpacing.lg,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: modernSpacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: modernColors.gray900,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: modernColors.gray600,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: modernColors.gray700,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: modernColors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: modernColors.gray700,
  },
  appointmentCard: {
    backgroundColor: '#E8F5F1',
    borderRadius: 16,
    padding: modernSpacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentLabel: {
    fontSize: 12,
    color: modernColors.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  confirmedBadge: {
    backgroundColor: modernColors.success + '20',
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: modernColors.gray900,
    marginBottom: 12,
  },
  appointmentInfo: {
    fontSize: 14,
    color: modernColors.gray700,
    marginBottom: 6,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: modernColors.gray300,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: modernColors.gray50,
    padding: modernSpacing.md,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: modernColors.gray700,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: modernColors.gray600,
    lineHeight: 20,
  },
  checkInButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkInGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  vipCard: {
    borderRadius: 16,
    padding: modernSpacing.xl,
    alignItems: 'center',
    shadowColor: modernColors.vip,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  vipEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  vipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  vipSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  vipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  vipButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: modernColors.vip,
  },
  bottomSpacing: {
    height: 160, // Aumentado para dar espacio al botón flotante
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 90, // Aumentado para que esté sobre la navbar
    right: 20,
    zIndex: 999,
  },
  floatingButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: modernColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  floatingButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  floatingButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default DashboardScreen;