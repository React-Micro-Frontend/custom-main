// User Management specific types

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface UserFormData {
  email: string;
  name: string;
  role: string;
  password?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  pendingApprovals: number;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: 'registration' | 'update' | 'deactivation';
}

class UserService {
  private readonly BASE_URL = '/api/users';

  async getUsers(): Promise<UserData[]> {
    // Mock implementation - replace with actual API call
    return Promise.resolve([
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        role: 'User',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  async getUserById(id: string): Promise<UserData> {
    // Mock implementation
    return Promise.resolve({
      id,
      email: 'john@example.com',
      name: 'John Doe',
      role: 'User',
      status: 'active',
      createdAt: new Date().toISOString(),
    });
  }

  async createUser(data: UserFormData): Promise<UserData> {
    // Mock implementation
    return Promise.resolve({
      id: Math.random().toString(36),
      ...data,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    });
  }

  async updateUser(id: string, data: Partial<UserFormData>): Promise<UserData> {
    // Mock implementation
    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }
}

export const userService = new UserService();
