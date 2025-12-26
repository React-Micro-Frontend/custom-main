import React, { Suspense, lazy, memo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { ROUTES } from "./constants";

// Lazy load pages for better performance
const Landing = lazy(() => import(/* webpackChunkName: "landing" */ "./pages/Landing").then(m => ({ default: m.Landing })));
const Login = lazy(() => import(/* webpackChunkName: "login" */ "./pages/Login").then(m => ({ default: m.Login })));
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home").then(m => ({ default: m.Home })));
const UserManagement = lazy(() => import(/* webpackChunkName: "user-mgmt" */ "./pages/UserManagement").then(m => ({ default: m.UserManagement })));
const PostClearanceAudit = lazy(() => import(/* webpackChunkName: "audit" */ "./pages/PostClearanceAudit").then(m => ({ default: m.PostClearanceAudit })));
const LicenseManagement = lazy(() => import(/* webpackChunkName: "license" */ "./pages/LicenseManagement").then(m => ({ default: m.LicenseManagement })));
const EAuctionManagement = lazy(() => import(/* webpackChunkName: "auction" */ "./pages/EAuctionManagement").then(m => ({ default: m.EAuctionManagement })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Memoized layout component
const AppLayout = memo(() => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagement />} />
            <Route path={ROUTES.POST_CLEARANCE_AUDIT} element={<PostClearanceAudit />} />
            <Route path={ROUTES.LICENSE_MANAGEMENT} element={<LicenseManagement />} />
            <Route path={ROUTES.E_AUCTION_MANAGEMENT} element={<EAuctionManagement />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  </div>
));

AppLayout.displayName = 'AppLayout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing Page - No Sidebar/Navbar */}
            <Route path={ROUTES.LANDING} element={<Landing />} />
            
            {/* Login Route - No Sidebar/Navbar */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            
            {/* Main App Routes - With Sidebar/Navbar */}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default memo(App);
