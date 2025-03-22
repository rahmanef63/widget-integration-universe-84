
import { DevtoolsService } from '../services/devtools.service';
import { NetworkRequest } from '../types';

// Save the original fetch
const originalFetch = window.fetch;

// Type for the network request that's in progress
type PendingRequest = {
  url: string;
  method: string;
  startTime: number;
  requestHeaders?: Record<string, string>;
  requestBody?: any;
};

export class NetworkInterceptor {
  private static isEnabled = false;
  private static pendingRequests: Record<string, PendingRequest> = {};

  public static enable(): void {
    if (this.isEnabled) return;
    
    // Monkey patch fetch
    window.fetch = this.interceptFetch.bind(this);
    this.isEnabled = true;
  }

  public static disable(): void {
    if (!this.isEnabled) return;
    
    // Restore original fetch
    window.fetch = originalFetch;
    this.isEnabled = false;
  }

  private static async interceptFetch(
    input: RequestInfo | URL, 
    init?: RequestInit
  ): Promise<Response> {
    const url = typeof input === 'string' ? input : input.url;
    const method = init?.method || 'GET';
    const requestId = `${method}-${url}-${Date.now()}`;
    const startTime = Date.now();
    
    // Store the request details
    this.pendingRequests[requestId] = {
      url,
      method,
      startTime,
      requestHeaders: init?.headers ? this.headersToObject(init.headers) : undefined,
      requestBody: init?.body ? this.parseRequestBody(init.body) : undefined,
    };
    
    try {
      // Make the actual request
      const response = await originalFetch(input, init);
      
      // Clone the response so we can read the body
      const clonedResponse = response.clone();
      let responseBody: any;
      
      try {
        // Try to parse the response as JSON
        responseBody = await clonedResponse.json();
      } catch (e) {
        // If it's not JSON, get it as text
        try {
          responseBody = await clonedResponse.text();
        } catch (e) {
          responseBody = 'Unable to parse response body';
        }
      }
      
      // Record the completed request
      const endTime = Date.now();
      const pending = this.pendingRequests[requestId];
      const networkRequest: Omit<NetworkRequest, 'id'> = {
        url: pending.url,
        method: pending.method,
        status: response.status,
        statusText: response.statusText,
        requestHeaders: pending.requestHeaders,
        responseHeaders: this.headersToObject(response.headers),
        requestBody: pending.requestBody,
        responseBody,
        startTime: pending.startTime,
        endTime,
        duration: endTime - pending.startTime,
      };
      
      // Delete the pending request
      delete this.pendingRequests[requestId];
      
      // Add to devtools
      DevtoolsService.addNetworkRequest(networkRequest);
      
      return response;
    } catch (error) {
      // Record the error
      const endTime = Date.now();
      const pending = this.pendingRequests[requestId];
      
      const networkRequest: Omit<NetworkRequest, 'id'> = {
        url: pending.url,
        method: pending.method,
        status: 0,
        statusText: 'Error',
        requestHeaders: pending.requestHeaders,
        requestBody: pending.requestBody,
        startTime: pending.startTime,
        endTime,
        duration: endTime - pending.startTime,
        error: error instanceof Error ? error.message : String(error),
      };
      
      // Delete the pending request
      delete this.pendingRequests[requestId];
      
      // Add to devtools
      DevtoolsService.addNetworkRequest(networkRequest);
      
      // Re-throw the error
      throw error;
    }
  }
  
  private static headersToObject(headers: Headers | string[][] | Record<string, string>): Record<string, string> {
    const result: Record<string, string> = {};
    
    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        result[key] = value;
      });
    } else if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        result[key] = value;
      });
    } else {
      return headers;
    }
    
    return result;
  }
  
  private static parseRequestBody(body: BodyInit): any {
    if (body instanceof FormData) {
      const result: Record<string, any> = {};
      body.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }
    
    if (typeof body === 'string') {
      try {
        return JSON.parse(body);
      } catch (e) {
        return body;
      }
    }
    
    return String(body);
  }
}
