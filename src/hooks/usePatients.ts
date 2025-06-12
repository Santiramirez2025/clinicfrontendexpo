import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  lastVisit?: string;
  nextAppointment?: string;
}

interface CreatePatientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for development
  const mockPatients: Patient[] = [
    {
      id: '1',
      firstName: 'María',
      lastName: 'González',
      email: 'maria@email.com',
      phone: '+34 666 123 456',
      dateOfBirth: '1985-03-15',
      gender: 'female',
      address: 'Calle Mayor 123, Madrid',
      emergencyContact: '+34 666 789 012',
      medicalHistory: ['Hipertensión', 'Diabetes tipo 2'],
      lastVisit: '2024-05-15',
      nextAppointment: '2024-06-20'
    },
    {
      id: '2',
      firstName: 'Juan',
      lastName: 'Martínez',
      email: 'juan@email.com',
      phone: '+34 666 456 789',
      dateOfBirth: '1990-07-22',
      gender: 'male',
      address: 'Avenida de la Paz 45, Valencia',
      emergencyContact: '+34 666 345 678',
      medicalHistory: ['Asma'],
      lastVisit: '2024-05-10'
    }
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPatients(mockPatients);
      setError(null);
    } catch (err) {
      setError('Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
  };

  const createPatient = async (patientData: CreatePatientData) => {
    setLoading(true);
    try {
      const newPatient: Patient = {
        ...patientData,
        id: Date.now().toString(),
        emergencyContact: '',
        medicalHistory: [],
      };
      
      setPatients(prev => [...prev, newPatient]);
      return { success: true, data: newPatient };
    } catch (err) {
      setError('Error al crear paciente');
      return { success: false, error: 'Error al crear paciente' };
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id: string, updates: Partial<Patient>) => {
    setLoading(true);
    try {
      setPatients(prev => 
        prev.map(patient => 
          patient.id === id ? { ...patient, ...updates } : patient
        )
      );
      return { success: true };
    } catch (err) {
      setError('Error al actualizar paciente');
      return { success: false, error: 'Error al actualizar paciente' };
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    setLoading(true);
    try {
      setPatients(prev => prev.filter(patient => patient.id !== id));
      return { success: true };
    } catch (err) {
      setError('Error al eliminar paciente');
      return { success: false, error: 'Error al eliminar paciente' };
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return patients;
    
    return patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      patient.email.toLowerCase().includes(query.toLowerCase()) ||
      patient.phone.includes(query)
    );
  };

  const filteredPatients = searchQuery ? searchPatients(searchQuery) : patients;

  return {
    patients: filteredPatients,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    fetchPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    searchPatients,
  };
};
