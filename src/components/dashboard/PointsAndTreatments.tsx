import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';

interface BeautyPointsCardProps {
  user: any;
  onPress: () => void;
}

const BeautyPointsCard = ({ user, onPress }: BeautyPointsCardProps) => {
  // Calcular nivel y progreso
  const currentLevel = Math.floor((user?.beautyPoints || 0) / 100);
  const nextLevelPoints = (currentLevel + 1) * 100;
  const pointsToNext = nextLevelPoints - (user?.beautyPoints || 0);
  const progressPercentage = ((user?.beautyPoints || 0) % 100) / 100;

  // Determinar tier de fidelidad
  const loyaltyTier = (user?.beautyPoints || 0) >= 1000 ? 'Diamond' :
                      (user?.beautyPoints || 0) >= 500 ? 'Gold' :
                      (user?.beautyPoints || 0) >= 250 ? 'Silver' : 'Bronze';

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
    <TouchableOpacity style={styles.pointsCard} onPress={onPress}>
      {/* Header con tier */}
      <View style={styles.pointsHeader}>
        <View style={styles.pointsIcon}>
          <Ionicons name="diamond" size={20} color={modernColors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.pointsTitle}>Beauty Points</Text>
          <View style={styles.tierContainer}>
            <Text style={styles.tierEmoji}>{tierEmoji[loyaltyTier]}</Text>
            <Text style={[styles.tierText, { color: tierColors[loyaltyTier] }]}>
              {loyaltyTier}
            </Text>
          </View>
        </View>
        <View style={styles.pointsArrow}>
          <Ionicons name="chevron-forward" size={16} color={modernColors.gray400} />
        </View>
      </View>

      {/* Puntos principales */}
      <View style={styles.pointsMain}>
        <Text style={styles.pointsAmount}>{user?.beautyPoints || 0}</Text>
        <Text style={styles.pointsSubtext}>Puntos acumulados</Text>
      </View>

      {/* Barra de progreso al siguiente nivel */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            Nivel {currentLevel} • {pointsToNext} puntos para nivel {currentLevel + 1}
          </Text>
          {user?.vipStatus && (
            <View style={styles.vipMultiplier}>
              <Ionicons name="star" size={12} color={modernColors.accent} />
              <Text style={styles.vipText}>2x</Text>
            </View>
          )}
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Indicador de recompensas disponibles */}
      {(user?.beautyPoints || 0) >= 100 && (
        <View style={styles.rewardHint}>
          <Ionicons name="gift" size={14} color={modernColors.primary} />
          <Text style={styles.rewardText}>¡Tienes recompensas disponibles!</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

interface FeaturedTreatmentsProps {
  treatments?: any[];
  onTreatmentPress: (treatment: any) => void;
  onSeeAll: () => void;
}

const FeaturedTreatments = ({ treatments, onTreatmentPress, onSeeAll }: FeaturedTreatmentsProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Tratamientos recomendados</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>Ver todos</Text>
      </TouchableOpacity>
    </View>
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.treatmentsScroll}>
      {treatments?.map((treatment: any) => (
        <TouchableOpacity
          key={treatment.id}
          style={styles.treatmentCard}
          onPress={() => onTreatmentPress(treatment)}
        >
          <View style={styles.treatmentImage}>
            <Text style={styles.treatmentEmoji}>{treatment.emoji || '💆‍♀️'}</Text>
            {treatment.isVipExclusive && (
              <View style={styles.vipTreatmentBadge}>
                <Ionicons name="diamond" size={10} color={modernColors.white} />
              </View>
            )}
          </View>
          <Text style={styles.treatmentName}>{treatment.name}</Text>
          <Text style={styles.treatmentPrice}>${treatment.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

interface WellnessTipProps {
  tip?: any;
}

const WellnessTip = ({ tip }: WellnessTipProps) => {
  if (!tip) return null;

  // Convertir iconName a emoji
  const getEmojiFromIconName = (iconName: string) => {
    const emojiMap: { [key: string]: string } = {
      'droplets': '💧',
      'sparkles': '✨',
      'heart': '💖',
      'leaf': '🍃',
      'sun': '☀️',
      'moon': '🌙',
      'water': '💧',
      'fire': '🔥',
    };
    return emojiMap[iconName] || '💡';
  };

  return (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <View style={styles.tipIcon}>
          <Text style={styles.tipEmoji}>
            {getEmojiFromIconName(tip.iconName)}
          </Text>
        </View>
        <Text style={styles.tipTitle}>{tip.title}</Text>
      </View>
      <Text style={styles.tipContent}>{tip.content}</Text>
    </View>
  );
};

const styles = {
  pointsCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...modernShadows.small,
  },
  pointsHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  pointsIcon: {
    width: 32,
    height: 32,
    backgroundColor: modernColors.accentLight + '20',
    borderRadius: 16,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  pointsTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  tierContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 2,
  },
  tierEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  tierText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '500' as const,
  },
  pointsArrow: {
    padding: 4,
  },
  pointsMain: {
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  pointsAmount: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '700' as const,
    color: modernColors.accent,
    marginBottom: 4,
  },
  pointsSubtext: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  progressText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.gray600,
    flex: 1,
  },
  vipMultiplier: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.accentLight + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  vipText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.accent,
    fontWeight: '600' as const,
    marginLeft: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: modernColors.gray200,
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    backgroundColor: modernColors.accent,
    borderRadius: 3,
  },
  rewardHint: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: modernColors.primaryLight + '20',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  rewardText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.primary,
    fontWeight: '500' as const,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  seeAllText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.primary,
    fontWeight: '500' as const,
  },
  treatmentsScroll: {
    paddingLeft: 4,
  },
  treatmentCard: {
    width: 140,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    ...modernShadows.small,
  },
  treatmentImage: {
    width: 60,
    height: 60,
    backgroundColor: modernColors.gray100,
    borderRadius: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
    position: 'relative' as const,
  },
  treatmentEmoji: {
    fontSize: 24,
  },
  vipTreatmentBadge: {
    position: 'absolute' as const,
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: modernColors.accent,
    borderRadius: 10,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  treatmentPrice: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.primary,
    fontWeight: '600' as const,
  },
  tipCard: {
    backgroundColor: modernColors.accentLight + '15',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: modernColors.accent,
  },
  tipHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  tipContent: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    lineHeight: 22,
  },
};

export { BeautyPointsCard, FeaturedTreatments, WellnessTip };