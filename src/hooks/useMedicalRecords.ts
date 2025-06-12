import { useState, useEffect } from 'react';

interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId?: string;
  date: string;
  type: 'consultation' | 'diagnosis' | 'prescription' | 'test' | 'surgery' | 'therapy';
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  medications?: Medication[];
  attachments?: Attachment[];
  doctorId: string;
  doctorName: string;
  vitalSigns?: VitalSigns;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  url: string;
  uploadDate: string;
}

interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
}

interface CreateRecordData {
  patientId: string;
  type: MedicalRecord['type'];
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  vitalSigns?: VitalSigns;
}

export const useMedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data
  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      patientId: '1',
      appointmentId: '1',
      date: '2024-05-15',
      type: 'consultation',
      title: 'Consulta General',
      description: 'Paciente presenta dolor de cabeza frecuente desde hace 2 semanas',
      diagnosis: 'Cefalea tensional',
      treatment: 'Relajación y analgésicos',
      doctorId: 'doc1',
      doctorName: 'Dr. Juan Pérez',
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 36.5,
        weight: 65,
        height: 165
      },
      medications: [
        {
          id: 'med1',
          name: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Cada 8 horas',
          duration: '5 días',
          instructions: 'Tomar con las comidas'
        }
      ]
    },
    {
      id: '2',
      patientId: '1',
      date: '2024-04-20',
      type: 'test',
      title: 'Análisis de Sangre',
      description: 'Análisis rutinario para control general',
      doctorId: 'doc1',
      doctorName: 'Dr. Juan Pérez',
      attachments: [
        {
          id: 'att1',
          name: 'Resultados_Analisis.pdf',
          type: 'pdf',
          url: 'mock_url',
          uploadDate: '2024-04-20'
        }
      ]
    },
    {
      id: '3',
      patientId: '2',
      date: '2024-05-10',
      type: 'prescription',
      title: 'Medicación para Asma',
      description: 'Renovación de medicación para control del asma',
      diagnosis: 'Asma bronquial controlada',
      treatment: 'Continuar con broncodilatadores',
      doctorId: 'doc1',
      doctorName: 'Dr. Juan Pérez',
      medications: [
        {
          id: 'med2',
          name: 'Salbutamol',
          dosage: '100mcg',
          frequency: '2 puff cada 6 horas',
          duration: '30 días',
          instructions: 'Usar como rescate si es necesario'
        }
      ]
    }
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRecords(mockRecords);
      setError(null);
    } catch (err) {
      setError('Error al cargar expedientes médicos');
    } finally {
      setLoading(false);
    }
  };

  const getRecordById = (id: string): MedicalRecord | undefined => {
    return records.find(record => record.id === id);
  };

  const getRecordsByPatient = (patientId: string): MedicalRecord[] => {
    return records
      .filter(record => record.patientId === patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getRecordsByType = (type: MedicalRecord['type']): MedicalRecord[] => {
    return records.filter(record => record.type === type);
  };

  const getRecentRecords = (days: number = 30): MedicalRecord[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return records.filter(record => new Date(record.date) >= cutoffDate);
  };

  const createRecord = async (recordData: CreateRecordData) => {
    setLoading(true);
    try {
      const newRecord: MedicalRecord = {
        ...recordData,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        doctorId: 'current_doctor',
        doctorName: 'Dr. Current',
      };
      
      setRecords(prev => [newRecord, ...prev]);
      return { success: true, data: newRecord };
    } catch (err) {
      setError('Error al crear expediente');
      return { success: false, error: 'Error al crear expediente' };
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (id: string, updates: Partial<MedicalRecord>) => {
    setLoading(true);
    try {
      setRecords(prev => 
        prev.map(record => 
          record.id === id ? { ...record, ...updates } : record
        )
      );
      return { success: true };
    } catch (err) {
      setError('Error al actualizar expediente');
      return { success: false, error: 'Error al actualizar expediente' };
    } finally {
      setLoading(false);
    }
  };

  const addMedication = async (recordId: string, medication: Omit<Medication, 'id'>) => {
    const record = getRecordById(recordId);
    if (!record) return { success: false, error: 'Expediente no encontrado' };

    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
    };

    const updatedMedications = [...(record.medications || []), newMedication];
    return updateRecord(recordId, { medications: updatedMedications });
  };

  const addAttachment = async (recordId: string, attachment: Omit<Attachment, 'id' | 'uploadDate'>) => {
    const record = getRecordById(recordId);
    if (!record) return { success: false, error: 'Expediente no encontrado' };

    const newAttachment: Attachment = {
      ...attachment,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
    };

    const updatedAttachments = [...(record.attachments || []), newAttachment];
    return updateRecord(recordId, { attachments: updatedAttachments });
  };

  const deleteRecord = async (id: string) => {
    setLoading(true);
    try {
      setRecords(prev => prev.filter(record => record.id !== id));
      return { success: true };
    } catch (err) {
      setError('Error al eliminar expediente');
      return { success: false, error: 'Error al eliminar expediente' };
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    loading,
    error,
    fetchRecords,
    getRecordById,
    getRecordsByPatient,
    getRecordsByType,
    getRecentRecords,
    createRecord,
    updateRecord,
    addMedication,
    addAttachment,
    deleteRecord,
  };
};
