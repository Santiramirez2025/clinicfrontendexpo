// ============================================================================
// screens/profile/ProfileScreen.tsx - REORGANIZADO
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks
import { useProfile } from '../../hooks/useProfile';
import { useClinicSelector } from '../../hooks/useClinicSelector';
import { useProfileActions } from '../../hooks/useProfileActions';

// Componentes básicos
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { SectionHeader } from '../../components/profile/SectionHeader';
import { InputField } from '../../components/profile/InputField';
import { NotificationToggle } from '../../components/profile/NotificationToggle';
import { SaveButton } from '../../components/profile/SaveButton';
import { LegalCard } from '../../components/profile/LegalCard';
import { ActionButton } from '../../components/profile/ActionButton';
import { ClinicSelectionModal } from '../../components/profile/ClinicSelectionModal';

// Componentes avanzados
import { ProfileStatsCard } from '../../components/profile/ProfileStatsCard';
import { InviteFriendCard } from '../../components/profile/InviteFriendCard';

// Estilos y constantes
import { profileStyles } from '../../components/profile/styles';
import { modernColors } from '../../styles';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Custom hooks
  const {
    profile,
    notifications,
    loading,
    saving,
    refreshing,
    hasUnsavedChanges,
    errors,
    user,
    handleProfileChange,
    handleNotificationChange,
    saveProfile,
    onRefresh
  } = useProfile();

  const {
    clinicModalVisible,
    setClinicModalVisible,
    selectedClinic,
    availableClinics,
    handleChangeClinic,
    handleSelectClinic
  } = useClinicSelector();

  const {
    handleLogout,
    handleDeleteAccount,
    handleOpenPrivacyPolicy
  } = useProfileActions();

  if (loading) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color={modernColors.accent} />
          <Text style={profileStyles.loadingText}>Cargando tu perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={modernColors.backgroundWarm} />
      
      {/* Header */}
      <ProfileHeader 
        profile={profile}
        isVIP={user?.vipStatus || false}
      />

      <ScrollView
        style={profileStyles.scrollView}
        contentContainerStyle={profileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[modernColors.accent]}
            tintColor={modernColors.accent}
          />
        }
      >
        {/* Datos Personales */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Datos Personales"
            subtitle="Información básica de tu cuenta"
            icon="👤"
          />
          
          <View style={profileStyles.sectionContent}>
            <InputField
              label="Nombre"
              value={profile.firstName}
              onChangeText={(text) => handleProfileChange('firstName', text)}
              placeholder="Tu nombre"
              required
              error={errors.firstName}
            />
            
            <InputField
              label="Apellidos"
              value={profile.lastName}
              onChangeText={(text) => handleProfileChange('lastName', text)}
              placeholder="Tus apellidos"
              required
              error={errors.lastName}
            />
            
            <InputField
              label="Email"
              value={profile.email}
              onChangeText={(text) => handleProfileChange('email', text)}
              placeholder="tu@email.com"
              keyboardType="email-address"
              required
              error={errors.email}
              editable={false}
            />
            
            <InputField
              label="Teléfono"
              value={profile.phone}
              onChangeText={(text) => handleProfileChange('phone', text)}
              placeholder="+34 600 123 456"
              keyboardType="phone-pad"
              error={errors.phone}
            />
          </View>
        </View>

        {/* Configuración de Notificaciones */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Notificaciones"
            subtitle="Gestiona cómo te contactamos"
            icon="🔔"
          />
          
          <View style={profileStyles.sectionContent}>
            <NotificationToggle
              label="Recordatorios de citas"
              description="Te avisamos 24h antes de tu cita"
              value={notifications.appointments}
              onValueChange={(value) => handleNotificationChange('appointments', value)}
              icon="📅"
            />
            
            <NotificationToggle
              label="Promociones y novedades"
              description="Ofertas especiales y nuevos tratamientos"
              value={notifications.promotions}
              onValueChange={(value) => handleNotificationChange('promotions', value)}
              icon="🎁"
            />
            
            <NotificationToggle
              label="Tips de bienestar"
              description="Consejos personalizados de cuidado"
              value={notifications.wellness}
              onValueChange={(value) => handleNotificationChange('wellness', value)}
              icon="🌿"
            />
            
            <NotificationToggle
              label="Mensajes de seguimiento"
              description="Cómo te sientes después de tu cita"
              value={notifications.followUp}
              onValueChange={(value) => handleNotificationChange('followUp', value)}
              icon="💬"
            />
          </View>
        </View>

        {/* Botón Guardar */}
        <SaveButton
          onPress={saveProfile}
          saving={saving}
          visible={hasUnsavedChanges}
        />

        {/* Políticas y Términos */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Privacidad y Términos"
            subtitle="Información legal importante"
            icon="📋"
          />
          
          <View style={profileStyles.sectionContent}>
            <LegalCard onOpenPrivacyPolicy={handleOpenPrivacyPolicy} />
          </View>
        </View>

        {/* Estadísticas del Perfil - MOVIDO AQUÍ */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Tu Actividad"
            subtitle="Resumen de tu experiencia"
            icon="📊"
          />
          
          <ProfileStatsCard
            totalAppointments={user?.totalAppointments || 0}
            beautyPoints={user?.beautyPoints || 0}
            memberSince={user?.memberSince || new Date().toISOString()}
            vipStatus={user?.vipStatus || false}
          />
        </View>

        {/* Invitar Amigos - MOVIDO AQUÍ */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Comparte y Gana"
            subtitle="Invita amigos y obtén beneficios"
            icon="🎁"
          />
          
          <InviteFriendCard
            userName={profile.firstName}
            onInvite={() => console.log('Invitar amigo')}
            referralCode={user?.referralCode || 'BEAUTY2024'}
          />
        </View>

        {/* Acciones de Cuenta */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Cuenta"
            subtitle="Gestión de tu cuenta"
            icon="⚙️"
          />
          
          <View style={profileStyles.sectionContent}>
            <ActionButton
              icon="🚪"
              text="Cerrar Sesión"
              onPress={handleLogout}
            />
            
            <ActionButton
              icon="⚠️"
              text="Eliminar Cuenta"
              onPress={handleDeleteAccount}
              isDanger={true}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;