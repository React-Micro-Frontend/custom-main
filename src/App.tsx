import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { UserManagement } from "./pages/UserManagement";
import { PostClearanceAudit } from "./pages/PostClearanceAudit";
import { LicenseManagement } from "./pages/LicenseManagement";
import { EAuctionManagement } from "./pages/EAuctionManagement";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route - No Sidebar/Navbar */}
        <Route path="/login" element={<Login />} />
        
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
                    <Route path="/" element={<Home />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/post-clearance-audit" element={<PostClearanceAudit />} />
                    <Route path="/license-management" element={<LicenseManagement />} />
                    <Route path="/e-auction-management" element={<EAuctionManagement />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
