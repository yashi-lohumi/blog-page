import React from "react";

export default function Button({
  children,
  variant = "primary", // primary | secondary | outline | text | icon
  size = "md", // sm | md | lg
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ariaLabel,
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-action-orange shadow-sm",
    secondary: "bg-surface-container-high text-primary hover:bg-surface-container-highest",
    outline: "bg-transparent border border-outline hover:border-primary text-primary",
    text: "bg-transparent text-primary hover:text-action-orange",
    icon: "p-2 hover:bg-surface-container-high rounded-full text-primary hover:text-action-orange"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-label-sm",
    md: "px-6 py-2 text-label-md",
    lg: "px-8 py-3 text-body-lg",
    icon: "p-2"
  };

  const appliedSize = variant === "icon" ? "" : sizes[size];
  const appliedVariant = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${appliedVariant} ${appliedSize} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
