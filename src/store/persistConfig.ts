// 1. PRIMERO: Actualizar persistConfig.ts para usar solo slices existentes
// src/store/persistConfig.ts
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Comentar temporalmente los que no existen
// import patientReducer from './slices/patientSlice';
// import appointmentReducer from './slices/appointmentSlice';
// import medicalReducer from './slices/medicalSlice';
// import settingsReducer from './slices/settingsSlice';

// Configuration for auth (el único que necesitamos por ahora)
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'isAuthenticated'], // Solo persistir estos campos
};

// Configuraciones para futuros slices (comentadas por ahora)
/*
const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
};

const patientPersistConfig = {
  key: 'patients',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'error'],
};

const appointmentPersistConfig = {
  key: 'appointments',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'error'],
};

const medicalPersistConfig = {
  key: 'medical',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'error'],
};
*/

// Create persisted reducers - solo auth por ahora
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Root reducer - solo con auth
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  // Agregar otros cuando los crees:
  // patients: persistedPatientReducer,
  // appointments: persistedAppointmentReducer,
  // medical: persistedMedicalReducer,
  // settings: persistedSettingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;