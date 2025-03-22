
import { ReactNode } from 'react';

export interface AnalyticsLayoutProps {
  children: ReactNode;
}

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
}

export interface AnalyticsChart {
  id: string;
  title: string;
  description?: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  data: any[];
}

export interface AnalyticsDashboardProps {
  metrics: AnalyticsMetric[];
  charts: AnalyticsChart[];
}
