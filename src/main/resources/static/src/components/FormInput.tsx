// src/components/Input.tsx
import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-lg font-medium text-blue-400 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-3 py-2 border border-gray-300 bg-gray-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
