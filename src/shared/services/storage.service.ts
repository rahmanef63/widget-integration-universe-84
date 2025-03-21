
/**
 * Storage service for local data persistence
 * Will be replaced with proper database in future
 */
export class StorageService {
  /**
   * Save data to local storage
   */
  public static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get data from local storage
   */
  public static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove data from local storage
   */
  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Clear all data in local storage
   */
  public static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'widget_platform_user_preferences',
  WIDGETS: 'widget_platform_widgets',
  DASHBOARD: 'widget_platform_dashboard'
};
