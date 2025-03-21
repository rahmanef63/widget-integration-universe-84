
import { Feature } from '@/core/types';

export interface WidgetSystem {
  title: string;
  description: string;
  icon: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface FeatureSectionData {
  title: string;
  subtitle: string;
  features: Feature[];
  reversed?: boolean;
  illustration?: React.ReactNode;
}
