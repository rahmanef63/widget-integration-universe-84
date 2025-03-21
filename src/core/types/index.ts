
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
  icon: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
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

// Extended types for API integration
export interface Widget extends WidgetBase {
  category: string;
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  dependencies: string[];
  config: Record<string, unknown>;
  permissions: string[];
}

export interface UserPreference {
  id: string;
  userId: string;
  theme: Theme;
  layout: string;
  widgets: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  userId: string;
  layout: Record<string, unknown>;
  widgets: Record<string, unknown>[];
  createdAt: string;
  updatedAt: string;
}
