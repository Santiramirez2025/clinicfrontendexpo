// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';

// Paleta de colores elegante y relajante
const colors = {
  lavender: '#F5F3FF',          // Lavanda suave de fondo
  nude: '#F7F5F3',             // Nude cálido
  rosePale: '#FBEEF5',         // Rosa palo
  warmWhite: '#FEFDFB',        // Blanco cálido
  jade: '#85C4A6',             // Verde jade sutil
  gold: '#D4AF37',             // Dorado elegante
  softGray: '#A8A8A8',         // Gris suave para texto
  charcoal: '#3A3A3A',         // Carbón para títulos
  pearl: '#F9F7F4',            // Perla para cards
  blush: '#F4E6E1',            // Rubor suave
  sage: '#C8D5B9',             // Salvia para acentos
  cream: '#F8F6F0',            // Crema suave
};

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Settings para paciente
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    beautifulMoments: true,
    personalizedTips: true,
    specialOffers: false,
  });

  // Mock data elegante
  const patientData = {
    name: user?.name || 'María',
    email: user?.email || 'maria@email.com',
    phone: '+34 612 345 678',
    memberSince: '2023',
    vipMember: true,
    nextMoment: {
      date: '20 Jun',
      treatment: 'Facial Luminoso',
    },
    skinProfile: {
      type: 'Mixta',
      focus: ['Hidratación', 'Luminosidad'],
      specialist: 'Carmen',
    },
    beautyJourney: {
      sessions: 12,
      points: 240,
      invested: '€890',
    },
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Actualiza tu información personal');
  };

  const handleBeautyJourney = () => {
    Alert.alert('Mi Recorrido', 'Tu historia de belleza y transformación');
  };

  const handleSkinAnalysis = () => {
    Alert.alert('Análisis Personalizado', 'Seguimiento de tu piel y recomendaciones');
  };

  const handleBeautyPoints = () => {
    Alert.alert('Beauty Points', `Tienes ${patientData.beautyJourney.points} puntos disponibles ✨`);
  };

  const handleSpecialMoments = () => {
    Alert.alert('Momentos Especiales', 'Tus citas y experiencias de bienestar');
  };

  const handleWellnessSupport = () => {
    Alert.alert('Apoyo Personal', 'Estamos aquí para cuidarte');
  };

  const handleLogout = () => {
    Alert.alert(
      'Hasta pronto',
      '¿Segura que quieres salir de tu espacio personal?',
      [
        { text: 'Quedarme', style: 'cancel' },
        { 
          text: 'Salir', 
          style: 'destructive',
          onPress: () => dispatch({ type: 'auth/logout' })
        },
      ]
    );
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{patientData.name.charAt(0)}</Text>
          </View>
          {patientData.vipMember && (
            <View style={styles.specialBadge}>
              <Text style={styles.specialText}>✨</Text>
            </View>
          )}
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hola, {patientData.name}</Text>
          <Text style={styles.membershipText}>Miembro especial desde {patientData.memberSince}</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const BeautyStats = () => (
    <View style={styles.statsSection}>
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{patientData.beautyJourney.sessions}</Text>
          <Text style={styles.statLabel}>Sesiones</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{patientData.beautyJourney.points}</Text>
          <Text style={styles.statLabel}>Beauty Points</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{patientData.beautyJourney.invested}</Text>
          <Text style={styles.statLabel}>Invertido</Text>
        </View>
      </View>
    </View>
  );

  const NextMomentCard = () => (
    <View style={styles.nextMomentSection}>
      <Text style={styles.sectionTitle}>Tu próximo momento</Text>
      <View style={styles.momentCard}>
        <View style={styles.momentContent}>
          <Text style={styles.momentDate}>{patientData.nextMoment.date}</Text>
          <Text style={styles.momentTreatment}>{patientData.nextMoment.treatment}</Text>
          <Text style={styles.momentSpecialist}>con {patientData.skinProfile.specialist}</Text>
        </View>
        <TouchableOpacity style={styles.momentButton}>
          <Text style={styles.momentButtonText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SkinProfileCard = () => (
    <View style={styles.skinSection}>
      <Text style={styles.sectionTitle}>Mi perfil de piel</Text>
      <View style={styles.skinCard}>
        <View style={styles.skinRow}>
          <Text style={styles.skinLabel}>Tipo:</Text>
          <Text style={styles.skinValue}>{patientData.skinProfile.type}</Text>
        </View>
        <View style={styles.skinRow}>
          <Text style={styles.skinLabel}>Enfoque actual:</Text>
          <Text style={styles.skinValue}>{patientData.skinProfile.focus.join(', ')}</Text>
        </View>
        <TouchableOpacity style={styles.skinAnalysisButton} onPress={handleSkinAnalysis}>
          <Text style={styles.skinAnalysisText}>Ver análisis completo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ 
    icon, 
    title, 
    description, 
    onPress,
    badge,
  }: {
    icon: string;
    title: string;
    description: string;
    onPress: () => void;
    badge?: string;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Text style={styles.menuIcon}>{icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>{title}</Text>
          {badge && (
            <View style={styles.menuBadge}>
              <Text style={styles.menuBadgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  );

  const NotificationToggle = ({ 
    title, 
    value, 
    onValueChange 
  }: { 
    title: string; 
    value: boolean; 
    onValueChange: (value: boolean) => void; 
  }) => (
    <View style={styles.notificationRow}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.pearl, true: colors.jade }}
        thumbColor={colors.warmWhite}
        style={styles.switch}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header elegante */}
        <ProfileHeader />

        {/* Stats de belleza */}
        <BeautyStats />

        {/* Próximo momento */}
        <NextMomentCard />

        {/* Perfil de piel */}
        <SkinProfileCard />

        {/* Mi recorrido de belleza */}
        <MenuSection title="Mi recorrido">
          <MenuItem
            icon="🌸"
            title="Historia de belleza"
            description="Tu transformación y momentos especiales"
            onPress={handleBeautyJourney}
          />
          
          <MenuItem
            icon="💎"
            title="Beauty Points"
            description="Puntos disponibles y beneficios"
            onPress={handleBeautyPoints}
            badge={`${patientData.beautyJourney.points}`}
          />
          
          <MenuItem
            icon="📅"
            title="Mis momentos"
            description="Historial de citas y experiencias"
            onPress={handleSpecialMoments}
          />
        </MenuSection>

        {/* Preferencias */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.notificationsCard}>
            <NotificationToggle
              title="Recordatorios de citas"
              value={notifications.appointmentReminders}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, appointmentReminders: value }))}
            />
            <NotificationToggle
              title="Momentos de belleza"
              value={notifications.beautifulMoments}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, beautifulMoments: value }))}
            />
            <NotificationToggle
              title="Tips personalizados"
              value={notifications.personalizedTips}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, personalizedTips: value }))}
            />
            <NotificationToggle
              title="Ofertas especiales"
              value={notifications.specialOffers}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, specialOffers: value }))}
            />
          </View>
        </View>

        {/* Apoyo */}
        <MenuSection title="Apoyo personal">
          <MenuItem
            icon="🤝"
            title="Invitar amigas"
            description="Comparte experiencias únicas"
            onPress={() => Alert.alert('Invitar', 'Comparte momentos especiales con tus amigas')}
          />
          
          <MenuItem
            icon="💝"
            title="Atención personalizada"
            description="Estamos aquí para cuidarte"
            onPress={handleWellnessSupport}
          />
        </MenuSection>

        {/* Salir */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    backgroundColor: colors.warmWhite,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.jade,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.warmWhite,
  },
  specialBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 24,
    height: 24,
    backgroundColor: colors.gold,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialText: {
    fontSize: 12,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  membershipText: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  editButton: {
    backgroundColor: colors.pearl,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: colors.charcoal,
    fontSize: 14,
    fontWeight: '500',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.jade,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.softGray,
    fontWeight: '300',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.pearl,
    marginHorizontal: 16,
  },
  nextMomentSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  momentCard: {
    backgroundColor: colors.rosePale,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  momentContent: {
    flex: 1,
  },
  momentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.jade,
    marginBottom: 4,
  },
  momentTreatment: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 2,
  },
  momentSpecialist: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  momentButton: {
    backgroundColor: colors.warmWhite,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  momentButtonText: {
    color: colors.charcoal,
    fontSize: 14,
    fontWeight: '500',
  },
  skinSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  skinCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 20,
  },
  skinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  skinLabel: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  skinValue: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '500',
  },
  skinAnalysisButton: {
    backgroundColor: colors.sage,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  skinAnalysisText: {
    color: colors.charcoal,
    fontSize: 14,
    fontWeight: '500',
  },
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.blush,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.charcoal,
    flex: 1,
  },
  menuBadge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  menuBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warmWhite,
  },
  menuDescription: {
    fontSize: 13,
    color: colors.softGray,
    fontWeight: '300',
    marginTop: 2,
  },
  menuChevron: {
    fontSize: 18,
    color: colors.softGray,
    marginLeft: 8,
  },
  preferencesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  notificationsCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 20,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.pearl,
  },
  notificationTitle: {
    fontSize: 15,
    color: colors.charcoal,
    fontWeight: '400',
    flex: 1,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.pearl,
  },
  logoutText: {
    fontSize: 15,
    color: colors.softGray,
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;