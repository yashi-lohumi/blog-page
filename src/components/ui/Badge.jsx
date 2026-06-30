import React from "react";

export default function Badge({
  children,
  variant = "orange", // orange | violet | primary | dark
  className = ""
}) {
  const baseStyle = "inline-block px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider select-none";
  
  const variants = {
    orange: "bg-action-orange/10 text-action-orange",
    violet: "bg-secondary/10 text-secondary",
    primary: "bg-primary text-white",
    dark: "bg-surface-container-highest text-primary"
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
