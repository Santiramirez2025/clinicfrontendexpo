// ============================================================================
// components/appointmentscreen/AppointmentTabs.tsx
// ============================================================================
import React from 'react';
import { View, ScrollView } from 'react-native';
import { appointmentStyles } from './styles';
import { TabButton } from './TabButton';
import { AppointmentSection, TabType } from './types';

export interface AppointmentTabsProps {
  sections: AppointmentSection[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ 
  sections, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <View style={appointmentStyles.tabsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={appointmentStyles.tabsContent}
      >
        <TabButton
          title="Próximas"
          count={sections[0].count}
          isActive={activeTab === 'upcoming'}
          onPress={() => onTabChange('upcoming')}
        />
        <TabButton
          title="Historial"
          count={sections[1].count}
          isActive={activeTab === 'past'}
          onPress={() => onTabChange('past')}
        />
        <TabButton
          title="Canceladas"
          count={sections[2].count}
          isActive={activeTab === 'cancelled'}
          onPress={() => onTabChange('cancelled')}
        />
      </ScrollView>
    </View>
  );
};
