
import { LucideIcon } from 'lucide-react';

export interface DocSection {
  id: string;
  title: string;
  icon: LucideIcon;
  subsections: DocSubsection[];
}

export interface DocSubsection {
  id: string;
  title: string;
}

export interface DocCodeSample {
  id: string;
  title: string;
  code: string;
  language: string;
}

export interface DocContent {
  sections: Record<string, JSX.Element>;
}
