// src/screens/appointments/AppointmentScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const { width } = Dimensions.get('window');

// Paleta de colores spa digital elegante
const colors = {
  lavender: '#F5F3FF',          // Lavanda suave de fondo
  nude: '#F7F5F3',             // Nude cálido
  rosePale: '#FBEEF5',         // Rosa palo
  warmWhite: '#FEFDFB',        // Blanco cálido
  jade: '#85C4A6',             // Verde jade sutil
  gold: '#D4AF37',             // Dorado elegante
  softGray: '#A8A8A8',         // Gris suave para texto
  charcoal: '#3A3A3A',         // Carbón para títulos
  pearl: '#F9F7F4',            // Perla para cards
  blush: '#F4E6E1',            // Rubor suave
  sage: '#C8D5B9',             // Salvia para elementos seleccionados
  mist: '#E8E5E1',             // Niebla para bordes
};

type Step = 1 | 2 | 3;

interface Treatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  icon: string;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Professional {
  id: string;
  name: string;
  speciality: string;
  rating: number;
}

const AppointmentScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [notes, setNotes] = useState<string>('');

  // Mock data con lenguaje spa
  const treatments: Treatment[] = [
    { 
      id: '1', 
      name: 'Ritual Purificante', 
      duration: '60 min', 
      price: '€85', 
      icon: '✨',
      description: 'Limpieza profunda y renovación'
    },
    { 
      id: '2', 
      name: 'Drenaje Relajante', 
      duration: '45 min', 
      price: '€70', 
      icon: '🌸',
      description: 'Desintoxicación y bienestar'
    },
    { 
      id: '3', 
      name: 'Luminosidad Natural', 
      duration: '50 min', 
      price: '€95', 
      icon: '🕊',
      description: 'Tratamiento regenerador'
    },
    { 
      id: '4', 
      name: 'Terapia Anti-Edad', 
      duration: '75 min', 
      price: '€120', 
      icon: '🌿',
      description: 'Firmeza y juventud'
    },
  ];

  const availableDates = [
    { date: '2024-06-20', day: 'Jue', dayNum: '20', month: 'Jun' },
    { date: '2024-06-21', day: 'Vie', dayNum: '21', month: 'Jun' },
    { date: '2024-06-22', day: 'Sáb', dayNum: '22', month: 'Jun' },
    { date: '2024-06-24', day: 'Lun', dayNum: '24', month: 'Jun' },
    { date: '2024-06-25', day: 'Mar', dayNum: '25', month: 'Jun' },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:30', available: false },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '15:30', available: false },
    { time: '17:00', available: true },
    { time: '18:30', available: true },
  ];

  const professionals: Professional[] = [
    { id: '1', name: 'Carmen', speciality: 'Especialista en Bienestar', rating: 4.9 },
    { id: '2', name: 'Ana', speciality: 'Terapia Facial', rating: 4.8 },
    { id: '3', name: 'Sofia', speciality: 'Medicina Estética', rating: 4.9 },
  ];

  const handleConfirmAppointment = () => {
    if (!selectedTreatment || !selectedDate || !selectedTime) {
      Alert.alert('Un momento...', 'Por favor completa la información para continuar.');
      return;
    }

    Alert.alert(
      '¡Tu momento está reservado! ✨',
      `${selectedTreatment.name}\n${selectedDate} a las ${selectedTime}\n\nTe enviaremos todos los detalles por WhatsApp.`,
      [
        {
          text: '¡Perfecto!',
          onPress: () => {
            setCurrentStep(1);
            setSelectedTreatment(null);
            setSelectedDate('');
            setSelectedTime('');
            setSelectedProfessional(null);
            setNotes('');
          },
        },
      ]
    );
  };

  const TreatmentCard = ({ treatment }: { treatment: Treatment }) => (
    <TouchableOpacity
      style={[
        styles.treatmentCard,
        selectedTreatment?.id === treatment.id && styles.selectedTreatmentCard
      ]}
      onPress={() => {
        setSelectedTreatment(treatment);
        setCurrentStep(2);
      }}
    >
      <View style={styles.treatmentIconContainer}>
        <Text style={styles.treatmentIcon}>{treatment.icon}</Text>
      </View>
      <View style={styles.treatmentContent}>
        <Text style={styles.treatmentName}>{treatment.name}</Text>
        <Text style={styles.treatmentDescription}>{treatment.description}</Text>
        <View style={styles.treatmentDetails}>
          <Text style={styles.treatmentDuration}>{treatment.duration}</Text>
          <Text style={styles.treatmentPrice}>{treatment.price}</Text>
        </View>
      </View>
      {selectedTreatment?.id === treatment.id && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedIcon}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const DateCard = ({ dateInfo }: { dateInfo: typeof availableDates[0] }) => (
    <TouchableOpacity
      style={[
        styles.dateCard,
        selectedDate === dateInfo.date && styles.selectedDateCard
      ]}
      onPress={() => setSelectedDate(dateInfo.date)}
    >
      <Text style={[
        styles.dayText,
        selectedDate === dateInfo.date && styles.selectedDateText
      ]}>
        {dateInfo.day}
      </Text>
      <Text style={[
        styles.dayNumText,
        selectedDate === dateInfo.date && styles.selectedDateText
      ]}>
        {dateInfo.dayNum}
      </Text>
      <Text style={[
        styles.monthText,
        selectedDate === dateInfo.date && styles.selectedDateText
      ]}>
        {dateInfo.month}
      </Text>
    </TouchableOpacity>
  );

  const TimeSlotButton = ({ slot }: { slot: TimeSlot }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        !slot.available && styles.unavailableSlot,
        selectedTime === slot.time && styles.selectedTimeSlot
      ]}
      onPress={() => slot.available && setSelectedTime(slot.time)}
      disabled={!slot.available}
    >
      <Text style={[
        styles.timeText,
        !slot.available && styles.unavailableTimeText,
        selectedTime === slot.time && styles.selectedTimeText
      ]}>
        {slot.time}
      </Text>
    </TouchableOpacity>
  );

  const ProfessionalCard = ({ professional }: { professional: Professional }) => (
    <TouchableOpacity
      style={[
        styles.professionalCard,
        selectedProfessional?.id === professional.id && styles.selectedProfessionalCard
      ]}
      onPress={() => setSelectedProfessional(professional)}
    >
      <View style={styles.professionalAvatar}>
        <Text style={styles.avatarInitial}>{professional.name.charAt(0)}</Text>
      </View>
      <View style={styles.professionalInfo}>
        <Text style={styles.professionalName}>{professional.name}</Text>
        <Text style={styles.professionalSpeciality}>{professional.speciality}</Text>
        <Text style={styles.professionalRating}>⭐ {professional.rating}</Text>
      </View>
      {selectedProfessional?.id === professional.id && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedIcon}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const ProgressIndicator = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Paso {currentStep} de 3</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header elegante */}
        <View style={styles.header}>
          <Text style={styles.title}>Reserva tu momento</Text>
          <Text style={styles.subtitle}>
            Elige tu tratamiento ideal y el momento perfecto para ti
          </Text>
        </View>

        {/* Progress indicator minimalista */}
        <ProgressIndicator />

        {/* Paso 1: Seleccionar Tratamiento */}
        {currentStep === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>¿Qué tratamiento te apetece?</Text>
            <View style={styles.treatmentsContainer}>
              {treatments.map((treatment) => (
                <TreatmentCard key={treatment.id} treatment={treatment} />
              ))}
            </View>
          </View>
        )}

        {/* Paso 2: Fecha y Hora */}
        {currentStep === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>¿Cuándo te viene mejor?</Text>
            
            {/* Fechas disponibles */}
            <Text style={styles.sectionLabel}>Elige tu día</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.datesScroll}
            >
              {availableDates.map((dateInfo) => (
                <DateCard key={dateInfo.date} dateInfo={dateInfo} />
              ))}
            </ScrollView>

            {/* Horarios disponibles */}
            {selectedDate && (
              <View style={styles.timeSlotsSection}>
                <Text style={styles.sectionLabel}>Horarios disponibles</Text>
                <View style={styles.timeSlotsGrid}>
                  {timeSlots.map((slot, index) => (
                    <TimeSlotButton key={index} slot={slot} />
                  ))}
                </View>
                
                {selectedTime && (
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => setCurrentStep(3)}
                  >
                    <Text style={styles.continueButtonText}>Continuar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}

        {/* Paso 3: Especialista y Confirmación */}
        {currentStep === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Últimos detalles</Text>
            
            {/* Selección de especialista */}
            <Text style={styles.sectionLabel}>¿Tienes alguna preferencia?</Text>
            
            <TouchableOpacity
              style={[styles.autoAssignCard, !selectedProfessional && styles.selectedAutoAssign]}
              onPress={() => setSelectedProfessional(null)}
            >
              <Text style={styles.autoAssignText}>✨ Que elijan por mí</Text>
              <Text style={styles.autoAssignSubtext}>Te asignaremos la mejor especialista</Text>
            </TouchableOpacity>

            {professionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}

            {/* Notas opcionales */}
            <View style={styles.notesSection}>
              <Text style={styles.sectionLabel}>¿Algo que debamos saber?</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Escribe aquí si tienes alguna preferencia especial..."
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={setNotes}
                placeholderTextColor={colors.softGray}
              />
            </View>

            {/* Resumen elegante */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tu reserva</Text>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tratamiento</Text>
                <Text style={styles.summaryValue}>{selectedTreatment?.name}</Text>
              </View>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Fecha y hora</Text>
                <Text style={styles.summaryValue}>{selectedDate} • {selectedTime}</Text>
              </View>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Especialista</Text>
                <Text style={styles.summaryValue}>
                  {selectedProfessional?.name || 'Te asignaremos la mejor'}
                </Text>
              </View>
              
              <View style={styles.summaryPriceItem}>
                <Text style={styles.summaryLabel}>Inversión</Text>
                <Text style={styles.summaryPrice}>{selectedTreatment?.price}</Text>
              </View>
            </View>

            {/* Botón de confirmación */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
              <Text style={styles.confirmButtonText}>Confirmar mi momento</Text>
            </TouchableOpacity>
            
            <Text style={styles.confirmNote}>
              Recibirás la confirmación por WhatsApp.{'\n'}
              Puedes modificar hasta 24h antes.
            </Text>
          </View>
        )}

        {/* Garantías minimalistas */}
        <View style={styles.guaranteesSection}>
          <View style={styles.guaranteeItem}>
            <Text style={styles.guaranteeIcon}>🔒</Text>
            <Text style={styles.guaranteeText}>Reserva segura y protegida</Text>
          </View>
          <View style={styles.guaranteeItem}>
            <Text style={styles.guaranteeIcon}>💬</Text>
            <Text style={styles.guaranteeText}>Confirmación automática</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  progressBar: {
    width: '60%',
    height: 3,
    backgroundColor: colors.mist,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.jade,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.softGray,
    fontWeight: '300',
  },
  stepContent: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  treatmentsContainer: {
    gap: 16,
  },
  treatmentCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.mist,
  },
  selectedTreatmentCard: {
    borderColor: colors.jade,
    backgroundColor: colors.sage,
  },
  treatmentIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.blush,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  treatmentIcon: {
    fontSize: 22,
  },
  treatmentContent: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 4,
  },
  treatmentDescription: {
    fontSize: 14,
    color: colors.softGray,
    marginBottom: 8,
    fontWeight: '300',
  },
  treatmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treatmentDuration: {
    fontSize: 12,
    color: colors.softGray,
    fontWeight: '300',
  },
  treatmentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.jade,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    backgroundColor: colors.jade,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    color: colors.warmWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.charcoal,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  datesScroll: {
    paddingRight: 24,
    gap: 12,
  },
  dateCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: colors.mist,
    marginRight: 12,
  },
  selectedDateCard: {
    borderColor: colors.jade,
    backgroundColor: colors.sage,
  },
  dayText: {
    fontSize: 12,
    color: colors.softGray,
    marginBottom: 4,
    fontWeight: '300',
  },
  dayNumText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.charcoal,
    marginBottom: 2,
  },
  monthText: {
    fontSize: 10,
    color: colors.softGray,
    fontWeight: '300',
  },
  selectedDateText: {
    color: colors.jade,
  },
  timeSlotsSection: {
    marginTop: 24,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  timeSlot: {
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.mist,
  },
  selectedTimeSlot: {
    borderColor: colors.jade,
    backgroundColor: colors.sage,
  },
  unavailableSlot: {
    backgroundColor: colors.pearl,
    opacity: 0.5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.charcoal,
  },
  selectedTimeText: {
    color: colors.jade,
  },
  unavailableTimeText: {
    color: colors.softGray,
  },
  continueButton: {
    backgroundColor: colors.jade,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonText: {
    color: colors.warmWhite,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  autoAssignCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.mist,
  },
  selectedAutoAssign: {
    borderColor: colors.jade,
    backgroundColor: colors.sage,
  },
  autoAssignText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 4,
  },
  autoAssignSubtext: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  professionalCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.mist,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedProfessionalCard: {
    borderColor: colors.jade,
    backgroundColor: colors.sage,
  },
  professionalAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarInitial: {
    color: colors.charcoal,
    fontSize: 16,
    fontWeight: '600',
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 2,
  },
  professionalSpeciality: {
    fontSize: 13,
    color: colors.softGray,
    marginBottom: 2,
    fontWeight: '300',
  },
  professionalRating: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '400',
  },
  notesSection: {
    marginTop: 24,
  },
  notesInput: {
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: colors.charcoal,
    borderWidth: 1,
    borderColor: colors.mist,
    textAlignVertical: 'top',
    minHeight: 80,
    fontWeight: '300',
  },
  summaryCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryPriceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.mist,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
  },
  summaryValue: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  summaryPrice: {
    fontSize: 18,
    color: colors.jade,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: colors.jade,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmButtonText: {
    color: colors.warmWhite,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  confirmNote: {
    fontSize: 12,
    color: colors.softGray,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    fontWeight: '300',
  },
  guaranteesSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  guaranteeIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  guaranteeText: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '300',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default AppointmentScreen;