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

interface VitalSign {
  id: string;
  date: string;
  time: string;
  temperature: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  weight: string;
  height: string;
  notes: string;
}

interface VitalSignsProps {
  patientId: string;
  vitalSigns?: VitalSign[];
  editable?: boolean;
  onSave?: (vitalSigns: VitalSign[]) => void;
}

const VitalSigns: React.FC<VitalSignsProps> = ({
  patientId,
  vitalSigns = [],
  editable = true,
  onSave,
}) => {
  const [currentVitalSigns, setCurrentVitalSigns] = useState<VitalSign[]>(
    vitalSigns.length > 0 ? vitalSigns : [
      {
        id: '1',
        date: '2024-06-10',
        time: '09:30',
        temperature: '36.5',
        bloodPressureSystolic: '120',
        bloodPressureDiastolic: '80',
        heartRate: '72',
        respiratoryRate: '16',
        oxygenSaturation: '98',
        weight: '70',
        height: '170',
        notes: 'Signos vitales normales',
      },
      {
        id: '2',
        date: '2024-06-05',
        time: '14:15',
        temperature: '37.2',
        bloodPressureSystolic: '130',
        bloodPressureDiastolic: '85',
        heartRate: '78',
        respiratoryRate: '18',
        oxygenSaturation: '97',
        weight: '70',
        height: '170',
        notes: 'Ligera elevación de temperatura',
      },
    ]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingVitalSign, setEditingVitalSign] = useState<VitalSign | null>(null);

  const addNewVitalSign = () => {
    const now = new Date();
    const newVitalSign: VitalSign = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5),
      temperature: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: '',
      notes: '',
    };
    setEditingVitalSign(newVitalSign);
    setIsEditing(true);
  };

  const editVitalSign = (vitalSign: VitalSign) => {
    setEditingVitalSign({ ...vitalSign });
    setIsEditing(true);
  };

  const saveVitalSign = () => {
    if (!editingVitalSign) return;

    const existingIndex = currentVitalSigns.findIndex(
      vs => vs.id === editingVitalSign.id
    );

    let updatedVitalSigns;
    if (existingIndex >= 0) {
      updatedVitalSigns = currentVitalSigns.map(vs =>
        vs.id === editingVitalSign.id ? editingVitalSign : vs
      );
    } else {
      updatedVitalSigns = [editingVitalSign, ...currentVitalSigns];
    }

    setCurrentVitalSigns(updatedVitalSigns);
    setIsEditing(false);
    setEditingVitalSign(null);
    onSave?.(updatedVitalSigns);
  };

  const deleteVitalSign = (vitalSignId: string) => {
    Alert.alert(
      'Eliminar Signos Vitales',
      '¿Está seguro de eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updated = currentVitalSigns.filter(vs => vs.id !== vitalSignId);
            setCurrentVitalSigns(updated);
            onSave?.(updated);
          },
        },
      ]
    );
  };

  const getVitalSignStatus = (vital: VitalSign) => {
    const temp = parseFloat(vital.temperature);
    const systolic = parseInt(vital.bloodPressureSystolic);
    const diastolic = parseInt(vital.bloodPressureDiastolic);
    const hr = parseInt(vital.heartRate);
    const spo2 = parseInt(vital.oxygenSaturation);

    if (
      (temp > 0 && (temp < 36 || temp > 37.5)) ||
      (systolic > 0 && (systolic < 90 || systolic > 140)) ||
      (diastolic > 0 && (diastolic < 60 || diastolic > 90)) ||
      (hr > 0 && (hr < 60 || hr > 100)) ||
      (spo2 > 0 && spo2 < 95)
    ) {
      return 'abnormal';
    }
    return 'normal';
  };

  if (isEditing && editingVitalSign) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {currentVitalSigns.find(vs => vs.id === editingVitalSign.id)
              ? 'Editar Signos Vitales'
              : 'Nuevos Signos Vitales'
            }
          </Text>
        </View>

        <ScrollView style={styles.editForm}>
          <View style={styles.dateTimeRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Fecha</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.date}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, date: text} : null)
                }
                placeholder="YYYY-MM-DD"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Hora</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.time}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, time: text} : null)
                }
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={styles.vitalsGrid}>
            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Temperatura (°C)</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.temperature}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, temperature: text} : null)
                }
                placeholder="36.5"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Frecuencia Cardíaca</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.heartRate}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, heartRate: text} : null)
                }
                placeholder="72"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Presión Arterial (mmHg)</Text>
            <View style={styles.bloodPressureRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={editingVitalSign.bloodPressureSystolic}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, bloodPressureSystolic: text} : null)
                }
                placeholder="120"
                keyboardType="numeric"
              />
              <Text style={styles.separator}>/</Text>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={editingVitalSign.bloodPressureDiastolic}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, bloodPressureDiastolic: text} : null)
                }
                placeholder="80"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.vitalsGrid}>
            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Frecuencia Respiratoria</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.respiratoryRate}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, respiratoryRate: text} : null)
                }
                placeholder="16"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Saturación O₂ (%)</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.oxygenSaturation}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, oxygenSaturation: text} : null)
                }
                placeholder="98"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.vitalsGrid}>
            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.weight}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, weight: text} : null)
                }
                placeholder="70"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.vitalInputGroup}>
              <Text style={styles.inputLabel}>Altura (cm)</Text>
              <TextInput
                style={styles.textInput}
                value={editingVitalSign.height}
                onChangeText={(text) =>
                  setEditingVitalSign(prev => prev ? {...prev, height: text} : null)
                }
                placeholder="170"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notas</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={editingVitalSign.notes}
              onChangeText={(text) =>
                setEditingVitalSign(prev => prev ? {...prev, notes: text} : null)
              }
              placeholder="Observaciones adicionales..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsEditing(false);
                setEditingVitalSign(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveVitalSign}>
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
        <Text style={styles.title}>Signos Vitales</Text>
        {editable && (
          <TouchableOpacity style={styles.addButton} onPress={addNewVitalSign}>
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.vitalSignsList}>
        {currentVitalSigns.map((vitalSign) => {
          const status = getVitalSignStatus(vitalSign);
          return (
            <View key={vitalSign.id} style={styles.vitalSignCard}>
              <View style={styles.vitalSignHeader}>
                <View style={styles.dateTimeInfo}>
                  <Text style={styles.vitalSignDate}>{vitalSign.date}</Text>
                  <Text style={styles.vitalSignTime}>{vitalSign.time}</Text>
                </View>
                <View style={styles.statusAndActions}>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: status === 'normal' ? '#28A745' : '#DC3545' }
                  ]}>
                    <Text style={styles.statusText}>
                      {status === 'normal' ? 'Normal' : 'Anormal'}
                    </Text>
                  </View>
                  {editable && (
                    <View style={styles.vitalSignActions}>
                      <TouchableOpacity
                        style={styles.editIconButton}
                        onPress={() => editVitalSign(vitalSign)}
                      >
                        <Text style={styles.actionIcon}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteIconButton}
                        onPress={() => deleteVitalSign(vitalSign.id)}
                      >
                        <Text style={styles.actionIcon}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.vitalsDisplay}>
                <View style={styles.vitalsRow}>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>Temp.</Text>
                    <Text style={styles.vitalValue}>{vitalSign.temperature}°C</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>FC</Text>
                    <Text style={styles.vitalValue}>{vitalSign.heartRate} bpm</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>PA</Text>
                    <Text style={styles.vitalValue}>
                      {vitalSign.bloodPressureSystolic}/{vitalSign.bloodPressureDiastolic}
                    </Text>
                  </View>
                </View>
                <View style={styles.vitalsRow}>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>FR</Text>
                    <Text style={styles.vitalValue}>{vitalSign.respiratoryRate} rpm</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>SpO₂</Text>
                    <Text style={styles.vitalValue}>{vitalSign.oxygenSaturation}%</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <Text style={styles.vitalLabel}>Peso</Text>
                    <Text style={styles.vitalValue}>{vitalSign.weight} kg</Text>
                  </View>
                </View>
              </View>

              {vitalSign.notes && (
                <View style={styles.vitalSignNotes}>
                  <Text style={styles.notesLabel}>Notas:</Text>
                  <Text style={styles.notesText}>{vitalSign.notes}</Text>
                </View>
              )}
            </View>
          );
        })}

        {currentVitalSigns.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay signos vitales registrados</Text>
            {editable && (
              <TouchableOpacity style={styles.emptyButton} onPress={addNewVitalSign}>
                <Text style={styles.emptyButtonText}>Registrar primeros signos vitales</Text>
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
  vitalSignsList: {
    flex: 1,
    padding: 16,
  },
  vitalSignCard: {
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
  vitalSignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTimeInfo: {
    flex: 1,
  },
  vitalSignDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  vitalSignTime: {
    fontSize: 14,
    color: '#6C757D',
  },
  statusAndActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  vitalSignActions: {
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
  vitalsDisplay: {
    gap: 8,
  },
  vitalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vitalItem: {
    alignItems: 'center',
    flex: 1,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
    marginBottom: 2,
  },
  vitalValue: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '600',
  },
  vitalSignNotes: {
    marginTop: 12,
    paddingTop: 12,
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
  editForm: {
    flex: 1,
    padding: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  vitalInputGroup: {
    flex: 1,
    marginHorizontal: 4,
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
  vitalsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  bloodPressureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
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

export default VitalSigns;
