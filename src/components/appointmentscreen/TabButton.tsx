// ============================================================================
// components/appointmentscreen/TabButton.tsx
// ============================================================================
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { appointmentStyles } from './styles';

export interface TabButtonProps {
  title: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ title, count, isActive, onPress }) => (
  <TouchableOpacity
    style={[
      appointmentStyles.tabButton,
      isActive && appointmentStyles.tabButtonActive
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[
      appointmentStyles.tabButtonText,
      isActive && appointmentStyles.tabButtonTextActive
    ]}>
      {title}
    </Text>
    {count > 0 && (
      <View style={[
        appointmentStyles.tabBadge,
        isActive && appointmentStyles.tabBadgeActive
      ]}>
        <Text style={[
          appointmentStyles.tabBadgeText,
          isActive && appointmentStyles.tabBadgeTextActive
        ]}>
          {count}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);
