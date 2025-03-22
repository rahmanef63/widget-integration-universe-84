
import { ReactNode } from 'react';

export interface SupportLayoutProps {
  children: ReactNode;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface SupportFormProps {
  onSubmit: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
}
