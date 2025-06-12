import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';

interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  treatmentType: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'paused';
  doctor: string;
  duration: string;
  frequency: string;
  instructions: string;
  medications?: string[];
  procedures?: string[];
  followUpRequired: boolean;
  nextAppointment?: string;
  progress: number; // 0-100
}

const TreatmentScreen: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockTreatments: Treatment[] = [
        {
          id: '1',
          patientId: 'P001',
          patientName: 'María García',
          treatmentType: 'Tratamiento Antihipertensivo',
          description: 'Tratamiento integral para control de hipertensión arterial',
          startDate: '2024-06-10',
          status: 'active',
          doctor: 'Dr. Juan Pérez',
          duration: '6 meses',
          frequency: 'Diario',
          instructions: 'Medicación diaria, dieta baja en sodio, ejercicio regular 30 min/día',
          medications: ['Lisinopril 10mg', 'Amlodipina 5mg'],
          procedures: ['Control de presión arterial semanal'],
          followUpRequired: true,
          nextAppointment: '2024-07-10',
          progress: 65,
        },
        {
          id: '2',
          patientId: 'P002',
          patientName: 'Carlos López',
          treatmentType: 'Control Diabético',
          description: 'Manejo integral de diabetes mellitus tipo 2',
          startDate: '2024-06-09',
          status: 'active',
          doctor: 'Dra. Ana Martínez',
          duration: 'Indefinido',
          frequency: 'Diario',
          instructions: 'Medicación oral, monitoreo glucémico, dieta controlada en carbohidratos',
          medications: ['Metformina 500mg', 'Glibenclamida 5mg'],
          procedures: ['Glucometría diaria', 'HbA1c trimestral'],
          followUpRequired: true,
          nextAppointment: '2024-06-23',
          progress: 40,
        },
        {
          id: '3',
          patientId: 'P003',
          patientName: 'Laura Rodríguez',
          treatmentType: 'Tratamiento Viral',
          description: 'Tratamiento sintomático para infección viral respiratoria',
          startDate: '2024-06-08',
          endDate: '2024-06-13',
          status: 'completed',
          doctor: 'Dr. Juan Pérez',
          duration: '5 días',
          frequency: 'Según síntomas',
          instructions: 'Reposo, hidratación abundante, medicación sintomática',
          medications: ['Paracetamol 500mg PRN'],
          procedures: ['Reposo domiciliario'],
          followUpRequired: false,
          progress: 100,
        },
        {
          id: '4',
          patientId: 'P004',
          patientName: 'Roberto Sánchez',
          treatmentType: 'Fisioterapia Post-Quirúrgica',
          description: 'Rehabilitación después de cirugía de rodilla',
          startDate: '2024-06-05',
          status: 'active',
          doctor: 'Dr. Elena Torres',
          duration: '12 semanas',
          frequency: '3 veces por semana',
          instructions: 'Ejercicios de movilidad, fortalecimiento progresivo, aplicación de frío',
          procedures: ['Electroestimulación', 'Ejercicios de ROM', 'Fortalecimiento'],
          followUpRequired: true,
          nextAppointment: '2024-06-15',
          progress: 30,
        },
      ];
      setTreatments(mockTreatments);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los tratamientos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTreatments();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return '#FF9500';
      case 'active': return '#007AFF';
      case 'completed': return '#34C759';
      case 'cancelled': return '#FF3B30';
      case 'paused': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Planificado';
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      case 'paused': return 'Pausado';
      default: return 'Desconocido';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#34C759';
    if (progress >= 50) return '#007AFF';
    if (progress >= 25) return '#FF9500';
    return '#FF3B30';
  };

  const handleTreatmentPress = (treatment: Treatment) => {
    const medicationsText = treatment.medications ? treatment.medications.join(', ') : 'No especificado';
    const proceduresText = treatment.procedures ? treatment.procedures.join(', ') : 'No especificado';
    const nextAppText = treatment.nextAppointment ? `\nPróxima cita: ${treatment.nextAppointment}` : '';
    
    Alert.alert(
      'Detalles del Tratamiento',
      `Tipo: ${treatment.treatmentType}\nDuración: ${treatment.duration}\nFrecuencia: ${treatment.frequency}\n\nMedicamentos: ${medicationsText}\n\nProcedimientos: ${proceduresText}\n\nInstrucciones: ${treatment.instructions}${nextAppText}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        { text: 'Editar', onPress: () => editTreatment(treatment.id) },
        { 
          text: 'Progreso', 
          onPress: () => updateProgress(treatment.id, treatment.progress),
        },
      ]
    );
  };

  const editTreatment = (treatmentId: string) => {
    // TODO: Navigate to edit screen
    Alert.alert('Información', `Editar tratamiento ${treatmentId}`);
  };

  const updateProgress = (treatmentId: string, currentProgress: number) => {
    Alert.prompt(
      'Actualizar Progreso',
      `Progreso actual: ${currentProgress}%\nIngrese el nuevo progreso (0-100):`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Actualizar',
          onPress: (value) => {
            const newProgress = parseInt(value || '0', 10);
            if (newProgress >= 0 && newProgress <= 100) {
              // TODO: Update progress in backend
              const updatedTreatments = treatments.map(t => 
                t.id === treatmentId ? { ...t, progress: newProgress } : t
              );
              setTreatments(updatedTreatments);
              Alert.alert('Éxito', 'Progreso actualizado correctamente');
            } else {
              Alert.alert('Error', 'El progreso debe estar entre 0 y 100');
            }
          },
        },
      ],
      'plain-text',
      currentProgress.toString()
    );
  };

  const renderTreatment = ({ item }: { item: Treatment }) => (
    <TouchableOpacity style={styles.treatmentCard} onPress={() => handleTreatmentPress(item)}>
      <View style={styles.treatmentHeader}>
        <View style={styles.treatmentInfo}>
          <Text style={styles.treatmentType}>{item.treatmentType}</Text>
          <Text style={styles.treatmentDuration}>{item.duration} - {item.frequency}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.patientName}>Paciente: {item.patientName}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressPercent}>{item.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${item.progress}%`,
                backgroundColor: getProgressColor(item.progress)
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.treatmentFooter}>
        <Text style={styles.startDate}>Inicio: {item.startDate}</Text>
        <Text style={styles.doctor}>Dr. {item.doctor}</Text>
      </View>
      
      {item.nextAppointment && (
        <View style={styles.nextAppointmentContainer}>
          <Text style={styles.nextAppointmentText}>
            📅 Próxima cita: {item.nextAppointment}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text>Cargando tratamientos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Tratamientos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Info', 'Nuevo tratamiento')}>
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={treatments}
        renderItem={renderTreatment}
        keyExtractor={item => item.id}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  list: {
    flex: 1,
    paddingTop: 16,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  treatmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  treatmentDuration: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  patientName: {
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  treatmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  startDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  doctor: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  nextAppointmentContainer: {
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  nextAppointmentText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default TreatmentScreen;
