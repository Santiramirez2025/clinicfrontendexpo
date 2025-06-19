// ============================================================================
// hooks/useProfileStats.ts - HOOK ADICIONAL PARA ESTADÍSTICAS
// ============================================================================
import { useState, useEffect } from 'react';
import { profileAPI, handleApiError } from '../services/api';

interface ProfileStats {
  beautyPoints: number;
  sessionsCompleted: number;
  totalInvestment: number;
  vipStatus: boolean;
  memberSince: string;
  monthsActive: number;
}

export const useProfileStats = () => {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Cargando estadísticas del perfil...');
      const response = await profileAPI.getStats();
      
      if (response.success && response.data) {
        console.log('✅ Estadísticas cargadas:', response.data);
        setStats(response.data.overview);
      }
    } catch (err) {
      console.error('❌ Error loading stats:', err);
      const errorMessage = handleApiError(err, 'No se pudieron cargar las estadísticas');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    loading,
    error,
    reload: loadStats
  };
};