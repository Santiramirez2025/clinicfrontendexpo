import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  reason: string;
  notes: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => Promise<void>;
  initialData?: Partial<AppointmentFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  patients?: { id: string; name: string }[];
  doctors?: { id: string; name: string; specialty: string }[];
}

const appointmentTypes = [
  { value: 'consultation', label: 'Consulta' },
  { value: 'follow-up', label: 'Seguimiento' },
  { value: 'emergency', label: 'Emergencia' },
  { value: 'surgery', label: 'Cirugía' },
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  mode = 'create',
  patients = [],
  doctors = [],
}) => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<AppointmentFormData>({
    defaultValues: initialData
  });

  const [patientModalVisible, setPatientModalVisible] = useState(false);
  const [doctorModalVisible, setDoctorModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const selectedPatient = patients.find(p => p.id === watch('patientId'));
  const selectedDoctor = doctors.find(d => d.id === watch('doctorId'));
  const selectedType = appointmentTypes.find(t => t.value === watch('type'));

  const handleSave = async (data: AppointmentFormData) => {
    try {
      await onSubmit(data);
      Alert.alert('Éxito', `Cita ${mode === 'create' ? 'creada' : 'actualizada'} correctamente`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la cita');
    }
  };

  const renderPatientItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue('patientId', item.id);
        setPatientModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDoctorItem = ({ item }: { item: { id: string; name: string; specialty: string } }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue('doctorId', item.id);
        setDoctorModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
      <Text style={styles.modalItemSubtext}>{item.specialty}</Text>
    </TouchableOpacity>
  );

  const renderTypeItem = ({ item }: { item: { value: string; label: string } }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue('type', item.value as any);
        setTypeModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderTimeItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue('time', item);
        setTimeModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Nueva Cita' : 'Editar Cita'}
        </Text>

        {/* Selección de Paciente */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Paciente *</Text>
          <TouchableOpacity
            style={[styles.selector, !selectedPatient && styles.placeholder]}
            onPress={() => setPatientModalVisible(true)}
          >
            <Text style={[styles.selectorText, !selectedPatient && styles.placeholderText]}>
              {selectedPatient ? selectedPatient.name : 'Seleccionar paciente'}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Selección de Doctor */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Doctor *</Text>
          <TouchableOpacity
            style={[styles.selector, !selectedDoctor && styles.placeholder]}
            onPress={() => setDoctorModalVisible(true)}
          >
            <Text style={[styles.selectorText, !selectedDoctor && styles.placeholderText]}>
              {selectedDoctor ? `${selectedDoctor.name} - ${selectedDoctor.specialty}` : 'Seleccionar doctor'}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Fecha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha *</Text>
          <Controller
            control={control}
            name="date"
            rules={{ required: 'Fecha es requerida' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.date && styles.inputError]}
                placeholder="DD/MM/YYYY"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.date && <Text style={styles.errorText}>{errors.date.message}</Text>}
        </View>

        {/* Hora */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Hora *</Text>
            <TouchableOpacity
              style={[styles.selector, !watch('time') && styles.placeholder]}
              onPress={() => setTimeModalVisible(true)}
            >
              <Text style={[styles.selectorText, !watch('time') && styles.placeholderText]}>
                {watch('time') || 'Seleccionar hora'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Duración (min)</Text>
            <Controller
              control={control}
              name="duration"
              rules={{ required: 'Duración es requerida' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.duration && styles.inputError]}
                  placeholder="30"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(parseInt(text) || 0)}
                  value={value?.toString()}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        {/* Tipo de Cita */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de Cita *</Text>
          <TouchableOpacity
            style={[styles.selector, !selectedType && styles.placeholder]}
            onPress={() => setTypeModalVisible(true)}
          >
            <Text style={[styles.selectorText, !selectedType && styles.placeholderText]}>
              {selectedType ? selectedType.label : 'Seleccionar tipo'}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Motivo */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Motivo de la Consulta *</Text>
          <Controller
            control={control}
            name="reason"
            rules={{ required: 'Motivo es requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea, errors.reason && styles.inputError]}
                placeholder="Describa el motivo de la consulta..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
              />
            )}
          />
          {errors.reason && <Text style={styles.errorText}>{errors.reason.message}</Text>}
        </View>

        {/* Notas */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notas Adicionales</Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Notas adicionales del doctor..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit(handleSave)}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {mode === 'create' ? 'Crear Cita' : 'Actualizar Cita'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Pacientes */}
      <Modal visible={patientModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Paciente</Text>
              <TouchableOpacity onPress={() => setPatientModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={patients}
              renderItem={renderPatientItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Doctores */}
      <Modal visible={doctorModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Doctor</Text>
              <TouchableOpacity onPress={() => setDoctorModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={doctors}
              renderItem={renderDoctorItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Tipo */}
      <Modal visible={typeModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tipo de Cita</Text>
              <TouchableOpacity onPress={() => setTypeModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={appointmentTypes}
              renderItem={renderTypeItem}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Hora */}
      <Modal visible={timeModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Hora</Text>
              <TouchableOpacity onPress={() => setTimeModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={timeSlots}
              renderItem={renderTimeItem}
              keyExtractor={(item) => item}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfInput: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#E74C3C',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    borderColor: '#BDC3C7',
  },
  selectorText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  placeholderText: {
    color: '#BDC3C7',
  },
  arrow: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  submitButton: {
    backgroundColor: '#3498DB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  closeButton: {
    fontSize: 20,
    color: '#7F8C8D',
    fontWeight: 'bold',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F6',
  },
  modalItemText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  modalItemSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
});

export default AppointmentForm;
