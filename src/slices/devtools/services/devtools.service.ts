import { StorageService, STORAGE_KEYS } from '@/shared/services/storage.service';
import { 
  DevtoolsConfig, 
  LogEntry, 
  NetworkRequest, 
  PerformanceMetric, 
  StateSnapshot 
} from '../types';

// Default configuration
const DEFAULT_CONFIG: DevtoolsConfig = {
  enabled: true,
  position: 'bottom',
  defaultOpen: false,
  tabs: ['logs', 'network', 'performance', 'state']
};

// Extend storage keys
const DEVTOOLS_STORAGE_KEYS = {
  CONFIG: 'widget_platform_devtools_config',
  LOGS: 'widget_platform_devtools_logs',
  NETWORK: 'widget_platform_devtools_network',
  PERFORMANCE: 'widget_platform_devtools_performance',
  STATE: 'widget_platform_devtools_state'
};

/**
 * Devtools service for managing development tools data
 * This uses localStorage now but will be replaced with an API
 */
export class DevtoolsService {
  // Configuration
  public static getConfig(): DevtoolsConfig {
    return StorageService.getItem<DevtoolsConfig>(
      DEVTOOLS_STORAGE_KEYS.CONFIG, 
      DEFAULT_CONFIG
    );
  }

  public static updateConfig(config: Partial<DevtoolsConfig>): DevtoolsConfig {
    const currentConfig = this.getConfig();
    const updatedConfig = { ...currentConfig, ...config };
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.CONFIG, updatedConfig);
    return updatedConfig;
  }

  // Logs management
  public static getLogs(): LogEntry[] {
    return StorageService.getItem<LogEntry[]>(DEVTOOLS_STORAGE_KEYS.LOGS, []);
  }

  public static addLog(log: Omit<LogEntry, 'id' | 'timestamp'>): LogEntry {
    const logs = this.getLogs();
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...log
    };
    
    // Keep only the last 1000 logs to prevent localStorage overflow
    const updatedLogs = [newLog, ...logs].slice(0, 1000);
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.LOGS, updatedLogs);
    return newLog;
  }

  public static clearLogs(): void {
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.LOGS, []);
  }

  // Network requests
  public static getNetworkRequests(): NetworkRequest[] {
    return StorageService.getItem<NetworkRequest[]>(DEVTOOLS_STORAGE_KEYS.NETWORK, []);
  }

  public static addNetworkRequest(request: Omit<NetworkRequest, 'id'>): NetworkRequest {
    const requests = this.getNetworkRequests();
    const newRequest: NetworkRequest = {
      id: crypto.randomUUID(),
      ...request
    };
    
    // Keep only the last 100 requests
    const updatedRequests = [newRequest, ...requests].slice(0, 100);
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.NETWORK, updatedRequests);
    return newRequest;
  }

  public static clearNetworkRequests(): void {
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.NETWORK, []);
  }

  // Performance metrics
  public static getPerformanceMetrics(): PerformanceMetric[] {
    return StorageService.getItem<PerformanceMetric[]>(DEVTOOLS_STORAGE_KEYS.PERFORMANCE, []);
  }

  public static addPerformanceMetric(metric: Omit<PerformanceMetric, 'id' | 'timestamp'>): PerformanceMetric {
    const metrics = this.getPerformanceMetrics();
    const newMetric: PerformanceMetric = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...metric
    };
    
    // Keep only the last 1000 metrics
    const updatedMetrics = [newMetric, ...metrics].slice(0, 1000);
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.PERFORMANCE, updatedMetrics);
    return newMetric;
  }

  public static clearPerformanceMetrics(): void {
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.PERFORMANCE, []);
  }

  // State snapshots
  public static getStateSnapshots(): StateSnapshot[] {
    return StorageService.getItem<StateSnapshot[]>(DEVTOOLS_STORAGE_KEYS.STATE, []);
  }

  public static addStateSnapshot(snapshot: Omit<StateSnapshot, 'id' | 'timestamp'>): StateSnapshot {
    const snapshots = this.getStateSnapshots();
    const newSnapshot: StateSnapshot = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...snapshot
    };
    
    // Keep only the last 50 snapshots
    const updatedSnapshots = [newSnapshot, ...snapshots].slice(0, 50);
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.STATE, updatedSnapshots);
    return newSnapshot;
  }

  public static clearStateSnapshots(): void {
    StorageService.setItem(DEVTOOLS_STORAGE_KEYS.STATE, []);
  }

  // Clear all devtools data
  public static clearAll(): void {
    StorageService.removeItem(DEVTOOLS_STORAGE_KEYS.CONFIG);
    this.clearLogs();
    this.clearNetworkRequests();
    this.clearPerformanceMetrics();
    this.clearStateSnapshots();
  }
}
