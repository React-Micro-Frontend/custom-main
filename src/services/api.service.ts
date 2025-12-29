import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/app.config';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  ApiError, 
  RequestConfig,
  CacheConfig,
  RetryConfig 
} from './api.types';

/**
 * Enterprise-Grade API Service for SaaS Applications
 * 
 * Features:
 * - Automatic token refresh
 * - Request/Response interceptors
 * - Error handling with retry logic
 * - Request caching
 * - Request cancellation
 * - File upload/download with progress
 * - Multi-tenant support
 * - Rate limiting awareness
 * - TypeScript support
 */
class ApiService {
  private client: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number }>;
  private pendingRequests: Map<string, AbortController>;
  private refreshTokenPromise: Promise<string> | null = null;
  private retryConfig: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatuses: [408, 429, 500, 502, 503, 504]
  };

  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add authentication token
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add tenant ID for multi-tenant SaaS
        const tenantId = this.getTenantId();
        if (tenantId && config.headers) {
          config.headers['X-Tenant-ID'] = tenantId;
        }

        // Add request ID for tracking
        const requestId = this.generateRequestId();
        if (config.headers) {
          config.headers['X-Request-ID'] = requestId;
        }

        // Add timestamp
        if (config.headers) {
          config.headers['X-Client-Time'] = new Date().toISOString();
        }

        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Cache response if needed
        const cacheKey = this.getCacheKey(response.config);
        if (response.config.method === 'get' && cacheKey) {
          this.setCache(cacheKey, response.data);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number };

        // Handle token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleAuthenticationError();
            return Promise.reject(this.handleError(refreshError));
          }
        }

        // Handle retry logic for network errors
        if (this.shouldRetry(error, originalRequest)) {
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
          await this.delay(this.retryConfig.retryDelay * originalRequest._retryCount);
          return this.client(originalRequest);
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * GET request with caching support
   */
  async get<T>(url: string, config?: RequestConfig & { cache?: CacheConfig }): Promise<ApiResponse<T>> {
    const cacheKey = this.getCacheKey({ url, params: config?.params });
    
    // Check cache
    if (config?.cache?.enabled) {
      const cachedData = this.getCache(cacheKey, config.cache.ttl);
      if (cachedData) {
        return cachedData;
      }
    }

    const response = await this.client.get<ApiResponse<T>>(url, this.buildConfig(config));
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, this.buildConfig(config));
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, this.buildConfig(config));
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, this.buildConfig(config));
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, this.buildConfig(config));
    return response.data;
  }

  /**
   * GET request with pagination
   */
  async getPaginated<T>(
    url: string, 
    page: number = 1, 
    limit: number = 10, 
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    const params = { page, limit, ...config?.params };
    const response = await this.client.get<PaginatedResponse<T>>(url, {
      ...this.buildConfig(config),
      params
    });
    return response.data;
  }

  /**
   * Upload file with progress tracking
   */
  async uploadFile<T>(
    url: string, 
    file: File | Blob, 
    fieldName: string = 'file',
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      });
    }

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });

    return response.data;
  }

  /**
   * Download file with progress tracking
   */
  async downloadFile(
    url: string, 
    filename: string,
    onProgress?: (progress: number) => void,
    config?: RequestConfig
  ): Promise<void> {
    const response = await this.client.get(url, {
      ...this.buildConfig(config),
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });

    // Create download link
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  /**
   * Batch requests with Promise.all
   */
  async batch<T>(requests: Array<() => Promise<T>>): Promise<T[]> {
    return Promise.all(requests.map(request => request()));
  }

  /**
   * Cancel pending request
   */
  cancelRequest(requestKey: string): void {
    const controller = this.pendingRequests.get(requestKey);
    if (controller) {
      controller.abort();
      this.pendingRequests.delete(requestKey);
    }
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests(): void {
    this.pendingRequests.forEach(controller => controller.abort());
    this.pendingRequests.clear();
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }

  // ========== PRIVATE HELPER METHODS ==========

  /**
   * Build request configuration
   */
  private buildConfig(config?: RequestConfig): AxiosRequestConfig {
    const axiosConfig: AxiosRequestConfig = {
      params: config?.params,
      headers: config?.headers,
      signal: config?.signal,
      timeout: config?.timeout,
      withCredentials: config?.withCredentials,
      onUploadProgress: config?.onUploadProgress,
      onDownloadProgress: config?.onDownloadProgress,
    };

    return axiosConfig;
  }

  /**
   * Get access token from storage
   */
  private getAccessToken(): string | null {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  }

  /**
   * Get refresh token from storage
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  }

  /**
   * Get tenant ID for multi-tenant SaaS
   */
  private getTenantId(): string | null {
    return localStorage.getItem('tenant_id') || sessionStorage.getItem('tenant_id');
  }

  /**
   * Set tokens in storage
   */
  setTokens(accessToken: string, refreshToken: string, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('access_token', accessToken);
    storage.setItem('refresh_token', refreshToken);
  }

  /**
   * Set tenant ID
   */
  setTenantId(tenantId: string): void {
    localStorage.setItem('tenant_id', tenantId);
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  /**
   * Refresh access token
   */
  private async refreshAccessToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        this.setTokens(accessToken, newRefreshToken, !!localStorage.getItem('access_token'));
        
        return accessToken;
      } finally {
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  /**
   * Handle authentication errors
   */
  private handleAuthenticationError(): void {
    this.clearAuth();
    this.clearCache();
    this.cancelAllRequests();
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get cache key from request config
   */
  private getCacheKey(config: { url?: string; params?: any }): string {
    const url = config.url || '';
    const params = config.params ? JSON.stringify(config.params) : '';
    return `${url}_${params}`;
  }

  /**
   * Get cached data if not expired
   */
  private getCache(key: string, ttl: number): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache data
   */
  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Check if request should be retried
   */
  private shouldRetry(error: AxiosError, request: InternalAxiosRequestConfig & { _retryCount?: number }): boolean {
    const retryCount = request._retryCount || 0;
    const status = error.response?.status;
    
    return (
      retryCount < this.retryConfig.maxRetries &&
      (!status || this.retryConfig.retryableStatuses.includes(status))
    );
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Handle and format errors
   */
  private handleError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      
      return {
        message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
        code: axiosError.response?.data?.code || axiosError.code || 'UNKNOWN_ERROR',
        status: axiosError.response?.status || 500,
        errors: axiosError.response?.data?.errors,
        timestamp: new Date().toISOString()
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500,
      timestamp: new Date().toISOString()
    };
  }
}

export const apiService = new ApiService();

