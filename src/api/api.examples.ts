/**
 * API Service Usage Examples
 */

import { apiService } from './api.service';
import type { ApiResponse, PaginatedResponse } from './api.types';

// ==================== BASIC CRUD OPERATIONS ====================

/**
 * GET Request Example
 */
export const getUsers = async () => {
  try {
    const response = await apiService.get<User[]>('/users');
    console.log('Users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * GET with Caching Example
 */
export const getUsersWithCache = async () => {
  const response = await apiService.get<User[]>('/users', {
    cache: {
      enabled: true,
      ttl: 5 * 60 * 1000 // 5 minutes
    }
  });
  return response.data;
};

/**
 * POST Request Example
 */
export const createUser = async (userData: CreateUserDTO) => {
  const response = await apiService.post<User>('/users', userData);
  return response.data;
};

/**
 * PUT Request Example
 */
export const updateUser = async (userId: string, userData: Partial<User>) => {
  const response = await apiService.put<User>(`/users/${userId}`, userData);
  return response.data;
};

/**
 * DELETE Request Example
 */
export const deleteUser = async (userId: string) => {
  const response = await apiService.delete(`/users/${userId}`);
  return response;
};

// ==================== PAGINATION ====================

/**
 * Paginated Request Example
 */
export const getUsersPaginated = async (page: number = 1, limit: number = 10) => {
  const response = await apiService.getPaginated<User>('/users', page, limit, {
    params: {
      sortBy: 'createdAt',
      order: 'desc'
    }
  });
  
  console.log('Page:', response.pagination.page);
  console.log('Total:', response.pagination.total);
  return response;
};

// ==================== FILE OPERATIONS ====================

/**
 * File Upload Example
 */
export const uploadAvatar = async (
  file: File, 
  userId: string,
  onProgress?: (progress: number) => void
) => {
  const response = await apiService.uploadFile<{ url: string }>(
    '/users/avatar',
    file,
    'avatar',
    { userId },
    onProgress
  );
  
  return response.data.url;
};

/**
 * File Download Example
 */
export const downloadReport = async (
  reportId: string,
  onProgress?: (progress: number) => void
) => {
  await apiService.downloadFile(
    `/reports/${reportId}/download`,
    `report-${reportId}.pdf`,
    onProgress
  );
};

// ==================== BATCH REQUESTS ====================

/**
 * Batch Requests Example
 */
export const fetchDashboardData = async () => {
  const [users, stats, activities] = await apiService.batch([
    () => apiService.get<User[]>('/users'),
    () => apiService.get<Stats>('/stats'),
    () => apiService.get<Activity[]>('/activities')
  ]);

  return {
    users: users.data,
    stats: stats.data,
    activities: activities.data
  };
};

// ==================== REQUEST CANCELLATION ====================

/**
 * Cancellable Request Example (for search)
 */
export const searchUsers = async (query: string, signal?: AbortSignal) => {
  const response = await apiService.get<User[]>('/users/search', {
    params: { q: query },
    signal
  });
  
  return response.data;
};

// Usage with React:
// const abortController = new AbortController();
// searchUsers(query, abortController.signal);
// return () => abortController.abort(); // cleanup

// ==================== AUTHENTICATION ====================

/**
 * Login Example - Tokens stored in sessionStorage
 */
export const login = async (email: string, password: string) => {
  const response = await apiService.post<AuthResponse>('/auth/login', {
    email,
    password
  });

  const { accessToken, refreshToken } = response.data;
  apiService.setTokens(accessToken, refreshToken);
  
  return response.data;
};

/**
 * Logout Example
 */
export const logout = async () => {
  try {
    await apiService.post('/auth/logout');
  } finally {
    apiService.clearAuth();
    apiService.clearCache();
  }
};

// ==================== MULTI-TENANT SAAS ====================

/**
 * Set Tenant Context
 */
export const setActiveTenant = (tenantId: string) => {
  apiService.setTenantId(tenantId);
};

/**
 * Tenant-Specific Request
 */
export const getTenantSettings = async () => {
  // Tenant ID is automatically added to headers
  const response = await apiService.get<TenantSettings>('/tenant/settings');
  return response.data;
};

// ==================== TYPES ====================

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

interface CreateUserDTO {
  email: string;
  name: string;
  role: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
}

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

interface TenantSettings {
  tenantId: string;
  name: string;
  logo: string;
  theme: Record<string, any>;
}
