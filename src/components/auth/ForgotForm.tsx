// ============================================================================
// components/auth/ForgotForm.tsx - VERSIÓN CORREGIDA CON IMPORTS EXISTENTES
// ============================================================================
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// ✅ Importar desde login (que ya funcionan)
import { ModernInput, ModernButton } from '../login';
import { modernColors, modernSpacing, modernShadows } from '../../styles';
export interface ForgotFormProps {
  email: string;
  emailError: string;
  loading: boolean;
  connectionStatus: 'checking' | 'connected' | 'error';
  onEmailChange: (text: string) => void;
  onSubmit: () => void;
  onNavigateToLogin: () => void;
}

export const ForgotForm: React.FC<ForgotFormProps> = ({
  email,
  emailError,
  loading,
  connectionStatus,
  onEmailChange,
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
      {/* Título integrado (sin AuthCard) */}
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: modernColors.charcoal,
        marginBottom: 8,
        textAlign: 'center',
      }}>
        Recuperar Contraseña
      </Text>
      
      <Text style={{
        fontSize: 14,
        color: modernColors.gray600,
        textAlign: 'center',
        marginBottom: modernSpacing.aesthetic.itemSpacing,
        lineHeight: 20,
      }}>
        Te enviaremos un enlace para restablecer tu contraseña
      </Text>

      <ModernInput
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        placeholder="tu.email@ejemplo.com"
        keyboardType="email-address"
        error={emailError}
      />

      <ModernButton
        title="Enviar enlace"
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
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
