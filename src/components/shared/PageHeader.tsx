import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </div>
  );
};
