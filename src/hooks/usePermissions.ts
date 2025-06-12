import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

type PermissionType = 'camera' | 'storage' | 'location' | 'notifications';

export const usePermissions = () => {
  const [loading, setLoading] = useState(false);

  const requestPermission = async (type: PermissionType): Promise<boolean> => {
    try {
      setLoading(true);
      let result;
      
      switch (type) {
        case 'camera':
          result = await Camera.requestPermissionsAsync();
          break;
        case 'storage':
          result = await MediaLibrary.requestPermissionsAsync();
          break;
        case 'location':
          result = await Location.requestForegroundPermissionsAsync();
          break;
        case 'notifications':
          result = await Notifications.requestPermissionsAsync();
          break;
        default:
          return false;
      }
      
      const isGranted = result.status === 'granted';
      
      if (result.status === 'denied' && result.canAskAgain === false) {
        showPermissionAlert(type);
      }
      
      return isGranted;
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = async (type: PermissionType): Promise<boolean> => {
    try {
      let result;
      
      switch (type) {
        case 'camera':
          result = await Camera.getPermissionsAsync();
          break;
        case 'storage':
          result = await MediaLibrary.getPermissionsAsync();
          break;
        case 'location':
          result = await Location.getForegroundPermissionsAsync();
          break;
        case 'notifications':
          result = await Notifications.getPermissionsAsync();
          break;
        default:
          return false;
      }
      
      return result.status === 'granted';
    } catch (error) {
      console.error(`Error checking ${type} permission:`, error);
      return false;
    }
  };

  const requestPermissionWithCheck = async (type: PermissionType): Promise<boolean> => {
    // Primero verificar si ya lo tenemos
    const hasPermission = await checkPermission(type);
    if (hasPermission) return true;
    
    // Si no, pedirlo
    return await requestPermission(type);
  };

  const showPermissionAlert = (type: PermissionType) => {
    const messages = {
      camera: {
        title: 'Permiso de Cámara',
        message: 'Para tomar fotos de documentos médicos necesitamos acceso a la cámara.',
      },
      storage: {
        title: 'Permiso de Archivos',
        message: 'Para guardar documentos médicos necesitamos acceso a los archivos.',
      },
      location: {
        title: 'Permiso de Ubicación',
        message: 'Para encontrar clínicas cercanas necesitamos tu ubicación.',
      },
      notifications: {
        title: 'Notificaciones',
        message: 'Para recordarte citas médicas necesitamos enviarte notificaciones.',
      },
    };

    const { title, message } = messages[type];

    Alert.alert(
      title,
      message,
      [
        { text: 'Ahora no', style: 'cancel' },
        { text: 'Ir a Ajustes', onPress: () => Linking.openSettings() },
      ]
    );
  };

  // Funciones específicas para casos de uso
  const requestCameraForPhoto = async (): Promise<boolean> => {
    return await requestPermissionWithCheck('camera');
  };

  const requestNotificationsForAppointments = async (): Promise<boolean> => {
    return await requestPermissionWithCheck('notifications');
  };

  const requestLocationForClinics = async (): Promise<boolean> => {
    return await requestPermissionWithCheck('location');
  };

  const requestStorageForDocuments = async (): Promise<boolean> => {
    return await requestPermissionWithCheck('storage');
  };

  return {
    loading,
    // Funciones específicas (recomendadas)
    requestCameraForPhoto,
    requestNotificationsForAppointments,
    requestLocationForClinics,
    requestStorageForDocuments,
    // Funciones generales (si las necesitas)
    requestPermission: requestPermissionWithCheck,
    checkPermission,
  };
};