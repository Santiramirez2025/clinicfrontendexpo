// ============================================================================
// components/dashboard/WellnessCheckInCard.tsx
// ============================================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ModernCard } from './ModernCard';
import { dashboardStyles } from './styles';

export interface WellnessCheckIn {
  mood: 'great' | 'good' | 'okay' | 'tired' | 'stressed';
  energy: number; // 1-5
  skinFeeling: 'amazing' | 'good' | 'normal' | 'needs-care';
}

export interface WellnessCheckInCardProps {
  onCheckIn: (data: WellnessCheckIn) => void;
  todayCompleted: boolean;
}

export const WellnessCheckInCard: React.FC<WellnessCheckInCardProps> = ({ 
  onCheckIn, 
  todayCompleted 
}) => {
  const [selectedMood, setSelectedMood] = useState<WellnessCheckIn['mood'] | null>(null);

  const moods = [
    { key: 'great', emoji: '✨', label: 'Radiante' },
    { key: 'good', emoji: '😊', label: 'Bien' },
    { key: 'okay', emoji: '😌', label: 'Normal' },
    { key: 'tired', emoji: '😴', label: 'Cansada' },
    { key: 'stressed', emoji: '😰', label: 'Estresada' }
  ];

  const handleMoodSelect = (mood: WellnessCheckIn['mood']) => {
    setSelectedMood(mood);
    // Auto-submit con valores por defecto
    onCheckIn({
      mood,
      energy: 4,
      skinFeeling: 'good'
    });
  };

  if (todayCompleted) {
    return (
      <ModernCard>
        <View style={dashboardStyles.wellnessCompleted}>
          <Text style={dashboardStyles.wellnessCompletedIcon}>✅</Text>
          <View style={dashboardStyles.wellnessCompletedContent}>
            <Text style={dashboardStyles.wellnessCompletedTitle}>Check-in completado</Text>
            <Text style={dashboardStyles.wellnessCompletedText}>
              ¡Gracias por compartir cómo te sientes hoy!
            </Text>
          </View>
        </View>
      </ModernCard>
    );
  }

  return (
    <ModernCard>
      <View style={dashboardStyles.wellnessHeader}>
        <Text style={dashboardStyles.wellnessIcon}>🌸</Text>
        <View style={dashboardStyles.wellnessHeaderContent}>
          <Text style={dashboardStyles.wellnessTitle}>Check-in de bienestar</Text>
          <Text style={dashboardStyles.wellnessSubtitle}>¿Cómo te sientes hoy?</Text>
        </View>
      </View>

      <View style={dashboardStyles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.key}
            style={[
              dashboardStyles.moodButton,
              selectedMood === mood.key && dashboardStyles.moodButtonSelected
            ]}
            onPress={() => handleMoodSelect(mood.key as WellnessCheckIn['mood'])}
            activeOpacity={0.7}
          >
            <Text style={dashboardStyles.moodEmoji}>{mood.emoji}</Text>
            <Text style={dashboardStyles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ModernCard>
  );
};