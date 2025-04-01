"use client";

import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  variant?: "solid" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rounded?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color = "primary",
  variant = "solid",
  type = "button",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  icon = null,
  iconPosition = "left",
  rounded = false,
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium shadow-sm focus:outline-none transition-all duration-200";
  
  // Size variations
  const sizeStyles = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm leading-4",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-2 text-base",
    xl: "px-6 py-3 text-base",
  };
  
  // Color and variant combinations
  const styles = {
    solid: {
      primary: "bg-[#fbe216] hover:bg-[#e6cf14] text-gray-900 border border-transparent",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white border border-transparent",
      success: "bg-green-600 hover:bg-green-700 text-white border border-transparent",
      danger: "bg-red-600 hover:bg-red-700 text-white border border-transparent",
      warning: "bg-yellow-400 hover:bg-yellow-500 text-white border border-transparent",
      info: "bg-sky-500 hover:bg-sky-600 text-white border border-transparent",
      light: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-transparent",
      dark: "bg-gray-800 hover:bg-gray-900 text-white border border-transparent",
    },
    outline: {
      primary: "bg-transparent hover:bg-[#fbe216]/10 text-[#e6cf14] hover:text-[#d1ba12] border border-[#fbe216]",
      secondary: "bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-800 border border-gray-500",
      success: "bg-transparent hover:bg-green-50 text-green-700 hover:text-green-800 border border-green-500",
      danger: "bg-transparent hover:bg-red-50 text-red-700 hover:text-red-800 border border-red-500",
      warning: "bg-transparent hover:bg-yellow-50 text-yellow-700 hover:text-yellow-800 border border-yellow-500",
      info: "bg-transparent hover:bg-sky-50 text-sky-700 hover:text-sky-800 border border-sky-500",
      light: "bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-800 border border-gray-300",
      dark: "bg-transparent hover:bg-gray-700 text-gray-800 hover:text-gray-900 border border-gray-800",
    },
    ghost: {
      primary: "bg-transparent hover:bg-[#fbe216]/10 text-[#e6cf14] hover:text-[#d1ba12] border border-transparent",
      secondary: "bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800 border border-transparent",
      success: "bg-transparent hover:bg-green-50 text-green-600 hover:text-green-800 border border-transparent",
      danger: "bg-transparent hover:bg-red-50 text-red-600 hover:text-red-800 border border-transparent",
      warning: "bg-transparent hover:bg-yellow-50 text-yellow-600 hover:text-yellow-800 border border-transparent",
      info: "bg-transparent hover:bg-sky-50 text-sky-600 hover:text-sky-800 border border-transparent",
      light: "bg-transparent hover:bg-gray-50 text-gray-500 hover:text-gray-700 border border-transparent",
      dark: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-transparent",
    },
  };

  // Width, radius and disabled styles
  const widthStyles = fullWidth ? "w-full" : "";
  const roundedStyles = rounded ? "rounded-full" : "rounded-md";
  const disabledStyles = disabled 
    ? "opacity-60 cursor-not-allowed pointer-events-none" 
    : "";

  // Icon spacing
  const iconSpacing = text ? (iconPosition === "left" ? "mr-2" : "ml-2") : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]} 
        ${styles[variant][color]}
        ${widthStyles} 
        ${roundedStyles}
        ${disabledStyles}
        ${className}
      `}
    >
      {icon && iconPosition === "left" && (
        <span className={iconSpacing}>{icon}</span>
      )}
      {text}
      {icon && iconPosition === "right" && (
        <span className={iconSpacing}>{icon}</span>
      )}
    </button>
  );
};

export default Button; 