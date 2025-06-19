// ============================================================================
// components/login/LoginHeader.tsx
// ============================================================================
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { loginStyles } from './styles';

export const LoginHeader: React.FC = () => {
  return (
    <View style={loginStyles.header}>
      <View style={loginStyles.logoContainer}>
        <Text style={loginStyles.logoEmoji}>💆‍♀️</Text>
      </View>
      <Text style={loginStyles.title}>Belleza Estética</Text>
      <Text style={loginStyles.subtitle}>Tu momento de bienestar personal</Text>
    </View>
  );
};