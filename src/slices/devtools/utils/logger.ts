
import { DevtoolsService } from '../services/devtools.service';
import { LogEntry } from '../types';

export class Logger {
  private static source: string = 'app';

  public static setSource(source: string): void {
    this.source = source;
  }

  public static log(
    message: string, 
    level: LogEntry['level'] = 'info', 
    meta?: Record<string, any>
  ): void {
    // Log to the browser console
    const consoleMethod = level === 'error' 
      ? console.error 
      : level === 'warning' 
        ? console.warn 
        : level === 'debug' 
          ? console.debug 
          : console.info;
          
    consoleMethod(`[${this.source}] ${message}`, meta);
    
    // Add to the devtools logs
    DevtoolsService.addLog({
      level,
      message,
      meta,
      source: this.source,
    });
  }

  public static info(message: string, meta?: Record<string, any>): void {
    this.log(message, 'info', meta);
  }

  public static warning(message: string, meta?: Record<string, any>): void {
    this.log(message, 'warning', meta);
  }

  public static error(message: string, meta?: Record<string, any>): void {
    this.log(message, 'error', meta);
  }

  public static debug(message: string, meta?: Record<string, any>): void {
    this.log(message, 'debug', meta);
  }
}
