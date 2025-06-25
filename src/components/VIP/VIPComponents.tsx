import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';
import type { VIPBenefit, VIPStatus, Testimonial } from '../../hooks/useVIP';

const { width } = Dimensions.get('window');

// ============================================================================
// COLORES VIP EXCLUSIVOS
// ============================================================================
const vipColors = {
  gold: '#D4AF37',
  lightGold: '#F4E4BC',
  darkGold: '#B8941F',
  cream: '#FFF8DC',
  platinum: '#E5E4E2',
  rose: '#F8BBD9',
  lavender: '#E6E6FA',
};

// ============================================================================
// HEADER VIP
// ============================================================================
interface VIPHeaderProps {
  user: any;
  vipStatus: VIPStatus | null;
}

export const VIPHeader = ({ user, vipStatus }: VIPHeaderProps) => (
  <LinearGradient
    colors={[vipColors.gold, vipColors.darkGold, '#8B4513']}
    style={styles.headerContainer}
  >
    <View style={styles.headerContent}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>
          {vipStatus?.isVIP ? '👑 Club VIP' : '✨ Únete al Club VIP'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {vipStatus?.isVIP 
            ? 'Disfruta de tus beneficios exclusivos' 
            : 'Descubre un mundo de privilegios'
          }
        </Text>
      </View>

      <View style={styles.pointsContainer}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Beauty Points</Text>
          <Text style={styles.pointsValue}>{user?.beautyPoints || 0}</Text>
          <Text style={styles.pointsMultiplier}>
            {vipStatus?.isVIP ? `×${vipStatus.benefits?.pointsMultiplier || 2} como VIP` : 'Únete para multiplicar'}
          </Text>
        </View>
        
        {vipStatus?.isVIP && vipStatus.subscription && (
          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Ionicons name="diamond" size={20} color={modernColors.white} />
            </View>
            <Text style={styles.statusText}>Miembro VIP</Text>
            <Text style={styles.statusExpiry}>
              Válido {vipStatus.subscription.daysRemaining} días más
            </Text>
          </View>
        )}
      </View>
    </View>
  </LinearGradient>
);

// ============================================================================
// LISTA DE BENEFICIOS
// ============================================================================
interface BenefitsListProps {
  benefits: VIPBenefit[];
  vipStatus: VIPStatus | null;
  onBenefitPress: (benefit: VIPBenefit) => void;
}

export const BenefitsList = ({ benefits, vipStatus, onBenefitPress }: BenefitsListProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Beneficios Exclusivos</Text>
    <Text style={styles.sectionSubtitle}>
      {vipStatus?.isVIP 
        ? 'Toca cualquier beneficio para usarlo' 
        : 'Todo esto y más te espera como miembro VIP'
      }
    </Text>
    
    <View style={styles.benefitsGrid}>
      {benefits.map((benefit) => (
        <TouchableOpacity
          key={benefit.id}
          style={[
            styles.benefitCard,
            vipStatus?.isVIP && styles.benefitCardActive
          ]}
          onPress={() => onBenefitPress(benefit)}
        >
          <LinearGradient
            colors={
              vipStatus?.isVIP 
                ? [vipColors.cream, modernColors.white]
                : [modernColors.gray100, modernColors.gray50]
            }
            style={styles.benefitGradient}
          >
            <View style={styles.benefitIcon}>
              <Text style={styles.benefitEmoji}>{benefit.icon}</Text>
            </View>
            
            <Text style={[
              styles.benefitTitle,
              vipStatus?.isVIP && styles.benefitTitleActive
            ]}>
              {benefit.title}
            </Text>
            
            <Text style={[
              styles.benefitDescription,
              vipStatus?.isVIP && styles.benefitDescriptionActive
            ]}>
              {benefit.description}
            </Text>
            
            {vipStatus?.isVIP && (
              <View style={styles.benefitBadge}>
                <Text style={styles.benefitBadgeText}>Disponible</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// ============================================================================
// PROMOCIONES ACTUALES
// ============================================================================
interface CurrentPromotionsProps {
  vipStatus: VIPStatus | null;
}

export const CurrentPromotions = ({ vipStatus }: CurrentPromotionsProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Promociones Exclusivas</Text>
    <Text style={styles.sectionSubtitle}>Ofertas especiales solo para miembros VIP</Text>
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promotionsScroll}>
      {/* Promoción 1 */}
      <View style={styles.promotionCard}>
        <LinearGradient
          colors={[vipColors.rose + '40', vipColors.lavender + '40']}
          style={styles.promotionGradient}
        >
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionBadge}>💆‍♀️ FACIAL VIP</Text>
            <Text style={styles.promotionDiscount}>GRATIS</Text>
          </View>
          <Text style={styles.promotionTitle}>Facial Mensual Gratuito</Text>
          <Text style={styles.promotionDescription}>
            Disfruta de un facial de lujo cada mes como parte de tu membresía VIP
          </Text>
          {vipStatus?.isVIP && (
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Reservar ahora</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {/* Promoción 2 */}
      <View style={styles.promotionCard}>
        <LinearGradient
          colors={[vipColors.lightGold + '40', vipColors.cream + '60']}
          style={styles.promotionGradient}
        >
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionBadge}>🏷️ DESCUENTO</Text>
            <Text style={styles.promotionDiscount}>25% OFF</Text>
          </View>
          <Text style={styles.promotionTitle}>Todos los Tratamientos</Text>
          <Text style={styles.promotionDescription}>
            Descuento automático en todos nuestros servicios premium
          </Text>
          {vipStatus?.isVIP && (
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Ver catálogo</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {/* Promoción 3 */}
      <View style={styles.promotionCard}>
        <LinearGradient
          colors={[vipColors.platinum + '40', modernColors.white]}
          style={styles.promotionGradient}
        >
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionBadge}>🎁 REGALO</Text>
            <Text style={styles.promotionDiscount}>ESPECIAL</Text>
          </View>
          <Text style={styles.promotionTitle}>Regalo de Cumpleaños</Text>
          <Text style={styles.promotionDescription}>
            Tratamiento premium completamente gratis en tu mes especial
          </Text>
          {vipStatus?.isVIP && (
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Más detalles</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
    </ScrollView>
  </View>
);

// ============================================================================
// TESTIMONIOS
// ============================================================================
interface VIPTestimonialsProps {
  testimonials: Testimonial[];
}

export const VIPTestimonials = ({ testimonials }: VIPTestimonialsProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Lo que dicen nuestras VIP</Text>
    <Text style={styles.sectionSubtitle}>Experiencias reales de nuestras clientas exclusivas</Text>
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsScroll}>
      {testimonials.map((testimonial) => (
        <View key={testimonial.id} style={styles.testimonialCard}>
          <View style={styles.testimonialHeader}>
            <View style={styles.testimonialAvatar}>
              <Text style={styles.testimonialInitial}>
                {testimonial.name[0]}
              </Text>
            </View>
            <View style={styles.testimonialInfo}>
              <Text style={styles.testimonialName}>{testimonial.name}</Text>
              <Text style={styles.testimonialAge}>{testimonial.age} años</Text>
              <View style={styles.testimonialRating}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name={index < testimonial.rating ? "star" : "star-outline"}
                    size={14}
                    color={vipColors.gold}
                  />
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.testimonialComment}>"{testimonial.comment}"</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

// ============================================================================
// PLANES VIP
// ============================================================================
interface VIPPlansProps {
  vipStatus: VIPStatus | null;
  onSubscribe: (planType: 'MONTHLY' | 'YEARLY') => void;
  subscribing: boolean;
}

export const VIPPlans = ({ vipStatus, onSubscribe, subscribing }: VIPPlansProps) => {
  if (vipStatus?.isVIP) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Únete al Club VIP</Text>
      <Text style={styles.sectionSubtitle}>Elige el plan que mejor se adapte a ti</Text>
      
      <View style={styles.plansContainer}>
        {/* Plan Mensual */}
        <TouchableOpacity
          style={[styles.planCard, styles.planCardBasic]}
          onPress={() => onSubscribe('MONTHLY')}
          disabled={subscribing}
        >
          <LinearGradient
            colors={[modernColors.white, vipColors.cream]}
            style={styles.planGradient}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planBadge}>MENSUAL</Text>
              <Text style={styles.planPrice}>$99</Text>
              <Text style={styles.planPeriod}>por mes</Text>
            </View>
            
            <View style={styles.planFeatures}>
              <Text style={styles.planFeature}>✨ Todos los beneficios VIP</Text>
              <Text style={styles.planFeature}>💆‍♀️ 1 facial gratis mensual</Text>
              <Text style={styles.planFeature}>🏷️ 25% descuento en todo</Text>
              <Text style={styles.planFeature}>💎 Puntos dobles</Text>
            </View>
            
            <View style={styles.planButton}>
              <Text style={styles.planButtonText}>
                {subscribing ? 'Procesando...' : 'Comenzar ahora'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Plan Anual - Recomendado */}
        <TouchableOpacity
          style={[styles.planCard, styles.planCardPremium]}
          onPress={() => onSubscribe('YEARLY')}
          disabled={subscribing}
        >
          <LinearGradient
            colors={[vipColors.gold, vipColors.lightGold]}
            style={styles.planGradient}
          >
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>MÁS POPULAR</Text>
            </View>
            
            <View style={styles.planHeader}>
              <Text style={styles.planBadgeGold}>ANUAL</Text>
              <Text style={styles.planPriceGold}>$899</Text>
              <Text style={styles.planPeriodGold}>por año</Text>
              <Text style={styles.planSavings}>Ahorra $289</Text>
            </View>
            
            <View style={styles.planFeatures}>
              <Text style={styles.planFeatureGold}>✨ Todos los beneficios VIP</Text>
              <Text style={styles.planFeatureGold}>💆‍♀️ 12 faciales gratis</Text>
              <Text style={styles.planFeatureGold}>🏷️ 30% descuento en todo</Text>
              <Text style={styles.planFeatureGold}>💎 Puntos triples</Text>
              <Text style={styles.planFeatureGold}>🎁 Regalos exclusivos</Text>
            </View>
            
            <View style={styles.planButtonGold}>
              <Text style={styles.planButtonTextGold}>
                {subscribing ? 'Procesando...' : 'Suscribirse ahora'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ============================================================================
// ESTILOS
// ============================================================================
const styles = {
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '700' as const,
    color: modernColors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 24,
    lineHeight: 22,
  },
  // Header VIP
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center' as const,
  },
  headerTop: {
    alignItems: 'center' as const,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.display,
    fontWeight: '700' as const,
    color: modernColors.white,
    textAlign: 'center' as const,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.white,
    textAlign: 'center' as const,
    opacity: 0.9,
  },
  pointsContainer: {
    flexDirection: 'row' as const,
    width: '100%',
    gap: 16,
  },
  pointsCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pointsLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.white,
    opacity: 0.8,
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: modernColors.white,
    marginBottom: 4,
  },
  pointsMultiplier: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.white,
    opacity: 0.9,
    textAlign: 'center' as const,
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 120,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  statusText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.white,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  statusExpiry: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.white,
    opacity: 0.8,
    textAlign: 'center' as const,
  },
  // Beneficios
  benefitsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 16,
  },
  benefitCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    overflow: 'hidden' as const,
    ...modernShadows.medium,
  },
  benefitCardActive: {
    transform: [{ scale: 1.02 }],
  },
  benefitGradient: {
    padding: 20,
    alignItems: 'center' as const,
    minHeight: 160,
  },
  benefitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  benefitEmoji: {
    fontSize: 24,
  },
  benefitTitle: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.gray700,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  benefitTitleActive: {
    color: modernColors.text,
  },
  benefitDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray500,
    textAlign: 'center' as const,
    lineHeight: 18,
  },
  benefitDescriptionActive: {
    color: modernColors.gray600,
  },
  benefitBadge: {
    backgroundColor: vipColors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  benefitBadgeText: {
    fontSize: modernTypography.fontSizeModern.xs,
    color: modernColors.white,
    fontWeight: '600' as const,
  },
  // Promociones
  promotionsScroll: {
    paddingLeft: 4,
  },
  promotionCard: {
    width: width * 0.75,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden' as const,
    ...modernShadows.large,
  },
  promotionGradient: {
    padding: 24,
    minHeight: 200,
  },
  promotionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  promotionBadge: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '600' as const,
    color: modernColors.gray600,
    backgroundColor: modernColors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promotionDiscount: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '700' as const,
    color: vipColors.darkGold,
  },
  promotionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 8,
  },
  promotionDescription: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    lineHeight: 22,
    marginBottom: 16,
  },
  promotionButton: {
    backgroundColor: vipColors.gold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start' as const,
  },
  promotionButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600' as const,
    color: modernColors.white,
  },
  // Testimonios
  testimonialsScroll: {
    paddingLeft: 4,
  },
  testimonialCard: {
    width: width * 0.8,
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    ...modernShadows.medium,
  },
  testimonialHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: vipColors.lightGold,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  testimonialInitial: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: vipColors.darkGold,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 2,
  },
  testimonialAge: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 4,
  },
  testimonialRating: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  testimonialComment: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    lineHeight: 22,
    fontStyle: 'italic' as const,
  },
  // Planes VIP
  plansContainer: {
    gap: 16,
  },
  planCard: {
    borderRadius: 20,
    overflow: 'hidden' as const,
    ...modernShadows.large,
  },
  planCardBasic: {
    borderWidth: 2,
    borderColor: modernColors.gray200,
  },
  planCardPremium: {
    borderWidth: 2,
    borderColor: vipColors.gold,
    position: 'relative' as const,
  },
  planGradient: {
    padding: 24,
  },
  recommendedBadge: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: vipColors.darkGold,
    paddingVertical: 8,
    alignItems: 'center' as const,
  },
  recommendedText: {
    fontSize: modernTypography.fontSizeModern.xs,
    fontWeight: '700' as const,
    color: modernColors.white,
    letterSpacing: 1,
  },
  planHeader: {
    alignItems: 'center' as const,
    marginBottom: 20,
    marginTop: 12,
  },
  planBadge: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600' as const,
    color: modernColors.gray600,
    marginBottom: 8,
  },
  planBadgeGold: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600' as const,
    color: vipColors.darkGold,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  planPriceGold: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: vipColors.darkGold,
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  planPeriodGold: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: vipColors.darkGold,
    marginBottom: 4,
  },
  planSavings: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600' as const,
    color: modernColors.success,
    backgroundColor: modernColors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planFeatures: {
    marginBottom: 24,
  },
  planFeature: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    marginBottom: 8,
    lineHeight: 24,
  },
  planFeatureGold: {
    fontSize: modernTypography.fontSizeModern.base,
    color: vipColors.darkGold,
    marginBottom: 8,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  planButton: {
    backgroundColor: modernColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center' as const,
  },
  planButtonGold: {
    backgroundColor: vipColors.darkGold,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center' as const,
  },
  planButtonText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.white,
  },
  planButtonTextGold: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '600' as const,
    color: modernColors.white,
  },
};