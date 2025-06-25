import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../styles';
import { treatmentAPI, handleApiError } from '../services/api';

interface TreatmentsScreenProps {
  navigation: any;
}

const TreatmentsScreen = ({ navigation }: TreatmentsScreenProps) => {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Facial', 'Corporal', 'VIP'];

  useEffect(() => {
    loadTreatments();
  }, []);

  useEffect(() => {
    filterTreatments();
  }, [treatments, searchQuery, selectedCategory]);

  const loadTreatments = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await treatmentAPI.getAll();
      
      if (response.success && response.data?.treatments) {
        // Agregar emojis a los tratamientos
        const treatmentsWithEmojis = response.data.treatments.map((treatment: any) => ({
          ...treatment,
          emoji: getEmojiForIcon(treatment.iconName)
        }));
        
        setTreatments(treatmentsWithEmojis);
      }
    } catch (error: any) {
      console.error('Error loading treatments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterTreatments = () => {
    let filtered = treatments;

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      if (selectedCategory === 'VIP') {
        filtered = filtered.filter(t => t.isVipExclusive);
      } else {
        filtered = filtered.filter(t => t.category === selectedCategory);
      }
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTreatments(filtered);
  };

  const getEmojiForIcon = (iconName: string): string => {
    const emojiMap: { [key: string]: string } = {
      'sparkles': '✨',
      'waves': '🌊',
      'droplets': '💧',
      'crown': '👑',
      'star': '⭐',
      'gem': '💎',
      'flower': '🌸',
      'leaf': '🍃',
      'fire': '🔥',
    };
    return emojiMap[iconName] || '💆‍♀️';
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    });
  };

  const handleTreatmentPress = (treatment: any) => {
    navigation.navigate('BookAppointment', { 
      selectedTreatment: treatment 
    });
  };

  const onRefresh = () => {
    loadTreatments(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={modernColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tratamientos</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>💆‍♀️</Text>
          <Text style={styles.loadingText}>Cargando tratamientos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={modernColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tratamientos</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Buscador */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={modernColors.gray400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tratamiento..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={modernColors.gray400}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={modernColors.gray400} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filtros por categoría */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de tratamientos */}
        <View style={styles.treatmentsContainer}>
          {filteredTreatments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No se encontraron tratamientos</Text>
              <Text style={styles.emptyText}>
                {searchQuery ? 'Intenta con otro término de búsqueda' : 'No hay tratamientos en esta categoría'}
              </Text>
            </View>
          ) : (
            filteredTreatments.map((treatment) => (
              <TouchableOpacity
                key={treatment.id}
                style={styles.treatmentCard}
                onPress={() => handleTreatmentPress(treatment)}
              >
                <View style={styles.treatmentHeader}>
                  <View style={styles.treatmentIconContainer}>
                    <Text style={styles.treatmentEmoji}>{treatment.emoji}</Text>
                    {treatment.isVipExclusive && (
                      <View style={styles.vipBadge}>
                        <Ionicons name="diamond" size={10} color={modernColors.white} />
                      </View>
                    )}
                  </View>
                  <View style={styles.treatmentInfo}>
                    <Text style={styles.treatmentName}>{treatment.name}</Text>
                    <Text style={styles.treatmentCategory}>{treatment.category}</Text>
                  </View>
                  <View style={styles.treatmentPriceContainer}>
                    <Text style={styles.treatmentPrice}>{formatPrice(treatment.price)}</Text>
                    <Text style={styles.treatmentDuration}>{treatment.duration}min</Text>
                  </View>
                </View>
                
                <Text style={styles.treatmentDescription}>{treatment.description}</Text>
                
                <View style={styles.treatmentFooter}>
                  <View style={styles.treatmentFeatures}>
                    <Text style={styles.treatmentFeature}>📍 {treatment.clinic}</Text>
                  </View>
                  <View style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Agendar</Text>
                    <Ionicons name="chevron-forward" size={16} color={modernColors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: modernColors.background,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray200,
  },
  headerTitle: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: modernTypography.fontSizeModern.lg,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.gray100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: modernColors.gray100,
  },
  categoryButtonActive: {
    backgroundColor: modernColors.primary,
  },
  categoryButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
    color: modernColors.gray600,
  },
  categoryButtonTextActive: {
    color: modernColors.white,
  },
  treatmentsContainer: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center' as const,
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  emptyText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    textAlign: 'center' as const,
  },
  treatmentCard: {
    backgroundColor: modernColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...modernShadows.small,
  },
  treatmentHeader: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 12,
  },
  treatmentIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: modernColors.gray100,
    borderRadius: 25,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
    position: 'relative' as const,
  },
  treatmentEmoji: {
    fontSize: 24,
  },
  vipBadge: {
    position: 'absolute' as const,
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    backgroundColor: modernColors.accent,
    borderRadius: 9,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: modernColors.surface,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  treatmentCategory: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  treatmentPriceContainer: {
    alignItems: 'flex-end' as const,
  },
  treatmentPrice: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '700' as const,
    color: modernColors.primary,
    marginBottom: 2,
  },
  treatmentDuration: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  treatmentDescription: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray700,
    lineHeight: 22,
    marginBottom: 16,
  },
  treatmentFooter: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  treatmentFeatures: {
    flex: 1,
  },
  treatmentFeature: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
  },
  bookButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.primaryLight + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '600' as const,
    color: modernColors.primary,
    marginRight: 4,
  },
};

export default TreatmentsScreen;