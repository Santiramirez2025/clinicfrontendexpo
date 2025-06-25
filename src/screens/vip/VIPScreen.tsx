import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useVIP } from '../../hooks/useVIP';
import { modernColors, modernTypography } from '../../styles';

// Componentes
import {
  VIPHeader,
  BenefitsList,
  CurrentPromotions,
  VIPTestimonials,
  VIPPlans,
} from '../../components/VIP/VIPComponents';

const VIPScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  const {
    loading,
    refreshing,
    subscribing,
    vipStatus,
    benefits,
    testimonials,
    handleSubscribe,
    handleBenefitPress,
    onRefresh,
  } = useVIP(navigation);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>👑</Text>
          <Text style={styles.loadingText}>Cargando experiencia VIP...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VIPHeader user={user} vipStatus={vipStatus} />

        <BenefitsList
          benefits={benefits}
          vipStatus={vipStatus}
          onBenefitPress={handleBenefitPress}
        />

        <CurrentPromotions vipStatus={vipStatus} />

        <VIPTestimonials testimonials={testimonials} />

        <VIPPlans
          vipStatus={vipStatus}
          onSubscribe={handleSubscribe}
          subscribing={subscribing}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
  scrollView: {
    flex: 1,
  },
  bottomSpacing: {
    height: 40,
  },
};

export default VIPScreen;