import React from "react";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = "md",
  color = "bg-gradient-to-br from-emerald-500 to-emerald-600"
}) => {
  return (
    <div className={`${sizeClasses[size]} rounded-full ${color} flex items-center justify-center`}>
      <span className="text-white font-semibold">{initials}</span>
    </div>
  );
};
