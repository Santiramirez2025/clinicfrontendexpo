import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  notes: string;
}

interface MedicalHistoryProps {
  patientId: string;
  records?: MedicalRecord[];
  onAddRecord?: () => void;
  editable?: boolean;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({
  patientId,
  records = [],
  onAddRecord,
  editable = true,
}) => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const defaultRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-06-10',
      diagnosis: 'Hipertensión arterial',
      treatment: 'Enalapril 10mg',
      doctor: 'Dr. García',
      notes: 'Control en 3 meses',
    },
    {
      id: '2', 
      date: '2024-05-15',
      diagnosis: 'Diabetes tipo 2',
      treatment: 'Metformina 850mg',
      doctor: 'Dr. López',
      notes: 'Dieta y ejercicio regular',
    },
  ];

  const displayRecords = records.length > 0 ? records : defaultRecords;

  const toggleRecord = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const handleDeleteRecord = (recordId: string) => {
    Alert.alert(
      'Eliminar Registro',
      '¿Está seguro de eliminar este registro médico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            // Implementar lógica de eliminación
            console.log('Eliminando registro:', recordId);
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial Médico</Text>
        {editable && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddRecord}
          >
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.recordsList}>
        {displayRecords.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <TouchableOpacity
              style={styles.recordHeader}
              onPress={() => toggleRecord(record.id)}
            >
              <View style={styles.recordInfo}>
                <Text style={styles.recordDate}>{record.date}</Text>
                <Text style={styles.recordDiagnosis}>{record.diagnosis}</Text>
                <Text style={styles.recordDoctor}>Dr. {record.doctor}</Text>
              </View>
              <Text style={styles.expandIcon}>
                {expandedRecord === record.id ? '−' : '+'}
              </Text>
            </TouchableOpacity>

            {expandedRecord === record.id && (
              <View style={styles.recordDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Tratamiento:</Text>
                  <Text style={styles.detailValue}>{record.treatment}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Notas:</Text>
                  <Text style={styles.detailValue}>{record.notes}</Text>
                </View>
                {editable && (
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteRecord(record.id)}
                    >
                      <Text style={styles.actionText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  recordsList: {
    flex: 1,
    padding: 16,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  recordInfo: {
    flex: 1,
  },
  recordDate: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
  },
  recordDiagnosis: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  recordDoctor: {
    fontSize: 14,
    color: '#495057',
  },
  expandIcon: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  recordDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MedicalHistory;
