import React, { useRef } from "react";
import Chip from "../ui/Chip";
import { DEFAULT_CATEGORIES } from "../../data/constants";

export default function CategoryChips({
  activeCategory,
  onCategoryChange,
  categories = DEFAULT_CATEGORIES
}) {
  const containerRef = useRef(null);

  const handleKeyDown = (e, index, category) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCategoryChange(category);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % categories.length;
      focusChip(nextIndex);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + categories.length) % categories.length;
      focusChip(prevIndex);
    }
  };

  const focusChip = (index) => {
    const chips = containerRef.current?.querySelectorAll('[role="button"]');
    if (chips && chips[index]) {
      chips[index].focus();
    }
  };

  return (
    <div className="relative mb-stack-md w-full">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth"
        role="tablist"
        aria-label="Filter blog posts by category"
      >
        {categories.map((category, idx) => {
          const isActive = activeCategory === category;
          return (
            <Chip
              key={category}
              label={category}
              active={isActive}
              tabIndex={isActive ? 0 : -1} // Only active chip initially tabbable (roving tabIndex pattern)
              onClick={() => onCategoryChange(category)}
              onKeyDown={(e) => handleKeyDown(e, idx, category)}
              className="flex-shrink-0"
              role="tab"
            />
          );
        })}
      </div>
    </div>
  );
}
