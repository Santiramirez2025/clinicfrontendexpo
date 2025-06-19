// ============================================================================
// components/VIP/TestimonialsSection.tsx - SECCIÓN DE TESTIMONIOS
// ============================================================================
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TestimonialCard } from './TestimonialCard';
import { vipStyles } from './styles';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  avatar: string;
  comment: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  if (testimonials.length === 0) return null;

  return (
    <View style={vipStyles.section}>
      <Text style={vipStyles.sectionTitle}>Lo que dicen nuestras VIP</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={vipStyles.testimonialsContainer}
        decelerationRate="fast"
        snapToInterval={280}
        snapToAlignment="start"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}
      </ScrollView>
    </View>
  );
};