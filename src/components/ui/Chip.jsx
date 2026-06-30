import React from "react";

export default function Chip({
  label,
  active = false,
  onClick,
  onKeyDown,
  tabIndex = 0,
  className = ""
}) {
  const baseStyle = "px-4 py-2 text-label-md font-label-md rounded-full transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange whitespace-nowrap border";
  
  const activeStyle = active
    ? "bg-primary text-white border-primary"
    : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high border-outline-variant/30";

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={active}
      className={`${baseStyle} ${activeStyle} ${className}`}
    >
      {label}
    </div>
  );
}
