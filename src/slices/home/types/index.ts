
import { Feature as CoreFeature } from '@/core/types';

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

// Define our own Feature type that extends the core one but with string icons
export interface Feature extends Omit<CoreFeature, 'icon'> {
  icon: string; // Keep as string for consistency
}

export interface FeatureSectionData {
  title: string;
  subtitle: string;
  features: Feature[];
  reversed?: boolean;
  illustration?: React.ReactNode;
}
