import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface SecurityScreenProps {
  navigation: any;
}

const SecurityScreen: React.FC<SecurityScreenProps> = ({ navigation }) => {
  const [security, setSecurity] = useState({
    biometric: true,
    autoLock: true,
    twoFactor: false,
    dataEncryption: true,
    sessionTimeout: true,
    loginAlerts: true,
  });

  const [autoLockTime, setAutoLockTime] = useState('5 minutos');

  const handleToggle = (key: keyof typeof security) => {
    if (key === 'biometric' && security.biometric) {
      Alert.alert(
        'Desactivar Biometría',
        'Esto reducirá la seguridad de tu cuenta. ¿Continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Desactivar',
            style: 'destructive',
            onPress: () => setSecurity(prev => ({ ...prev, [key]: !prev[key] })),
          },
        ]
      );
      return;
    }

    if (key === 'twoFactor' && !security.twoFactor) {
      Alert.alert(
        'Activar 2FA',
        'Se enviará un código de verificación a tu email para configurar la autenticación de dos factores.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Continuar',
            onPress: () => {
              setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
              Alert.alert('Éxito', 'Autenticación de dos factores activada');
            },
          },
        ]
      );
      return;
    }

    setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Cambiar Contraseña',
      'Se enviará un enlace de restablecimiento a tu email.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar',
          onPress: () => Alert.alert('Enviado', 'Revisa tu email para continuar'),
        },
      ]
    );
  };

  const handleAutoLockTime = () => {
    Alert.alert(
      'Tiempo de Bloqueo Automático',
      'Selecciona el tiempo de inactividad antes del bloqueo',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: '1 minuto', onPress: () => setAutoLockTime('1 minuto') },
        { text: '5 minutos', onPress: () => setAutoLockTime('5 minutos') },
        { text: '15 minutos', onPress: () => setAutoLockTime('15 minutos') },
        { text: '30 minutos', onPress: () => setAutoLockTime('30 minutos') },
      ]
    );
  };

  const handleViewSessions = () => {
    Alert.alert(
      'Sesiones Activas',
      'iPhone 16 Pro - Madrid, España (Actual)\niPad Air - Barcelona, España (Hace 2 días)',
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: 'Cerrar Otras Sesiones',
          style: 'destructive',
          onPress: () => Alert.alert('Éxito', 'Todas las otras sesiones han sido cerradas'),
        },
      ]
    );
  };

  const renderSecurityItem = (
    title: string,
    subtitle: string,
    key: keyof typeof security,
    icon: string,
    hasSwitch: boolean = true
  ) => (
    <View style={styles.securityItem}>
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={20} color="#007AFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
        {hasSwitch && (
          <Switch
            value={security[key]}
            onValueChange={() => handleToggle(key)}
            trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
            thumbColor="#FFFFFF"
          />
        )}
      </View>
    </View>
  );

  const renderActionItem = (
    title: string,
    subtitle: string,
    icon: string,
    onPress: () => void,
    rightText?: string,
    dangerous?: boolean
  ) => (
    <TouchableOpacity
      style={styles.actionItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            size={20}
            color={dangerous ? '#FF3B30' : '#007AFF'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.itemTitle, dangerous && styles.dangerousText]}>
            {title}
          </Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
        {rightText ? (
          <Text style={styles.rightText}>{rightText}</Text>
        ) : (
          <Icon name="chevron-forward" size={16} color="#C7C7CC" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguridad</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Authentication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autenticación</Text>
          {renderSecurityItem(
            'Autenticación Biométrica',
            'Face ID / Touch ID para acceso rápido',
            'biometric',
            'finger-print-outline'
          )}
          {renderSecurityItem(
            'Autenticación de Dos Factores',
            'Capa adicional de seguridad',
            'twoFactor',
            'shield-checkmark-outline'
          )}
          {renderActionItem(
            'Cambiar Contraseña',
            'Actualizar tu contraseña actual',
            'key-outline',
            handleChangePassword
          )}
        </View>

        {/* Device Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad del Dispositivo</Text>
          {renderSecurityItem(
            'Bloqueo Automático',
            'Bloquear app después de inactividad',
            'autoLock',
            'lock-closed-outline'
          )}
          {renderActionItem(
            'Tiempo de Bloqueo',
            'Configurar tiempo de inactividad',
            'time-outline',
            handleAutoLockTime,
            autoLockTime
          )}
          {renderSecurityItem(
            'Timeout de Sesión',
            'Cerrar sesión automáticamente',
            'sessionTimeout',
            'log-out-outline'
          )}
        </View>

        {/* Data Protection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Protección de Datos</Text>
          {renderSecurityItem(
            'Encriptación de Datos',
            'Proteger información médica sensible',
            'dataEncryption',
            'lock-closed-outline'
          )}
          {renderSecurityItem(
            'Alertas de Inicio de Sesión',
            'Notificar accesos a tu cuenta',
            'loginAlerts',
            'notifications-outline'
          )}
          {renderActionItem(
            'Política de Privacidad',
            'Revisar términos y condiciones',
            'document-text-outline',
            () => Alert.alert('Próximamente', 'Funcionalidad en desarrollo')
          )}
        </View>

        {/* Session Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestión de Sesiones</Text>
          {renderActionItem(
            'Sesiones Activas',
            'Ver y gestionar dispositivos conectados',
            'phone-portrait-outline',
            handleViewSessions,
            '2 dispositivos'
          )}
          {renderActionItem(
            'Cerrar Todas las Sesiones',
            'Desconectar de todos los dispositivos',
            'exit-outline',
            () => Alert.alert(
              'Cerrar Sesiones',
              'Esto cerrará sesión en todos los dispositivos. ¿Continuar?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Cerrar Todo',
                  style: 'destructive',
                  onPress: () => Alert.alert('Éxito', 'Todas las sesiones han sido cerradas'),
                },
              ]
            ),
            undefined,
            true
          )}
        </View>

        {/* Emergency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergencia</Text>
          {renderActionItem(
            'Eliminar Datos Locales',
            'Borrar toda la información del dispositivo',
            'trash-outline',
            () => Alert.alert(
              'Eliminar Datos',
              'ADVERTENCIA: Esta acción eliminará permanentemente todos los datos locales. ¿Continuar?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Eliminar',
                  style: 'destructive',
                  onPress: () => Alert.alert('Datos eliminados', 'La información local ha sido borrada'),
                },
              ]
            ),
            undefined,
            true
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tu seguridad es nuestra prioridad. Todas las comunicaciones están 
            encriptadas y cumplimos con estándares médicos internacionales.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  securityItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  actionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  rightText: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 8,
  },
  dangerousText: {
    color: '#FF3B30',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SecurityScreen;
