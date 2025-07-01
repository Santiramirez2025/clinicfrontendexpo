import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';
import type { Treatment, Professional } from '../../hooks/useBookAppointment';

// ============================================================================
// HEADER CON PROGRESO
// ============================================================================
interface HeaderProps {
  navigation: any;
  currentStep: number;
  totalSteps: number;
}

export const Header = ({ navigation, currentStep, totalSteps }: HeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={modernColors.text} />
    </TouchableOpacity>
    
    <View style={styles.headerCenter}>
      <Text style={styles.headerTitle}>Agendar Cita</Text>
      <Text style={styles.headerSubtitle}>Paso {currentStep} de {totalSteps}</Text>
    </View>
    
    <View style={styles.headerRight}>
      <View style={styles.progressContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index < currentStep && styles.progressDotActive
            ]}
          />
        ))}
      </View>
    </View>
  </View>
);

// ============================================================================
// RESUMEN DE LA CITA - ⭐ CORREGIDO CON onEditStep
// ============================================================================
interface BookingSummaryProps {
  selectedTreatment: Treatment | null;
  selectedProfessional: Professional | null;
  selectedDate: string | null;
  selectedTime: string | null;
  onEditStep: (step: number) => void; // ⭐ AGREGADO - REQUERIDO POR ERROR
}

export const BookingSummary = ({ 
  selectedTreatment, 
  selectedProfessional, 
  selectedDate, 
  selectedTime,
  onEditStep // ⭐ AGREGADO
}: BookingSummaryProps) => (
  <View style={styles.summarySection}>
    <Text style={styles.summaryTitle}>Resumen de tu cita</Text>
    
    <View style={styles.summaryCard}>
      {/* ⭐ TRATAMIENTO CON BOTÓN EDITAR */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tratamiento:</Text>
        <View style={styles.summaryValueContainer}>
          <Text style={styles.summaryValue}>{selectedTreatment?.name}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => onEditStep(1)}
          >
            <Ionicons name="pencil" size={16} color={modernColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ⭐ PROFESIONAL CON BOTÓN EDITAR */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Profesional:</Text>
        <View style={styles.summaryValueContainer}>
          <Text style={styles.summaryValue}>
            {selectedProfessional?.firstName ? 
              `${selectedProfessional.firstName} ${selectedProfessional.lastName}` :
              selectedProfessional?.name
            }
          </Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => onEditStep(2)}
          >
            <Ionicons name="pencil" size={16} color={modernColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ⭐ FECHA CON BOTÓN EDITAR */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Fecha:</Text>
        <View style={styles.summaryValueContainer}>
          <Text style={styles.summaryValue}>
            {selectedDate && new Date(selectedDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => onEditStep(3)}
          >
            <Ionicons name="pencil" size={16} color={modernColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ⭐ HORA CON BOTÓN EDITAR */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Hora:</Text>
        <View style={styles.summaryValueContainer}>
          <Text style={styles.summaryValue}>{selectedTime}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => onEditStep(4)}
          >
            <Ionicons name="pencil" size={16} color={modernColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Duración:</Text>
        <Text style={styles.summaryValue}>{selectedTreatment?.duration} minutos</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.summaryTotal]}>
        <Text style={styles.summaryTotalLabel}>Total:</Text>
        <Text style={styles.summaryTotalValue}>${selectedTreatment?.price}</Text>
      </View>
    </View>
  </View>
);

// ============================================================================
// BOTÓN INFERIOR
// ============================================================================
interface BottomActionProps {
  currentStep: number;
  canSubmit: boolean;
  submitting: boolean;
  onSubmit: () => void;
}

export const BottomAction = ({ currentStep, canSubmit, submitting, onSubmit }: BottomActionProps) => (
  <View style={styles.bottomContainer}>
    {currentStep === 5 ? (
      <TouchableOpacity
        style={[styles.confirmButton, (!canSubmit || submitting) && styles.confirmButtonDisabled]}
        onPress={onSubmit}
        disabled={!canSubmit || submitting}
      >
        <Text style={styles.confirmButtonText}>
          {submitting ? 'Agendando...' : 'Confirmar cita'}
        </Text>
        {!submitting && <Ionicons name="checkmark" size={20} color={modernColors.white} />}
      </TouchableOpacity>
    ) : (
      <View style={styles.navigationHint}>
        <Text style={styles.hintText}>
          {currentStep === 1 && 'Selecciona un tratamiento para continuar'}
          {currentStep === 2 && 'Elige tu profesional preferido'}
          {currentStep === 3 && 'Selecciona una fecha disponible'}
          {currentStep === 4 && 'Elige el horario que más te convenga'}
        </Text>
      </View>
    )}
  </View>
);

// ============================================================================
// ESTILOS CORREGIDOS ✅
// ============================================================================
const styles = {
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  headerSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end' as const,
  },
  progressContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: modernColors.gray300,
    marginLeft: 4,
  },
  progressDotActive: {
    backgroundColor: modernColors.primary,
  },
  // Resumen
  summarySection: {
    padding: 20,
    paddingTop: 0,
  },
  summaryTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    ...modernShadows.medium,
  },
  summaryRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    flex: 1,
  },
  summaryValue: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    fontWeight: '500' as const,
    flex: 1,
    textAlign: 'right' as const,
  },
  // ⭐ NUEVOS ESTILOS PARA EDITAR
  summaryValueContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 2,
    justifyContent: 'flex-end' as const,
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 12,
    backgroundColor: modernColors.gray100,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
    marginTop: 8,
    paddingTop: 16,
  },
  summaryTotalLabel: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.text,
    fontWeight: '600' as const,
    flex: 1,
  },
  summaryTotalValue: {
    fontSize: modernTypography.fontSizeModern.xl,
    color: modernColors.primary,
    fontWeight: '700' as const,
    flex: 2,
    textAlign: 'right' as const,
  },
  // Botón inferior
  bottomContainer: {
    padding: 20,
    backgroundColor: modernColors.surface,
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
  },
  confirmButton: {
    flexDirection: 'row' as const,
    backgroundColor: modernColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...modernShadows.medium,
  },
  confirmButtonDisabled: {
    backgroundColor: modernColors.gray300,
    opacity: 0.6,
  },
  confirmButtonText: {
    color: modernColors.white,
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    marginRight: 8,
  },
  navigationHint: {
    alignItems: 'center' as const,
    paddingVertical: 16,
  },
  hintText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
};