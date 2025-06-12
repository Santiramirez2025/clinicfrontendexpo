import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
  padding?: number;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  onPress,
  style,
  elevation = 2,
  padding = 16,
  headerComponent,
  footerComponent,
}) => {
  const cardStyles = [
    styles.card,
    { 
      elevation,
      shadowOpacity: elevation * 0.05,
      shadowRadius: elevation * 2,
      padding,
    },
    style,
  ];

  const CardContent = () => (
    <View style={cardStyles}>
      {(title || subtitle || headerComponent) && (
        <View style={styles.header}>
          {headerComponent || (
            <>
              {title && (
                <Text style={styles.title}>{title}</Text>
              )}
              {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
            </>
          )}
        </View>
      )}
      
      <View style={styles.content}>
        {children}
      </View>
      
      {footerComponent && (
        <View style={styles.footer}>
          {footerComponent}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default Card;
