// ============================================================================
// components/profile/ActionButton.tsx - BOTÓN DE ACCIÓN
// ============================================================================
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { profileStyles } from './styles';

interface ActionButtonProps {
  icon: string;
  text: string;
  onPress: () => void;
  isDanger?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  text, 
  onPress, 
  isDanger = false 
}) => (
  <TouchableOpacity
    style={[
      profileStyles.actionButton, 
      isDanger && profileStyles.dangerButton
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={profileStyles.actionButtonIcon}>{icon}</Text>
    <Text style={[
      profileStyles.actionButtonText, 
      isDanger && profileStyles.dangerButtonText
    ]}>
      {text}
    </Text>
    <Text style={[
      profileStyles.actionButtonArrow, 
      isDanger && profileStyles.dangerButtonText
    ]}>
      →
    </Text>
  </TouchableOpacity>
);