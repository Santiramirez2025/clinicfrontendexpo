// ============================================================================
// components/profile/ChangePasswordCard.tsx - COMPONENTE PARA CAMBIAR CONTRASEÑA
// ============================================================================
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { profileStyles } from './styles';
import { useProfileActions } from '../../hooks/useProfileActions';
import { modernColors } from '../../styles';

export const ChangePasswordCard: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { handleChangePassword } = useProfileActions();

  const validatePassword = () => {
    if (!currentPassword.trim()) {
      Alert.alert('Error', 'Ingresa tu contraseña actual');
      return false;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const changePassword = async () => {
    if (!validatePassword()) return;

    setChanging(true);
    const success = await handleChangePassword(currentPassword, newPassword);
    
    if (success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    
    setChanging(false);
  };

  return (
    <View style={profileStyles.passwordCard}>
      <View style={profileStyles.passwordHeader}>
        <Text style={profileStyles.passwordTitle}>Cambiar Contraseña 🔑</Text>
        <Text style={profileStyles.passwordSubtitle}>
          Mantén tu cuenta segura actualizando tu contraseña
        </Text>
      </View>

      <View style={profileStyles.passwordForm}>
        <TextInput
          style={profileStyles.passwordInput}
          placeholder="Contraseña actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showPasswords}
          placeholderTextColor={modernColors.gray400}
        />

        <TextInput
          style={profileStyles.passwordInput}
          placeholder="Nueva contraseña (mín. 6 caracteres)"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showPasswords}
          placeholderTextColor={modernColors.gray400}
        />

        <TextInput
          style={profileStyles.passwordInput}
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPasswords}
          placeholderTextColor={modernColors.gray400}
        />

        <TouchableOpacity
          style={profileStyles.showPasswordToggle}
          onPress={() => setShowPasswords(!showPasswords)}
        >
          <Text style={profileStyles.showPasswordText}>
            {showPasswords ? '🙈 Ocultar' : '👁️ Mostrar'} contraseñas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            profileStyles.passwordButton,
            changing && profileStyles.passwordButtonDisabled
          ]}
          onPress={changePassword}
          disabled={changing}
        >
          {changing ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={profileStyles.passwordButtonIcon}>🔐</Text>
              <Text style={profileStyles.passwordButtonText}>Cambiar Contraseña</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
