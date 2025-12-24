import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: "emerald" | "blue" | "purple" | "orange" | "red" | "yellow";
}

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600 text-emerald-100",
  blue: "from-blue-500 to-blue-600 text-blue-100",
  purple: "from-purple-500 to-purple-600 text-purple-100",
  orange: "from-orange-500 to-orange-600 text-orange-100",
  red: "from-red-500 to-red-600 text-red-100",
  yellow: "from-yellow-500 to-yellow-600 text-yellow-100",
};

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = "emerald" 
}) => {
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <span className="text-5xl opacity-50">{icon}</span>
      </div>
    </div>
  );
};
