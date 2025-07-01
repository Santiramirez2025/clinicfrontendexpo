import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../styles';
import { api, handleApiError } from '../services/api';

// ⭐ OBTENER DIMENSIONES DE PANTALLA
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BeautyPointsScreenProps {
  navigation: any;
  route: {
    params?: {
      pointsData?: any;
    };
  };
}

const BeautyPointsScreen = ({ navigation, route }: BeautyPointsScreenProps) => {
  const [pointsData, setPointsData] = useState(route.params?.pointsData || null);
  const [loading, setLoading] = useState(!route.params?.pointsData);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!pointsData) {
      loadBeautyPoints();
    }
  }, []);

  const loadBeautyPoints = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.request('/beauty-points');
      
      if (response.success) {
        setPointsData(response.data);
      }
    } catch (error) {
      const errorMessage = handleApiError(error, 'Error al cargar beauty points');
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRedeemReward = async (rewardId: string) => {
    try {
      const response = await api.request('/beauty-points/redeem', {
        method: 'POST',
        body: JSON.stringify({ rewardId }),
      });

      if (response.success) {
        Alert.alert(
          '¡Recompensa canjeada! 🎉',
          response.message,
          [{ text: 'OK', onPress: () => loadBeautyPoints() }]
        );
      }
    } catch (error) {
      const errorMessage = handleApiError(error, 'Error al canjear recompensa');
      Alert.alert('Error', errorMessage);
    }
  };

  const confirmRedemption = (reward: any) => {
    Alert.alert(
      'Confirmar canje',
      `¿Quieres canjear "${reward.name}" por ${reward.pointsCost} puntos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Canjear', onPress: () => handleRedeemReward(reward.id) }
      ]
    );
  };

  if (loading && !pointsData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={modernColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Beauty Points</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando puntos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const loyaltyTier = (pointsData?.currentPoints || 0) >= 1000 ? 'Diamond' :
                      (pointsData?.currentPoints || 0) >= 500 ? 'Gold' :
                      (pointsData?.currentPoints || 0) >= 250 ? 'Silver' : 'Bronze';

  const tierColors = {
    Bronze: '#CD7F32',
    Silver: '#C0C0C0', 
    Gold: '#FFD700',
    Diamond: '#B9F2FF'
  };

  const tierEmoji = {
    Bronze: '🥉',
    Silver: '🥈',
    Gold: '🥇', 
    Diamond: '💎'
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={modernColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beauty Points</Text>
        <TouchableOpacity onPress={() => loadBeautyPoints(true)}>
          <Ionicons name="refresh" size={24} color={modernColors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadBeautyPoints(true)} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Puntos principales */}
        <View style={styles.mainCard}>
          <View style={styles.pointsHeader}>
            <View style={styles.tierContainer}>
              <Text style={styles.tierEmoji}>{tierEmoji[loyaltyTier]}</Text>
              <Text style={[styles.tierText, { color: tierColors[loyaltyTier] }]}>
                {loyaltyTier}
              </Text>
            </View>
            {pointsData?.vipMultiplier > 1 && (
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={14} color={modernColors.accent} />
                <Text style={styles.vipText}>{pointsData.vipMultiplier}x</Text>
              </View>
            )}
          </View>

          <Text style={styles.pointsAmount}>{pointsData?.currentPoints || 0}</Text>
          <Text style={styles.pointsSubtext}>Puntos acumulados</Text>

          {/* Progreso al siguiente nivel */}
          {pointsData?.level && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Nivel {pointsData.level.current} • {pointsData.level.pointsToNext} puntos para nivel {pointsData.level.current + 1}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((pointsData.currentPoints % 100) / 100) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>

        {/* Recompensas disponibles */}
        {pointsData?.availableRewards?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recompensas disponibles</Text>
            {pointsData.availableRewards.map((reward: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.rewardCard}
                onPress={() => confirmRedemption(reward)}
              >
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardName}>{reward.name}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                  <View style={styles.rewardCost}>
                    <Ionicons name="diamond" size={14} color={modernColors.accent} />
                    <Text style={styles.rewardCostText}>{reward.pointsCost} puntos</Text>
                  </View>
                </View>
                <View style={styles.rewardAction}>
                  <Text style={styles.redeemText}>Canjear</Text>
                  <Ionicons name="chevron-forward" size={16} color={modernColors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Próximas recompensas */}
        {pointsData?.nextRewards?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próximas recompensas</Text>
            {pointsData.nextRewards.map((reward: any, index: number) => (
              <View key={index} style={[styles.rewardCard, styles.lockedReward]}>
                <View style={styles.rewardInfo}>
                  <Text style={[styles.rewardName, styles.lockedText]}>{reward.name}</Text>
                  <Text style={[styles.rewardDescription, styles.lockedText]}>{reward.description}</Text>
                  <View style={styles.rewardCost}>
                    <Ionicons name="diamond" size={14} color={modernColors.gray400} />
                    <Text style={[styles.rewardCostText, styles.lockedText]}>{reward.pointsCost} puntos</Text>
                  </View>
                </View>
                <View style={styles.lockIcon}>
                  <Ionicons name="lock-closed" size={16} color={modernColors.gray400} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Historial reciente */}
        {pointsData?.history?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial reciente</Text>
            {pointsData.history.map((item: any, index: number) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyIcon}>
                  <Text style={styles.historyEmoji}>
                    {item.iconName === 'sparkles' ? '✨' : 
                     item.iconName === 'waves' ? '🌊' : 
                     item.iconName === 'droplets' ? '💧' : '💆‍♀️'}
                  </Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTreatment}>{item.treatment}</Text>
                  <Text style={styles.historyDate}>{new Date(item.date).toLocaleDateString('es-ES')}</Text>
                </View>
                <Text style={styles.historyPoints}>+{item.pointsEarned}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ⭐ ESTILOS CORREGIDOS CON StyleSheet.create Y DIMENSIONES NUMÉRICAS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    ...modernShadows.medium,
  },
  // ⭐ CORREGIDO: width como número
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH - 88, // ⭐ NÚMERO EN VEZ DE STRING
    marginBottom: 20,
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  tierText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.accentLight + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vipText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.accent,
    fontWeight: '600',
    marginLeft: 4,
  },
  pointsAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: modernColors.accent,
    marginBottom: 8,
  },
  pointsSubtext: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 20,
  },
  // ⭐ CORREGIDO: width como número
  progressContainer: {
    width: SCREEN_WIDTH - 88, // ⭐ NÚMERO EN VEZ DE STRING
  },
  progressText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: modernColors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  // ⭐ CORREGIDO: height como número
  progressFill: {
    height: 8, // ⭐ NÚMERO EN VEZ DE STRING
    backgroundColor: modernColors.accent,
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600',
    color: modernColors.text,
    marginBottom: 16,
  },
  rewardCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...modernShadows.small,
  },
  lockedReward: {
    opacity: 0.6,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.text,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 8,
  },
  rewardCost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardCostText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.accent,
    fontWeight: '500',
    marginLeft: 4,
  },
  rewardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redeemText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  lockIcon: {
    padding: 8,
  },
  lockedText: {
    color: modernColors.gray400,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...modernShadows.small,
  },
  historyIcon: {
    width: 40,
    height: 40,
    backgroundColor: modernColors.gray100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyEmoji: {
    fontSize: 18,
  },
  historyInfo: {
    flex: 1,
  },
  historyTreatment: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500',
    color: modernColors.text,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  historyPoints: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600',
    color: modernColors.accent,
  },
});

export default BeautyPointsScreen;