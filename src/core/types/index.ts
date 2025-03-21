
import { LucideIcon } from 'lucide-react';

/**
 * Core application types
 */

export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  features: FeatureFlags;
}

export interface FeatureFlags {
  enableExperimentalWidgets: boolean;
  enableAdvancedCustomization: boolean;
  enableUserDashboards: boolean;
  enableWidgetStore: boolean;
}

export interface NavigationItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface WidgetBase {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  features: Feature[];
}

export type Theme = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: Theme;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  dashboardLayout: string;
  favoriteWidgets: string[];
  notifications: boolean;
}
