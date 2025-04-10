"use client";

import React from "react";
import { IconType } from 'react-icons';


interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  text: string;
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;

  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  color = 'primary',
  variant = 'solid',
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  size = 'md',
  fullWidth = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors';
  
  const colorStyles = {
    primary: {
      solid: 'bg-[#fbe216] text-black hover:bg-[#e6c914]',
      outline: 'border-2 border-[#fbe216] text-[#fbe216] hover:bg-[#fbe216] hover:text-black'
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white'
    },
    danger: {
      solid: 'bg-red-500 text-white hover:bg-red-600',
      outline: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
    }
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles[color][variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {icon && !text ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {text}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
} 