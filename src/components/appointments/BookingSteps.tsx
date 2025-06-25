// ============================================================================
// components/appointments/BookingSteps.tsx - ERRORES CORREGIDOS ✅
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { modernColors, modernTypography, modernShadows } from '../../styles';
import type { Treatment, Professional, TimeSlot } from '../../hooks/useBookAppointment';

// ============================================================================
// SELECCIÓN DE TRATAMIENTO - SIN CAMBIOS
// ============================================================================
interface TreatmentSelectorProps {
  treatments: Treatment[] | null;
  selectedTreatment: Treatment | null;
  onSelect: (treatment: Treatment) => void;
  loading: boolean;
}

export const TreatmentSelector = ({ treatments, selectedTreatment, onSelect, loading }: TreatmentSelectorProps) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>💆‍♀️</Text>
        <Text style={styles.loadingText}>Cargando tratamientos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Selecciona tu tratamiento</Text>
      <Text style={styles.sectionSubtitle}>Elige el servicio que deseas recibir</Text>
      
      <ScrollView style={styles.treatmentsList} showsVerticalScrollIndicator={false}>
        {treatments?.map((treatment) => (
          <TouchableOpacity
            key={treatment.id}
            style={[
              styles.treatmentCard,
              selectedTreatment?.id === treatment.id && styles.treatmentCardSelected
            ]}
            onPress={() => onSelect(treatment)}
          >
            <View style={styles.treatmentLeft}>
              <Text style={styles.treatmentEmoji}>
                {treatment.iconName === 'sparkles' ? '✨' :
                 treatment.iconName === 'waves' ? '🌊' :
                 treatment.iconName === 'crown' ? '👑' : '💆‍♀️'}
              </Text>
              <View style={styles.treatmentInfo}>
                <View style={styles.treatmentHeader}>
                  <Text style={styles.treatmentName}>{treatment.name}</Text>
                  {treatment.isVipExclusive && (
                    <View style={styles.vipBadge}>
                      <Ionicons name="diamond" size={10} color={modernColors.accent} />
                      <Text style={styles.vipText}>VIP</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.treatmentDescription}>{treatment.description}</Text>
                <View style={styles.treatmentMeta}>
                  <Text style={styles.treatmentDuration}>{treatment.duration} min</Text>
                  <Text style={styles.treatmentPrice}>${treatment.price}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.treatmentRight}>
              <Ionicons
                name={selectedTreatment?.id === treatment.id ? "radio-button-on" : "radio-button-off"}
                size={24}
                color={selectedTreatment?.id === treatment.id ? modernColors.primary : modernColors.gray400}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// ============================================================================
// SELECCIÓN DE PROFESIONAL - ✅ ERRORES CORREGIDOS
// ============================================================================
interface ProfessionalSelectorProps {
  professionals: Professional[] | null;
  selectedProfessional: Professional | null;
  onSelect: (professional: Professional) => void;
  loading: boolean;
}

export const ProfessionalSelector = ({ professionals, selectedProfessional, onSelect, loading }: ProfessionalSelectorProps) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>👩‍⚕️</Text>
        <Text style={styles.loadingText}>Cargando profesionales...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Elige tu profesional</Text>
      <Text style={styles.sectionSubtitle}>Selecciona quién realizará tu tratamiento</Text>
      
      <View style={styles.professionalsList}>
        {professionals?.map((professional) => (
          <TouchableOpacity
            key={professional.id}
            style={[
              styles.professionalCard,
              selectedProfessional?.id === professional.id && styles.professionalCardSelected
            ]}
            onPress={() => onSelect(professional)}
          >
            <View style={styles.professionalAvatar}>
              <Text style={styles.professionalInitial}>
                {/* ✅ CORREGIDO: Verificar que firstName y lastName existen */}
                {professional.name ? 
                  professional.name.split(' ').map(n => n[0]).join('').slice(0, 2) :
                  '??'
                }
              </Text>
            </View>
            
            <View style={styles.professionalInfo}>
              <Text style={styles.professionalName}>
                {professional.name}
              </Text>
              <Text style={styles.professionalSpecialty}>
                {professional.specialties ? professional.specialties.join(', ') : 'Especialista'}
              </Text>
              {professional.rating && (
                <View style={styles.professionalRating}>
                  <Ionicons name="star" size={14} color={modernColors.warning} />
                  <Text style={styles.ratingText}>{professional.rating}</Text>
                </View>
              )}
            </View>
            
            <Ionicons
              name={selectedProfessional?.id === professional.id ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={selectedProfessional?.id === professional.id ? modernColors.success : modernColors.gray400}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ============================================================================
// RESTO DE COMPONENTES SIN CAMBIOS
// ============================================================================

export const DateSelector = ({ selectedDate, onSelect }: {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Selecciona la fecha</Text>
      <Text style={styles.sectionSubtitle}>Elige cuándo quieres tu cita</Text>
      
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: modernColors.surface,
            calendarBackground: modernColors.surface,
            textSectionTitleColor: modernColors.text,
            selectedDayBackgroundColor: modernColors.primary,
            selectedDayTextColor: modernColors.white,
            todayTextColor: modernColors.primary,
            dayTextColor: modernColors.text,
            textDisabledColor: modernColors.gray400,
            arrowColor: modernColors.primary,
            monthTextColor: modernColors.text,
            indicatorColor: modernColors.primary,
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontWeight: '400',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
          }}
          minDate={today}
          maxDate={maxDate.toISOString().split('T')[0]}
          onDayPress={(day) => onSelect(day.dateString)}
          markedDates={selectedDate ? {
            [selectedDate]: {
              selected: true,
              selectedColor: modernColors.primary,
            }
          } : {}}
          firstDay={1}
          enableSwipeMonths={true}
        />
      </View>
    </View>
  );
};

export const TimeSelector = ({ availableSlots, selectedTime, onSelect, loading }: {
  availableSlots: TimeSlot[] | null;
  selectedTime: string | null;
  onSelect: (time: string) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>⏰</Text>
        <Text style={styles.loadingText}>Cargando horarios...</Text>
      </View>
    );
  }

  if (!availableSlots || availableSlots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📅</Text>
        <Text style={styles.emptyText}>No hay horarios disponibles para esta fecha</Text>
        <Text style={styles.emptySubtext}>Intenta seleccionar otra fecha</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Horarios disponibles</Text>
      <Text style={styles.sectionSubtitle}>Selecciona la hora que prefieras</Text>
      
      <View style={styles.timeSlotsContainer}>
        {availableSlots.map((slot) => (
          <TouchableOpacity
            key={slot.time}
            style={[
              styles.timeSlot,
              !slot.available && styles.timeSlotDisabled,
              selectedTime === slot.time && styles.timeSlotSelected
            ]}
            onPress={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
          >
            <Text style={[
              styles.timeSlotText,
              !slot.available && styles.timeSlotTextDisabled,
              selectedTime === slot.time && styles.timeSlotTextSelected
            ]}>
              {slot.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const NotesSection = ({ notes, onNotesChange }: {
  notes: string;
  onNotesChange: (notes: string) => void;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Notas adicionales (opcional)</Text>
    <Text style={styles.sectionSubtitle}>Comparte cualquier información relevante</Text>
    
    <TextInput
      style={styles.notesInput}
      placeholder="Ej: Primera vez, piel sensible, alergias..."
      placeholderTextColor={modernColors.gray500}
      value={notes}
      onChangeText={onNotesChange}
      multiline
      numberOfLines={3}
      maxLength={200}
    />
    <Text style={styles.characterCount}>{notes.length}/200</Text>
  </View>
);

// ============================================================================
// ESTILOS - SIN CAMBIOS
// ============================================================================
const styles = {
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 24,
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: 'center' as const,
    paddingVertical: 40,
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  // Tratamientos
  treatmentsList: {
    maxHeight: 400,
  },
  treatmentCard: {
    flexDirection: 'row' as const,
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    ...modernShadows.small,
  },
  treatmentCardSelected: {
    borderColor: modernColors.primary,
    backgroundColor: modernColors.primary + '05',
  },
  treatmentLeft: {
    flex: 1,
    flexDirection: 'row' as const,
  },
  treatmentEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
    flex: 1,
  },
  vipBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.accent + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  vipText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.accent,
    fontWeight: '600' as const,
    marginLeft: 2,
  },
  treatmentDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 8,
    lineHeight: 18,
  },
  treatmentMeta: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  treatmentDuration: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginRight: 12,
  },
  treatmentPrice: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.success,
  },
  treatmentRight: {
    justifyContent: 'center' as const,
    marginLeft: 12,
  },
  // Profesionales
  professionalsList: {
    gap: 12,
  },
  professionalCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...modernShadows.small,
  },
  professionalCardSelected: {
    borderColor: modernColors.success,
    backgroundColor: modernColors.success + '05',
  },
  professionalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: modernColors.primary + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  professionalInitial: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.primary,
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 2,
  },
  professionalSpecialty: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 4,
  },
  professionalRating: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  ratingText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginLeft: 4,
  },
  // Calendario
  calendarContainer: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 16,
    ...modernShadows.small,
  },
  calendar: {
    borderRadius: 12,
  },
  // Horarios
  timeSlotsContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: modernColors.surface,
    borderWidth: 2,
    borderColor: modernColors.gray200,
    minWidth: 80,
    alignItems: 'center' as const,
    ...modernShadows.small,
  },
  timeSlotSelected: {
    backgroundColor: modernColors.primary,
    borderColor: modernColors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: modernColors.gray100,
    borderColor: modernColors.gray200,
    opacity: 0.5,
  },
  timeSlotText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
    color: modernColors.text,
  },
  timeSlotTextSelected: {
    color: modernColors.white,
    fontWeight: '600' as const,
  },
  timeSlotTextDisabled: {
    color: modernColors.gray400,
  },
  // Estado vacío
  emptyContainer: {
    alignItems: 'center' as const,
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
  // Notas
  notesInput: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    textAlignVertical: 'top' as const,
    ...modernShadows.small,
  },
  characterCount: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray500,
    textAlign: 'right' as const,
    marginTop: 8,
  },
};