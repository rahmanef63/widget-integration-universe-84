
import { ReactNode } from 'react';

export interface IntegrationLayoutProps {
  children: ReactNode;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSynced?: string;
  category: 'analytics' | 'data' | 'social' | 'productivity' | 'other';
}

export interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (id: string) => void;
  onDisconnect?: (id: string) => void;
  onConfigure?: (id: string) => void;
}

export interface IntegrationGridProps {
  integrations: Integration[];
  onConnect?: (id: string) => void;
  onDisconnect?: (id: string) => void;
  onConfigure?: (id: string) => void;
}
