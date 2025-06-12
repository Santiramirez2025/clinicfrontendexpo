import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';
import appointmentReducer from './slices/appointmentSlice';
import medicalReducer from './slices/medicalSlice';
import settingsReducer from './slices/settingsSlice';

// Configuration for different slices
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'isAuthenticated'], // Only persist these fields
};

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
};

const patientPersistConfig = {
  key: 'patients',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'error'], // Don't persist loading/error states
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

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);
const persistedPatientReducer = persistReducer(patientPersistConfig, patientReducer);
const persistedAppointmentReducer = persistReducer(appointmentPersistConfig, appointmentReducer);
const persistedMedicalReducer = persistReducer(medicalPersistConfig, medicalReducer);

// Root reducer
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  patients: persistedPatientReducer,
  appointments: persistedAppointmentReducer,
  medical: persistedMedicalReducer,
  settings: persistedSettingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
