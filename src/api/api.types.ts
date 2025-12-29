/**
 * API Service Type Definitions
 */

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface RequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  timeout?: number;
  withCredentials?: boolean;
}

export interface CacheConfig {
  enabled: boolean;
  ttl: number; // Time to live in milliseconds
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatuses: number[];
}
