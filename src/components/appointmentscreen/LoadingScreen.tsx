// ============================================================================
// components/appointmentscreen/LoadingScreen.tsx
// ============================================================================
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    modernColors,
    modernSpacing,
    modernTypography,
    modernShadows
  } from '../../styles';import { appointmentStyles } from './styles';

export const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView style={appointmentStyles.container}>
      <View style={appointmentStyles.loadingContainer}>
        <ActivityIndicator size="large" color={modernColors.accent} />
        <Text style={appointmentStyles.loadingText}>Cargando tus citas...</Text>
      </View>
    </SafeAreaView>
  );
};