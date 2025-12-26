# Custom Main - Shell/Host Application

## 🏛️ Overview

The **Shell Application** is the container and orchestrator for all micro frontends in the WeBoc Transformation project. It provides shared components, state management, routing, and common UI elements.

### Role in Architecture
- **Container**: Hosts and loads remote micro frontends
- **State Manager**: Provides centralized Redux store
- **Component Library**: Exposes shared UI components
- **Router**: Manages application-wide routing
- **Auth Provider**: Handles authentication and authorization

---

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Navbar.tsx          # Top navigation with user menu
│   │   ├── Sidebar.tsx         # Side navigation menu
│   │   └── index.ts            # Layout exports
│   └── shared/                 # Shared components (Module Federation)
│       ├── Button.tsx          # Reusable button with variants
│       ├── Card.tsx            # Card container component
│       ├── PageHeader.tsx      # Page title and breadcrumb
│       ├── StatCard.tsx        # Statistics display card
│       ├── InfoCard.tsx        # Information display card
│       ├── SearchInput.tsx     # Search input component
│       ├── Avatar.tsx          # User avatar component
│       ├── LoadingSpinner.tsx  # Loading state indicator
│       ├── QuickLinkCard.tsx   # Dashboard quick link card
│       └── index.ts            # Shared component exports
├── config/
│   └── app.config.ts           # Application-wide configuration
│       - API base URLs
│       - Environment settings
│       - Feature flags
├── constants/
│   ├── index.ts                # General constants
│   ├── routes.ts               # Route path definitions
│   └── ui.ts                   # UI constants (colors, sizes)
├── contexts/
│   ├── AuthContext.tsx         # Authentication context provider
│   │   - User authentication state
│   │   - Login/Logout functions
│   │   - Protected route logic
│   └── index.ts                # Context exports
├── hooks/
│   ├── useDebounce.ts          # Debounce hook for search/input
│   ├── useLocalStorage.ts      # LocalStorage state management
│   └── index.ts                # Custom hook exports
├── pages/
│   ├── Landing.tsx             # Public landing page (root /)
│   ├── Home.tsx                # Dashboard page (/dashboard)
│   ├── Login.tsx               # Login page
│   ├── UserManagement.tsx      # User MFE wrapper page
│   ├── EAuctionManagement.tsx  # E-Auction MFE wrapper
│   ├── LicenseManagement.tsx   # License MFE wrapper
│   └── PostClearanceAudit.tsx  # Audit MFE wrapper
├── routes/
│   └── AppRouter.tsx           # Main router configuration
├── services/
│   ├── api.service.ts          # HTTP client wrapper (Axios)
│   ├── auth.service.ts         # Authentication service
│   └── index.ts                # Service exports
├── store/
│   ├── index.ts                # Redux store configuration
│   ├── hooks.ts                # Typed useDispatch & useSelector
│   └── slices/
│       ├── userSlice.ts        # User state management
│       └── counterSlice.ts     # Example slice (demo)
├── types/
│   └── index.ts                # TypeScript type definitions
├── utils/
│   └── index.ts                # Utility functions
├── App.tsx                     # Root application component
├── Bootstrap.tsx               # App initialization wrapper
├── index.tsx                   # Application entry point
├── index.css                   # Global styles
├── styles.css                  # Tailwind CSS imports
└── remotes.d.ts                # Module Federation type definitions
```

---

## 🔌 Module Federation Configuration

### Exposed Modules
```javascript
exposes: {
  // Shared Components
  "./components/shared": "./src/components/shared",
  "./PageHeader": "./src/components/shared/PageHeader.tsx",
  "./StatCard": "./src/components/shared/StatCard.tsx",
  "./Card": "./src/components/shared/Card.tsx",
  "./Button": "./src/components/shared/Button.tsx",
  
  // Redux Store
  "./store": "./src/store/index.ts",
  "./store/hooks": "./src/store/hooks.ts",
  "./store/slices/userSlice": "./src/store/slices/userSlice.ts",
  
  // Styles
  "./TailwindStyles": "./src/styles.css"
}
```

### Remote Modules
```javascript
remotes: {
  userManagement: "userManagement@[URL]/remoteEntry.js",
  postClearanceAudit: "postClearanceAudit@[URL]/remoteEntry.js",
  licenseManagement: "licenseManagement@[URL]/remoteEntry.js",
  eAuctionManagement: "eAuctionManagement@[URL]/remoteEntry.js"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation
```bash
npm install
```

### Development
```bash
npm start
# Runs on http://localhost:5000
# Landing page: http://localhost:5000/
# Dashboard: http://localhost:5000/dashboard
```

### Build
```bash
npm run build
# Creates production build in dist/
```

---

## 📝 Key Features

### Landing Page
Professional public landing page at the root URL (`/`) showcasing:
- Platform overview and key statistics
- All 4 micro frontend modules with descriptions
- Technology stack highlights
- Call-to-action buttons for Dashboard and Sign In

See [LANDING_PAGE.md](./LANDING_PAGE.md) for detailed documentation.

### Component Library
All shared components are exposed via Module Federation and can be imported by remote applications.

### State Management
Centralized Redux store shared across all micro frontends for consistent state.

### Routing
React Router manages navigation between local pages and remote micro frontends.

**Route Structure:**
- `/` - Landing page (public, no sidebar)
- `/dashboard` - Main dashboard (authenticated, with sidebar)
- `/login` - Login page (public, no sidebar)
- `/user-management` - User module
- `/e-auction-management` - Auction module
- `/license-management` - License module
- `/post-clearance-audit` - Audit module

### Authentication
AuthContext provides authentication state and functions to all applications.

---

## 🔗 Related Documentation

- [LANDING_PAGE.md](./LANDING_PAGE.md) - Landing page implementation details
- [ARCHITECTURE.md](../ARCHITECTURE.md) - Overall architecture
- [DEPLOYMENT_QUICKSTART.md](../DEPLOYMENT_QUICKSTART.md) - Deployment guide

---

## 📞 Support

For issues or questions, refer to the main project documentation.
