// ============================================================================
// components/profile/SkinTypeSelector.tsx - SELECTOR DE TIPO DE PIEL
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { profileStyles } from './styles';

interface SkinTypeSelectorProps {
  selectedType?: string;
  onSelect: (type: string) => void;
}

const skinTypes = [
  { id: 'OILY', label: 'Grasa', icon: '💧', description: 'Brillante, poros visibles' },
  { id: 'DRY', label: 'Seca', icon: '🏜️', description: 'Tirante, descamación' },
  { id: 'MIXED', label: 'Mixta', icon: '🔄', description: 'Zona T grasa, mejillas secas' },
  { id: 'SENSITIVE', label: 'Sensible', icon: '🌸', description: 'Reacciona fácilmente' },
  { id: 'NORMAL', label: 'Normal', icon: '✨', description: 'Equilibrada y suave' }
];

export const SkinTypeSelector: React.FC<SkinTypeSelectorProps> = ({ 
  selectedType, 
  onSelect 
}) => {
  return (
    <View style={profileStyles.skinTypeContainer}>
      <Text style={profileStyles.skinTypeLabel}>Tipo de piel</Text>
      
      <View style={profileStyles.skinTypeGrid}>
        {skinTypes.map((type) => {
          const isSelected = selectedType === type.id;
          
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                profileStyles.skinTypeItem,
                isSelected && profileStyles.skinTypeItemSelected
              ]}
              onPress={() => onSelect(type.id)}
              activeOpacity={0.7}
            >
              <Text style={profileStyles.skinTypeIcon}>{type.icon}</Text>
              <Text style={[
                profileStyles.skinTypeItemLabel,
                isSelected && profileStyles.skinTypeItemLabelSelected
              ]}>
                {type.label}
              </Text>
              <Text style={profileStyles.skinTypeDescription}>
                {type.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};