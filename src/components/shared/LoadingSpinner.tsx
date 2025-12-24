import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...",
  size = "md"
}) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-emerald-600 mx-auto`}></div>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};
