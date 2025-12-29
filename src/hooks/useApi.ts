/**
 * React Hook for API Integration
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiService } from '../api';
import type { ApiError } from '../api';

/**
 * Generic API Hook State
 */
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Hook for GET requests with auto-fetch
 */
export function useApi<T>(
  url: string,
  options?: {
    params?: Record<string, any>;
    cache?: { enabled: boolean; ttl: number };
    skip?: boolean;
  }
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: !options?.skip,
    error: null
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (options?.skip) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiService.get<T>(url, {
        params: options?.params,
        cache: options?.cache,
        signal: abortControllerRef.current.signal
      });

      setState({
        data: response.data,
        loading: false,
        error: null
      });
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setState({
          data: null,
          loading: false,
          error: error as ApiError
        });
      }
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<TData, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>
): {
  mutate: (variables: TVariables) => Promise<void>;
  data: TData | null;
  loading: boolean;
  error: ApiError | null;
  reset: () => void;
} {
  const [state, setState] = useState<UseApiState<TData>>({
    data: null,
    loading: false,
    error: null
  });

  const mutate = useCallback(async (variables: TVariables) => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await mutationFn(variables);
      setState({
        data: result,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error as ApiError
      });
      throw error;
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    mutate,
    ...state,
    reset
  };
}

/**
 * Hook for pagination
 */
export function usePagination<T>(
  url: string,
  initialPage: number = 1,
  initialLimit: number = 10,
  params?: Record<string, any>
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  
  const { data, loading, error, refetch } = useApi<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(url, {
    params: { page, limit, ...params }
  });

  const nextPage = useCallback(() => {
    if (data?.pagination && page < data.pagination.totalPages) {
      setPage(p => p + 1);
    }
  }, [page, data?.pagination]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(p => p - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  return {
    data: data?.data || [],
    pagination: data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 },
    loading,
    error,
    refetch,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    page,
    limit
  };
}

/**
 * Hook for file upload with progress
 */
export function useFileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const upload = useCallback(async (
    url: string,
    file: File,
    fieldName: string = 'file',
    additionalData?: Record<string, any>
  ) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await apiService.uploadFile(
        url,
        file,
        fieldName,
        additionalData,
        setProgress
      );
      
      setUploading(false);
      return result;
    } catch (err: any) {
      setError(err as ApiError);
      setUploading(false);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setProgress(0);
    setUploading(false);
    setError(null);
  }, []);

  return {
    upload,
    progress,
    uploading,
    error,
    reset
  };
}

/**
 * USAGE EXAMPLES
 */

// Example 1: Fetch users automatically
// const { data: users, loading, error, refetch } = useApi<User[]>('/users');

// Example 2: Fetch with cache
// const { data: settings } = useApi<Settings>('/settings', {
//   cache: { enabled: true, ttl: 60000 }
// });

// Example 3: Mutation
// const { mutate: createUser, loading } = useMutation(async (userData: CreateUserDTO) => {
//   const response = await apiService.post<User>('/users', userData);
//   return response.data;
// });
// await createUser({ name: 'John', email: 'john@example.com' });

// Example 4: Pagination
// const { data, pagination, loading, nextPage, prevPage } = usePagination<User>('/users', 1, 10);

// Example 5: File Upload
// const { upload, progress, uploading } = useFileUpload();
// await upload('/upload', file, 'avatar');
