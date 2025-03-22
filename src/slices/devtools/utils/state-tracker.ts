
import { DevtoolsService } from '../services/devtools.service';
import { StateSnapshot } from '../types';

type StateSource = {
  name: string;
  getState: () => Record<string, any>;
};

export class StateTracker {
  private static sources: StateSource[] = [];
  private static isEnabled = false;
  private static interval: number | null = null;

  public static addStateSource(name: string, getState: () => Record<string, any>): void {
    // Check if source already exists
    const existingSourceIndex = this.sources.findIndex(source => source.name === name);
    
    if (existingSourceIndex !== -1) {
      // Update existing source
      this.sources[existingSourceIndex] = { name, getState };
    } else {
      // Add new source
      this.sources.push({ name, getState });
    }
  }

  public static removeStateSource(name: string): void {
    this.sources = this.sources.filter(source => source.name !== name);
  }

  public static enable(intervalMs: number = 5000): void {
    if (this.isEnabled) return;
    
    // Start tracking
    this.interval = window.setInterval(() => {
      this.captureState();
    }, intervalMs);
    
    this.isEnabled = true;
  }

  public static disable(): void {
    if (!this.isEnabled) return;
    
    // Stop tracking
    if (this.interval !== null) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
    
    this.isEnabled = false;
  }

  public static captureState(description?: string): void {
    const state: Record<string, any> = {};
    
    // Get state from all sources
    this.sources.forEach(source => {
      try {
        state[source.name] = source.getState();
      } catch (error) {
        state[source.name] = { error: 'Failed to get state' };
      }
    });
    
    // Record the state snapshot
    DevtoolsService.addStateSnapshot({
      state,
      description
    });
  }
}
