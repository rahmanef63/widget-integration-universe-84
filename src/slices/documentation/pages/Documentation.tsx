
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ChevronRight, Search, Code, GitBranch, Package, Shield, Database, Settings, Layers, Server } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedIcon from '@/components/AnimatedIcon';

// Interface for documentation sections
interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  subsections: { id: string; title: string }[];
}

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

  // Code sample for widget interface
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

  // Code sample for widget loader
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
          {/* Hero Banner */}
          <div className="rounded-2xl overflow-hidden glassmorphism p-8 md:p-12 mb-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Widget Integration Documentation
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive guides, references, and best practices for the Widget Integration Platform
              </p>
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className={cn(
              "lg:w-64 flex-shrink-0 overflow-y-auto pb-10 transition-all duration-300",
              isScrolled ? "lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]" : "lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)]"
            )}>
              <nav className="space-y-1">
                {filteredSections.map((section) => (
                  <div key={section.id} className="mb-4">
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        activeSection === section.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-secondary text-foreground/80 hover:text-foreground"
                      )}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span>{section.title}</span>
                      {activeSection === section.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {activeSection === section.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 mt-1 space-y-1"
                        >
                          {section.subsections.map((subsection) => (
                            <button
                              key={subsection.id}
                              onClick={() => handleSectionClick(`${section.id}-${subsection.id}`)}
                              className="w-full flex items-center px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                            >
                              {subsection.title}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1" ref={ref}>
              <div className="space-y-16 pb-16">
                {/* Introduction */}
                <section id="intro" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
                      Introduction
                    </h2>
                    
                    <div id="intro-overview" className="mb-8 scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Overview</h3>
                      <p className="mb-4 text-muted-foreground">
                        The Widget Integration Platform provides a comprehensive ecosystem for developing, distributing, and integrating enterprise-grade widgets across applications. This documentation covers all aspects of the platform, from widget development to integration in host applications.
                      </p>
                      <p className="text-muted-foreground">
                        Whether you're developing widgets, managing a widget store, or integrating widgets into your dashboard, this guide provides the necessary information and best practices.
                      </p>
                    </div>
                    
                    <div id="intro-architecture" className="mb-8 scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Architecture</h3>
                      <p className="mb-4 text-muted-foreground">
                        The platform consists of three main components that work together to create a seamless widget ecosystem:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Widget Provider:</strong> Develops standardized widgets using the platform's component framework and TypeScript interfaces.</li>
                        <li><strong>Widget Store:</strong> Manages distribution, versioning, and metadata for all widgets in the ecosystem.</li>
                        <li><strong>Dashboard Integration:</strong> Loads and renders widgets with sandboxing, error handling, and performance monitoring.</li>
                      </ul>
                    </div>
                    
                    <div id="intro-getting-started" className="scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Getting Started</h3>
                      <p className="mb-4 text-muted-foreground">
                        To begin using the Widget Integration Platform, follow these steps:
                      </p>
                      <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                        <li>
                          <strong>Set up your development environment</strong>
                          <p className="mt-1">Install Node.js, TypeScript, and the Widget CLI tool to get started.</p>
                        </li>
                        <li>
                          <strong>Create your first widget</strong>
                          <p className="mt-1">Use the CLI to scaffold a new widget project with the standard interface.</p>
                        </li>
                        <li>
                          <strong>Test and deploy</strong>
                          <p className="mt-1">Use the testing framework to validate your widget before publishing it to the store.</p>
                        </li>
                        <li>
                          <strong>Integrate into a dashboard</strong>
                          <p className="mt-1">Use the Widget Loader component to integrate widgets into your application.</p>
                        </li>
                      </ol>
                    </div>
                  </motion.div>
                </section>
                
                {/* Integration Guide */}
                <section id="integration" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
                      Integration Guide
                    </h2>
                    
                    <div id="integration-widget-interface" className="mb-8 scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Widget Interface</h3>
                      <p className="mb-4 text-muted-foreground">
                        All widgets in the platform implement a standardized interface that ensures compatibility across different hosts. This interface defines the props that every widget receives and how it communicates with the host application.
                      </p>
                      
                      <div className="rounded-lg bg-foreground/5 p-4 overflow-x-auto mb-4">
                        <pre className="text-sm font-mono text-foreground whitespace-pre">
                          <code>{widgetInterfaceCode}</code>
                        </pre>
                      </div>
                      
                      <p className="text-muted-foreground">
                        This standardized interface ensures that widgets can be predictably integrated into any compatible dashboard or application.
                      </p>
                    </div>
                    
                    <div id="integration-typescript-integration" className="mb-8 scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">TypeScript Integration</h3>
                      <p className="mb-4 text-muted-foreground">
                        The platform uses TypeScript for type safety across all components of the widget ecosystem. Type definitions ensure compatibility between widgets and host applications.
                      </p>
                      <p className="text-muted-foreground">
                        Key benefits of the TypeScript integration include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Static type checking for widget interfaces</li>
                        <li>Autocompletion and IntelliSense in development environments</li>
                        <li>Generics for flexible yet type-safe widget configurations</li>
                        <li>Discriminated union types for complex widget states</li>
                      </ul>
                    </div>
                    
                    <div id="integration-standard-props" className="scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Standard Props</h3>
                      <p className="mb-4 text-muted-foreground">
                        Every widget receives a standard set of props from the host application:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2 text-left font-medium">Prop</th>
                              <th className="px-4 py-2 text-left font-medium">Type</th>
                              <th className="px-4 py-2 text-left font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">instanceId</td>
                              <td className="px-4 py-3 font-mono">string</td>
                              <td className="px-4 py-3 text-muted-foreground">Unique identifier for this widget instance</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">config</td>
                              <td className="px-4 py-3 font-mono">WidgetConfig&lt;T&gt;</td>
                              <td className="px-4 py-3 text-muted-foreground">Configuration data specific to this widget</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">theme</td>
                              <td className="px-4 py-3 font-mono">ThemeConfig</td>
                              <td className="px-4 py-3 text-muted-foreground">Theme information from the host application</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">auth</td>
                              <td className="px-4 py-3 font-mono">AuthContext</td>
                              <td className="px-4 py-3 text-muted-foreground">Authentication context for API calls</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">eventBus</td>
                              <td className="px-4 py-3 font-mono">EventBusInterface</td>
                              <td className="px-4 py-3 text-muted-foreground">Communication channel between widgets</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-primary">viewport</td>
                              <td className="px-4 py-3 font-mono">ViewportInfo</td>
                              <td className="px-4 py-3 text-muted-foreground">Container dimensions and responsive breakpoints</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </section>
                
                {/* Dashboard Integration */}
                <section id="dashboard-integration" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
                      Dashboard Integration
                    </h2>
                    
                    <div id="dashboard-integration-widget-loader" className="mb-8 scroll-mt-24">
                      <h3 className="text-xl font-medium mb-4">Widget Loader</h3>
                      <p className="mb-4 text-muted-foreground">
                        The Widget Loader is a React component that dynamically loads widgets from the store and renders them in the dashboard. It handles metadata fetching, error boundaries, and loading states.
                      </p>
                      
                      <div className="rounded-lg bg-foreground/5 p-4 overflow-x-auto mb-4">
                        <pre className="text-sm font-mono text-foreground whitespace-pre">
                          <code>{widgetLoaderCode}</code>
                        </pre>
                      </div>
                      
                      <p className="text-muted-foreground">
                        The loader provides a consistent loading experience while fetching widget assets and ensures that errors in one widget don't crash the entire application.
                      </p>
                    </div>
                    
                    {/* More sections would be added here */}
                  </motion.div>
                </section>
                
                {/* More content sections would be added here */}
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
