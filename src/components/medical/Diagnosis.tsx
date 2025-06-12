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

interface DiagnosisItem {
  id: string;
  code: string;
  description: string;
  type: 'primary' | 'secondary';
  severity: 'mild' | 'moderate' | 'severe';
  notes: string;
  date: string;
}

interface DiagnosisProps {
  patientId: string;
  diagnoses?: DiagnosisItem[];
  editable?: boolean;
  onSave?: (diagnoses: DiagnosisItem[]) => void;
}

const Diagnosis: React.FC<DiagnosisProps> = ({
  patientId,
  diagnoses = [],
  editable = true,
  onSave,
}) => {
  const [currentDiagnoses, setCurrentDiagnoses] = useState<DiagnosisItem[]>(
    diagnoses.length > 0 ? diagnoses : [
      {
        id: '1',
        code: 'I10',
        description: 'Hipertensión esencial',
        type: 'primary',
        severity: 'moderate',
        notes: 'Requiere seguimiento mensual',
        date: '2024-06-10',
      },
      {
        id: '2',
        code: 'E11.9',
        description: 'Diabetes mellitus tipo 2',
        type: 'secondary',
        severity: 'mild',
        notes: 'Controlada con dieta y medicación',
        date: '2024-06-10',
      },
    ]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState<DiagnosisItem | null>(null);

  const addNewDiagnosis = () => {
    const newDiagnosis: DiagnosisItem = {
      id: Date.now().toString(),
      code: '',
      description: '',
      type: 'primary',
      severity: 'mild',
      notes: '',
      date: new Date().toISOString().split('T')[0],
    };
    setEditingDiagnosis(newDiagnosis);
    setIsEditing(true);
  };

  const editDiagnosis = (diagnosis: DiagnosisItem) => {
    setEditingDiagnosis({ ...diagnosis });
    setIsEditing(true);
  };

  const saveDiagnosis = () => {
    if (!editingDiagnosis?.description.trim()) {
      Alert.alert('Error', 'La descripción del diagnóstico es requerida');
      return;
    }

    const existingIndex = currentDiagnoses.findIndex(
      diag => diag.id === editingDiagnosis.id
    );

    let updatedDiagnoses;
    if (existingIndex >= 0) {
      updatedDiagnoses = currentDiagnoses.map(diag =>
        diag.id === editingDiagnosis.id ? editingDiagnosis : diag
      );
    } else {
      updatedDiagnoses = [...currentDiagnoses, editingDiagnosis];
    }

    setCurrentDiagnoses(updatedDiagnoses);
    setIsEditing(false);
    setEditingDiagnosis(null);
    onSave?.(updatedDiagnoses);
  };

  const deleteDiagnosis = (diagnosisId: string) => {
    Alert.alert(
      'Eliminar Diagnóstico',
      '¿Está seguro de eliminar este diagnóstico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updated = currentDiagnoses.filter(diag => diag.id !== diagnosisId);
            setCurrentDiagnoses(updated);
            onSave?.(updated);
          },
        },
      ]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return '#28A745';
      case 'moderate':
        return '#FFC107';
      case 'severe':
        return '#DC3545';
      default:
        return '#6C757D';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'primary' ? '#007AFF' : '#6C757D';
  };

  if (isEditing && editingDiagnosis) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {currentDiagnoses.find(diag => diag.id === editingDiagnosis.id)
              ? 'Editar Diagnóstico'
              : 'Nuevo Diagnóstico'
            }
          </Text>
        </View>

        <ScrollView style={styles.editForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Código CIE-10</Text>
            <TextInput
              style={styles.textInput}
              value={editingDiagnosis.code}
              onChangeText={(text) =>
                setEditingDiagnosis(prev => prev ? {...prev, code: text} : null)
              }
              placeholder="Ej: I10"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descripción *</Text>
            <TextInput
              style={styles.textInput}
              value={editingDiagnosis.description}
              onChangeText={(text) =>
                setEditingDiagnosis(prev => prev ? {...prev, description: text} : null)
              }
              placeholder="Descripción del diagnóstico"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo</Text>
            <View style={styles.optionRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  editingDiagnosis.type === 'primary' && styles.optionButtonActive
                ]}
                onPress={() => setEditingDiagnosis(prev => prev ? {...prev, type: 'primary'} : null)}
              >
                <Text style={[
                  styles.optionText,
                  editingDiagnosis.type === 'primary' && styles.optionTextActive
                ]}>
                  Primario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  editingDiagnosis.type === 'secondary' && styles.optionButtonActive
                ]}
                onPress={() => setEditingDiagnosis(prev => prev ? {...prev, type: 'secondary'} : null)}
              >
                <Text style={[
                  styles.optionText,
                  editingDiagnosis.type === 'secondary' && styles.optionTextActive
                ]}>
                  Secundario
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Severidad</Text>
            <View style={styles.optionRow}>
              {['mild', 'moderate', 'severe'].map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.severityButton,
                    { borderColor: getSeverityColor(severity) },
                    editingDiagnosis.severity === severity && { backgroundColor: getSeverityColor(severity) }
                  ]}
                  onPress={() => setEditingDiagnosis(prev => prev ? {...prev, severity: severity as any} : null)}
                >
                  <Text style={[
                    styles.severityText,
                    editingDiagnosis.severity === severity && { color: '#FFFFFF' }
                  ]}>
                    {severity === 'mild' ? 'Leve' : severity === 'moderate' ? 'Moderado' : 'Severo'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notas</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={editingDiagnosis.notes}
              onChangeText={(text) =>
                setEditingDiagnosis(prev => prev ? {...prev, notes: text} : null)
              }
              placeholder="Notas adicionales..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsEditing(false);
                setEditingDiagnosis(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveDiagnosis}>
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
        <Text style={styles.title}>Diagnósticos</Text>
        {editable && (
          <TouchableOpacity style={styles.addButton} onPress={addNewDiagnosis}>
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.diagnosisList}>
        {currentDiagnoses.map((diagnosis, index) => (
          <View key={diagnosis.id} style={styles.diagnosisCard}>
            <View style={styles.diagnosisHeader}>
              <View style={styles.diagnosisInfo}>
                <View style={styles.diagnosisTitle}>
                  {diagnosis.code && (
                    <Text style={styles.diagnosisCode}>[{diagnosis.code}]</Text>
                  )}
                  <Text style={styles.diagnosisDescription}>{diagnosis.description}</Text>
                </View>
                <View style={styles.diagnosisTags}>
                  <View style={[styles.typeTag, { backgroundColor: getTypeColor(diagnosis.type) }]}>
                    <Text style={styles.tagText}>
                      {diagnosis.type === 'primary' ? 'Primario' : 'Secundario'}
                    </Text>
                  </View>
                  <View style={[styles.severityTag, { backgroundColor: getSeverityColor(diagnosis.severity) }]}>
                    <Text style={styles.tagText}>
                      {diagnosis.severity === 'mild' ? 'Leve' : 
                       diagnosis.severity === 'moderate' ? 'Moderado' : 'Severo'}
                    </Text>
                  </View>
                </View>
              </View>
              {editable && (
                <View style={styles.diagnosisActions}>
                  <TouchableOpacity
                    style={styles.editIconButton}
                    onPress={() => editDiagnosis(diagnosis)}
                  >
                    <Text style={styles.actionIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteIconButton}
                    onPress={() => deleteDiagnosis(diagnosis.id)}
                  >
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {diagnosis.notes && (
              <View style={styles.diagnosisNotes}>
                <Text style={styles.notesLabel}>Notas:</Text>
                <Text style={styles.notesText}>{diagnosis.notes}</Text>
              </View>
            )}

            <Text style={styles.diagnosisDate}>Fecha: {diagnosis.date}</Text>
          </View>
        ))}

        {currentDiagnoses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay diagnósticos registrados</Text>
            {editable && (
              <TouchableOpacity style={styles.emptyButton} onPress={addNewDiagnosis}>
                <Text style={styles.emptyButtonText}>Agregar primer diagnóstico</Text>
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
  diagnosisList: {
    flex: 1,
    padding: 16,
  },
  diagnosisCard: {
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
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  diagnosisInfo: {
    flex: 1,
  },
  diagnosisTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosisCode: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 8,
  },
  diagnosisDescription: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  diagnosisTags: {
    flexDirection: 'row',
    gap: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  diagnosisActions: {
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
  diagnosisNotes: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
  },
  diagnosisDate: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'right',
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
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#495057',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  severityButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
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

export default Diagnosis;
