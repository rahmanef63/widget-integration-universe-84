
// Code samples for documentation
export const DOC_CODE_SAMPLES = {
  widgetInterfaceCode: `
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
}`,

  widgetLoaderCode: `
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
}`
};
