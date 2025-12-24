import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../shared/SearchInput";
import { Avatar } from "../shared/Avatar";
import { ROUTES } from "../../constants";

export const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center flex-1 max-w-xl">
          <SearchInput />
        </div>

        {/* Right Section - Icons & Profile */}
        <div className="flex items-center space-x-6 ml-6">
          {/* Notifications */}
          <button className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <span className="text-2xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <span className="text-2xl">💬</span>
          </button>

          {/* Settings */}
          <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <span className="text-2xl">⚙️</span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <Avatar initials="AD" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <span className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@weboc.com</p>
                </div>
                
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span>My Profile</span>
                </button>
                
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-200 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
