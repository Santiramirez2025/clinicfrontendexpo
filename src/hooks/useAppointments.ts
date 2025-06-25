import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { appointmentAPI, handleApiError } from '../services/api';

// ============================================================================
// DEBUG HOOK PARA APPOINTMENTS - PASO A PASO ✅
// ============================================================================

export const useBookAppointmentDebug = (navigation: any) => {
  const [submitting, setSubmitting] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addDebugLog = useCallback((message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log('🔍 DEBUG:', logMessage);
    setDebugLogs(prev => [...prev, logMessage]);
  }, []);

  const submitBookingDebug = useCallback(async (bookingData: any): Promise<boolean> => {
    try {
      setSubmitting(true);
      addDebugLog('🚀 INICIANDO PROCESO DE RESERVA');
      
      // ✅ STEP 1: Validar datos de entrada
      addDebugLog(`📋 Datos recibidos: ${JSON.stringify(bookingData, null, 2)}`);
      
      if (!bookingData.treatmentId || !bookingData.date || !bookingData.time) {
        addDebugLog('❌ ERROR: Datos incompletos');
        throw new Error('Datos incompletos');
      }
      
      // ✅ STEP 2: Preparar payload para el backend
      const payload = {
        treatmentId: bookingData.treatmentId,
        date: bookingData.date,
        time: bookingData.time,
        ...(bookingData.professionalId && { professionalId: bookingData.professionalId }),
        ...(bookingData.notes && { notes: bookingData.notes.trim() }),
      };
      
      addDebugLog(`📤 Payload preparado: ${JSON.stringify(payload, null, 2)}`);
      
      // ✅ STEP 3: Verificar token de autorización
      const token = await import('expo-secure-store').then(store => 
        store.getItemAsync('accessToken')
      );
      
      if (!token) {
        addDebugLog('❌ ERROR: No hay token de autorización');
        throw new Error('No hay token de autorización');
      }
      
      addDebugLog('✅ Token encontrado');
      
      // ✅ STEP 4: Realizar petición HTTP directa para debug
      const baseURL = 'http://192.168.1.174:3000'; // Tu IP del backend
      const endpoint = `${baseURL}/api/appointments`;
      
      addDebugLog(`🌐 Enviando a: ${endpoint}`);
      
      const fetchResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      addDebugLog(`📡 Status de respuesta: ${fetchResponse.status} ${fetchResponse.statusText}`);
      
      // ✅ STEP 5: Procesar respuesta
      let responseData;
      const contentType = fetchResponse.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await fetchResponse.json();
      } else {
        const textResponse = await fetchResponse.text();
        addDebugLog(`📄 Respuesta no JSON: ${textResponse}`);
        throw new Error(`Respuesta inesperada del servidor: ${textResponse}`);
      }
      
      addDebugLog(`📥 Respuesta del servidor: ${JSON.stringify(responseData, null, 2)}`);
      
      // ✅ STEP 6: Verificar éxito
      if (fetchResponse.ok && responseData.success) {
        addDebugLog('✅ RESERVA CREADA EXITOSAMENTE');
        
        Alert.alert(
          '¡Cita agendada! 🎉',
          'Tu cita ha sido agendada exitosamente.',
          [
            {
              text: 'Ver mis citas',
              onPress: () => {
                addDebugLog('🧭 Navegando a Appointments');
                navigation.navigate('Appointments');
              }
            },
            {
              text: 'Ir al inicio',
              onPress: () => {
                addDebugLog('🧭 Navegando a Dashboard');
                navigation.navigate('Dashboard');
              }
            }
          ]
        );
        
        return true;
      } else {
        addDebugLog(`❌ ERROR DEL SERVIDOR: ${JSON.stringify(responseData.error || responseData)}`);
        throw new Error(responseData.error?.message || responseData.message || 'Error del servidor');
      }
      
    } catch (error: any) {
      addDebugLog(`💥 EXCEPCIÓN CAPTURADA: ${error.message}`);
      addDebugLog(`📊 Stack trace: ${error.stack}`);
      
      Alert.alert(
        'Error de Debug',
        `No se pudo agendar la cita:\n${error.message}\n\nRevisa la consola para más detalles.`,
        [{ text: 'OK' }]
      );
      
      return false;
    } finally {
      setSubmitting(false);
      addDebugLog('🏁 PROCESO FINALIZADO');
    }
  }, [navigation, addDebugLog]);

  // ✅ FUNCIÓN PARA EXPORTAR LOGS
  const exportDebugLogs = useCallback(() => {
    const logsText = debugLogs.join('\n');
    console.log('📋 LOGS COMPLETOS:');
    console.log(logsText);
    return logsText;
  }, [debugLogs]);

  // ✅ FUNCIÓN PARA LIMPIAR LOGS
  const clearDebugLogs = useCallback(() => {
    setDebugLogs([]);
    addDebugLog('🧹 Logs limpiados');
  }, [addDebugLog]);

  return {
    submitBookingDebug,
    submitting,
    debugLogs,
    exportDebugLogs,
    clearDebugLogs,
  };
};

// ============================================================================
// HOOK PARA VERIFICAR CONEXIÓN CON EL BACKEND ✅
// ============================================================================

export const useBackendConnection = () => {
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');

  const testConnection = useCallback(async () => {
    try {
      setTesting(true);
      console.log('🔌 Probando conexión con el backend...');
      
      const baseURL = 'http://192.168.1.174:3000';
      const healthEndpoint = `${baseURL}/api/health`; // Endpoint de salud
      
      // Test 1: Endpoint de salud (sin autenticación)
      const healthResponse = await fetch(healthEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('🏥 Health check:', healthResponse.status, healthResponse.statusText);
      
      // Test 2: Endpoint de appointments (con autenticación)
      const token = await import('expo-secure-store').then(store => 
        store.getItemAsync('accessToken')
      );
      
      if (token) {
        const appointmentsResponse = await fetch(`${baseURL}/api/appointments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        console.log('📅 Appointments endpoint:', appointmentsResponse.status, appointmentsResponse.statusText);
        
        if (appointmentsResponse.ok) {
          setConnectionStatus('connected');
          Alert.alert('✅ Conexión OK', 'El backend está funcionando correctamente');
        } else {
          setConnectionStatus('error');
          Alert.alert('⚠️ Error de Auth', 'Backend conectado pero hay problemas de autenticación');
        }
      } else {
        Alert.alert('❌ Sin Token', 'No hay token de autenticación disponible');
      }
      
    } catch (error: any) {
      console.error('❌ Error de conexión:', error);
      setConnectionStatus('error');
      Alert.alert('❌ Error de Conexión', `No se puede conectar al backend:\n${error.message}`);
    } finally {
      setTesting(false);
    }
  }, []);

  return {
    testConnection,
    testing,
    connectionStatus,
  };
};

// ============================================================================
// HOOK PARA MONITOREAR RESPUESTAS DEL API ✅
// ============================================================================

export const useAPIMonitor = () => {
  const [apiCalls, setApiCalls] = useState<any[]>([]);

  const logAPICall = useCallback((method: string, url: string, payload?: any, response?: any, error?: any) => {
    const call = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      method,
      url,
      payload,
      response,
      error,
      status: error ? 'error' : 'success',
    };
    
    setApiCalls(prev => [call, ...prev.slice(0, 9)]); // Mantener solo las últimas 10
    
    console.log('📊 API Call Logged:', call);
  }, []);

  const clearAPILogs = useCallback(() => {
    setApiCalls([]);
  }, []);

  return {
    apiCalls,
    logAPICall,
    clearAPILogs,
  };
};

// ============================================================================
// WRAPPER PARA appointmentAPI CON LOGGING ✅
// ============================================================================

export const createAppointmentWithLogging = async (bookingData: any, logFunction: Function) => {
  try {
    logFunction('POST', '/api/appointments', bookingData);
    
    const response = await appointmentAPI.create(bookingData);
    
    logFunction('POST', '/api/appointments', bookingData, response);
    
    return response;
  } catch (error) {
    logFunction('POST', '/api/appointments', bookingData, null, error);
    throw error;
  }
};