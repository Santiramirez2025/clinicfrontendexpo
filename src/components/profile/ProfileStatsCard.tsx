// ============================================================================
// components/profile/ProfileStatsCard.tsx - NUEVO COMPONENTE PARA ESTADÍSTICAS
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { profileStyles } from './styles';
import { useProfileStats } from '../../hooks/useProfileStats';

export const ProfileStatsCard: React.FC = () => {
  const { stats, loading, error, reload } = useProfileStats();

  if (loading) {
    return (
      <View style={[profileStyles.sectionContent, { alignItems: 'center', paddingVertical: 40 }]}>
        <ActivityIndicator size="large" />
        <Text style={profileStyles.loadingText}>Cargando estadísticas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[profileStyles.sectionContent, { alignItems: 'center', paddingVertical: 40 }]}>
        <Text style={profileStyles.errorText}>{error}</Text>
        <TouchableOpacity 
          onPress={reload}
          style={[profileStyles.saveButton, { marginTop: 16, paddingVertical: 12 }]}
        >
          <Text style={profileStyles.saveButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!stats) return null;

  return (
    <View style={profileStyles.sectionContent}>
      <View style={profileStyles.statsGrid}>
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statNumber}>{stats.beautyPoints}</Text>
          <Text style={profileStyles.statLabel}>Beauty Points</Text>
        </View>
        
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statNumber}>{stats.sessionsCompleted}</Text>
          <Text style={profileStyles.statLabel}>Sesiones</Text>
        </View>
        
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statNumber}>€{stats.totalInvestment}</Text>
          <Text style={profileStyles.statLabel}>Invertido</Text>
        </View>
        
        <View style={profileStyles.statItem}>
          <Text style={profileStyles.statNumber}>{stats.monthsActive}</Text>
          <Text style={profileStyles.statLabel}>Meses activa</Text>
        </View>
      </View>
      
      {stats.vipStatus && (
        <View style={profileStyles.vipStatusIndicator}>
          <Text style={profileStyles.vipStatusText}>👑 Miembro VIP activo</Text>
        </View>
      )}
    </View>
  );
};