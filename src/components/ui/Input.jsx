import React from "react";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  error = "",
  ariaLabel,
  ...props
}) {
  const baseStyle = "w-full bg-transparent border border-outline-variant rounded px-4 py-2.5 text-body-md text-primary placeholder:text-on-surface-variant/40 focus:outline-none focus:border-action-orange focus:ring-1 focus:ring-action-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseStyle} ${error ? "border-error focus:ring-error focus:border-error" : ""} ${className}`}
        aria-label={ariaLabel}
        {...props}
      />
      {error && <p className="text-error text-label-sm mt-1">{error}</p>}
    </div>
  );
}
