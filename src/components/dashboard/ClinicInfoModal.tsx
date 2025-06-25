import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';

interface ClinicInfoModalProps {
  visible: boolean;
  onClose: () => void;
  clinic?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    services: string[];
  };
}

const ClinicInfoModal = ({ visible, onClose, clinic }: ClinicInfoModalProps) => {
  const defaultClinic = {
    name: 'Belleza Estética Premium',
    address: 'Av. Santa Fe 1234, CABA',
    phone: '+54 11 1234-5678',
    email: 'info@bellezaestetica.com',
    hours: {
      monday: '9:00 - 19:00',
      tuesday: '9:00 - 19:00',
      wednesday: '9:00 - 19:00',
      thursday: '9:00 - 19:00',
      friday: '9:00 - 19:00',
      saturday: '10:00 - 16:00',
      sunday: 'Cerrado'
    },
    services: [
      'Tratamientos Faciales',
      'Drenaje Linfático',
      'Mesoterapia',
      'Radiofrecuencia',
      'Depilación Definitiva'
    ]
  };

  const clinicData = clinic || defaultClinic;

  const handleCall = () => {
    Linking.openURL(`tel:${clinicData.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${clinicData.email}`);
  };

  const handleMaps = () => {
    const address = encodeURIComponent(clinicData.address);
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Información de la Clínica</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={modernColors.gray600} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Nombre y dirección */}
          <View style={styles.section}>
            <View style={styles.clinicHeader}>
              <Text style={styles.clinicName}>{clinicData.name}</Text>
              <View style={styles.addressContainer}>
                <Ionicons name="location" size={16} color={modernColors.primary} />
                <Text style={styles.address}>{clinicData.address}</Text>
              </View>
            </View>
          </View>

          {/* Contacto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contacto</Text>
            
            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
              <View style={styles.contactIcon}>
                <Ionicons name="call" size={20} color={modernColors.primary} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Teléfono</Text>
                <Text style={styles.contactValue}>{clinicData.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={modernColors.gray400} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail" size={20} color={modernColors.primary} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{clinicData.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={modernColors.gray400} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={handleMaps}>
              <View style={styles.contactIcon}>
                <Ionicons name="map" size={20} color={modernColors.primary} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Ubicación</Text>
                <Text style={styles.contactValue}>Ver en Maps</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={modernColors.gray400} />
            </TouchableOpacity>
          </View>

          {/* Horarios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horarios de atención</Text>
            <View style={styles.hoursContainer}>
              {Object.entries(clinicData.hours).map(([day, hours]) => (
                <View key={day} style={styles.hourRow}>
                  <Text style={styles.dayText}>
                    {getDayName(day)}
                  </Text>
                  <Text style={[
                    styles.hoursText,
                    hours === 'Cerrado' && styles.closedText
                  ]}>
                    {hours}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Servicios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nuestros servicios</Text>
            <View style={styles.servicesContainer}>
              {clinicData.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.serviceDot} />
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const getDayName = (day: string): string => {
  const dayNames: { [key: string]: string } = {
    monday: 'Lunes',
    tuesday: 'Martes', 
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return dayNames[day] || day;
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
  title: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600' as const,
    color: modernColors.text,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  clinicHeader: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },
  clinicName: {
    fontSize: modernTypography.fontSizeModern.xl2,
    fontWeight: '700' as const,
    color: modernColors.text,
    textAlign: 'center' as const,
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  address: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: modernTypography.fontSizeModern.lg,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    marginBottom: 8,
    ...modernShadows.small,
  },
  contactIcon: {
    width: 40,
    height: 40,
    backgroundColor: modernColors.primaryLight + '20',
    borderRadius: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
  },
  hoursContainer: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    ...modernShadows.small,
  },
  hourRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray100,
  },
  dayText: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
  },
  hoursText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
  },
  closedText: {
    color: modernColors.error,
    fontWeight: '500' as const,
  },
  servicesContainer: {
    backgroundColor: modernColors.surface,
    borderRadius: 12,
    padding: 16,
    ...modernShadows.small,
  },
  serviceItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
  serviceDot: {
    width: 6,
    height: 6,
    backgroundColor: modernColors.primary,
    borderRadius: 3,
    marginRight: 12,
  },
  serviceText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
  },
};

export default ClinicInfoModal;