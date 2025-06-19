// ============================================================================
// components/profile/ClinicSelectionModal.tsx - MODAL DE SELECCIÓN DE CLÍNICA
// ============================================================================
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileStyles } from './styles';
import { Clinic } from '../../hooks/useClinicSelector';

interface ClinicSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedClinic: string;
  availableClinics: Clinic[];
  onSelectClinic: (clinic: Clinic) => void;
}

export const ClinicSelectionModal: React.FC<ClinicSelectionModalProps> = ({
  visible,
  onClose,
  selectedClinic,
  availableClinics,
  onSelectClinic
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={profileStyles.modalContainer}>
        <View style={profileStyles.modalHeader}>
          <Text style={profileStyles.modalTitle}>Seleccionar Clínica</Text>
          <TouchableOpacity
            style={profileStyles.modalCloseButton}
            onPress={onClose}
          >
            <Text style={profileStyles.modalCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={profileStyles.modalContent}>
          {availableClinics.map((clinic) => (
            <TouchableOpacity
              key={clinic.id}
              style={[
                profileStyles.clinicOption,
                clinic.name === selectedClinic && profileStyles.clinicOptionSelected
              ]}
              onPress={() => onSelectClinic(clinic)}
              activeOpacity={0.7}
            >
              <View style={profileStyles.clinicOptionIcon}>
                <Text style={profileStyles.clinicOptionIconText}>🏥</Text>
              </View>
              
              <View style={profileStyles.clinicOptionInfo}>
                <Text style={profileStyles.clinicOptionName}>{clinic.name}</Text>
                <Text style={profileStyles.clinicOptionAddress}>{clinic.address}</Text>
                <Text style={profileStyles.clinicOptionPhone}>{clinic.phone}</Text>
              </View>
              
              {clinic.name === selectedClinic && (
                <View style={profileStyles.selectedIndicator}>
                  <Text style={profileStyles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};