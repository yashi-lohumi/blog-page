import React from "react";
import Input from "./Input";
import Button from "./Button";

export default function SearchBar({ value, onChange, placeholder = "Search articles..." }) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full flex items-center bg-surface-container rounded-full px-4 py-1.5 border border-outline-variant/30 focus-within:border-action-orange focus-within:ring-1 focus-within:ring-action-orange transition-all duration-300">
      <span className="material-symbols-outlined text-outline text-md mr-2 select-none">
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-none outline-none focus:ring-0 text-body-md text-primary placeholder:text-on-surface-variant/40"
        aria-label={placeholder}
      />
      {value && (
        <Button
          variant="icon"
          onClick={handleClear}
          className="p-1 hover:bg-surface-container-high rounded-full ml-2 text-outline-variant hover:text-primary transition-colors"
          ariaLabel="Clear search text"
        >
          <span className="material-symbols-outlined text-sm select-none">close</span>
        </Button>
      )}
    </div>
  );
}
