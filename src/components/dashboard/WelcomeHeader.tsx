import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography } from '../../styles';
import ClinicInfoModal from './ClinicInfoModal';

interface WelcomeHeaderProps {
  user?: any;
  onProfilePress: () => void;
  selectedClinic: string;
  onChangeClinic?: () => void; // Ya no se usa, pero mantenemos compatibilidad
}

const WelcomeHeader = ({ user, onProfilePress, selectedClinic }: WelcomeHeaderProps) => {
  const [showClinicModal, setShowClinicModal] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>
              {user?.firstName || 'Usuario'} ✨
            </Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>
                {(user?.firstName?.[0] || 'U').toUpperCase()}
              </Text>
            </View>
            {user?.vipStatus && (
              <View style={styles.vipBadge}>
                <Ionicons name="diamond" size={10} color={modernColors.white} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Selector de clínica convertido en botón de info */}
        <TouchableOpacity 
          style={styles.clinicSelector} 
          onPress={() => setShowClinicModal(true)}
        >
          <View style={styles.clinicInfo}>
            <Ionicons name="business" size={16} color={modernColors.primary} />
            <Text style={styles.clinicName}>{selectedClinic}</Text>
          </View>
          <Ionicons name="information-circle" size={20} color={modernColors.gray400} />
        </TouchableOpacity>
      </View>

      {/* Modal de información de la clínica */}
      <ClinicInfoModal
        visible={showClinicModal}
        onClose={() => setShowClinicModal(false)}
      />
    </>
  );
};

const styles = {
  container: {
    backgroundColor: modernColors.surface,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 16,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 4,
  },
  userName: {
    fontSize: modernTypography.fontSizeModern.xl2,
    fontWeight: '700' as const,
    color: modernColors.text,
  },
  profileButton: {
    position: 'relative' as const,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    backgroundColor: modernColors.primary,
    borderRadius: 22,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  profileInitial: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.white,
  },
  vipBadge: {
    position: 'absolute' as const,
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    backgroundColor: modernColors.accent,
    borderRadius: 9,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: modernColors.surface,
  },
  clinicSelector: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.gray50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  clinicInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  clinicName: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
    marginLeft: 8,
  },
};

export default WelcomeHeader;