// ============================================================================
// hooks/useProfileHistory.ts - HOOK PARA HISTORIAL DE CITAS
// ============================================================================
import { useState, useEffect } from 'react';
import { profileAPI, handleApiError } from '../services/api';

interface AppointmentHistory {
  id: string;
  treatment: {
    name: string;
    duration: number;
    price: number;
    iconName: string;
  };
  date: string;
  time: string;
  professional: string;
  clinic: string;
  status: string;
  beautyPointsEarned: number;
  notes?: string;
}

export const useProfileHistory = (limit = 20) => {
  const [history, setHistory] = useState<{[key: string]: AppointmentHistory[]}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadHistory = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
      }
      
      console.log('📋 Cargando historial de citas...');
      const response = await profileAPI.getHistory({
        limit,
        offset: isLoadMore ? offset : 0
      });
      
      if (response.success && response.data) {
        console.log('✅ Historial cargado:', response.data);
        
        if (isLoadMore) {
          setHistory(prev => ({
            ...prev,
            ...response.data.history
          }));
        } else {
          setHistory(response.data.history);
        }
        
        setHasMore(response.data.pagination.hasMore);
        setOffset(prev => isLoadMore ? prev + limit : limit);
      }
    } catch (err) {
      console.error('❌ Error loading history:', err);
      const errorMessage = handleApiError(err, 'No se pudo cargar el historial');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadHistory(true);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    loading,
    error,
    hasMore,
    loadMore,
    reload: () => loadHistory()
  };
};