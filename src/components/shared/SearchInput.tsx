import React from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = "Search...", 
  value, 
  onChange 
}) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
    </div>
  );
};
