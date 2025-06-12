/**
 * Storage Service for ClinicSaasRN
 * Handles secure and regular storage operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageService {
  initialize(): Promise<void>;
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
  setSecureItem(key: string, value: string): Promise<void>;
  getSecureItem(key: string): Promise<string | null>;
  removeSecureItem(key: string): Promise<void>;
}

class StorageServiceImpl implements StorageService {
  private isInitialized = false;

  async initialize(): Promise<void> {
    try {
      // Test AsyncStorage availability
      await AsyncStorage.getItem('test');
      this.isInitialized = true;
      console.log('📦 Storage service initialized');
    } catch (error) {
      console.error('❌ Storage service initialization failed:', error);
      throw error;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`❌ Failed to set item ${key}:`, error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`❌ Failed to get item ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`❌ Failed to remove item ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('❌ Failed to clear storage:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('❌ Failed to get all keys:', error);
      return [];
    }
  }

  // For sensitive data - in production, use react-native-keychain
  async setSecureItem(key: string, value: string): Promise<void> {
    try {
      // In production, replace with react-native-keychain
      const secureKey = `secure_${key}`;
      await AsyncStorage.setItem(secureKey, value);
    } catch (error) {
      console.error(`❌ Failed to set secure item ${key}:`, error);
      throw error;
    }
  }

  async getSecureItem(key: string): Promise<string | null> {
    try {
      // In production, replace with react-native-keychain
      const secureKey = `secure_${key}`;
      return await AsyncStorage.getItem(secureKey);
    } catch (error) {
      console.error(`❌ Failed to get secure item ${key}:`, error);
      return null;
    }
  }

  async removeSecureItem(key: string): Promise<void> {
    try {
      // In production, replace with react-native-keychain
      const secureKey = `secure_${key}`;
      await AsyncStorage.removeItem(secureKey);
    } catch (error) {
      console.error(`❌ Failed to remove secure item ${key}:`, error);
      throw error;
    }
  }

  // Helper methods for common operations
  async setObject(key: string, value: object): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      console.error(`❌ Failed to set object ${key}:`, error);
      throw error;
    }
  }

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`❌ Failed to get object ${key}:`, error);
      return null;
    }
  }

  // Medical data specific helpers
  async setPatientCache(patientId: string, data: any): Promise<void> {
    await this.setObject(`patient_cache_${patientId}`, data);
  }

  async getPatientCache(patientId: string): Promise<any> {
    return await this.getObject(`patient_cache_${patientId}`);
  }

  async setAppointmentCache(appointmentId: string, data: any): Promise<void> {
    await this.setObject(`appointment_cache_${appointmentId}`, data);
  }

  async getAppointmentCache(appointmentId: string): Promise<any> {
    return await this.getObject(`appointment_cache_${appointmentId}`);
  }

  async clearMedicalCache(): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      const medicalKeys = keys.filter(key => 
        key.startsWith('patient_cache_') || 
        key.startsWith('appointment_cache_') ||
        key.startsWith('medical_cache_')
      );
      
      await Promise.all(medicalKeys.map(key => this.removeItem(key)));
      console.log(`🧹 Cleared ${medicalKeys.length} medical cache entries`);
    } catch (error) {
      console.error('❌ Failed to clear medical cache:', error);
    }
  }
}

export const storageService = new StorageServiceImpl();