import React, { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";

export default function SortDropdown({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ["Latest", "Most Popular", "Trending"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    onSortChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      <Button
        variant="outline"
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-2 border border-outline-variant focus-visible:ring-2 focus-visible:ring-action-orange"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sort articles: currently sorted by ${sortBy}`}
      >
        <span>Sort By: <strong>{sortBy}</strong></span>
        <span className="material-symbols-outlined text-sm transition-transform duration-200 select-none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          expand_more
        </span>
      </Button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-48 bg-surface-alt rounded-lg shadow-lg border border-outline-variant/35 py-1 z-40 focus:outline-none"
          role="listbox"
          aria-activedescendant={sortBy}
        >
          {options.map((option) => {
            const isSelected = sortBy === option;
            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 text-label-md transition-colors hover:bg-surface-container ${
                    isSelected ? "text-action-orange font-bold bg-surface-container/50" : "text-primary"
                  } focus:outline-none focus:bg-surface-container`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
