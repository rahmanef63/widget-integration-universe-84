
import { ReactNode } from 'react';

export interface StoreLayoutProps {
  children: ReactNode;
}

export interface StoreWidget {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  author: string;
  version: string;
  price: number | 'free';
  rating: number;
  downloads: number;
  tags: string[];
}

export interface StoreWidgetCardProps {
  widget: StoreWidget;
  onInstall?: (id: string) => void;
  onDetails?: (id: string) => void;
}

export interface StoreCategoryProps {
  title: string;
  widgets: StoreWidget[];
}
