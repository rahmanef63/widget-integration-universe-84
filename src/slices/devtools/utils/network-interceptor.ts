
/**
 * Intercepts and monitors network requests for the devtools
 */

type NetworkRequestData = {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  startTime: number;
  endTime?: number;
  status?: number;
  statusText?: string;
  response?: any;
  error?: string;
  duration?: number;
};

class NetworkInterceptorClass {
  private originalFetch: typeof window.fetch;
  private requests: Map<string, NetworkRequestData> = new Map();
  private listeners: Array<(requests: NetworkRequestData[]) => void> = [];

  constructor() {
    this.originalFetch = window.fetch;
  }

  enable() {
    if (window.fetch !== this.interceptFetch) {
      window.fetch = this.interceptFetch;
    }
  }

  disable() {
    if (window.fetch !== this.originalFetch) {
      window.fetch = this.originalFetch;
    }
  }

  private interceptFetch = async (
    input: RequestInfo | URL, 
    init?: RequestInit
  ): Promise<Response> => {
    // Get the URL string regardless of input type
    const url = typeof input === 'string' 
      ? input 
      : input instanceof URL 
        ? input.toString() 
        : input instanceof Request 
          ? input.url 
          : String(input);
          
    const method = init?.method || 'GET';
    const requestId = `${method}-${url}-${Date.now()}`;
    const startTime = Date.now();
    
    // Create request data
    const requestData: NetworkRequestData = {
      id: requestId,
      url,
      method,
      headers: this.getHeaders(input, init),
      body: init?.body,
      startTime,
    };
    
    this.requests.set(requestId, requestData);
    this.notifyListeners();
    
    try {
      const response = await this.originalFetch.call(window, input, init);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Clone the response to read its body
      const clonedResponse = response.clone();
      let responseData;
      
      try {
        const contentType = clonedResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await clonedResponse.json();
        } else {
          responseData = await clonedResponse.text();
        }
      } catch (error) {
        responseData = 'Unable to parse response body';
      }
      
      // Update request data with response information
      const updatedRequestData = {
        ...requestData,
        endTime,
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        duration,
      };
      
      this.requests.set(requestId, updatedRequestData);
      this.notifyListeners();
      
      return response;
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Update request data with error information
      const updatedRequestData = {
        ...requestData,
        endTime,
        error: error instanceof Error ? error.message : String(error),
        duration,
      };
      
      this.requests.set(requestId, updatedRequestData);
      this.notifyListeners();
      
      throw error;
    }
  };
  
  private getHeaders(input: RequestInfo | URL, init?: RequestInit): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (init?.headers) {
      if (init.headers instanceof Headers) {
        init.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(init.headers)) {
        init.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.entries(init.headers).forEach(([key, value]) => {
          headers[key] = value as string;
        });
      }
    }
    
    return headers;
  }
  
  getAllRequests(): NetworkRequestData[] {
    return Array.from(this.requests.values());
  }
  
  clearRequests() {
    this.requests.clear();
    this.notifyListeners();
  }
  
  subscribe(listener: (requests: NetworkRequestData[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  private notifyListeners() {
    const requests = this.getAllRequests();
    this.listeners.forEach(listener => listener(requests));
  }
}

export const NetworkInterceptor = new NetworkInterceptorClass();
