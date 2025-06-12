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

interface Diagnosis {
  id: string;
  patientId: string;
  patientName: string;
  primaryDiagnosis: string;
  secondaryDiagnosis?: string;
  icdCode: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  diagnosisDate: string;
  doctor: string;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

const DiagnosisScreen: React.FC = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiagnoses();
  }, []);

  const loadDiagnoses = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockDiagnoses: Diagnosis[] = [
        {
          id: '1',
          patientId: 'P001',
          patientName: 'María García',
          primaryDiagnosis: 'Hipertensión arterial esencial',
          secondaryDiagnosis: 'Sobrepeso',
          icdCode: 'I10',
          severity: 'medium',
          symptoms: ['Dolor de cabeza', 'Mareos', 'Visión borrosa'],
          diagnosisDate: '2024-06-10',
          doctor: 'Dr. Juan Pérez',
          notes: 'Paciente presenta hipertensión arterial con valores consistentemente elevados. Requiere medicación y cambios en el estilo de vida.',
          followUpRequired: true,
          followUpDate: '2024-07-10',
        },
        {
          id: '2',
          patientId: 'P002',
          patientName: 'Carlos López',
          primaryDiagnosis: 'Diabetes mellitus tipo 2',
          icdCode: 'E11',
          severity: 'high',
          symptoms: ['Poliuria', 'Polidipsia', 'Fatiga', 'Pérdida de peso'],
          diagnosisDate: '2024-06-09',
          doctor: 'Dra. Ana Martínez',
          notes: 'Diagnóstico confirmado con glucemia en ayunas de 180 mg/dl. Requiere control estricto y educación diabetológica.',
          followUpRequired: true,
          followUpDate: '2024-06-23',
        },
        {
          id: '3',
          patientId: 'P003',
          patientName: 'Laura Rodríguez',
          primaryDiagnosis: 'Infección viral del tracto respiratorio superior',
          icdCode: 'J06.9',
          severity: 'low',
          symptoms: ['Congestión nasal', 'Dolor de garganta', 'Tos seca', 'Fiebre baja'],
          diagnosisDate: '2024-06-08',
          doctor: 'Dr. Juan Pérez',
          notes: 'Cuadro viral típico de temporada. Tratamiento sintomático y reposo.',
          followUpRequired: false,
        },
      ];
      setDiagnoses(mockDiagnoses);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los diagnósticos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDiagnoses();
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#34C759';
      case 'medium': return '#FF9500';
      case 'high': return '#FF3B30';
      case 'critical': return '#8B0000';
      default: return '#8E8E93';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Leve';
      case 'medium': return 'Moderado';
      case 'high': return 'Alto';
      case 'critical': return 'Crítico';
      default: return 'No especificado';
    }
  };

  const handleDiagnosisPress = (diagnosis: Diagnosis) => {
    const symptomsText = diagnosis.symptoms.join(', ');
    const followUpText = diagnosis.followUpRequired 
      ? `\nSeguimiento requerido: ${diagnosis.followUpDate}`
      : '\nNo requiere seguimiento';
    
    Alert.alert(
      'Detalles del Diagnóstico',
      `Diagnóstico: ${diagnosis.primaryDiagnosis}\nCódigo ICD: ${diagnosis.icdCode}\nSíntomas: ${symptomsText}\n\nNotas: ${diagnosis.notes}${followUpText}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        { text: 'Editar', onPress: () => editDiagnosis(diagnosis.id) },
      ]
    );
  };

  const editDiagnosis = (diagnosisId: string) => {
    // TODO: Navigate to edit screen
    Alert.alert('Información', `Editar diagnóstico ${diagnosisId}`);
  };

  const renderDiagnosis = ({ item }: { item: Diagnosis }) => (
    <TouchableOpacity style={styles.diagnosisCard} onPress={() => handleDiagnosisPress(item)}>
      <View style={styles.diagnosisHeader}>
        <View style={styles.diagnosisInfo}>
          <Text style={styles.primaryDiagnosis}>{item.primaryDiagnosis}</Text>
          <Text style={styles.icdCode}>Código ICD: {item.icdCode}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
          <Text style={styles.severityText}>{getSeverityText(item.severity)}</Text>
        </View>
      </View>
      
      <Text style={styles.patientName}>Paciente: {item.patientName}</Text>
      {item.secondaryDiagnosis && (
        <Text style={styles.secondaryDiagnosis}>Diagnóstico secundario: {item.secondaryDiagnosis}</Text>
      )}
      
      <View style={styles.symptomsContainer}>
        <Text style={styles.symptomsLabel}>Síntomas:</Text>
        <Text style={styles.symptoms}>{item.symptoms.join(', ')}</Text>
      </View>
      
      <View style={styles.diagnosisFooter}>
        <Text style={styles.diagnosisDate}>{item.diagnosisDate}</Text>
        <Text style={styles.doctor}>Dr. {item.doctor}</Text>
      </View>
      
      {item.followUpRequired && (
        <View style={styles.followUpContainer}>
          <Text style={styles.followUpText}>
            🔄 Seguimiento: {item.followUpDate}
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
          <Text>Cargando diagnósticos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Diagnósticos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Info', 'Nuevo diagnóstico')}>
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={diagnoses}
        renderItem={renderDiagnosis}
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
  diagnosisCard: {
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
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  diagnosisInfo: {
    flex: 1,
  },
  primaryDiagnosis: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  icdCode: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  patientName: {
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  secondaryDiagnosis: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  symptomsContainer: {
    marginBottom: 12,
  },
  symptomsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  symptoms: {
    fontSize: 14,
    color: '#666666',
  },
  diagnosisFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosisDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  doctor: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  followUpContainer: {
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  followUpText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default DiagnosisScreen;
