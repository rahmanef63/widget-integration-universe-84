
import { ReactNode } from 'react';

export interface DocSection {
  id: string;
  title: string;
  icon: ReactNode;
  subsections: { id: string; title: string }[];
}
