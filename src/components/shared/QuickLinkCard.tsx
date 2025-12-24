import React from "react";

interface QuickLinkCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
};
