import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DevtoolsService } from '../services/devtools.service';
import { DevtoolsConfig, LogEntry, NetworkRequest, PerformanceMetric, StateSnapshot } from '../types';

interface DevtoolsContextType {
  config: DevtoolsConfig;
  updateConfig: (config: Partial<DevtoolsConfig>) => void;
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  networkRequests: NetworkRequest[];
  addNetworkRequest: (request: Omit<NetworkRequest, 'id'>) => void;
  clearNetworkRequests: () => void;
  performanceMetrics: PerformanceMetric[];
  addPerformanceMetric: (metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) => void;
  clearPerformanceMetrics: () => void;
  stateSnapshots: StateSnapshot[];
  addStateSnapshot: (snapshot: Omit<StateSnapshot, 'id' | 'timestamp'>) => void;
  clearStateSnapshots: () => void;
  clearAll: () => void;
  isOpen: boolean;
  toggleDevtools: () => void;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const DevtoolsContext = createContext<DevtoolsContextType | undefined>(undefined);

export const useDevtools = () => {
  const context = useContext(DevtoolsContext);
  if (context === undefined) {
    throw new Error('useDevtools must be used within a DevtoolsProvider');
  }
  return context;
};

interface DevtoolsProviderProps {
  children: ReactNode;
}

export const DevtoolsProvider: React.FC<DevtoolsProviderProps> = ({ children }) => {
  // Load initial state from storage
  const [config, setConfig] = useState<DevtoolsConfig>(DevtoolsService.getConfig());
  const [logs, setLogs] = useState<LogEntry[]>(DevtoolsService.getLogs());
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>(DevtoolsService.getNetworkRequests());
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>(DevtoolsService.getPerformanceMetrics());
  const [stateSnapshots, setStateSnapshots] = useState<StateSnapshot[]>(DevtoolsService.getStateSnapshots());
  
  // UI state
  const [isOpen, setIsOpen] = useState<boolean>(config.defaultOpen);
  const [activeTab, setActiveTab] = useState<string>(config.tabs[0] || 'logs');

  // Update config with persistence
  const updateConfig = (newConfig: Partial<DevtoolsConfig>) => {
    const updatedConfig = DevtoolsService.updateConfig(newConfig);
    setConfig(updatedConfig);
  };

  // Log management
  const addLog = (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog = DevtoolsService.addLog(log);
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const clearLogs = () => {
    DevtoolsService.clearLogs();
    setLogs([]);
  };

  // Network request management
  const addNetworkRequest = (request: Omit<NetworkRequest, 'id'>) => {
    const newRequest = DevtoolsService.addNetworkRequest(request);
    setNetworkRequests((prevRequests) => [newRequest, ...prevRequests]);
  };

  const clearNetworkRequests = () => {
    DevtoolsService.clearNetworkRequests();
    setNetworkRequests([]);
  };

  // Performance metrics management
  const addPerformanceMetric = (metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) => {
    const newMetric = DevtoolsService.addPerformanceMetric(metric);
    setPerformanceMetrics((prevMetrics) => [newMetric, ...prevMetrics]);
  };

  const clearPerformanceMetrics = () => {
    DevtoolsService.clearPerformanceMetrics();
    setPerformanceMetrics([]);
  };

  // State snapshots management
  const addStateSnapshot = (snapshot: Omit<StateSnapshot, 'id' | 'timestamp'>) => {
    const newSnapshot = DevtoolsService.addStateSnapshot(snapshot);
    setStateSnapshots((prevSnapshots) => [newSnapshot, ...prevSnapshots]);
  };

  const clearStateSnapshots = () => {
    DevtoolsService.clearStateSnapshots();
    setStateSnapshots([]);
  };

  // Clear all data
  const clearAll = () => {
    DevtoolsService.clearAll();
    setLogs([]);
    setNetworkRequests([]);
    setPerformanceMetrics([]);
    setStateSnapshots([]);
    setConfig(DevtoolsService.getConfig());
  };

  // Toggle devtools visibility
  const toggleDevtools = () => {
    setIsOpen((prev) => !prev);
  };

  // Keep localStorage in sync with state
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('widget_platform_devtools')) {
        // Reload the data from storage when it changes
        setLogs(DevtoolsService.getLogs());
        setNetworkRequests(DevtoolsService.getNetworkRequests());
        setPerformanceMetrics(DevtoolsService.getPerformanceMetrics());
        setStateSnapshots(DevtoolsService.getStateSnapshots());
        setConfig(DevtoolsService.getConfig());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <DevtoolsContext.Provider
      value={{
        config,
        updateConfig,
        logs,
        addLog,
        clearLogs,
        networkRequests,
        addNetworkRequest,
        clearNetworkRequests,
        performanceMetrics,
        addPerformanceMetric,
        clearPerformanceMetrics,
        stateSnapshots,
        addStateSnapshot,
        clearStateSnapshots,
        clearAll,
        isOpen,
        toggleDevtools,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};
