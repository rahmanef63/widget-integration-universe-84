
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  SupabaseDashboard, 
  DashboardContextState 
} from '../types/supabase';
import { DashboardSidebarSectionProps } from '../types';
import { 
  fetchDashboards, 
  fetchDashboardById, 
  organizeMenuItemsBySections 
} from '../services/dashboard.service';
import { toast } from 'sonner';

const defaultContext: DashboardContextState = {
  currentDashboard: null,
  dashboards: [],
  menuSections: [],
  isLoading: true,
  error: null,
  switchDashboard: () => {}
};

// Export the context so it can be imported elsewhere
export const DashboardContext = createContext<DashboardContextState>(defaultContext);

export const useDashboard = () => useContext(DashboardContext);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentDashboard, setCurrentDashboard] = useState<SupabaseDashboard | null>(null);
  const [dashboards, setDashboards] = useState<SupabaseDashboard[]>([]);
  const [menuSections, setMenuSections] = useState<DashboardSidebarSectionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async (dashboardId?: string) => {
    try {
      setIsLoading(true);
      
      // Fetch all dashboards
      const allDashboards = await fetchDashboards();
      setDashboards(allDashboards);
      
      // If no dashboards found, show error
      if (allDashboards.length === 0) {
        setError('No dashboards found');
        setIsLoading(false);
        return;
      }
      
      // Determine which dashboard to load
      let targetDashboard: SupabaseDashboard;
      
      if (dashboardId) {
        // Find the specified dashboard
        const found = allDashboards.find(d => d.id === dashboardId);
        if (found) {
          targetDashboard = found;
        } else {
          // If specified dashboard not found, use the default or first one
          targetDashboard = allDashboards.find(d => d.is_default) || allDashboards[0];
          toast.warning('Specified dashboard not found, loading default dashboard');
        }
      } else {
        // Use default or first dashboard
        targetDashboard = allDashboards.find(d => d.is_default) || allDashboards[0];
      }
      
      setCurrentDashboard(targetDashboard);
      
      // Load menu sections for the dashboard
      const sections = await organizeMenuItemsBySections(targetDashboard.id);
      setMenuSections(sections);
      
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Switch dashboard function
  const switchDashboard = async (dashboardId: string) => {
    if (currentDashboard?.id === dashboardId) return;
    await loadDashboardData(dashboardId);
    
    // Navigate to the dashboard homepage
    navigate('/dashboard');
  };

  return (
    <DashboardContext.Provider
      value={{
        currentDashboard,
        dashboards,
        menuSections,
        isLoading,
        error,
        switchDashboard
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
