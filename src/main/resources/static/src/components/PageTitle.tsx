// src/components/PageTitle.tsx
import React from "react";

interface InputProps {
  children: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ children, className = "" }) => {
  return (
    <h1 className={`text-4xl font-bold text-blue-600 mb-4 ${className}`}>
      {children}
    </h1>
  );
};

export default Input;
