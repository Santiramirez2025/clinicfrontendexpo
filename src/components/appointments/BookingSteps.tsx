// src/components/appointments/BookingSteps.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { modernColors, modernTypography, modernShadows } from '../../styles';

// ✅ INTERFACES PARA PROPS
interface Treatment {
  id: string;
  name: string;
  price: number;
  category: string; // ⭐ AGREGAR
  duration: number; // ⭐ AGREGAR
  // ... otros campos
}

interface Professional {
  id: string;
  name: string;
  specialty?: string; // ⭐ HACER OPCIONAL
  // ... otros campos
}
interface TreatmentSelectorProps {
  treatments: Treatment[];
  selectedTreatment?: Treatment | null;
  onSelect: (treatment: Treatment) => void;
}

interface ProfessionalSelectorProps {
  professionals: Professional[];
  selectedProfessional?: Professional | null;
  onSelect: (professional: Professional) => void;
}

interface DateSelectorProps {
  selectedDate?: string | null;
  onSelect: (date: string) => void;
}

interface TimeSelectorProps {
  availableSlots: string[];
  selectedTime?: string | null;
  onSelect: (time: string) => void;
}

interface NotesSectionProps {
  notes: string;
  onChangeNotes: (notes: string) => void;
}

interface BookingSummaryProps {
  selectedTreatment: Treatment;
  selectedProfessional: Professional;
  selectedDate: string;
  selectedTime: string;
}

// ✅ COMPONENTES EXPORTADOS INDIVIDUALMENTE
export const TreatmentSelector: React.FC<TreatmentSelectorProps> = ({ 
  treatments, 
  selectedTreatment, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un tratamiento</Text>
      {treatments.map((treatment) => (
        <TouchableOpacity
          key={treatment.id}
          style={[
            styles.treatmentCard,
            selectedTreatment?.id === treatment.id && styles.selectedCard
          ]}
          onPress={() => onSelect(treatment)}
        >
          <Text style={styles.treatmentIcon}>
            {treatment.iconName === 'sparkles' ? '✨' :
             treatment.iconName === 'waves' ? '🌊' :
             treatment.iconName === 'crown' ? '👑' : '💆‍♀️'}
          </Text>
          <Text style={styles.treatmentName}>{treatment.name}</Text>
          <Text style={styles.treatmentPrice}>${treatment.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const ProfessionalSelector: React.FC<ProfessionalSelectorProps> = ({ 
  professionals, 
  selectedProfessional, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un profesional</Text>
      {professionals.map((professional) => (
        <TouchableOpacity
          key={professional.id}
          style={[
            styles.professionalCard,
            selectedProfessional?.id === professional.id && styles.selectedCard
          ]}
          onPress={() => onSelect(professional)}
        >
          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const DateSelector: React.FC<DateSelectorProps> = ({ 
  selectedDate, 
  onSelect 
}) => {
  // Generar fechas de ejemplo
  const dates = ['2024-12-01', '2024-12-02', '2024-12-03'];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una fecha</Text>
      {dates.map((date) => (
        <TouchableOpacity
          key={date}
          style={[
            styles.dateCard,
            selectedDate === date && styles.selectedCard
          ]}
          onPress={() => onSelect(date)}
        >
          <Text style={styles.dateText}>{date}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const TimeSelector: React.FC<TimeSelectorProps> = ({ 
  availableSlots, 
  selectedTime, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un horario</Text>
      {availableSlots.map((time) => (
        <TouchableOpacity
          key={time}
          style={[
            styles.timeCard,
            selectedTime === time && styles.selectedCard
          ]}
          onPress={() => onSelect(time)}
        >
          <Text style={styles.timeText}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const NotesSection: React.FC<NotesSectionProps> = ({ 
  notes, 
  onChangeNotes 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas adicionales</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={onChangeNotes}
        placeholder="Agrega cualquier comentario adicional..."
        multiline
        numberOfLines={4}
      />
    </View>
  );
};

export const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  selectedTreatment,
  selectedProfessional,
  selectedDate,
  selectedTime
}) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Resumen de tu cita</Text>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Tratamiento:</Text>
        <Text style={styles.summaryValue}>{selectedTreatment.name}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Profesional:</Text>
        <Text style={styles.summaryValue}>{selectedProfessional.name}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Fecha:</Text>
        <Text style={styles.summaryValue}>{selectedDate}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Hora:</Text>
        <Text style={styles.summaryValue}>{selectedTime}</Text>
      </View>
    </View>
  );
};

// ✅ ESTILOS
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600',
    color: modernColors.text,
    marginBottom: 16,
  },
  treatmentCard: {
    padding: 16,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: modernColors.primary,
    backgroundColor: modernColors.primaryLight + '10',
  },
  treatmentIcon: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.text,
    textAlign: 'center',
  },
  treatmentPrice: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    textAlign: 'center',
    marginTop: 4,
  },
  professionalCard: {
    padding: 16,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  professionalName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.text,
  },
  professionalSpecialty: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginTop: 4,
  },
  dateCard: {
    padding: 16,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.text,
    textAlign: 'center',
  },
  timeCard: {
    padding: 16,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.text,
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    margin: 20,
  },
  summaryTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  summaryValue: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.text,
  },
});