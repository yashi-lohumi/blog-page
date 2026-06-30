import React from "react";

export default function Avatar({
  src,
  alt = "Avatar",
  size = "md", // sm | md | lg
  className = ""
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  return (
    <img
      src={src || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
      alt={alt}
      className={`rounded-full object-cover bg-surface-container-highest ${sizes[size]} ${className}`}
      loading="lazy"
    />
  );
}
