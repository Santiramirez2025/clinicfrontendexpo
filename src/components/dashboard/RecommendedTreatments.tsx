// components/dashboard/RecommendedTreatments.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.75;

interface Treatment {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  discount: number;
  image: string;
  category: string;
  isVipExclusive: boolean;
}

interface RecommendedTreatmentsProps {
  treatments: Treatment[];
  onTreatmentPress: (id: string) => void;
  onBookNow: (id: string) => void;
  userVipStatus: boolean;
  isDarkMode?: boolean;
}

export const RecommendedTreatments: React.FC<RecommendedTreatmentsProps> = ({
  treatments,
  onTreatmentPress,
  onBookNow,
  userVipStatus,
  isDarkMode = false,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      facial: '✨',
      massage: '💆‍♀️',
      corporal: '🌸',
      manicure: '💅',
      pedicure: '🦶',
      hair: '💇‍♀️',
    };
    return icons[category] || '🌟';
  };

  const calculateFinalPrice = (price: number, discount: number) => {
    const baseDiscount = discount || 0;
    const vipDiscount = userVipStatus ? 25 : 0;
    const totalDiscount = baseDiscount + vipDiscount;
    return price * (1 - totalDiscount / 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.textDark]}>
          Recomendados para ti
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Ver todos →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + modernSpacing.md}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {treatments.map((treatment, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + modernSpacing.md),
            index * (CARD_WIDTH + modernSpacing.md),
            (index + 1) * (CARD_WIDTH + modernSpacing.md),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={treatment.id}
              style={[
                styles.card,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => onTreatmentPress(treatment.id)}
                activeOpacity={0.95}
              >
                {/* Imagen con overlay */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: treatment.image }}
                    style={styles.image}
                    defaultSource={require('../../../assets/placeholder-treatment.jpg')}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.imageOverlay}
                  />
                  
                  {/* Badges */}
                  <View style={styles.badges}>
                    {treatment.discount > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          -{treatment.discount}%
                        </Text>
                      </View>
                    )}
                    {treatment.isVipExclusive && (
                      <View style={styles.vipBadge}>
                        <Text style={styles.vipBadgeText}>👑 VIP</Text>
                      </View>
                    )}
                  </View>

                  {/* Categoría */}
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryIcon}>
                      {getCategoryIcon(treatment.category)}
                    </Text>
                  </View>
                </View>

                {/* Contenido */}
                <View style={styles.content}>
                  <Text style={[styles.treatmentName, isDarkMode && styles.textDark]}>
                    {treatment.name}
                  </Text>
                  <Text style={[styles.description, isDarkMode && styles.subtitleDark]} numberOfLines={2}>
                    {treatment.description}
                  </Text>

                  {/* Info y precio */}
                  <View style={styles.infoRow}>
                    <View style={styles.duration}>
                      <Text style={styles.durationIcon}>⏱</Text>
                      <Text style={[styles.durationText, isDarkMode && styles.subtitleDark]}>
                        {treatment.duration} min
                      </Text>
                    </View>

                    <View style={styles.priceContainer}>
                      {(treatment.discount > 0 || userVipStatus) && (
                        <Text style={styles.originalPrice}>
                          ${treatment.price}
                        </Text>
                      )}
                      <Text style={[styles.price, isDarkMode && styles.textDark]}>
                        ${calculateFinalPrice(treatment.price, treatment.discount).toFixed(0)}
                      </Text>
                    </View>
                  </View>

                  {/* Botón de acción */}
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => onBookNow(treatment.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[modernColors.primary, '#E8956B']}
                      style={styles.bookGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.bookText}>Agendar ahora</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: modernSpacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  title: {
    ...modernTypography.headingSmall,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  textDark: {
    color: modernColors.gray100,
  },
  subtitleDark: {
    color: modernColors.gray400,
  },
  seeAll: {
    ...modernTypography.bodySmall,
    color: modernColors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingRight: modernSpacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: modernSpacing.md,
    borderRadius: modernSpacing.lg,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  badges: {
    position: 'absolute',
    top: modernSpacing.sm,
    right: modernSpacing.sm,
    gap: modernSpacing.xs,
  },
  discountBadge: {
    backgroundColor: modernColors.error,
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.xs,
    marginBottom: modernSpacing.xs,
  },
  discountText: {
    ...modernTypography.caption,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  vipBadge: {
    backgroundColor: modernColors.vip,
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.xs,
  },
  vipBadgeText: {
    ...modernTypography.caption,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: modernSpacing.sm,
    left: modernSpacing.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
  },
  content: {
    padding: modernSpacing.md,
  },
  treatmentName: {
    ...modernTypography.bodyLarge,
    color: modernColors.gray900,
    fontWeight: '700',
    marginBottom: modernSpacing.xs,
  },
  description: {
    ...modernTypography.bodySmall,
    color: modernColors.gray600,
    lineHeight: 20,
    marginBottom: modernSpacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.xs,
  },
  durationIcon: {
    fontSize: 14,
  },
  durationText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray600,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.xs,
  },
  originalPrice: {
    ...modernTypography.bodySmall,
    color: modernColors.gray400,
    textDecorationLine: 'line-through',
  },
  price: {
    ...modernTypography.headingSmall,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  bookButton: {
    borderRadius: modernSpacing.sm,
    overflow: 'hidden',
  },
  bookGradient: {
    paddingVertical: modernSpacing.sm,
    alignItems: 'center',
  },
  bookText: {
    ...modernTypography.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});