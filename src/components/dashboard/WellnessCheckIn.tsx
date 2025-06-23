// components/dashboard/ClinicInfoCard.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing, modernTypography } from '../../styles';

interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  schedule: string;
  isOpen: boolean;
}

interface ClinicInfoCardProps {
  clinicInfo: ClinicInfo;
  onCall: () => void;
  onDirections: () => void;
  isDarkMode?: boolean;
}

export const ClinicInfoCard: React.FC<ClinicInfoCardProps> = ({
  clinicInfo,
  onCall,
  onDirections,
  isDarkMode = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (clinicInfo.isOpen) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [clinicInfo.isOpen]);

  const handleCall = () => {
    const phoneNumber = clinicInfo.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
    onCall();
  };

  const cardColors = isDarkMode
    ? ['#2A2A2A', '#1F1F1F']
    : ['#FFFFFF', '#FAFAFA'];

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <LinearGradient
        colors={cardColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header con estado */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.clinicIcon}>🏥</Text>
            <Text style={[styles.clinicName, isDarkMode && styles.textDark]}>
              {clinicInfo.name}
            </Text>
          </View>
          
          <View style={styles.statusContainer}>
            <Animated.View
              style={[
                styles.statusDot,
                clinicInfo.isOpen ? styles.openDot : styles.closedDot,
                clinicInfo.isOpen && {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            />
            <Text style={[
              styles.statusText,
              clinicInfo.isOpen ? styles.openText : styles.closedText,
            ]}>
              {clinicInfo.isOpen ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </View>

        {/* Información de contacto */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
              {clinicInfo.address}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📞</Text>
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
              {clinicInfo.phone}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🕐</Text>
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>
              {clinicInfo.schedule}
            </Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[modernColors.success, '#00C896']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.actionText}>Llamar</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.directionsButton]}
            onPress={onDirections}
            activeOpacity={0.8}
          >
            <View style={[styles.actionGradient, styles.directionsGradient]}>
              <Text style={styles.actionIcon}>🗺️</Text>
              <Text style={[styles.actionText, styles.directionsText]}>
                Cómo llegar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: modernSpacing.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  containerDark: {
    elevation: 4,
    shadowOpacity: 0.2,
  },
  gradient: {
    padding: modernSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clinicIcon: {
    fontSize: 20,
    marginRight: modernSpacing.sm,
  },
  clinicName: {
    ...modernTypography.headingSmall,
    color: modernColors.gray900,
    fontWeight: '700',
    flex: 1,
  },
  textDark: {
    color: modernColors.gray100,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modernColors.gray50,
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: modernSpacing.xs,
  },
  openDot: {
    backgroundColor: modernColors.success,
  },
  closedDot: {
    backgroundColor: modernColors.error,
  },
  statusText: {
    ...modernTypography.caption,
    fontWeight: '600',
  },
  openText: {
    color: modernColors.success,
  },
  closedText: {
    color: modernColors.error,
  },
  infoSection: {
    marginBottom: modernSpacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: modernSpacing.sm,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: modernSpacing.sm,
    width: 24,
  },
  infoText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray700,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: modernSpacing.sm,
  },
  actionButton: {
    flex: 1,
    borderRadius: modernSpacing.sm,
    overflow: 'hidden',
  },
  callButton: {
    elevation: 2,
    shadowColor: modernColors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  directionsButton: {
    borderWidth: 1,
    borderColor: modernColors.gray200,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modernSpacing.sm,
    gap: modernSpacing.xs,
  },
  directionsGradient: {
    backgroundColor: 'transparent',
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    ...modernTypography.bodySmall,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  directionsText: {
    color: modernColors.gray700,
  },
});