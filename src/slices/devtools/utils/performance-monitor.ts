
import { DevtoolsService } from '../services/devtools.service';
import { PerformanceMetric } from '../types';

export class PerformanceMonitor {
  private static isEnabled = false;
  private static interval: number | null = null;
  private static metrics: Record<string, { lastValue: number; unit: string }> = {};

  public static enable(intervalMs: number = 5000): void {
    if (this.isEnabled) return;
    
    // Start monitoring
    this.interval = window.setInterval(() => {
      this.captureMetrics();
    }, intervalMs);
    
    this.isEnabled = true;
  }

  public static disable(): void {
    if (!this.isEnabled) return;
    
    // Stop monitoring
    if (this.interval !== null) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
    
    this.isEnabled = false;
  }

  public static recordMetric(name: string, value: number, unit: string): void {
    // Store the current value for trending
    this.metrics[name] = { lastValue: value, unit };
    
    // Record the metric
    DevtoolsService.addPerformanceMetric({
      name,
      value,
      unit
    });
  }

  private static captureMetrics(): void {
    // Memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      if (memory) {
        this.recordMetric(
          'Memory Used', 
          Math.round(memory.usedJSHeapSize / (1024 * 1024)), 
          'MB'
        );
        
        this.recordMetric(
          'Memory Limit', 
          Math.round(memory.jsHeapSizeLimit / (1024 * 1024)), 
          'MB'
        );
      }
    }
    
    // FPS calculation (simplified)
    let lastFrameTime = performance.now();
    let frameCount = 0;
    
    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastFrameTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
        this.recordMetric('FPS', fps, 'frames/s');
        
        frameCount = 0;
        lastFrameTime = now;
      }
      
      requestAnimationFrame(calculateFps);
    };
    
    requestAnimationFrame(calculateFps);
    
    // Navigation timing
    if (performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const navTiming = navEntries[0] as PerformanceNavigationTiming;
        
        this.recordMetric(
          'Page Load Time', 
          Math.round(navTiming.loadEventEnd - navTiming.startTime), 
          'ms'
        );
        
        this.recordMetric(
          'DOM Content Loaded', 
          Math.round(navTiming.domContentLoadedEventEnd - navTiming.startTime), 
          'ms'
        );
      }
    }
    
    // Resource timing
    if (performance.getEntriesByType) {
      const resourceEntries = performance.getEntriesByType('resource');
      
      let totalResourceSize = 0;
      let totalResourceTime = 0;
      
      resourceEntries.forEach((entry) => {
        const res = entry as PerformanceResourceTiming;
        totalResourceSize += res.transferSize || 0;
        totalResourceTime += res.responseEnd - res.startTime;
      });
      
      if (resourceEntries.length > 0) {
        this.recordMetric(
          'Total Resource Size', 
          Math.round(totalResourceSize / 1024), 
          'KB'
        );
        
        this.recordMetric(
          'Average Resource Load Time', 
          Math.round(totalResourceTime / resourceEntries.length), 
          'ms'
        );
      }
    }
  }
}
