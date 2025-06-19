// src/utils/logger.ts
export const logger = {
    error: (message: string, error?: any) => {
      console.error(`🔴 ERROR: ${message}`, error);
    },
    warn: (message: string, data?: any) => {
      console.warn(`⚠️ WARNING: ${message}`, data);
    },
    info: (message: string, data?: any) => {
      console.log(`ℹ️ INFO: ${message}`, data);
    },
    debug: (message: string, data?: any) => {
      if (__DEV__) {
        console.log(`🐛 DEBUG: ${message}`, data);
      }
    }
  };