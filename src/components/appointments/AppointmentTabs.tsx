// components/appointments/AppointmentTabs.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { modernColors, modernSpacing, modernTypography } from '../../styles';
import { AppointmentTab } from '../../../types/appointment';

interface AppointmentTabsProps {
  activeTab: AppointmentTab;
  onTabChange: (tab: AppointmentTab) => void;
  upcomingCount?: number;
}

export const AppointmentTabs: React.FC<AppointmentTabsProps> = ({
  activeTab,
  onTabChange,
  upcomingCount = 0,
}) => {
  const slideAnim = useRef(new Animated.Value(activeTab === 'upcoming' ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeTab === 'upcoming' ? 0 : 1,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  }, [activeTab]);

  const tabs: { id: AppointmentTab; label: string; icon: string }[] = [
    { id: 'upcoming', label: 'Próximos', icon: '📅' },
    { id: 'history', label: 'Historial', icon: '📋' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabsWrapper}>
        {/* Indicador animado */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150], // Ajustar según el ancho del tab
                }),
              }],
            },
          ]}
        />

        {/* Tabs */}
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
            {tab.id === 'upcoming' && upcomingCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{upcomingCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: modernSpacing.lg,
    paddingTop: modernSpacing.sm,
    paddingBottom: modernSpacing.xs,
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: modernColors.gray50,
    borderRadius: modernSpacing.md,
    padding: modernSpacing.xs,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: modernSpacing.xs,
    left: modernSpacing.xs,
    right: modernSpacing.xs,
    bottom: modernSpacing.xs,
    width: 150, // Ajustar según diseño
    backgroundColor: '#FFFFFF',
    borderRadius: modernSpacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.sm,
    paddingHorizontal: modernSpacing.md,
    gap: modernSpacing.xs,
    zIndex: 1,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray500,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: modernColors.gray900,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: modernColors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.xs,
  },
  badgeText: {
    ...modernTypography.caption,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});