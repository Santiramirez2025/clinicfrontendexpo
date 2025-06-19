// ============================================================================
// components/profile/InputField.tsx - CAMPO DE INPUT
// ============================================================================
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { modernColors } from '../../styles';
import { profileStyles } from './styles';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  editable?: boolean;
  error?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  editable = true,
  error,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={profileStyles.inputContainer}>
      <Text style={profileStyles.inputLabel}>
        {label}
        {required && <Text style={profileStyles.requiredAsterisk}> *</Text>}
      </Text>
      <TextInput
        style={[
          profileStyles.input,
          isFocused && profileStyles.inputFocused,
          error && profileStyles.inputError,
          !editable && profileStyles.inputDisabled
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={modernColors.gray400}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <Text style={profileStyles.errorText}>{error}</Text>
      )}
    </View>
  );
};