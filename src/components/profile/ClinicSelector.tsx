// ============================================================================
// components/profile/ClinicSelector.tsx - SELECTOR DE CLÍNICA
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { profileStyles } from './styles';

interface ClinicSelectorProps {
  currentClinic: string;
  onChangeClinic: () => void;
}

export const ClinicSelector: React.FC<ClinicSelectorProps> = ({ currentClinic, onChangeClinic }) => (
  <View style={profileStyles.clinicSelector}>
    <View style={profileStyles.clinicInfo}>
      <View style={profileStyles.clinicIconContainer}>
        <Text style={profileStyles.clinicIcon}>🏥</Text>
      </View>
      <View style={profileStyles.clinicDetails}>
        <Text style={profileStyles.clinicLabel}>Clínica actual</Text>
        <Text style={profileStyles.clinicName}>{currentClinic}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={profileStyles.changeClinicButton}
      onPress={onChangeClinic}
      activeOpacity={0.7}
    >
      <Text style={profileStyles.changeClinicButtonText}>Cambiar</Text>
    </TouchableOpacity>
  </View>
);
