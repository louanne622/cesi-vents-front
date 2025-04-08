import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  text: string;
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outline';
  icon?: React.ReactElement<IconType>;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  color = 'primary',
  variant = 'solid',
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors';
  
  const colorStyles = {
    primary: {
      solid: 'bg-[#fbe216] text-black hover:bg-[#e6c914]',
      outline: 'border-2 border-[#fbe216] text-[#fbe216] hover:bg-[#fbe216]/10',
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600/10',
    },
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles[color][variant]} ${className}`}
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