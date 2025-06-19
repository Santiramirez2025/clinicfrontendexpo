// ============================================================================
// screens/profile/ProfileScreen.tsx - SINTAXIS CORREGIDA
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
import { TagSelector } from '../../components/profile/TagSelector';
import { NotesInput } from '../../components/profile/NotesInput';
import { ClinicSelector } from '../../components/profile/ClinicSelector';
import { NotificationToggle } from '../../components/profile/NotificationToggle';
import { SaveButton } from '../../components/profile/SaveButton';
import { LegalCard } from '../../components/profile/LegalCard';
import { ActionButton } from '../../components/profile/ActionButton';
import { ClinicSelectionModal } from '../../components/profile/ClinicSelectionModal';

// Componentes avanzados (comentados por ahora para evitar errores)
// import { ProfileStatsCard } from '../../components/profile/ProfileStatsCard';
// import { InviteFriendCard } from '../../components/profile/InviteFriendCard';
// import { ChangePasswordCard } from '../../components/profile/ChangePasswordCard';
// import { RecentActivityCard } from '../../components/profile/RecentActivityCard';
// import { SkinTypeSelector } from '../../components/profile/SkinTypeSelector';

// Estilos y constantes
import { profileStyles } from '../../components/profile/styles';
import { modernColors } from '../../styles';
import { treatmentOptions, scheduleOptions } from '../../components/profile/constants';

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

  // ============================================================================
  // RENDER LOADING
  // ============================================================================
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

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================
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

        {/* Preferencias Estéticas */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Preferencias de Tratamientos"
            subtitle="Selecciona tus tratamientos favoritos"
            icon="✨"
          />
          
          <View style={profileStyles.sectionContent}>
            <TagSelector
              label="Tipos de tratamientos que te interesan"
              options={treatmentOptions}
              selectedValues={profile.treatmentPreferences}
              onSelectionChange={(values) => handleProfileChange('treatmentPreferences', values)}
              multiSelect={true}
            />
            
            <TagSelector
              label="Horarios preferidos para citas"
              options={scheduleOptions}
              selectedValues={profile.preferredSchedule}
              onSelectionChange={(values) => handleProfileChange('preferredSchedule', values)}
              multiSelect={true}
            />
            
            <NotesInput
              value={profile.notes || ''}
              onChangeText={(text) => handleProfileChange('notes', text)}
              maxLength={300}
            />
          </View>
        </View>

        {/* Clínica Preferida */}
        <View style={profileStyles.section}>
          <SectionHeader
            title="Clínica Preferida"
            subtitle="Tu centro de estética principal"
            icon="🏥"
          />
          
          <View style={profileStyles.sectionContent}>
            <ClinicSelector
              currentClinic={selectedClinic}
              onChangeClinic={handleChangeClinic}
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

        {/* Espaciado final */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de selección de clínica */}
      <ClinicSelectionModal
        visible={clinicModalVisible}
        onClose={() => setClinicModalVisible(false)}
        selectedClinic={selectedClinic}
        availableClinics={availableClinics}
        onSelectClinic={handleSelectClinic}
      />
    </SafeAreaView>
  );
}; // ✅ ESTA LLAVE CIERRA LA FUNCIÓN

export default ProfileScreen; // ✅ EXPORT SIN LLAVE ADICIONAL