
import { ReactNode } from 'react';

export interface ProfileLayoutProps {
  children: ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

export interface ProfileFormProps {
  user: User;
  onSave: (user: User) => void;
}
