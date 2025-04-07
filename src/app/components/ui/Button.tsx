"use client";

import React from "react";
import { IconType } from 'react-icons';

interface ButtonProps {
  text: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  variant?: 'solid' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
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
  type = 'button',
  size = 'md',
  fullWidth = false,
  disabled = false,
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
    success: {
      solid: 'bg-green-500 text-white hover:bg-green-600',
      outline: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
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
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${colorStyles[color][variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
} 