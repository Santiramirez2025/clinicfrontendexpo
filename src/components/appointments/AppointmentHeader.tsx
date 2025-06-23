// components/appointments/AppointmentHeader.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

interface AppointmentHeaderProps {
  title: string;
  onNewAppointment: () => void;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  title,
  onNewAppointment,
}) => {
  return (
    <View style={styles.container}>
      <BlurView intensity={5} style={styles.blurContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          
          <TouchableOpacity
            onPress={onNewAppointment}
            activeOpacity={0.8}
            style={styles.newButton}
          >
            <LinearGradient
              colors={[modernColors.primary, '#E8956B']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.buttonText}>Nuevo turno</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : modernSpacing.lg,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.lg,
    paddingVertical: modernSpacing.md,
  },
  title: {
    ...modernTypography.headingLarge,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  newButton: {
    borderRadius: modernSpacing.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: modernColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.md,
    paddingVertical: modernSpacing.sm,
    gap: modernSpacing.xs,
  },
  plusIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  buttonText: {
    ...modernTypography.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});