
import { DocSection } from '../types';

// Documentation sections data
export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: 'Layers',
    subsections: [
      { id: 'overview', title: 'Overview' },
      { id: 'architecture', title: 'Architecture' },
      { id: 'getting-started', title: 'Getting Started' },
    ],
  },
  {
    id: 'integration',
    title: 'Integration Guide',
    icon: 'Code',
    subsections: [
      { id: 'widget-interface', title: 'Widget Interface' },
      { id: 'typescript-integration', title: 'TypeScript Integration' },
      { id: 'standard-props', title: 'Standard Props' },
    ],
  },
  {
    id: 'widget-development',
    title: 'Widget Development',
    icon: 'Package',
    subsections: [
      { id: 'development-setup', title: 'Development Setup' },
      { id: 'component-structure', title: 'Component Structure' },
      { id: 'testing-widgets', title: 'Testing Widgets' },
    ],
  },
  {
    id: 'widget-store',
    title: 'Widget Store',
    icon: 'Database',
    subsections: [
      { id: 'publishing-widgets', title: 'Publishing Widgets' },
      { id: 'store-api', title: 'Store API' },
      { id: 'metadata-management', title: 'Metadata Management' },
    ],
  },
  {
    id: 'dashboard-integration',
    title: 'Dashboard Integration',
    icon: 'Server',
    subsections: [
      { id: 'widget-loader', title: 'Widget Loader' },
      { id: 'sandboxing', title: 'Sandboxing' },
      { id: 'error-handling', title: 'Error Handling' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: 'Shield',
    subsections: [
      { id: 'authentication', title: 'Authentication' },
      { id: 'permissions', title: 'Permissions' },
      { id: 'isolation', title: 'Isolation' },
    ],
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    icon: 'Settings',
    subsections: [
      { id: 'performance', title: 'Performance' },
      { id: 'architecture-patterns', title: 'Architecture Patterns' },
      { id: 'monitoring', title: 'Monitoring' },
    ],
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: 'GitBranch',
    subsections: [
      { id: 'widget-api', title: 'Widget API' },
      { id: 'store-api-ref', title: 'Store API' },
      { id: 'dashboard-api', title: 'Dashboard API' },
    ],
  },
];
