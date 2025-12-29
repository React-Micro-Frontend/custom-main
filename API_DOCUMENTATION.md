# 🚀 Enterprise API Wrapper - Complete Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Advanced Features](#advanced-features)
6. [React Hooks](#react-hooks)
7. [Best Practices](#best-practices)

---

## Overview

A production-ready API service wrapper for SaaS applications with TypeScript support, built on Axios.

**Storage Strategy:** All tokens and authentication data are stored in **sessionStorage** for enhanced security. Data is cleared automatically when the browser tab/window is closed.

## Features

✅ **Authentication**
- Automatic token refresh
- **SessionStorage-based** token management (secure, auto-clear on tab close)
- Secure token handling

✅ **Request Management**
- Request/Response interceptors
- Automatic retry with exponential backoff
- Request cancellation
- Request deduplication

✅ **Caching**
- Built-in response caching
- TTL (Time To Live) support
- Cache invalidation

✅ **File Operations**
- File upload with progress tracking
- File download with progress tracking
- Multi-part form data support

✅ **Multi-Tenant SaaS**
- Tenant ID injection
- Tenant-aware requests
- Tenant context management

✅ **Error Handling**
- Standardized error format
- Error logging
- Retry logic for transient errors

✅ **Developer Experience**
- Full TypeScript support
- React hooks for easy integration
- Comprehensive examples

---

## Basic Usage

### 1. Simple GET Request

\`\`\`typescript
import { apiService } from 'customMain/api';

const users = await apiService.get<User[]>('/users');
console.log(users.data);
\`\`\`

### 2. POST Request

\`\`\`typescript
const newUser = await apiService.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
\`\`\`

### 3. PUT/PATCH Request

\`\`\`typescript
const updated = await apiService.put<User>(\`/users/\${id}\`, {
  name: 'Jane Doe'
});
\`\`\`

### 4. DELETE Request

\`\`\`typescript
await apiService.delete(\`/users/\${id}\`);
\`\`\`

---

## Advanced Features

### Caching

\`\`\`typescript
const users = await apiService.get<User[]>('/users', {
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes
  }
});
\`\`\`

### Pagination

\`\`\`typescript
const result = await apiService.getPaginated<User>('/users', 1, 10);

console.log(result.data); // Users array
console.log(result.pagination.total); // Total count
console.log(result.pagination.totalPages); // Total pages
\`\`\`

### File Upload

\`\`\`typescript
const result = await apiService.uploadFile(
  '/upload/avatar',
  file,
  'avatar',
  { userId: '123' },
  (progress) => console.log(\`Upload: \${progress}%\`)
);
\`\`\`

### File Download

\`\`\`typescript
await apiService.downloadFile(
  '/reports/123/download',
  'report.pdf',
  (progress) => console.log(\`Download: \${progress}%\`)
);
\`\`\`

### Batch Requests

\`\`\`typescript
const [users, stats, activities] = await apiService.batch([
  () => apiService.get('/users'),
  () => apiService.get('/stats'),
  () => apiService.get('/activities')
]);
\`\`\`

### Request Cancellation

\`\`\`typescript
const controller = new AbortController();

apiService.get('/search', {
  params: { q: 'query' },
  signal: controller.signal
});

// Cancel the request
controller.abort();
\`\`\`

---

## React Hooks

### useApi Hook (Auto-fetch)

\`\`\`typescript
import { useApi } from 'customMain/hooks';

function UserList() {
  const { data, loading, error, refetch } = useApi<User[]>('/users');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
\`\`\`

### useMutation Hook

\`\`\`typescript
import { useMutation } from 'customMain/hooks';
import { apiService } from 'customMain/services';

function CreateUserForm() {
  const { mutate, loading, error } = useMutation(async (data) => {
    const response = await apiService.post<User>('/users', data);
    return response.data;
  });

  const handleSubmit = async (formData) => {
    try {
      await mutate(formData);
      alert('User created!');
    } catch (err) {
      console.error(err);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
\`\`\`

### usePagination Hook

\`\`\`typescript
import { usePagination } from 'customMain/hooks';

function UserTable() {
  const { 
    data, 
    pagination, 
    loading, 
    nextPage, 
    prevPage,
    goToPage 
  } = usePagination<User>('/users', 1, 10);

  return (
    <div>
      <table>
        {data.map(user => <tr key={user.id}>...</tr>)}
      </table>
      
      <div>
        <button onClick={prevPage} disabled={pagination.page === 1}>
          Previous
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button 
          onClick={nextPage} 
          disabled={pagination.page === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
\`\`\`

### useFileUpload Hook

\`\`\`typescript
import { useFileUpload } from 'customMain/hooks';

function AvatarUpload() {
  const { upload, progress, uploading } = useFileUpload();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const result = await upload('/upload/avatar', file, 'avatar');
      console.log('Uploaded:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <progress value={progress} max={100} />}
    </div>
  );
}
\`\`\`

---

## Authentication

### Login

\`\`\`typescript
import { apiService } from 'customMain/api';

const response = await apiService.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
});

const { accessToken, refreshToken } = response.data;
apiService.setTokens(accessToken, refreshToken); // Stored in sessionStorage
\`\`\`

### Logout

\`\`\`typescript
apiService.clearAuth();
apiService.clearCache();
// Redirect to login
\`\`\`

### Multi-Tenant

\`\`\`typescript
// Set active tenant
apiService.setTenantId('tenant-123');

// All subsequent requests will include X-Tenant-ID header
const data = await apiService.get('/tenant/settings');
\`\`\`

---

## Best Practices

### 1. Error Handling

\`\`\`typescript
try {
  const response = await apiService.get('/users');
  // Handle success
} catch (error: ApiError) {
  console.error(error.message);
  console.error(error.code);
  console.error(error.status);
}
\`\`\`

### 2. TypeScript Types

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const users = await apiService.get<User[]>('/users');
// users.data is typed as User[]
\`\`\`

### 3. Request Cancellation in React

\`\`\`typescript
useEffect(() => {
  const controller = new AbortController();
  
  apiService.get('/search', {
    params: { q: searchQuery },
    signal: controller.signal
  });

  return () => controller.abort(); // Cleanup
}, [searchQuery]);
\`\`\`

### 4. Cache Management

\`\`\`typescript
// Clear all cache
apiService.clearCache();

// Clear specific cache
apiService.clearCacheEntry('/users');
\`\`\`

---

## Configuration

Update `src/config/app.config.ts`:

\`\`\`typescript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  TIMEOUT: 30000, // 30 seconds
};
\`\`\`

---

## Exposed Modules (Module Federation)

All services and hooks are exposed via Module Federation:

\`\`\`typescript
// In remote apps, import from customMain:
import { apiService } from 'customMain/api';
import { useApi, useMutation } from 'customMain/hooks';
import type { ApiResponse, ApiError } from 'customMain/api';

// Or from services (re-exports from api)
import { apiService } from 'customMain/services';
\`\`\`

---

## Support

For issues or questions, contact the development team.
