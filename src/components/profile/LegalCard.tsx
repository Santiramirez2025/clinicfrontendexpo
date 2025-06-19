// ============================================================================
// components/profile/LegalCard.tsx - TARJETA LEGAL
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { profileStyles } from './styles';

interface LegalCardProps {
  onOpenPrivacyPolicy: () => void;
}

export const LegalCard: React.FC<LegalCardProps> = ({ onOpenPrivacyPolicy }) => (
  <View style={profileStyles.legalCard}>
    <Text style={profileStyles.legalText}>
      Tu privacidad es importante para nosotros. Revisa nuestras políticas de privacidad y términos de uso.
    </Text>
    
    <TouchableOpacity
      style={profileStyles.legalButton}
      onPress={onOpenPrivacyPolicy}
      activeOpacity={0.7}
    >
      <Text style={profileStyles.legalButtonText}>Ver Política de Privacidad</Text>
      <Text style={profileStyles.legalButtonIcon}>📄</Text>
    </TouchableOpacity>
  </View>
);