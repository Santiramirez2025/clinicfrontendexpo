// ============================================================================
// screens/VIPScreen.tsx - PANTALLA VIP REFACTORIZADA
// ============================================================================
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importar custom hook
import { useVIP } from '../../hooks/useVIP';

// Importar componentes modularizados
import {
  VIPHeader,
  VIPStatusCard,
  BenefitsSection,
  TestimonialsSection,
  PricingSection,
  LoadingOverlay,
} from '../../components/VIP';

// Importar estilos
import { vipStyles } from '../../components/VIP/styles';
import { modernColors } from '../../styles';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
const VIPScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Usar custom hook para toda la lógica
  const {
    // Estado
    loading,
    refreshing,
    subscribing,
    vipStatus,
    benefits,
    testimonials,
    
    // Funciones
    handleSubscribe,
    handleBenefitPress,
    handleUpgrade,
    onRefresh,
  } = useVIP(navigation);

  // ============================================================================
  // RENDER LOADING
  // ============================================================================
  if (loading) {
    return (
      <SafeAreaView style={vipStyles.container}>
        <View style={vipStyles.loadingContainer}>
          <ActivityIndicator size="large" color={modernColors.vip} />
          <Text style={vipStyles.loadingText}>Cargando beneficios VIP...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================
  return (
    <SafeAreaView style={vipStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={modernColors.backgroundWarm} />
      
      <ScrollView
        style={vipStyles.scrollView}
        contentContainerStyle={vipStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[modernColors.vip]}
            tintColor={modernColors.vip}
          />
        }
      >
        {/* Header VIP */}
        <VIPHeader
          isVIP={vipStatus?.isVIP || false}
          onUpgradePress={handleUpgrade}
        />

        {/* Status Card */}
        {vipStatus && (
          <VIPStatusCard vipStatus={vipStatus} />
        )}

        {/* Beneficios */}
        <BenefitsSection
          benefits={benefits}
          isVIP={vipStatus?.isVIP || false}
          onBenefitPress={handleBenefitPress}
        />

        {/* Testimonios */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Planes de suscripción */}
        <PricingSection
          isVIP={vipStatus?.isVIP || false}
          onSubscribe={handleSubscribe}
        />

        {/* Espacio final */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Loading overlay para suscripción */}
      <LoadingOverlay
        visible={subscribing}
        text="Procesando suscripción..."
      />
    </SafeAreaView>
  );
};

export default VIPScreen;