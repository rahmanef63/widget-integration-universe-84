
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserPreferences } from '@/core/types';
import { StorageService, STORAGE_KEYS } from '../services/storage.service';

// Default user preferences
const defaultUserPreferences: UserPreferences = {
  theme: 'system',
  fontSize: 'medium',
  language: 'en',
  dashboardLayout: 'grid',
  favoriteWidgets: [],
  notifications: true
};

interface UserPreferencesContextProps {
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextProps | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultUserPreferences);

  // Load preferences from storage on mount
  useEffect(() => {
    const storedPreferences = StorageService.getItem<UserPreferences>(
      STORAGE_KEYS.USER_PREFERENCES,
      defaultUserPreferences
    );
    setPreferences(storedPreferences);
  }, []);

  // Update user preferences
  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    StorageService.setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
  };

  // Reset to default preferences
  const resetPreferences = () => {
    setPreferences(defaultUserPreferences);
    StorageService.setItem(STORAGE_KEYS.USER_PREFERENCES, defaultUserPreferences);
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Hook to use user preferences
export const useUserPreferences = (): UserPreferencesContextProps => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
