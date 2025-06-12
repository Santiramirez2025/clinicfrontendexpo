// src/screens/vip/VIPScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const { width } = Dimensions.get('window');

// Paleta de colores elegante y relajante
const colors = {
  lavender: '#F5F3FF',
  nude: '#F7F5F3',
  rosePale: '#FBEEF5',
  warmWhite: '#FEFDFB',
  jade: '#85C4A6',
  gold: '#D4AF37',
  softGray: '#A8A8A8',
  charcoal: '#3A3A3A',
  pearl: '#F9F7F4',
  blush: '#F4E6E1',
  sage: '#C8D5B9',
  cream: '#FDF8F2',
};

const VIPScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const exclusiveBenefits = [
    {
      icon: '✨',
      title: 'Descuentos exclusivos',
      description: '15% en todos tus tratamientos',
      emotion: 'Porque merecés un mimo cada tanto 🌸',
      gradient: colors.rosePale,
    },
    {
      icon: '🌸',
      title: 'Facial de regalo',
      description: 'Cada 3 meses, un mimo especial',
      emotion: 'Tu piel se lo merece todo 💕',
      gradient: colors.sage,
    },
    {
      icon: '⏰',
      title: 'Citas prioritarias',
      description: 'Sin esperas, siempre primera',
      emotion: 'Tu tiempo es valioso ⭐',
      gradient: colors.pearl,
    },
    {
      icon: '💬',
      title: 'Asesoría personal',
      description: 'Tu especialista siempre disponible',
      emotion: 'Estás en las mejores manos 🤲',
      gradient: colors.lavender,
    },
    {
      icon: '🎁',
      title: 'Sorpresas especiales',
      description: 'Regalos únicos en fechas especiales',
      emotion: 'Momentos únicos para ti ✨',
      gradient: colors.blush,
    },
    {
      icon: '📚',
      title: 'Guías exclusivas',
      description: 'Rutinas personalizadas para ti',
      emotion: 'Tu belleza, potenciada 🌟',
      gradient: colors.cream,
    },
  ];

  const miniReviews = [
    {
      text: '¡VIP es mi ritual mensual!',
      author: 'Marta',
      age: '41',
      avatar: '👩🏻',
    },
    {
      text: 'Me miman como a una reina.',
      author: 'Lucía',
      age: '35',
      avatar: '👩🏼',
    },
    {
      text: 'Siempre tengo un regalo esperando.',
      author: 'Sofía',
      age: '48',
      avatar: '👩🏽',
    },
  ];

  const immediateValues = [
    'Descuento activo desde el primer turno',
    'Beneficio facial gratis al suscribirte',
    'Cancelás cuando quieras',
  ];

  const handleSelectBenefit = (index: number) => {
    setSelectedBenefit(index);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleJoinVIP = () => {
    Alert.alert(
      'Confirmar Membresía',
      '¿Deseás usar tu método de pago guardado?\n\n💳 •••• 4567\n\n19.99€/mes',
      [
        { text: 'Cambiar método', style: 'cancel' },
        { 
          text: 'Confirmar con Face ID', 
          onPress: () => {
            // Simular Face ID
            setTimeout(() => {
              Alert.alert('¡Bienvenida al Club! 🌸', 'Ya eres parte de nuestro círculo exclusivo. Tu primer descuento te está esperando.');
            }, 1000);
          }
        },
      ]
    );
  };

  const BenefitCard = ({ benefit, index }: { benefit: typeof exclusiveBenefits[0], index: number }) => (
    <TouchableOpacity 
      style={[
        styles.benefitCard, 
        { backgroundColor: benefit.gradient },
        selectedBenefit === index && styles.selectedBenefitCard
      ]}
      onPress={() => handleSelectBenefit(index)}
    >
      <View style={styles.benefitIconContainer}>
        <Text style={styles.benefitIcon}>{benefit.icon}</Text>
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{benefit.title}</Text>
        <Text style={styles.benefitDescription}>{benefit.description}</Text>
        <Text style={styles.benefitEmotion}>{benefit.emotion}</Text>
      </View>
      {selectedBenefit === index && (
        <View style={styles.heartContainer}>
          <Text style={styles.heartIcon}>💖</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const MiniReview = ({ review }: { review: typeof miniReviews[0] }) => (
    <View style={styles.miniReviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{review.avatar}</Text>
        </View>
        <View style={styles.reviewAuthor}>
          <Text style={styles.authorName}>{review.author}</Text>
          <Text style={styles.authorAge}>{review.age} años</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>"{review.text}"</Text>
    </View>
  );

  const renderBenefit = ({ item, index }: { item: typeof exclusiveBenefits[0], index: number }) => (
    <View style={styles.carouselItem}>
      <BenefitCard benefit={item} index={index} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header elegante con logo tipográfico */}
      <View style={styles.header}>
        <Text style={styles.logoText}>VIP</Text>
        <Text style={styles.headerTitle}>Club Exclusivo</Text>
        <Text style={styles.headerSubtitle}>
          Momentos únicos diseñados especialmente para ti
        </Text>
      </View>

      {/* Beneficios en carousel horizontal */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Tus beneficios exclusivos</Text>
        
        <FlatList
          data={exclusiveBenefits}
          renderItem={renderBenefit}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.85}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
        />

        {selectedBenefit !== null && (
          <Animated.View 
            style={[
              styles.benefitPromptContainer,
              {
                opacity: slideAnim,
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              }
            ]}
          >
            <Text style={styles.benefitPrompt}>
              ¡Nos encanta que te emocione este beneficio! 💕
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Mini reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Lo que dicen nuestras clientas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewsContainer}>
          {miniReviews.map((review, index) => (
            <MiniReview key={index} review={review} />
          ))}
        </ScrollView>
      </View>

      {/* Beneficios inmediatos */}
      <View style={styles.immediateSection}>
        <Text style={styles.immediateTitle}>Beneficios inmediatos</Text>
        {immediateValues.map((value, index) => (
          <View key={index} style={styles.immediateItem}>
            <Text style={styles.checkIcon}>✅</Text>
            <Text style={styles.immediateText}>{value}</Text>
          </View>
        ))}
      </View>

      {/* CTA principal mejorado */}
      <View style={styles.ctaSection}>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinVIP}>
          <View style={styles.buttonContent}>
            <Text style={styles.joinButtonText}>Unirme al Club</Text>
            <Text style={styles.joinButtonPrice}>Solo 19.99€/mes</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.ctaSubtext}>
          Sin permanencia • Cancela cuando quieras
        </Text>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  header: {
    backgroundColor: colors.warmWhite,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '200',
    color: colors.gold,
    letterSpacing: 4,
    marginBottom: 8,
    fontFamily: 'serif', // Elegant serif for VIP
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '300',
    color: colors.charcoal,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.softGray,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    fontWeight: '300',
  },
  benefitsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    letterSpacing: 0.3,
  },
  carouselContainer: {
    paddingLeft: 24,
  },
  carouselItem: {
    width: width * 0.8,
    marginRight: 16,
  },
  benefitCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 160,
    position: 'relative',
  },
  selectedBenefitCard: {
    borderWidth: 2,
    borderColor: colors.jade,
    transform: [{ scale: 1.02 }],
  },
  benefitIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.warmWhite,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitIcon: {
    fontSize: 24,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: colors.softGray,
    fontWeight: '300',
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitEmotion: {
    fontSize: 12,
    color: colors.jade,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  heartContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  heartIcon: {
    fontSize: 24,
  },
  benefitPromptContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  benefitPrompt: {
    fontSize: 16,
    color: colors.jade,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  reviewsSection: {
    marginBottom: 32,
  },
  reviewsContainer: {
    paddingLeft: 24,
  },
  miniReviewCard: {
    backgroundColor: colors.warmWhite,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 16,
  },
  reviewAuthor: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.charcoal,
  },
  authorAge: {
    fontSize: 12,
    color: colors.softGray,
    fontWeight: '300',
  },
  reviewText: {
    fontSize: 13,
    color: colors.charcoal,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  immediateSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  immediateTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.charcoal,
    marginBottom: 16,
    textAlign: 'center',
  },
  immediateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warmWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  checkIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  immediateText: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '400',
    flex: 1,
  },
  ctaSection: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  joinButton: {
    backgroundColor: colors.jade,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 16,
    shadowColor: colors.jade,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    minWidth: width * 0.8,
  },
  buttonContent: {
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.warmWhite,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  joinButtonPrice: {
    fontSize: 14,
    color: colors.warmWhite,
    opacity: 0.9,
    fontWeight: '300',
  },
  ctaSubtext: {
    fontSize: 12,
    color: colors.softGray,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default VIPScreen;