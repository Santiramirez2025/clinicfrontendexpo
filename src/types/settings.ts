export interface NotificationSettings {
  appointments: boolean;
  reminders: boolean;
  updates: boolean;
  marketing: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

export interface SettingsState {
  notifications: NotificationSettings;
  app: AppSettings;
  isLoading: boolean;
  error: string | null;
}
