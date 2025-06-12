import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionProps {
  patientId: string;
  medications?: Medication[];
  editable?: boolean;
  onSave?: (medications: Medication[]) => void;
}

const Prescription: React.FC<PrescriptionProps> = ({
  patientId,
  medications = [],
  editable = true,
  onSave,
}) => {
  const [currentMedications, setCurrentMedications] = useState<Medication[]>(
    medications.length > 0 ? medications : [
      {
        id: '1',
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Cada 8 horas',
        duration: '7 días',
        instructions: 'Tomar con alimentos',
      },
      {
        id: '2',
        name: 'Ibuprofeno',
        dosage: '400mg',
        frequency: 'Cada 12 horas',
        duration: '5 días',
        instructions: 'En caso de dolor',
      },
    ]
  );
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  const addNewMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    };
    setEditingMedication(newMedication);
    setIsEditing(true);
  };

  const editMedication = (medication: Medication) => {
    setEditingMedication({ ...medication });
    setIsEditing(true);
  };

  const saveMedication = () => {
    if (!editingMedication?.name.trim()) {
      Alert.alert('Error', 'El nombre del medicamento es requerido');
      return;
    }

    const existingIndex = currentMedications.findIndex(
      med => med.id === editingMedication.id
    );

    let updatedMedications;
    if (existingIndex >= 0) {
      updatedMedications = currentMedications.map(med =>
        med.id === editingMedication.id ? editingMedication : med
      );
    } else {
      updatedMedications = [...currentMedications, editingMedication];
    }

    setCurrentMedications(updatedMedications);
    setIsEditing(false);
    setEditingMedication(null);
    onSave?.(updatedMedications);
  };

  const deleteMedication = (medicationId: string) => {
    Alert.alert(
      'Eliminar Medicamento',
      '¿Está seguro de eliminar este medicamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updated = currentMedications.filter(med => med.id !== medicationId);
            setCurrentMedications(updated);
            onSave?.(updated);
          },
        },
      ]
    );
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingMedication(null);
  };

  if (isEditing && editingMedication) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {currentMedications.find(med => med.id === editingMedication.id) 
              ? 'Editar Medicamento' 
              : 'Nuevo Medicamento'
            }
          </Text>
        </View>

        <ScrollView style={styles.editForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Medicamento *</Text>
            <TextInput
              style={styles.textInput}
              value={editingMedication.name}
              onChangeText={(text) => 
                setEditingMedication(prev => prev ? {...prev, name: text} : null)
              }
              placeholder="Ej: Paracetamol"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dosis</Text>
            <TextInput
              style={styles.textInput}
              value={editingMedication.dosage}
              onChangeText={(text) => 
                setEditingMedication(prev => prev ? {...prev, dosage: text} : null)
              }
              placeholder="Ej: 500mg"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Frecuencia</Text>
            <TextInput
              style={styles.textInput}
              value={editingMedication.frequency}
              onChangeText={(text) => 
                setEditingMedication(prev => prev ? {...prev, frequency: text} : null)
              }
              placeholder="Ej: Cada 8 horas"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Duración</Text>
            <TextInput
              style={styles.textInput}
              value={editingMedication.duration}
              onChangeText={(text) => 
                setEditingMedication(prev => prev ? {...prev, duration: text} : null)
              }
              placeholder="Ej: 7 días"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Instrucciones</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={editingMedication.instructions}
              onChangeText={(text) => 
                setEditingMedication(prev => prev ? {...prev, instructions: text} : null)
              }
              placeholder="Instrucciones especiales..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveMedication}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Receta Médica</Text>
        {editable && (
          <TouchableOpacity style={styles.addButton} onPress={addNewMedication}>
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.medicationsList}>
        {currentMedications.map((medication, index) => (
          <View key={medication.id} style={styles.medicationCard}>
            <View style={styles.medicationHeader}>
              <Text style={styles.medicationNumber}>#{index + 1}</Text>
              <Text style={styles.medicationName}>{medication.name}</Text>
              {editable && (
                <View style={styles.medicationActions}>
                  <TouchableOpacity
                    style={styles.editIconButton}
                    onPress={() => editMedication(medication)}
                  >
                    <Text style={styles.actionIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteIconButton}
                    onPress={() => deleteMedication(medication.id)}
                  >
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.medicationDetails}>
              {medication.dosage && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Dosis:</Text>
                  <Text style={styles.detailValue}>{medication.dosage}</Text>
                </View>
              )}
              {medication.frequency && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Frecuencia:</Text>
                  <Text style={styles.detailValue}>{medication.frequency}</Text>
                </View>
              )}
              {medication.duration && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duración:</Text>
                  <Text style={styles.detailValue}>{medication.duration}</Text>
                </View>
              )}
              {medication.instructions && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Instrucciones:</Text>
                  <Text style={styles.detailValue}>{medication.instructions}</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {currentMedications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay medicamentos recetados</Text>
            {editable && (
              <TouchableOpacity style={styles.emptyButton} onPress={addNewMedication}>
                <Text style={styles.emptyButtonText}>Agregar primer medicamento</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
  medicationsList: {
    flex: 1,
    padding: 16,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationNumber: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  medicationName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  medicationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editIconButton: {
    padding: 4,
  },
  deleteIconButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 16,
  },
  medicationDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
  },
  editForm: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6C757D',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Prescription;
