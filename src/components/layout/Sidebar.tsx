import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES, MENU_ITEMS } from "../../constants";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-[100vh] bg-gradient-to-b from-emerald-900 to-emerald-950 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-emerald-700">
        <Link to={ROUTES.HOME}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
            WeBOC Transformation
          </h1>
          <p className="text-emerald-300 text-xs mt-1">Management Portal</p>
        </Link>
      </div>

      <nav className="flex-1 py-6">
        {MENU_ITEMS.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block px-4 py-3 mx-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-emerald-800 hover:shadow-lg hover:translate-x-1 group ${
              isActive(item.path) ? "bg-emerald-800 shadow-lg" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className={`text-sm font-medium group-hover:text-white ${
                isActive(item.path) ? "text-white" : "text-emerald-100"
              }`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-emerald-700">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-100">Admin User</p>
            <p className="text-xs text-emerald-400">admin@weboc.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};