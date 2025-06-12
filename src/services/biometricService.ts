import { Platform, Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';

export interface BiometricType {
  available: boolean;
  biometryType: string | null;
  error?: string;
}

export interface BiometricCredentials {
  username: string;
  password: string;
  service: string;
}

class BiometricService {
  private readonly SERVICE_NAME = 'ClinicSaasRN';
  private readonly ACCESS_CONTROL = Keychain.ACCESS_CONTROL.BIOMETRY_ANY;

  // Check if biometric authentication is available
  async checkBiometricAvailability(): Promise<BiometricType> {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      
      if (biometryType) {
        return {
          available: true,
          biometryType: biometryType,
        };
      } else {
        return {
          available: false,
          biometryType: null,
          error: 'Biometric authentication not available on this device',
        };
      }
    } catch (error) {
      console.error('Biometric availability check error:', error);
      return {
        available: false,
        biometryType: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Store credentials with biometric protection
  async storeBiometricCredentials(
    username: string, 
    password: string,
    service: string = this.SERVICE_NAME
  ): Promise<boolean> {
    try {
      const biometricAvailability = await this.checkBiometricAvailability();
      
      if (!biometricAvailability.available) {
        throw new Error('Biometric authentication not available');
      }

      const options: Keychain.Options = {
        service,
        accessControl: this.ACCESS_CONTROL,
        authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
        accessGroup: undefined, // iOS only
        showModal: true,
        kLocalizedFallbackTitle: 'Usar Código de Acceso',
      };

      if (Platform.OS === 'ios') {
        options.touchIDAuthenticationPrompt = 'Autenticar para guardar credenciales';
      }

      const result = await Keychain.setInternetCredentials(
        service,
        username,
        password,
        options
      );

      return result !== false;
    } catch (error) {
      console.error('Store biometric credentials error:', error);
      this.handleBiometricError(error);
      return false;
    }
  }

  // Retrieve credentials with biometric authentication
  async getBiometricCredentials(service: string = this.SERVICE_NAME): Promise<BiometricCredentials | null> {
    try {
      const options: Keychain.Options = {
        service,
        authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
        showModal: true,
        kLocalizedFallbackTitle: 'Usar Código de Acceso',
      };

      if (Platform.OS === 'ios') {
        options.touchIDAuthenticationPrompt = 'Autenticar para acceder';
      }

      const credentials = await Keychain.getInternetCredentials(service, options);

      if (credentials && credentials.username && credentials.password) {
        return {
          username: credentials.username,
          password: credentials.password,
          service: credentials.service || service,
        };
      }

      return null;
    } catch (error) {
      console.error('Get biometric credentials error:', error);
      this.handleBiometricError(error);
      return null;
    }
  }

  // Remove stored credentials
  async removeBiometricCredentials(service: string = this.SERVICE_NAME): Promise<boolean> {
    try {
      const result = await Keychain.resetInternetCredentials(service);
      return result;
    } catch (error) {
      console.error('Remove biometric credentials error:', error);
      return false;
    }
  }

  // Check if credentials are stored
  async hasStoredCredentials(service: string = this.SERVICE_NAME): Promise<boolean> {
    try {
      const credentials = await Keychain.getInternetCredentials(service);
      return !!(credentials && credentials.username);
    } catch (error) {
      console.error('Check stored credentials error:', error);
      return false;
    }
  }

  // Simple biometric authentication (without storing credentials)
  async authenticateWithBiometrics(
    reason: string = 'Confirma tu identidad'
  ): Promise<boolean> {
    try {
      const biometricAvailability = await this.checkBiometricAvailability();
      
      if (!biometricAvailability.available) {
        Alert.alert(
          'Autenticación Biométrica No Disponible',
          'Tu dispositivo no soporta autenticación biométrica o no está configurada.'
        );
        return false;
      }

      // For simple authentication, we can use a dummy credential check
      const tempService = `${this.SERVICE_NAME}_temp_auth`;
      
      // Store a temporary credential
      await Keychain.setInternetCredentials(
        tempService,
        'temp_user',
        'temp_pass',
        {
          accessControl: this.ACCESS_CONTROL,
          authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
          showModal: true,
          kLocalizedFallbackTitle: 'Usar Código de Acceso',
        }
      );

      // Try to retrieve it (this will trigger biometric prompt)
      const result = await Keychain.getInternetCredentials(tempService);
      
      // Clean up temp credential
      await Keychain.resetInternetCredentials(tempService);
      
      return !!(result && result.username);
    } catch (error) {
      console.error('Biometric authentication error:', error);
      this.handleBiometricError(error);
      return false;
    }
  }

  // Handle biometric authentication errors
  private handleBiometricError(error: any): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('UserCancel') || errorMessage.includes('UserFallback')) {
      // User cancelled or chose fallback - don't show error
      return;
    }
    
    if (errorMessage.includes('BiometryNotAvailable')) {
      Alert.alert(
        'Autenticación Biométrica No Disponible',
        'Tu dispositivo no soporta autenticación biométrica.'
      );
    } else if (errorMessage.includes('BiometryNotEnrolled')) {
      Alert.alert(
        'Autenticación Biométrica No Configurada',
        'Configura Touch ID o Face ID en la configuración de tu dispositivo.'
      );
    } else if (errorMessage.includes('BiometryLockout')) {
      Alert.alert(
        'Autenticación Biométrica Bloqueada',
        'Demasiados intentos fallidos. Usa tu código de acceso.'
      );
    } else {
      Alert.alert(
        'Error de Autenticación',
        'Ocurrió un error durante la autenticación biométrica. Inténtalo de nuevo.'
      );
    }
  }

  // Get user-friendly biometric type name
  getBiometricTypeName(biometryType: string | null): string {
    switch (biometryType) {
      case Keychain.BIOMETRY_TYPE.TOUCH_ID:
        return 'Touch ID';
      case Keychain.BIOMETRY_TYPE.FACE_ID:
        return 'Face ID';
      case Keychain.BIOMETRY_TYPE.FINGERPRINT:
        return 'Huella Dactilar';
      case Keychain.BIOMETRY_TYPE.FACE:
        return 'Reconocimiento Facial';
      case Keychain.BIOMETRY_TYPE.IRIS:
        return 'Reconocimiento de Iris';
      default:
        return 'Autenticación Biométrica';
    }
  }

  // Setup biometric authentication for user
  async setupBiometricAuth(username: string, password: string): Promise<boolean> {
    try {
      const biometricAvailability = await this.checkBiometricAvailability();
      
      if (!biometricAvailability.available) {
        Alert.alert(
          'Autenticación Biométrica No Disponible',
          biometricAvailability.error || 'Tu dispositivo no soporta autenticación biométrica.'
        );
        return false;
      }

      const biometricName = this.getBiometricTypeName(biometricAvailability.biometryType);
      
      return new Promise((resolve) => {
        Alert.alert(
          'Configurar Autenticación Biométrica',
          `¿Deseas usar ${biometricName} para iniciar sesión rápidamente?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'Configurar',
              onPress: async () => {
                const success = await this.storeBiometricCredentials(username, password);
                resolve(success);
              },
            },
          ]
        );
      });
    } catch (error) {
      console.error('Setup biometric auth error:', error);
      return false;
    }
  }
}

export const biometricService = new BiometricService();
