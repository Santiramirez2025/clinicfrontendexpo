// ============================================================================
// components/profile/SaveButton.tsx - BOTÓN DE GUARDAR
// ============================================================================
import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { profileStyles } from './styles';

interface SaveButtonProps {
  onPress: () => void;
  saving: boolean;
  visible: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, saving, visible }) => {
  if (!visible) return null;

  return (
    <View style={profileStyles.saveSection}>
      <TouchableOpacity
        style={[profileStyles.saveButton, saving && profileStyles.saveButtonDisabled]}
        onPress={onPress}
        disabled={saving}
        activeOpacity={0.8}
      >
        {saving ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <Text style={profileStyles.saveButtonIcon}>💾</Text>
            <Text style={profileStyles.saveButtonText}>Guardar Cambios</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};