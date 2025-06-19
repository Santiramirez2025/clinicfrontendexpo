// ============================================================================
// components/profile/TagSelector.tsx - SELECTOR DE TAGS
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { profileStyles } from './styles';

interface TagSelectorProps {
  label: string;
  options: { id: string; label: string; icon?: string }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = true
}) => {
  const handleToggle = (optionId: string) => {
    if (multiSelect) {
      const newSelection = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange([optionId]);
    }
  };

  return (
    <View style={profileStyles.tagSelectorContainer}>
      <Text style={profileStyles.tagSelectorLabel}>{label}</Text>
      <View style={profileStyles.tagsContainer}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                profileStyles.tag,
                isSelected && profileStyles.tagSelected
              ]}
              onPress={() => handleToggle(option.id)}
              activeOpacity={0.7}
            >
              {option.icon && (
                <Text style={profileStyles.tagIcon}>{option.icon}</Text>
              )}
              <Text style={[
                profileStyles.tagText,
                isSelected && profileStyles.tagTextSelected
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};