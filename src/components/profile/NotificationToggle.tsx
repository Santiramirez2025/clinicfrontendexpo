// ============================================================================
// components/profile/NotificationToggle.tsx - TOGGLE DE NOTIFICACIONES
// ============================================================================
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { modernColors } from '../../styles';
import { profileStyles } from './styles';

interface NotificationToggleProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon: string;
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  label,
  description,
  value,
  onValueChange,
  icon
}) => (
  <View style={profileStyles.notificationItem}>
    <View style={profileStyles.notificationIconContainer}>
      <Text style={profileStyles.notificationIcon}>{icon}</Text>
    </View>
    <View style={profileStyles.notificationContent}>
      <Text style={profileStyles.notificationLabel}>{label}</Text>
      <Text style={profileStyles.notificationDescription}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: modernColors.gray300,
        true: modernColors.accent + '40'
      }}
      thumbColor={value ? modernColors.accent : modernColors.gray500}
      style={profileStyles.notificationSwitch}
    />
  </View>
);