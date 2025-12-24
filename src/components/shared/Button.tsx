import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  primary: "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary",
  size = "md",
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${className}`}
    >
      {children}
    </button>
  );
};
