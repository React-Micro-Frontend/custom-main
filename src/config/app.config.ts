// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Remote Configuration
export const REMOTE_CONFIG = {
  USER_MANAGEMENT: process.env.REMOTE_USER_MANAGEMENT_URL || 'http://localhost:5001/remoteEntry.js',
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'WeBoc Transformation',
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.HOST_PORT || '5000'),
};
