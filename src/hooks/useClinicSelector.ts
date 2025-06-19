// ============================================================================
// hooks/useClinicSelector.ts - HOOK PARA SELECTOR DE CLÍNICAS (CORREGIDO)
// ============================================================================
import { useState } from 'react';
import { Alert } from 'react-native';

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  isSelected: boolean;
}

export const useClinicSelector = () => {
  const [clinicModalVisible, setClinicModalVisible] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState('Belleza Estética Centro');

  const availableClinics: Clinic[] = [
    {
      id: 'clinic-1',
      name: 'Belleza Estética Centro',
      address: 'Calle Gran Vía, 45 - Madrid',
      phone: '+34 911 234 567',
      isSelected: true
    },
    {
      id: 'clinic-2',
      name: 'Belleza Estética Salamanca',
      address: 'Calle Serrano, 78 - Madrid',
      phone: '+34 911 234 568',
      isSelected: false
    },
    {
      id: 'clinic-3',
      name: 'Belleza Estética Las Rozas',
      address: 'Centro Comercial Zielo, Local 23',
      phone: '+34 911 234 569',
      isSelected: false
    }
  ];

  const handleChangeClinic = () => {
    setClinicModalVisible(true);
  };

  const handleSelectClinic = (clinic: Clinic) => {
    Alert.alert(
      'Confirmar Cambio',
      `¿Deseas cambiar a "${clinic.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            setSelectedClinic(clinic.name);
            setClinicModalVisible(false);
            Alert.alert('✅ Clínica actualizada', `Ahora tu clínica principal es "${clinic.name}"`);
          }
        }
      ]
    );
  };

  return {
    clinicModalVisible,
    setClinicModalVisible,
    selectedClinic,
    availableClinics,
    handleChangeClinic,
    handleSelectClinic
  };
};