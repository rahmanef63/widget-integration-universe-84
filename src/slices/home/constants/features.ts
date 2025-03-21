
import { Feature } from '@/core/types';

// Integration section features
export const INTEGRATION_FEATURES: Feature[] = [
  {
    title: 'Standardized Interfaces',
    description: 'TypeScript-based contracts ensure compatibility across all widgets and platforms',
    icon: 'Code',
  },
  {
    title: 'Seamless Integration',
    description: 'Widget loading system with automatic dependency resolution and version management',
    icon: 'Layout',
  },
  {
    title: 'Enterprise Security',
    description: 'Robust sandboxing with fine-grained permission controls and isolation',
    icon: 'Shield',
  },
];

// Wave animation constants
export const WAVE_ANIMATION_CONFIG = {
  pathTransition: {
    duration: 2,
    ease: "easeInOut"
  },
  secondPathTransition: {
    duration: 2.5,
    delay: 0.2,
    ease: "easeInOut"
  }
};

// CTA section constants
export const CTA_CONTENT = {
  title: "Ready to Transform Your Widget Strategy?",
  description: "Implement our enterprise-grade integration platform and unlock a new level of interoperability for your applications.",
  primaryButton: {
    text: "Get Started",
    link: "/documentation"
  },
  secondaryButton: {
    text: "Request Demo",
    link: "#"
  }
};

// Architecture section constants
export const ARCHITECTURE_CONTENT = {
  title: "Widget Integration Architecture",
  subtitle: "Enterprise Architecture",
  description: "Visualize how widgets flow through the ecosystem from development to integration"
};

// Widget systems constants
export const WIDGET_SYSTEMS = [
  {
    title: 'Widget Provider',
    description: 'Standardized development framework for creating modular, compatible widgets',
    icon: 'Globe',
  },
  {
    title: 'Widget Store',
    description: 'Centralized marketplace for distribution and discovery of enterprise widgets',
    icon: 'Database',
  },
  {
    title: 'Dashboard Integration',
    description: 'Seamless integration platform for embedding widgets into applications',
    icon: 'Layout',
  },
  {
    title: 'Secure Sandboxing',
    description: 'Isolated execution environment for widget security and performance',
    icon: 'Shield',
  },
  {
    title: 'Advanced API Gateway',
    description: 'Unified access point for all widget services with robust authentication',
    icon: 'Server',
  },
  {
    title: 'Performance Monitoring',
    description: 'Real-time analytics and telemetry for widget optimization',
    icon: 'Zap',
  },
];

// Hero section constants
export const HERO_CONTENT = {
  tagline: "Enterprise Widget Integration",
  title: "Seamless Widget Integration for Enterprise Applications",
  description: "A comprehensive platform for developing, distributing, and integrating enterprise-grade widgets with unmatched security, performance, and compatibility.",
  primaryButton: {
    text: "Explore Integration",
    link: "#integration"
  },
  secondaryButton: {
    text: "View Documentation",
    link: "/documentation"
  }
};
