// ============================================================================
// components/VIP/TestimonialCard.tsx - COMPONENTE TESTIMONIAL CARD
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { vipStyles } from './styles';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  avatar: string;
  comment: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <View style={vipStyles.testimonialCard}>
      <View style={vipStyles.testimonialHeader}>
        <View style={vipStyles.testimonialAvatar}>
          <Text style={vipStyles.testimonialAvatarText}>{testimonial.avatar}</Text>
        </View>
        <View style={vipStyles.testimonialInfo}>
          <Text style={vipStyles.testimonialName}>{testimonial.name}</Text>
          <Text style={vipStyles.testimonialAge}>{testimonial.age} años</Text>
        </View>
        <View style={vipStyles.testimonialRating}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Text key={index} style={vipStyles.star}>⭐</Text>
          ))}
        </View>
      </View>
      
      <Text style={vipStyles.testimonialComment}>"{testimonial.comment}"</Text>
    </View>
  );
};