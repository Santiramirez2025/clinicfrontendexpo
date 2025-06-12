// src/screens/dashboard/DashboardScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  useColorScheme,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const { width } = Dimensions.get('window');

// Paleta de colores elegante con modo oscuro
const lightColors = {
  lavender: '#F5F3FF',
  nude: '#F7F5F3',
  rosePale: '#FBEEF5',
  warmWhite: '#FEFDFB',
  jade: '#85C4A6',
  gold: '#D4AF37',
  softGray: '#A8A8A8',
  charcoal: '#3A3A3A',
  pearl: '#F9F7F4',
  blush: '#F4E6E1',
  sage: '#C8D5B9',
};

const darkColors = {
  lavender: '#2A2A3E',
  nude: '#3A3A3A',
  rosePale: '#3E2A3A',
  warmWhite: '#2E2E30',
  jade: '#6FA488',
  gold: '#B8941F',
  softGray: '#8A8A8A',
  charcoal: '#E8E8E8',
  pearl: '#353535',
  blush: '#3E3A37',
  sage: '#A0B391',
};

interface Treatment {
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  popular?: boolean;
}

const DashboardScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [showFAB, setShowFAB] = useState(false);
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fabScale = useRef(new Animated.Value(0)).current;
  
  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    // Animación de entrada suave
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Mostrar FAB después de un momento
    setTimeout(() => {
      setShowFAB(true);
      Animated.spring(fabScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  // Mock data elegante
  const patientData = {
    name: user?.name?.split(' ')[0] || 'María',
    vipMember: true,
    loyaltyPoints: 240,
    nextAppointment: {
      date: '20 Jun',
      time: '15:30',
      treatment: 'Facial Signature',
      specialist: 'Carmen',
    },
    skinGoals: ['Hidratación', 'Luminosidad'],
    wellnessTips: [
      { icon: '🌅', tip: 'Agua tibia con limón al despertar' },
      { icon: '🌙', tip: 'Sérum reparador antes de dormir' },
    ],
  };

  const featuredTreatments: Treatment[] = [
    { 
      name: 'Facial Signature', 
      description: 'Limpieza profunda y nutrición', 
      price: '€85', 
      duration: '60 min',
      icon: '✨',
      popular: true
    },
    { 
      name: 'Glow Therapy', 
      description: 'Luminosidad natural', 
      price: '€70', 
      duration: '45 min',
      icon: '🌸'
    },
    { 
      name: 'Anti-Age Ritual', 
      description: 'Reafirmante y regenerador', 
      price: '€120', 
      duration: '75 min',
      icon: '🕊'
    },
  ];

  const handleBookAppointment = () => {
    Vibration.vibrate(50); // Feedback táctil sutil
    Alert.alert('Nueva Cita', 'Te guiamos para reservar tu próximo momento de bienestar');
  };

  const handleViewTreatment = (treatment: Treatment) => {
    Vibration.vibrate(30);
    Alert.alert(
      `${treatment.name}`,
      `${treatment.description}\n\n⏱ ${treatment.duration}\n💫 ${treatment.price}\n\n¿Te gustaría reservar este momento especial?`,
      [
        { text: 'Más detalles', style: 'cancel' },
        { text: 'Reservar', onPress: handleBookAppointment },
      ]
    );
  };

  const handleLoyaltyProgram = () => {
    Vibration.vibrate(30);
    Alert.alert('Beauty Points', `Tienes ${patientData.loyaltyPoints} puntos ✨\n\nEstás a un paso de tu próximo mimo exclusivo.`);
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Ocultar/mostrar FAB según scroll
    if (scrollY > 200 && !showFAB) {
      setShowFAB(true);
      Animated.spring(fabScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  };

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.charcoal }]}>{title}</Text>
      {subtitle && <Text style={[styles.sectionSubtitle, { color: colors.softGray }]}>{subtitle}</Text>}
    </View>
  );

  const TreatmentCard = ({ treatment, index }: { treatment: Treatment; index: number }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 150,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={[{ opacity: cardAnim }]}>
        <TouchableOpacity 
          style={[
            styles.treatmentCard, 
            { backgroundColor: colors.warmWhite },
            treatment.popular && { borderColor: colors.gold }
          ]}
          onPress={() => handleViewTreatment(treatment)}
          activeOpacity={0.8}
        >
          {treatment.popular && (
            <View style={[styles.popularBadge, { backgroundColor: colors.gold }]}>
              <Text style={styles.popularText}>Favorito</Text>
            </View>
          )}
          <View style={[styles.treatmentIcon, { backgroundColor: colors.blush }]}>
            <Text style={styles.iconText}>{treatment.icon}</Text>
          </View>
          <Text style={[styles.treatmentName, { color: colors.charcoal }]}>{treatment.name}</Text>
          <Text style={[styles.treatmentDescription, { color: colors.softGray }]}>{treatment.description}</Text>
          <View style={styles.treatmentFooter}>
            <Text style={[styles.treatmentDuration, { color: colors.softGray }]}>{treatment.duration}</Text>
            <Text style={[styles.treatmentPrice, { color: colors.jade }]}>{treatment.price}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const WellnessPill = ({ goal, index }: { goal: string; index: number }) => (
    <View style={[styles.wellnessPill, { backgroundColor: colors.sage }]}>
      <Text style={[styles.wellnessPillText, { color: colors.charcoal }]}>{goal}</Text>
    </View>
  );

  const WellnessTip = ({ tip, index }: { tip: any; index: number }) => (
    <View style={[styles.tipItem, { backgroundColor: colors.pearl }]}>
      <Text style={styles.tipIcon}>{tip.icon}</Text>
      <Text style={[styles.tipText, { color: colors.charcoal }]}>{tip.tip}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lavender }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header de bienvenida elegante */}
        <Animated.View 
          style={[
            styles.welcomeSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={[styles.greeting, { color: colors.charcoal }]}>Hola, {patientData.name}</Text>
          <Text style={[styles.welcomeMessage, { color: colors.softGray }]}>
            Tu piel está radiante, sigamos cuidándola juntas ✨
          </Text>
          
          {patientData.vipMember && (
            <View style={[styles.vipBadge, { backgroundColor: colors.gold }]}>
              <Text style={styles.vipText}>✨ Miembro Especial</Text>
            </View>
          )}
        </Animated.View>

        {/* Tu cita */}
        <View style={styles.section}>
          <SectionHeader 
            title="Tu próximo momento" 
            subtitle="Reservado para vos. Tu momento de cuidado empieza pronto."
          />
          
          <Animated.View 
            style={[
              styles.appointmentCard,
              { backgroundColor: colors.warmWhite, opacity: fadeAnim }
            ]}
          >
            <View style={styles.appointmentHeader}>
              <View style={styles.dateContainer}>
                <Text style={[styles.appointmentDate, { color: colors.jade }]}>{patientData.nextAppointment.date}</Text>
                <Text style={[styles.appointmentTime, { color: colors.softGray }]}>{patientData.nextAppointment.time}</Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={[styles.appointmentTreatment, { color: colors.charcoal }]}>{patientData.nextAppointment.treatment}</Text>
                <Text style={[styles.appointmentSpecialist, { color: colors.softGray }]}>con {patientData.nextAppointment.specialist}</Text>
              </View>
            </View>
            
            <View style={styles.appointmentActions}>
              <TouchableOpacity 
                style={[styles.rescheduleButton, { backgroundColor: colors.pearl }]}
                activeOpacity={0.7}
              >
                <Text style={[styles.rescheduleText, { color: colors.charcoal }]}>Cambiar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.confirmButton, { backgroundColor: colors.jade }]}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Beauty Points */}
        <View style={styles.section}>
          <SectionHeader 
            title="Beauty Points" 
            subtitle="Estás a un paso de tu próximo mimo exclusivo."
          />
          
          <TouchableOpacity 
            style={[styles.pointsCard, { backgroundColor: colors.warmWhite }]} 
            onPress={handleLoyaltyProgram}
            activeOpacity={0.8}
          >
            <View style={styles.pointsContent}>
              <Text style={[styles.pointsNumber, { color: colors.gold }]}>{patientData.loyaltyPoints}</Text>
              <Text style={[styles.pointsLabel, { color: colors.softGray }]}>puntos acumulados</Text>
            </View>
            <View style={[styles.pointsIcon, { backgroundColor: colors.blush }]}>
              <Text style={styles.pointsEmoji}>💎</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bienestar diario (combinado) */}
        <View style={styles.section}>
          <SectionHeader 
            title="Bienestar diario" 
            subtitle="Pequeños rituales que hacen la diferencia."
          />
          
          {/* Enfoque actual */}
          <View style={styles.wellnessContainer}>
            <Text style={[styles.subsectionTitle, { color: colors.charcoal }]}>Tu enfoque</Text>
            <View style={styles.wellnessPillsContainer}>
              {patientData.skinGoals.map((goal, index) => (
                <WellnessPill key={index} goal={goal} index={index} />
              ))}
            </View>
          </View>

          {/* Rituales */}
          <View style={styles.wellnessContainer}>
            <Text style={[styles.subsectionTitle, { color: colors.charcoal }]}>Rituales de hoy</Text>
            <View style={styles.tipsContainer}>
              {patientData.wellnessTips.map((tip, index) => (
                <WellnessTip key={index} tip={tip} index={index} />
              ))}
            </View>
          </View>
        </View>

        {/* Tratamientos para ti */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <SectionHeader title="Para ti" />
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.jade }]}>Ver más</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.treatmentsScroll}
          >
            {featuredTreatments.map((treatment, index) => (
              <TreatmentCard key={index} treatment={treatment} index={index} />
            ))}
          </ScrollView>
        </View>

        {/* CTA principal elegante */}
        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={[styles.mainCTA, { backgroundColor: colors.jade }]} 
            onPress={handleBookAppointment}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaText}>Reservar nueva cita</Text>
            <Text style={styles.ctaSubtext}>Elegí el cuidado que te merecés hoy.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* FAB (Floating Action Button) */}
      {showFAB && (
        <Animated.View 
          style={[
            styles.fab,
            { backgroundColor: colors.jade },
            { transform: [{ scale: fabScale }] }
          ]}
        >
          <TouchableOpacity 
            style={styles.fabButton}
            onPress={handleBookAppointment}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>💆‍♀️</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  welcomeMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
    fontWeight: '300',
  },
  vipBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  vipText: {
    color: '#FEFDFB',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  appointmentCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 70,
  },
  appointmentDate: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '300',
  },
  appointmentDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  appointmentTreatment: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  appointmentSpecialist: {
    fontSize: 14,
    fontWeight: '300',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FEFDFB',
    fontSize: 14,
    fontWeight: '500',
  },
  pointsCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  pointsContent: {
    flex: 1,
  },
  pointsNumber: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '300',
  },
  pointsIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsEmoji: {
    fontSize: 20,
  },
  wellnessContainer: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  wellnessPillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wellnessPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  wellnessPillText: {
    fontSize: 14,
    fontWeight: '400',
  },
  tipsContainer: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '300',
    flex: 1,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  treatmentsScroll: {
    paddingRight: 24,
  },
  treatmentCard: {
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
  },
  popularText: {
    color: '#FEFDFB',
    fontSize: 10,
    fontWeight: '500',
  },
  treatmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  treatmentDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
    fontWeight: '300',
  },
  treatmentFooter: {
    alignItems: 'center',
  },
  treatmentDuration: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '300',
  },
  treatmentPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: 24,
  },
  mainCTA: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    color: '#FEFDFB',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  ctaSubtext: {
    color: '#FEFDFB',
    fontSize: 12,
    fontWeight: '300',
    opacity: 0.9,
    fontStyle: 'italic',
  },
  bottomSpacing: {
    height: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabButton: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: 24,
  },
});

export default DashboardScreen;