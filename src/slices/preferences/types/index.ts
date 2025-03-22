
import { ReactNode } from 'react';

export interface PreferencesLayoutProps {
  children: ReactNode;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailUpdates: boolean;
  dashboardLayout: 'grid' | 'list';
  widgetRefreshRate: number;
  language: string;
}

export interface PreferencesFormProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}
