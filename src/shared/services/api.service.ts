
/**
 * API Service for handling data fetching and persistence
 */
import { Widget, UserPreference, Dashboard } from '@/core/types';

// Base API URL - would be replaced with actual API endpoint in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Widget API endpoints
 */
export const widgetApi = {
  getAll: async (): Promise<Widget[]> => {
    // For now, return mock data until backend is implemented
    return fetchWithErrorHandling<Widget[]>('/widgets');
  },
  
  getById: async (id: string): Promise<Widget> => {
    return fetchWithErrorHandling<Widget>(`/widgets/${id}`);
  },
  
  create: async (widget: Omit<Widget, 'id'>): Promise<Widget> => {
    return fetchWithErrorHandling<Widget>('/widgets', {
      method: 'POST',
      body: JSON.stringify(widget),
    });
  },
  
  update: async (id: string, widget: Partial<Widget>): Promise<Widget> => {
    return fetchWithErrorHandling<Widget>(`/widgets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(widget),
    });
  },
  
  delete: async (id: string): Promise<void> => {
    return fetchWithErrorHandling<void>(`/widgets/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * User preferences API endpoints
 */
export const userPreferencesApi = {
  get: async (userId: string): Promise<UserPreference> => {
    return fetchWithErrorHandling<UserPreference>(`/users/${userId}/preferences`);
  },
  
  update: async (userId: string, preferences: Partial<UserPreference>): Promise<UserPreference> => {
    return fetchWithErrorHandling<UserPreference>(`/users/${userId}/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  },
};

/**
 * Dashboard API endpoints
 */
export const dashboardApi = {
  getAll: async (userId: string): Promise<Dashboard[]> => {
    return fetchWithErrorHandling<Dashboard[]>(`/users/${userId}/dashboards`);
  },
  
  getById: async (userId: string, dashboardId: string): Promise<Dashboard> => {
    return fetchWithErrorHandling<Dashboard>(`/users/${userId}/dashboards/${dashboardId}`);
  },
  
  create: async (userId: string, dashboard: Omit<Dashboard, 'id'>): Promise<Dashboard> => {
    return fetchWithErrorHandling<Dashboard>(`/users/${userId}/dashboards`, {
      method: 'POST',
      body: JSON.stringify(dashboard),
    });
  },
  
  update: async (userId: string, dashboardId: string, dashboard: Partial<Dashboard>): Promise<Dashboard> => {
    return fetchWithErrorHandling<Dashboard>(`/users/${userId}/dashboards/${dashboardId}`, {
      method: 'PATCH',
      body: JSON.stringify(dashboard),
    });
  },
  
  delete: async (userId: string, dashboardId: string): Promise<void> => {
    return fetchWithErrorHandling<void>(`/users/${userId}/dashboards/${dashboardId}`, {
      method: 'DELETE',
    });
  },
};
