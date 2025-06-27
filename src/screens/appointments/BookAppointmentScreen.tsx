import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';

// ✅ HOOKS CORREGIDOS
import { useBookAppointment } from '../../hooks/useBookAppointment';

// ✅ COMPONENTES CORREGIDOS
import {
  TreatmentSelector,
  ProfessionalSelector,
  DateSelector,
  TimeSelector,
  NotesSection,
} from '../../components/appointments/BookingSteps';

// ✅ SEPARAR BookingSummary si viene de otro archivo
import { 
  Header, 
  BookingSummary, 
  BottomAction 
} from '../../components/appointments/BookingSummary';

// ✅ TIPOS NECESARIOS
interface Treatment {
  id: string;
  name: string;
  price: number;
  iconName?: string;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

interface BookAppointmentScreenProps {
  navigation: any;
}

const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ navigation }) => {
  const {
    treatments,
    professionals,
    availableSlots,
    selectedTreatment,
    selectedProfessional,
    selectedDate,
    selectedTime,
    notes,
    loading,
    submitting,
    selectTreatment,
    selectProfessional,
    selectDate,
    selectTime,
    setNotes,
    submitBooking,
    canSubmit,
  } = useBookAppointment(navigation);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // ============================================================================
  // HANDLERS CORREGIDOS ✅
  // ============================================================================
  const handleSubmit = async () => {
    try {
      console.log('📅 Submitting appointment booking...');
      const success = await submitBooking();
      
      if (success) {
        console.log('✅ Appointment booked successfully');
      }
    } catch (error) {
      console.error('❌ Error submitting booking:', error);
      Alert.alert(
        'Error',
        'No se pudo agendar la cita. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  // ✅ TIPOS EXPLÍCITOS EN HANDLERS
  const handleStepSelection = (newValue: Treatment | Professional | string, stepType: string) => {
    switch (stepType) {
      case 'treatment':
        selectTreatment(newValue as Treatment);
        if (newValue && currentStep === 1) setCurrentStep(2);
        break;
      case 'professional':
        selectProfessional(newValue as Professional);
        if (newValue && currentStep === 2) setCurrentStep(3);
        break;
      case 'date':
        selectDate(newValue as string);
        if (newValue && currentStep === 3) setCurrentStep(4);
        break;
      case 'time':
        selectTime(newValue as string);
        if (newValue && currentStep === 4) setCurrentStep(5);
        break;
    }
  };

  const handleEditStep = (step: number) => {
    switch (step) {
      case 1:
        selectTreatment(null);
        setCurrentStep(1);
        break;
      case 2:
        selectProfessional(null);
        setCurrentStep(2);
        break;
      case 3:
        selectDate(null);
        setCurrentStep(3);
        break;
      case 4:
        selectTime(null);
        setCurrentStep(4);
        break;
    }
  };

  // ============================================================================
  // RENDERIZAR PASO ACTUAL CON TIPOS ✅
  // ============================================================================
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TreatmentSelector
            treatments={treatments}
            selectedTreatment={selectedTreatment}
            onSelect={(treatment: Treatment) => handleStepSelection(treatment, 'treatment')}
            // ✅ QUITAR loading si no existe en props
          />
        );
      
      case 2:
        return (
          <ProfessionalSelector
            professionals={professionals}
            selectedProfessional={selectedProfessional}
            onSelect={(professional: Professional) => handleStepSelection(professional, 'professional')}
            // ✅ QUITAR loading si no existe en props
          />
        );
      
      case 3:
        return (
          <DateSelector
            selectedDate={selectedDate}
            onSelect={(date: string) => handleStepSelection(date, 'date')}
          />
        );
      
      case 4:
        return (
          <TimeSelector
            availableSlots={availableSlots}
            selectedTime={selectedTime}
            onSelect={(time: string) => handleStepSelection(time, 'time')}
            // ✅ QUITAR loading si no existe en props
          />
        );
      
      case 5:
        return (
          <>
            {selectedTreatment && selectedProfessional && selectedDate && selectedTime && (
              <BookingSummary
                selectedTreatment={selectedTreatment}
                selectedProfessional={selectedProfessional}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onEditStep={handleEditStep}
              />
            )}
            <NotesSection
              notes={notes}
              onChangeNotes={setNotes} // ✅ USAR onChangeNotes en lugar de onNotesChange
            />
          </>
        );
      
      default:
        return null;
    }
  };

  // ============================================================================
  // RENDERIZAR BOTÓN DE NAVEGACIÓN ✅
  // ============================================================================
  const renderBottomAction = () => {
    if (currentStep === 5) {
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!canSubmit || submitting) && styles.confirmButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || submitting}
          >
            {submitting ? (
              <Text style={styles.confirmButtonText}>Agendando...</Text>
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.confirmButtonText}>Confirmar cita</Text>
                <Ionicons name="checkmark" size={20} color={modernColors.white} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    } else {
      const getStepHint = () => {
        switch (currentStep) {
          case 1: return 'Selecciona un tratamiento para continuar';
          case 2: return 'Elige tu profesional preferido';
          case 3: return 'Selecciona una fecha disponible';
          case 4: return 'Elige el horario que más te convenga';
          default: return '';
        }
      };

      return (
        <View style={styles.bottomContainer}>
          <View style={styles.navigationHint}>
            <Text style={styles.hintText}>{getStepHint()}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header profesional */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
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
      
      {/* Contenido principal */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.stepContainer}>
          {renderCurrentStep()}
        </View>
      </ScrollView>
      
      {/* Botón de acción fijo */}
      {renderBottomAction()}
    </SafeAreaView>
  );
};

// ============================================================================
// ESTILOS CORREGIDOS ✅
// ============================================================================
const styles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  
  // Header elegante
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
    backgroundColor: modernColors.surface,
    ...modernShadows.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: modernColors.gray100,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '700' as const,
    color: modernColors.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    fontWeight: '500' as const,
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end' as const,
  },
  progressContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: modernColors.gray300,
    marginLeft: 6,
  },
  progressDotActive: {
    backgroundColor: modernColors.primary,
    transform: [{ scale: 1.2 }],
  },

  // Contenido principal
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Espacio para botón fijo
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  // Botón de acción fijo
  bottomContainer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 34, // Safe area bottom
    backgroundColor: modernColors.surface,
    borderTopWidth: 1,
    borderTopColor: modernColors.gray200,
    ...modernShadows.large,
  },
  confirmButton: {
    backgroundColor: modernColors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...modernShadows.medium,
  },
  confirmButtonDisabled: {
    backgroundColor: modernColors.gray300,
    opacity: 0.6,
  },
  // ✅ AGREGAR buttonContent
  buttonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  confirmButtonText: {
    color: modernColors.white,
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '700' as const,
    marginRight: 8,
    letterSpacing: 0.5,
  },
  navigationHint: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },
  hintText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center' as const,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
};

export default BookAppointmentScreen;