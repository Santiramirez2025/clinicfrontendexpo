// ============================================================================
// components/profile/NotesInput.tsx - INPUT DE NOTAS
// ============================================================================
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { modernColors } from '../../styles';
import { profileStyles } from './styles';

interface NotesInputProps {
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
}

export const NotesInput: React.FC<NotesInputProps> = ({ 
  value, 
  onChangeText, 
  maxLength = 300 
}) => (
  <View style={profileStyles.notesContainer}>
    <Text style={profileStyles.notesLabel}>Notas adicionales</Text>
    <TextInput
      style={profileStyles.notesInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Alergias, preferencias especiales, comentarios..."
      multiline
      numberOfLines={3}
      maxLength={maxLength}
      placeholderTextColor={modernColors.gray400}
    />
    <Text style={profileStyles.notesCounter}>
      {value?.length || 0}/{maxLength}
    </Text>
  </View>
);
