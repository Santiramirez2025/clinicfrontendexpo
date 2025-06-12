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
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface MedicalRecordFormData {
  patientId: string;
  appointmentId: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string;
  medications: string;
  allergies: string;
  physicalExamination: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    weight: string;
    height: string;
  };
  diagnosis: string;
  treatmentPlan: string;
  prescriptions: string;
  followUpInstructions: string;
  nextAppointment: string;
  doctorNotes: string;
}

interface MedicalRecordFormProps {
  onSubmit: (data: MedicalRecordFormData) => Promise<void>;
  initialData?: Partial<MedicalRecordFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  patientName?: string;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  mode = 'create',
  patientName = 'Paciente',
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<MedicalRecordFormData>({
    defaultValues: {
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
      },
      ...initialData,
    }
  });

  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { title: 'Historia Clínica', icon: '📋' },
    { title: 'Examen Físico', icon: '🩺' },
    { title: 'Signos Vitales', icon: '📊' },
    { title: 'Diagnóstico', icon: '🔍' },
    { title: 'Tratamiento', icon: '💊' },
  ];

  const handleSave = async (data: MedicalRecordFormData) => {
    try {
      await onSubmit(data);
      Alert.alert('Éxito', `Expediente médico ${mode === 'create' ? 'creado' : 'actualizado'} correctamente`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el expediente médico');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 0: // Historia Clínica
        return (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Motivo de Consulta *</Text>
              <Controller
                control={control}
                name="chiefComplaint"
                rules={{ required: 'Motivo de consulta es requerido' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textArea, errors.chiefComplaint && styles.inputError]}
                    placeholder="Describe el motivo principal de la consulta..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
              {errors.chiefComplaint && <Text style={styles.errorText}>{errors.chiefComplaint.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Historia de la Enfermedad Actual</Text>
              <Controller
                control={control}
                name="historyOfPresentIllness"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Describe la evolución de los síntomas..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={6}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Antecedentes Médicos</Text>
              <Controller
                control={control}
                name="pastMedicalHistory"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Enfermedades previas, cirugías, hospitalizaciones..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Medicamentos Actuales</Text>
              <Controller
                control={control}
                name="medications"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Lista de medicamentos que toma actualmente..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={3}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Alergias</Text>
              <Controller
                control={control}
                name="allergies"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Alergias conocidas a medicamentos, alimentos, etc."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
        );

      case 1: // Examen Físico
        return (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Examen Físico General</Text>
              <Controller
                control={control}
                name="physicalExamination"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textArea, { height: 200 }]}
                    placeholder="Describe los hallazgos del examen físico:
- Cabeza y cuello
- Tórax y pulmones
- Corazón
- Abdomen
- Extremidades
- Neurológico"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={10}
                  />
                )}
              />
            </View>
          </View>
        );

      case 2: // Signos Vitales
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Presión Arterial</Text>
                <Controller
                  control={control}
                  name="vitalSigns.bloodPressure"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="120/80"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Freq. Cardíaca</Text>
                <Controller
                  control={control}
                  name="vitalSigns.heartRate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="72 bpm"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Temperatura</Text>
                <Controller
                  control={control}
                  name="vitalSigns.temperature"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="36.5°C"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Freq. Respiratoria</Text>
                <Controller
                  control={control}
                  name="vitalSigns.respiratoryRate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="16 rpm"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Saturación O2</Text>
                <Controller
                  control={control}
                  name="vitalSigns.oxygenSaturation"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="98%"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Peso</Text>
                <Controller
                  control={control}
                  name="vitalSigns.weight"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="70 kg"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Altura</Text>
              <Controller
                control={control}
                name="vitalSigns.height"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="1.75 m"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
        );

      case 3: // Diagnóstico
        return (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Diagnóstico *</Text>
              <Controller
                control={control}
                name="diagnosis"
                rules={{ required: 'Diagnóstico es requerido' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textArea, errors.diagnosis && styles.inputError]}
                    placeholder="Diagnóstico principal y diagnósticos diferenciales..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={6}
                  />
                )}
              />
              {errors.diagnosis && <Text style={styles.errorText}>{errors.diagnosis.message}</Text>}
            </View>
          </View>
        );

      case 4: // Tratamiento
        return (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Plan de Tratamiento *</Text>
              <Controller
                control={control}
                name="treatmentPlan"
                rules={{ required: 'Plan de tratamiento es requerido' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textArea, errors.treatmentPlan && styles.inputError]}
                    placeholder="Describe el plan de tratamiento detallado..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={6}
                  />
                )}
              />
              {errors.treatmentPlan && <Text style={styles.errorText}>{errors.treatmentPlan.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prescripciones</Text>
              <Controller
                control={control}
                name="prescriptions"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Medicamentos prescritos con dosis y frecuencia..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instrucciones de Seguimiento</Text>
              <Controller
                control={control}
                name="followUpInstructions"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Instrucciones para el paciente y cuidados en casa..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Próxima Cita</Text>
              <Controller
                control={control}
                name="nextAppointment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Fecha recomendada para seguimiento"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notas del Doctor</Text>
              <Controller
                control={control}
                name="doctorNotes"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textArea}
                    placeholder="Notas adicionales del médico..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={3}
                  />
                )}
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Expediente Médico</Text>
        <Text style={styles.patientName}>{patientName}</Text>
      </View>

      {/* Navigation Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeSection === index && styles.activeTab]}
            onPress={() => setActiveSection(index)}
          >
            <Text style={styles.tabIcon}>{section.icon}</Text>
            <Text style={[styles.tabText, activeSection === index && styles.activeTabText]}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {renderSection()}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {activeSection > 0 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setActiveSection(activeSection - 1)}
            >
              <Text style={styles.navButtonText}>← Anterior</Text>
            </TouchableOpacity>
          )}

          {activeSection < sections.length - 1 ? (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => setActiveSection(activeSection + 1)}
            >
              <Text style={[styles.navButtonText, styles.nextButtonText]}>Siguiente →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.disabledButton]}
              onPress={handleSubmit(handleSave)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {mode === 'create' ? 'Guardar Expediente' : 'Actualizar Expediente'}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  patientName: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 4,
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 100,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
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
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 120,
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
  },
  navButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  navButtonText: {
    fontSize: 16,
    color: '#34495E',
    fontWeight: '500',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MedicalRecordForm;
