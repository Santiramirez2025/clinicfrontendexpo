/**
 * Permission Service for ClinicSaasRN
 * Handles device permissions for medical app functionality
 */

import { Platform, Alert, Linking } from 'react-native';
import { PERMISSION_TYPES } from '../utils/constants';

interface PermissionResult {
  camera: boolean;
  storage: boolean;
  notifications: boolean;
  microphone: boolean;
  location: boolean;
}

interface PermissionService {
  requestAllPermissions(): Promise<PermissionResult>;
  requestCameraPermission(): Promise<boolean>;
  requestStoragePermission(): Promise<boolean>;
  requestNotificationPermission(): Promise<boolean>;
  requestMicrophonePermission(): Promise<boolean>;
  requestLocationPermission(): Promise<boolean>;
  openSettings(): void;
}

class PermissionServiceImpl implements PermissionService {
  
  async requestAllPermissions(): Promise<PermissionResult> {
    console.log('🔐 Requesting all permissions...');
    
    const results: PermissionResult = {
      camera: false,
      storage: false,
      notifications: false,
      microphone: false,
      location: false,
    };

    try {
      // Request permissions sequentially to avoid overwhelming the user
      results.notifications = await this.requestNotificationPermission();
      results.camera = await this.requestCameraPermission();
      results.storage = await this.requestStoragePermission();
      
      // Optional permissions - don't block app if denied
      try {
        results.microphone = await this.requestMicrophonePermission();
        results.location = await this.requestLocationPermission();
      } catch (error) {
        console.warn('⚠️ Optional permissions failed:', error);
      }

      console.log('🔐 Permission results:', results);
      return results;
    } catch (error) {
      console.error('❌ Permission request failed:', error);
      return results;
    }
  }

  async requestCameraPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        // iOS camera permission - would use react-native-permissions in production
        return await this.mockPermissionRequest('Camera', 
          'La aplicación necesita acceso a la cámara para tomar fotos de documentos médicos y recetas.'
        );
      } else {
        // Android camera permission
        return await this.mockPermissionRequest('Camera',
          'Permitir acceso a la cámara para escanear documentos médicos.'
        );
      }
    } catch (error) {
      console.error('❌ Camera permission failed:', error);
      return false;
    }
  }

  async requestStoragePermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        // iOS doesn't need explicit storage permission for app documents
        return true;
      } else {
        // Android storage permission
        return await this.mockPermissionRequest('Storage',
          'Permitir acceso al almacenamiento para guardar expedientes médicos y documentos.'
        );
      }
    } catch (error) {
      console.error('❌ Storage permission failed:', error);
      return false;
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    try {
      return await this.mockPermissionRequest('Notifications',
        'Permitir notificaciones para recibir recordatorios de citas y alertas médicas importantes.'
      );
    } catch (error) {
      console.error('❌ Notification permission failed:', error);
      return false;
    }
  }

  async requestMicrophonePermission(): Promise<boolean> {
    try {
      return await this.mockPermissionRequest('Microphone',
        'Permitir acceso al micrófono para notas de voz en expedientes médicos (opcional).'
      );
    } catch (error) {
      console.error('❌ Microphone permission failed:', error);
      return false;
    }
  }

  async requestLocationPermission(): Promise<boolean> {
    try {
      return await this.mockPermissionRequest('Location',
        'Permitir acceso a la ubicación para servicios de emergencia y geolocalización de consultas (opcional).'
      );
    } catch (error) {
      console.error('❌ Location permission failed:', error);
      return false;
    }
  }

  openSettings(): void {
    Alert.alert(
      'Permisos Requeridos',
      'Para usar todas las funciones médicas, habilita los permisos en Configuración.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Abrir Configuración', 
          onPress: () => Linking.openSettings()
        }
      ]
    );
  }

  // Mock permission request for development/testing
  private async mockPermissionRequest(permissionType: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      Alert.alert(
        `Permiso de ${permissionType}`,
        message,
        [
          {
            text: 'Denegar',
            style: 'cancel',
            onPress: () => {
              console.log(`❌ ${permissionType} permission denied`);
              resolve(false);
            }
          },
          {
            text: 'Permitir',
            onPress: () => {
              console.log(`✅ ${permissionType} permission granted`);
              resolve(true);
            }
          }
        ],
        { cancelable: false }
      );
    });
  }

  // Helper method to check if critical permissions are granted
  checkCriticalPermissions(permissions: PermissionResult): boolean {
    const critical = permissions.camera && permissions.storage && permissions.notifications;
    
    if (!critical) {
      Alert.alert(
        'Permisos Insuficientes',
        'La aplicación médica requiere permisos de cámara, almacenamiento y notificaciones para funcionar correctamente.',
        [
          { text: 'Más tarde', style: 'cancel' },
          { text: 'Configurar', onPress: this.openSettings }
        ]
      );
    }
    
    return critical;
  }

  // Production implementation would use react-native-permissions:
  /*
  import {
    PERMISSIONS,
    RESULTS,
    request,
    requestMultiple,
    check,
    openSettings,
  } from 'react-native-permissions';

  async requestCameraPermission(): Promise<boolean> {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CAMERA 
      : PERMISSIONS.ANDROID.CAMERA;
    
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }
  */
}

export const permissionService = new PermissionServiceImpl();