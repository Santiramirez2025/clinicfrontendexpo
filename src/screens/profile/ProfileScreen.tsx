import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';
import { useProfile } from '../../hooks/useProfile';
import { modernColors, modernTypography } from '../../styles';

// Componentes
import {
  ProfileAvatar,
  InputField,
  MultiSelector,
  NotificationSwitch,
  MenuItem,
} from '../../components/profile/ProfileComponents';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
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
    onRefresh,
  } = useProfile();

  // Opciones de tratamientos
  const treatmentOptions = [
    { id: 'facial', label: 'Faciales', icon: '💆‍♀️' },
    { id: 'masaje', label: 'Masajes', icon: '🤲' },
    { id: 'manicure', label: 'Manicure', icon: '💅' },
    { id: 'pedicure', label: 'Pedicure', icon: '🦶' },
    { id: 'depilacion', label: 'Depilación', icon: '✨' },
    { id: 'corporal', label: 'Corporal', icon: '🧴' },
  ];

  // Opciones de horarios
  const scheduleOptions = [
    { id: 'morning', label: 'Mañana', icon: '🌅' },
    { id: 'afternoon', label: 'Tarde', icon: '☀️' },
    { id: 'evening', label: 'Noche', icon: '🌙' },
    { id: 'weekend', label: 'Fines de semana', icon: '📅' },
  ];

  // Handlers
  const handleAvatarPress = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      'Esta función estará disponible próximamente',
      [{ text: 'Entendido', style: 'default' }]
    );
  };

  const handleSave = async () => {
    await saveProfile();
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás segura que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authAPI.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Error durante logout:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta nuevamente.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>👤</Text>
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={modernColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <TouchableOpacity 
            onPress={handleSave} 
            disabled={!hasUnsavedChanges || saving}
          >
            <Text style={[
              styles.saveButton,
              (!hasUnsavedChanges || saving) && styles.saveButtonDisabled
            ]}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Foto de perfil y información básica */}
          <ProfileAvatar user={user} onPress={handleAvatarPress} />

          {/* Datos personales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos personales</Text>
            
            <InputField
              label="Nombre"
              value={profile.firstName}
              onChangeText={(text) => handleProfileChange('firstName', text)}
              placeholder="Ingresa tu nombre"
              error={errors.firstName}
            />
            
            <InputField
              label="Apellido"
              value={profile.lastName}
              onChangeText={(text) => handleProfileChange('lastName', text)}
              placeholder="Ingresa tu apellido"
              error={errors.lastName}
            />
            
            <InputField
              label="Email"
              value={profile.email}
              onChangeText={(text) => handleProfileChange('email', text)}
              placeholder="tu@email.com"
              keyboardType="email-address"
              error={errors.email}
              editable={false}
            />
            
            <InputField
              label="Teléfono"
              value={profile.phone}
              onChangeText={(text) => handleProfileChange('phone', text)}
              placeholder="+34 666 123 456"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            
            <InputField
              label="Fecha de nacimiento (opcional)"
              value={profile.birthDate || ''}
              onChangeText={(text) => handleProfileChange('birthDate', text)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          {/* Preferencias de tratamientos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferencias</Text>
            
            <MultiSelector
              label="Tratamientos favoritos"
              options={treatmentOptions}
              selectedValues={profile.treatmentPreferences}
              onSelectionChange={(values) => handleProfileChange('treatmentPreferences', values)}
            />
            
            <MultiSelector
              label="Horarios preferidos"
              options={scheduleOptions}
              selectedValues={profile.preferredSchedule}
              onSelectionChange={(values) => handleProfileChange('preferredSchedule', values)}
            />
          </View>

          {/* Notas adicionales */}
          <View style={styles.section}>
            <InputField
              label="Notas adicionales (opcional)"
              value={profile.notes || ''}
              onChangeText={(text) => handleProfileChange('notes', text)}
              placeholder="Alergias, preferencias especiales, etc."
              multiline
            />
          </View>

          {/* Configuración de notificaciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificaciones</Text>
            
            <NotificationSwitch
              label="Recordatorios de citas"
              description="Recibe notificaciones sobre tus próximas citas"
              value={notifications.appointments}
              onValueChange={(value) => handleNotificationChange('appointments', value)}
              icon="calendar"
            />
            
            <NotificationSwitch
              label="Promociones y ofertas"
              description="Entérate de descuentos y promociones especiales"
              value={notifications.promotions}
              onValueChange={(value) => handleNotificationChange('promotions', value)}
              icon="pricetag"
            />
            
            <NotificationSwitch
              label="Tips de bienestar"
              description="Consejos para cuidar tu belleza y bienestar"
              value={notifications.wellness}
              onValueChange={(value) => handleNotificationChange('wellness', value)}
              icon="leaf"
            />
            
            {/* ✅ CORREGIDO: Campo 'offers' en lugar de 'followUp' */}
            <NotificationSwitch
              label="Ofertas especiales"
              description="Recibe ofertas y promociones exclusivas"
              value={notifications.offers}
              onValueChange={(value) => handleNotificationChange('offers', value)}
              icon="gift"
            />
          </View>

          {/* Opciones de cuenta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            
            <MenuItem
              icon="lock-closed"
              label="Cambiar contraseña"
              onPress={handleChangePassword}
            />
            
            <MenuItem
              icon="log-out"
              label={isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
              onPress={handleLogout}
              isDestructive
              isLoading={isLoggingOut}
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  saveButton: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.primary,
  },
  saveButtonDisabled: {
    color: modernColors.gray400,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray100,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 20,
  },
  bottomSpacing: {
    height: 40,
  },
};

export default ProfileScreen;