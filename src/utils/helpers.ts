import { Alert, Platform, Linking } from 'react-native';

export const showAlert = (title: string, message: string, buttons?: any[]) => {
  Alert.alert(title, message, buttons);
};

export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'Cancelar', style: 'cancel', onPress: onCancel },
      { text: 'Confirmar', onPress: onConfirm },
    ]
  );
};

export const openURL = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showAlert('Error', 'No se puede abrir el enlace');
    }
  } catch (error) {
    showAlert('Error', 'Error al abrir el enlace');
  }
};

export const makePhoneCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  openURL(url);
};

export const sendEmail = (email: string, subject?: string, body?: string) => {
  let url = `mailto:${email}`;
  const params = [];
  
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  openURL(url);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getDeviceInfo = () => ({
  platform: Platform.OS,
  version: Platform.Version,
});

export const sortByDate = <T>(
  array: T[],
  dateField: keyof T,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField] as any).getTime();
    const dateB = new Date(b[dateField] as any).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortByString = <T>(
  array: T[],
  field: keyof T,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    const strA = String(a[field]).toLowerCase();
    const strB = String(b[field]).toLowerCase();
    if (ascending) {
      return strA.localeCompare(strB);
    }
    return strB.localeCompare(strA);
  });
};

export const filterBySearch = <T>(
  array: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return array;
  
  const term = searchTerm.toLowerCase();
  
  return array.filter(item =>
    searchFields.some(field =>
      String(item[field]).toLowerCase().includes(term)
    )
  );
};

export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const unique = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  if (typeof obj === 'string') return obj.trim().length === 0;
  return false;
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const safeGet = <T>(obj: any, path: string, defaultValue?: T): T => {
  try {
    return path.split('.').reduce((current, key) => current[key], obj) ?? defaultValue;
  } catch {
    return defaultValue as T;
  }
};

export const retry = async <T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts > 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, attempts - 1, delay);
    }
    throw error;
  }
};
