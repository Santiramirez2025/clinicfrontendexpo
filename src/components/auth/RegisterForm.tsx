// ============================================================================
// components/auth/RegisterForm.tsx - ACTUALIZADO CON TELÉFONO
// ============================================================================
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ModernInput, ModernButton } from '../login';
import { modernColors, modernSpacing, modernShadows } from '../../styles';

export interface RegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  };
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
  onUpdateField: (field: string, value: string) => void;
  onSubmit: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  errors,
  loading,
  connectionStatus,
  onUpdateField,
  onSubmit,
  onNavigateToLogin,
}) => {
  return (
    <View style={{
      backgroundColor: modernColors.surfaceElevated,
      borderRadius: modernSpacing.componentModern.radiusLG,
      padding: modernSpacing.aesthetic.cardSpacing,
      marginBottom: modernSpacing.aesthetic.cardSpacing,
      ...modernShadows.md,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: modernColors.charcoal,
        marginBottom: 8,
        textAlign: 'center',
      }}>
        Crear Cuenta
      </Text>
      
      <Text style={{
        fontSize: 14,
        color: modernColors.gray600,
        textAlign: 'center',
        marginBottom: modernSpacing.aesthetic.itemSpacing,
        lineHeight: 20,
      }}>
        Únete a nuestra comunidad de belleza y bienestar
      </Text>

      <ModernInput
        label="Nombre"
        value={formData.firstName || ''}
        onChangeText={(text) => onUpdateField('firstName', text)}
        placeholder="Tu nombre"
        error={errors.firstName}
      />

      <ModernInput
        label="Apellido"
        value={formData.lastName || ''}
        onChangeText={(text) => onUpdateField('lastName', text)}
        placeholder="Tu apellido"
        error={errors.lastName}
      />

      <ModernInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => onUpdateField('email', text)}
        placeholder="tu.email@ejemplo.com"
        keyboardType="email-address"
        error={errors.email}
      />

      <ModernInput
        label="Teléfono"
        value={formData.phone || ''}
        onChangeText={(text) => onUpdateField('phone', text)}
        placeholder="+54 11 1234-5678"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <ModernInput
        label="Contraseña"
        value={formData.password}
        onChangeText={(text) => onUpdateField('password', text)}
        placeholder="Mínimo 6 caracteres"
        secureTextEntry
        error={errors.password}
      />

      <ModernInput
        label="Confirmar Contraseña"
        value={formData.confirmPassword || ''}
        onChangeText={(text) => onUpdateField('confirmPassword', text)}
        placeholder="Repite tu contraseña"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <ModernButton
        title="Crear cuenta"
        onPress={onSubmit}
        loading={loading}
        disabled={connectionStatus === 'error'}
        variant="primary"
      />

      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={{
            fontSize: 14,
            color: modernColors.accent,
            fontWeight: '600',
          }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
