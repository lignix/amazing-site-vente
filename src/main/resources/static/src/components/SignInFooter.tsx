// src/components/SignInFooter.tsx
import React from "react";
import { Link } from "react-router-dom";

interface InputProps {
  text: string;
  linkText: string;
  link: string;
}

const Input: React.FC<InputProps> = ({ text, link, linkText }) => {
  return (
    <div className="mt-4 text-center">
      <span className="text-sm text-gray-300">
        {text}{" "}
        <Link to={link} className="text-blue-200 hover:text-blue-400">
          {linkText}
        </Link>
      </span>
    </div>
  );
};

export default Input;
