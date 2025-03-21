
import { 
  Layers, 
  Code, 
  Package, 
  ArrowRightLeft, 
  Shield, 
  BarChart3, 
  Zap
} from 'lucide-react';

// Feature data for homepage
export const HOME_FEATURES = [
  {
    icon: Layers,
    title: 'Modular Architecture',
    description: 'Flexible, pluggable components that work together seamlessly.'
  },
  {
    icon: Code,
    title: 'Type-Safe Integration',
    description: 'Full TypeScript support with intelligent interfaces and generics.'
  },
  {
    icon: Package,
    title: 'Widget Ecosystem',
    description: 'Discover, install and share widgets from the central repository.'
  },
  {
    icon: ArrowRightLeft,
    title: 'Cross-Widget Communication',
    description: 'Event-driven messaging system for inter-widget coordination.'
  },
  {
    icon: Shield,
    title: 'Secure By Design',
    description: 'Built-in sandboxing and permission controls for widget isolation.'
  },
  {
    icon: BarChart3,
    title: 'Performance Monitoring',
    description: 'Real-time metrics and insights for widget performance.'
  },
  {
    icon: Zap,
    title: 'Optimized Rendering',
    description: 'Efficient loading and rendering strategies for widgets.'
  }
];

// Feature sections for homepage
export const HOME_FEATURE_SECTIONS = [
  {
    title: "Enterprise-Ready Widget Architecture",
    subtitle: "Core Architecture",
    features: [
      {
        icon: Layers,
        title: "Modular Architecture",
        description: "Flexible, pluggable components that work together seamlessly."
      },
      {
        icon: Shield,
        title: "Secure By Design",
        description: "Built-in sandboxing and permission controls for widget isolation."
      },
      {
        icon: Zap,
        title: "Optimized Rendering",
        description: "Efficient loading and rendering strategies for widgets."
      }
    ],
    reversed: false,
    illustration: null
  },
  {
    title: "Type-Safe Development Experience",
    subtitle: "Developer Experience",
    features: [
      {
        icon: Code,
        title: "Type-Safe Integration",
        description: "Full TypeScript support with intelligent interfaces and generics."
      },
      {
        icon: Package,
        title: "Widget Ecosystem",
        description: "Discover, install and share widgets from the central repository."
      },
      {
        icon: ArrowRightLeft,
        title: "Cross-Widget Communication",
        description: "Event-driven messaging system for inter-widget coordination."
      }
    ],
    reversed: true,
    illustration: null
  }
];

// Hero data for homepage
export const HOME_HERO_DATA = {
  title: "Enterprise Widget Framework",
  subtitle: "Build scalable, secure widget systems for your enterprise applications",
  ctaText: "Explore Ecosystem",
  secondaryCtaText: "Read Documentation"
};
