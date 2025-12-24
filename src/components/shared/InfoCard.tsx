import React from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
  color?: "emerald" | "blue" | "orange" | "red" | "yellow" | "purple";
}

const colorClasses = {
  emerald: "bg-emerald-50 border-emerald-600 text-emerald-800 text-emerald-600",
  blue: "bg-blue-50 border-blue-600 text-blue-800 text-blue-600",
  orange: "bg-orange-50 border-orange-600 text-orange-800 text-orange-600",
  red: "bg-red-50 border-red-600 text-red-800 text-red-600",
  yellow: "bg-yellow-50 border-yellow-600 text-yellow-800 text-yellow-600",
  purple: "bg-purple-50 border-purple-600 text-purple-800 text-purple-600",
};

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, color = "emerald" }) => {
  const [bgColor, borderColor, titleColor, valueColor] = colorClasses[color].split(" ");
  
  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded`}>
      <h3 className={`font-semibold ${titleColor} mb-2`}>{title}</h3>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
};
