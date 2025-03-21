
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Code, GitBranch, Package, Shield, Database, Settings, Layers, Server } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import DocHeroBanner from '../components/DocHeroBanner/DocHeroBanner';
import DocSidebar from '../components/DocSidebar/DocSidebar';
import IntroSection from '../components/DocContent/IntroSection';
import IntegrationSection from '../components/DocContent/IntegrationSection';
import DashboardSection from '../components/DocContent/DashboardSection';
import { DocSection } from '../types';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Check for scrolling to implement sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking on section navigation
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Documentation sections data
  const docSections: DocSection[] = [
    {
      id: 'intro',
      title: 'Introduction',
      icon: <Layers size={18} />,
      subsections: [
        { id: 'overview', title: 'Overview' },
        { id: 'architecture', title: 'Architecture' },
        { id: 'getting-started', title: 'Getting Started' },
      ],
    },
    {
      id: 'integration',
      title: 'Integration Guide',
      icon: <Code size={18} />,
      subsections: [
        { id: 'widget-interface', title: 'Widget Interface' },
        { id: 'typescript-integration', title: 'TypeScript Integration' },
        { id: 'standard-props', title: 'Standard Props' },
      ],
    },
    {
      id: 'widget-development',
      title: 'Widget Development',
      icon: <Package size={18} />,
      subsections: [
        { id: 'development-setup', title: 'Development Setup' },
        { id: 'component-structure', title: 'Component Structure' },
        { id: 'testing-widgets', title: 'Testing Widgets' },
      ],
    },
    {
      id: 'widget-store',
      title: 'Widget Store',
      icon: <Database size={18} />,
      subsections: [
        { id: 'publishing-widgets', title: 'Publishing Widgets' },
        { id: 'store-api', title: 'Store API' },
        { id: 'metadata-management', title: 'Metadata Management' },
      ],
    },
    {
      id: 'dashboard-integration',
      title: 'Dashboard Integration',
      icon: <Server size={18} />,
      subsections: [
        { id: 'widget-loader', title: 'Widget Loader' },
        { id: 'sandboxing', title: 'Sandboxing' },
        { id: 'error-handling', title: 'Error Handling' },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={18} />,
      subsections: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'permissions', title: 'Permissions' },
        { id: 'isolation', title: 'Isolation' },
      ],
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: <Settings size={18} />,
      subsections: [
        { id: 'performance', title: 'Performance' },
        { id: 'architecture-patterns', title: 'Architecture Patterns' },
        { id: 'monitoring', title: 'Monitoring' },
      ],
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <GitBranch size={18} />,
      subsections: [
        { id: 'widget-api', title: 'Widget API' },
        { id: 'store-api-ref', title: 'Store API' },
        { id: 'dashboard-api', title: 'Dashboard API' },
      ],
    },
  ];

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? docSections.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subsections.some(subsection => 
          subsection.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : docSections;

  // Code samples
  const widgetInterfaceCode = `
// Widget Interface Definition
interface WidgetProps<T extends WidgetData = WidgetData> {
  /** Unique identifier for widget instance */
  instanceId: string;
  
  /** Widget configuration passed from dashboard */
  config: WidgetConfig<T>;
  
  /** Theme and styling information */
  theme: ThemeConfig;
  
  /** Authentication context */
  auth: AuthContext;
  
  /** Dashboard event bus for cross-widget communication */
  eventBus?: EventBusInterface;
  
  /** Container dimensions and breakpoints */
  viewport: ViewportInfo;
  
  /** Optional callback for widget lifecycle events */
  onLifecycleEvent?: (event: LifecycleEvent) => void;
  
  /** Error handling configuration */
  errorConfig?: ErrorHandlingConfig;
}

// Widget Data Type
interface WidgetData {
  [key: string]: unknown;
}

// Widget Configuration with Generics
interface WidgetConfig<T extends WidgetData = WidgetData> {
  /** Widget type identifier */
  widgetType: string;
  
  /** Widget version using semver */
  version: string;
  
  /** Widget-specific data schema */
  data: T;
  
  /** Widget display settings */
  display: DisplaySettings;
  
  /** Widget permissions */
  permissions: Permission[];
  
  /** Feature flags for conditional rendering */
  features: Record<string, boolean>;
}`;

  const widgetLoaderCode = `
// Dynamic Widget Loader
import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { fetchWidgetMetadata } from '@/services/widget-store';

interface WidgetLoaderProps {
  widgetId: string;
  instanceId: string;
  config: WidgetConfig;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function WidgetLoader({ 
  widgetId, 
  instanceId, 
  config, 
  onLoad, 
  onError 
}: WidgetLoaderProps) {
  const [metadata, setMetadata] = useState<WidgetMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadWidgetMetadata() {
      try {
        setLoading(true);
        const data = await fetchWidgetMetadata(widgetId, config.version);
        setMetadata(data);
        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
      } finally {
        setLoading(false);
      }
    }

    loadWidgetMetadata();
  }, [widgetId, config.version, onLoad, onError]);

  if (loading) {
    return <WidgetSkeleton type={config.widgetType} />;
  }

  if (error || !metadata) {
    return <WidgetErrorFallback error={error} widgetId={widgetId} />;
  }

  const DynamicWidget = dynamic(
    () => import(\`@widget-store/\${metadata.packageName}\`).then(mod => mod.default),
    {
      loading: () => <WidgetSkeleton type={config.widgetType} />,
      ssr: metadata.supportsSSR,
    }
  );

  return (
    <WidgetErrorBoundary
      fallback={<WidgetErrorFallback widgetId={widgetId} />}
      onError={(error) => onError?.(error)}
    >
      <WidgetSandbox
        permissions={metadata.requiredPermissions}
        resourceLimits={metadata.resourceLimits}
      >
        <Suspense fallback={<WidgetSkeleton type={config.widgetType} />}>
          <DynamicWidget
            instanceId={instanceId}
            config={config}
            theme={useTheme()}
            auth={useAuth()}
            eventBus={useEventBus()}
            viewport={useViewport()}
            onLifecycleEvent={handleLifecycleEvent}
            errorConfig={{
              reportErrors: true,
              fallbackComponent: <WidgetErrorFallback widgetId={widgetId} />,
              retryStrategy: 'exponential-backoff',
            }}
          />
        </Suspense>
      </WidgetSandbox>
    </WidgetErrorBoundary>
  );
}`;

  return (
    <>
      <Header />
      
      <div className="pt-20 min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <DocHeroBanner 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <div className="flex flex-col lg:flex-row gap-8">
            <DocSidebar 
              filteredSections={filteredSections}
              activeSection={activeSection}
              handleSectionClick={handleSectionClick}
              isScrolled={isScrolled}
            />
            
            {/* Main Content */}
            <main className="flex-1" ref={ref}>
              <div className="space-y-16 pb-16">
                <IntroSection inView={inView} />
                <IntegrationSection inView={inView} widgetInterfaceCode={widgetInterfaceCode} />
                <DashboardSection inView={inView} widgetLoaderCode={widgetLoaderCode} />
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation;
