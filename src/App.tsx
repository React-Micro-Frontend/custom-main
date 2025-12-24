import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { UserManagement } from "./pages/UserManagement";
import { PostClearanceAudit } from "./pages/PostClearanceAudit";
import { LicenseManagement } from "./pages/LicenseManagement";
import { EAuctionManagement } from "./pages/EAuctionManagement";
import { Login } from "./pages/Login";
import { ROUTES } from "./constants";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Login Route - No Sidebar/Navbar */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          
          {/* Main App Routes - With Sidebar/Navbar */}
          <Route
            path="/*"
            element={
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path={ROUTES.HOME} element={<Home />} />
                      <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagement />} />
                      <Route path={ROUTES.POST_CLEARANCE_AUDIT} element={<PostClearanceAudit />} />
                      <Route path={ROUTES.LICENSE_MANAGEMENT} element={<LicenseManagement />} />
                      <Route path={ROUTES.E_AUCTION_MANAGEMENT} element={<EAuctionManagement />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}
