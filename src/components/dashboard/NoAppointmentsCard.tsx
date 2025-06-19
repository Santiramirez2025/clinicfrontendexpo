// ============================================================================
// components/dashboard/NoAppointmentsCard.tsx - SIN ERRORES ✅
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { modernColors, modernSpacing, modernTypography, modernShadows } from '../../styles';

interface NoAppointmentsCardProps {
  onReservePress: () => void;
}

export const NoAppointmentsCard: React.FC<NoAppointmentsCardProps> = ({
  onReservePress
}) => {
  return (
    <View style={styles.noAppointmentsCard}>
      <View style={styles.calendarIconContainer}>
        <Text style={styles.calendarIcon}>📅</Text>
      </View>
      <Text style={styles.noAppointmentsTitle}>
        No tienes citas programadas
      </Text>
      <Text style={styles.noAppointmentsSubtitle}>
        ¡Es momento de agendar tu próximo tratamiento de belleza!
      </Text>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={onReservePress}
      >
        <Text style={styles.reserveButtonText}>+ Reservar ahora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noAppointmentsCard: {
    backgroundColor: modernColors.surface,
    margin: modernSpacing.aesthetic.cardSpacing,
    borderRadius: 12, // Valor fijo en lugar de modernSpacing.componentModern.radiusLG
    padding: modernSpacing.aesthetic.sectionPadding,
    alignItems: 'center',
    // Sombra expandida sin spread operator
    shadowColor: modernShadows.soft.shadowColor,
    shadowOffset: modernShadows.soft.shadowOffset,
    shadowOpacity: modernShadows.soft.shadowOpacity,
    shadowRadius: modernShadows.soft.shadowRadius,
    elevation: modernShadows.soft.elevation,
  },
  
  calendarIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: modernColors.gray100,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  calendarIcon: {
    fontSize: 32,
  },
  
  noAppointmentsTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600', // Valor fijo en lugar de modernTypography.fontWeightModern.semibold
    color: modernColors.text,
    textAlign: 'center',
    marginBottom: modernSpacing.aesthetic.itemSpacing,
  },
  
  noAppointmentsSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.textSecondary,
    textAlign: 'center',
    marginBottom: modernSpacing.aesthetic.sectionPadding,
    lineHeight: 21, // Valor fijo: 14 * 1.5 - SIN ERRORES
  },
  
  reserveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Valor fijo en lugar de modernSpacing.componentModern.radiusMD
    borderWidth: 1,
    borderColor: modernColors.accent,
  },
  
  reserveButtonText: {
    color: modernColors.accent,
    fontWeight: '600', // Valor fijo en lugar de modernTypography.fontWeightModern.semibold
    fontSize: modernTypography.fontSizeModern.base,
  },
});