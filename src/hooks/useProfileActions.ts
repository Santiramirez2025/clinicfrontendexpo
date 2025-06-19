// ============================================================================
// hooks/useProfileActions.ts - HOOK PARA ACCIONES DE CUENTA (CORREGIDO)
// ============================================================================
import { Alert, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

// Mock de logout action (ajustar según tu slice real)
const logout = () => ({ type: 'LOGOUT' });

// Mock de authAPI (reemplazar por tu API real)
const authAPI = {
  logout: async () => ({ success: true })
};

export const useProfileActions = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás segura de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            try {
              await authAPI.logout();
              dispatch(logout());
            } catch (error) {
              console.error('Logout error:', error);
              // Hacer logout local aunque falle el servidor
              dispatch(logout());
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Eliminar Cuenta',
      'Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmación Final',
              'Escribe "ELIMINAR" para confirmar que deseas eliminar tu cuenta',
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'Proceder', 
                  style: 'destructive',
                  onPress: () => {
                    // En implementación real, llamar a API de eliminación
                    Alert.alert('Función no disponible', 'Contacta con soporte para eliminar tu cuenta');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleOpenPrivacyPolicy = () => {
    Alert.alert(
      'Política de Privacidad',
      '¿Cómo deseas acceder a nuestra política de privacidad?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Abrir en navegador', 
          onPress: () => {
            // En implementación real, abrir URL real
            Linking.openURL('https://bellezaestetica.com/privacy');
          }
        },
        { 
          text: 'Enviar por email', 
          onPress: () => {
            Alert.alert('📧 Enviado', 'Te hemos enviado la política de privacidad a tu email');
          }
        }
      ]
    );
  };

  return {
    handleLogout,
    handleDeleteAccount,
    handleOpenPrivacyPolicy
  };
};