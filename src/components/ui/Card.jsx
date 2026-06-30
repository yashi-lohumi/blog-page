import React from "react";

export default function Card({
  children,
  className = "",
  hoverable = true,
  onClick,
  ...props
}) {
  const baseStyle = "bg-surface-alt rounded overflow-hidden transition-all duration-300 border border-outline-variant/20";
  const hoverStyle = hoverable ? "editorial-card-shadow hover:-translate-y-0.5 hover:shadow-md cursor-pointer" : "";

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
