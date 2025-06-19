// ============================================================================
// components/login/ModernInput.tsx
// ============================================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { modernColors, modernTypography } from '../../styles';
import { loginStyles } from './styles';

export interface ModernInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  error?: string;
}

export const ModernInput: React.FC<ModernInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={loginStyles.inputContainer}>
      <Text style={loginStyles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          loginStyles.input,
          isFocused && loginStyles.inputFocused,
          error && loginStyles.inputError
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={modernColors.gray400}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <Text style={loginStyles.errorText}>{error}</Text>
      )}
    </View>
  );
};
