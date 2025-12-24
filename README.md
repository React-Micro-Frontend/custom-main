# WeBoc Transformation - Host Application

This is the host application for the WeBoc Transformation SaaS platform, built using Module Federation architecture.

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   └── shared/         # Shared components exposed to remotes
├── config/             # Application configuration
├── constants/          # App-wide constants
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API and business logic services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file:
```env
NODE_ENV=development
REMOTE_USER_MANAGEMENT_URL=http://localhost:5001/remoteEntry.js
HOST_PORT=5000
REACT_APP_API_URL=http://localhost:3000/api
```

### Development
```bash
npm start
```

### Build
```bash
npm run build
```

## 📦 Module Federation

This host application exposes the following modules:
- `./components/shared` - All shared UI components
- `./TailwindStyles` - Shared Tailwind CSS styles

## 🔌 Remote Applications
- User Management (port 5001)

## 🛠️ Tech Stack
- React 19
- TypeScript
- Tailwind CSS
- Webpack 5 (Module Federation)
- React Router DOM

## 📝 Best Practices
- Use constants for routes and configuration
- Leverage shared components for consistency
- Type-safe with TypeScript
- Service layer for API calls
- Custom hooks for reusable logic
