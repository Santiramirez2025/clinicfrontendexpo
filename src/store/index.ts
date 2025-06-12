/**
 * Redux Store Configuration for ClinicSaasRN
 * Medical Clinic Management System
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import your real authSlice
import authSlice from './slices/authSlice';

// Temporary fallback slices for the ones that don't exist yet
const tempPatientSlice = (state = { patients: [], loading: false }) => state;
const tempAppointmentSlice = (state = { appointments: [], loading: false }) => state;
const tempMedicalSlice = (state = { records: [], loading: false }) => state;
const tempSettingsSlice = (state = { theme: 'light', language: 'es' }) => state;

// Persist configuration
const persistConfig = {
  key: 'clinic-saas-rn',
  storage: AsyncStorage,
  whitelist: ['auth', 'settings'], // Only persist auth and settings
  blacklist: ['patients', 'appointments', 'medical'], // Don't persist sensitive medical data
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice, // ← Your real authSlice
  patients: tempPatientSlice,
  appointments: tempAppointmentSlice,
  medical: tempMedicalSlice,
  settings: tempSettingsSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools only in development
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;