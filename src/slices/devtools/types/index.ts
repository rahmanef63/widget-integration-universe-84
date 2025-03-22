
import { ReactNode } from 'react';

export interface DevtoolsTabProps {
  id: string;
  title: string;
  icon: string;
  content: ReactNode;
}

export interface DevtoolsLayoutProps {
  children: ReactNode;
}

export interface DevtoolsConfig {
  enabled: boolean;
  position: 'left' | 'right' | 'bottom';
  defaultOpen: boolean;
  tabs: string[]; // Array of tab IDs that are enabled
}

export interface DevtoolsPanel {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: ReactNode;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  meta?: Record<string, any>;
  source?: string;
}

export interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status: number;
  statusText: string;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
  startTime: number;
  endTime?: number;
  duration?: number;
  error?: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  timestamp: number;
  unit: string;
}

export interface StateSnapshot {
  id: string;
  timestamp: number;
  state: Record<string, any>;
  description?: string;
}
