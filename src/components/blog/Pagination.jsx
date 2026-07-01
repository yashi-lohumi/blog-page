import React from "react";
import Button from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange
}) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Add page 1, current page context, ellipses, and last page to look highly realistic
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "primary" : "outline"}
            onClick={() => onPageChange(i)}
            className="w-10 h-10 !p-0 rounded-lg flex items-center justify-center font-bold"
            aria-label={`Go to page ${i}`}
            aria-current={currentPage === i ? "page" : undefined}
          >
            {i}
          </Button>
        );
      } else if (i === 2 || i === totalPages - 1) {
        // Add ellipses only once
        if (pages[pages.length - 1]?.key !== "ellipsis-" + i) {
          pages.push(
            <span key={"ellipsis-" + i} className="px-2 text-outline select-none font-bold">
              ...
            </span>
          );
        }
      }
    }
    return pages;
  };

  return (
    <nav 
      className="flex justify-center items-center gap-2 mb-stack-lg border-t border-outline-variant/20 pt-stack-md mt-stack-md"
      aria-label="Pagination Navigation"
    >
      <Button
        variant="outline"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-10 h-10 !p-0 rounded-lg flex items-center justify-center"
        aria-label="Go to previous page"
      >
        <ChevronLeft size={16} className="flex-shrink-0" />
      </Button>

      <div className="flex items-center gap-2">
        {renderPageNumbers()}
      </div>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-10 h-10 !p-0 rounded-lg flex items-center justify-center"
        aria-label="Go to next page"
      >
        <ChevronRight size={16} className="flex-shrink-0" />
      </Button>
    </nav>
  );
}
