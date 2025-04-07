import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                children,
                                                onClick,
                                                variant = 'primary',
                                                className = ''
                                              }) => {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'bg-gray-600 hover:bg-gray-700'
  };

  return (
      <button
          onClick={onClick}
          className={`px-4 py-2 rounded-md transition ${variants[variant]} ${className}`}
      >
        {children}
      </button>
  );
};