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

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  prescriptionDate: string;
  status: 'active' | 'completed' | 'cancelled';
  instructions: string;
}

const PrescriptionsScreen: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockPrescriptions: Prescription[] = [
        {
          id: '1',
          patientId: 'P001',
          patientName: 'María García',
          medication: 'Lisinopril',
          dosage: '10mg',
          frequency: '1 vez al día',
          duration: '30 días',
          doctor: 'Dr. Juan Pérez',
          prescriptionDate: '2024-06-10',
          status: 'active',
          instructions: 'Tomar en ayunas, preferiblemente en la mañana',
        },
        {
          id: '2',
          patientId: 'P002',
          patientName: 'Carlos López',
          medication: 'Metformina',
          dosage: '500mg',
          frequency: '2 veces al día',
          duration: '90 días',
          doctor: 'Dra. Ana Martínez',
          prescriptionDate: '2024-06-09',
          status: 'active',
          instructions: 'Tomar con las comidas principales',
        },
        {
          id: '3',
          patientId: 'P003',
          patientName: 'Laura Rodríguez',
          medication: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Cada 8 horas',
          duration: '5 días',
          doctor: 'Dr. Juan Pérez',
          prescriptionDate: '2024-06-08',
          status: 'completed',
          instructions: 'Solo si presenta fiebre o dolor',
        },
      ];
      setPrescriptions(mockPrescriptions);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las prescripciones');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrescriptions();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'completed': return '#8E8E93';
      case 'cancelled': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const handlePrescriptionPress = (prescription: Prescription) => {
    Alert.alert(
      'Detalles de Prescripción',
      `Medicamento: ${prescription.medication}\nDosis: ${prescription.dosage}\nFrecuencia: ${prescription.frequency}\nDuración: ${prescription.duration}\n\nInstrucciones: ${prescription.instructions}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        { text: 'Editar', onPress: () => editPrescription(prescription.id) },
      ]
    );
  };

  const editPrescription = (prescriptionId: string) => {
    // TODO: Navigate to edit screen
    Alert.alert('Información', `Editar prescripción ${prescriptionId}`);
  };

  const renderPrescription = ({ item }: { item: Prescription }) => (
    <TouchableOpacity style={styles.prescriptionCard} onPress={() => handlePrescriptionPress(item)}>
      <View style={styles.prescriptionHeader}>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{item.medication}</Text>
          <Text style={styles.dosage}>{item.dosage} - {item.frequency}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.patientName}>Paciente: {item.patientName}</Text>
      <Text style={styles.duration}>Duración: {item.duration}</Text>
      <Text style={styles.prescriptionDate}>Prescrito: {item.prescriptionDate}</Text>
      <Text style={styles.doctor}>Dr. {item.doctor}</Text>
      
      {item.instructions && (
        <Text style={styles.instructions} numberOfLines={2}>
          Instrucciones: {item.instructions}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text>Cargando prescripciones...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Prescripciones</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Info', 'Nueva prescripción')}>
          <Text style={styles.addButtonText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={prescriptions}
        renderItem={renderPrescription}
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
  prescriptionCard: {
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
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  dosage: {
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
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  prescriptionDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  doctor: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
});

export default PrescriptionsScreen;
