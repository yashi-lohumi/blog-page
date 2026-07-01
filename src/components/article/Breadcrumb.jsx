import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ category, title }) {
  return (
    <nav 
      className="flex flex-wrap items-center gap-2 mb-stack-sm text-label-md font-label-md text-on-surface-variant text-left select-none"
      aria-label="Breadcrumb Navigation"
    >
      <Link 
        to="/" 
        className="hover:text-action-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
      >
        Home
      </Link>
      <ChevronRight size={14} className="select-none" />
      
      <Link 
        to="/blog" 
        className="hover:text-action-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
      >
        Blog
      </Link>
      <ChevronRight size={14} className="select-none" />

      {category && (
        <>
          <Link 
            to={`/blog?category=${encodeURIComponent(category)}`}
            className="hover:text-action-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
          >
            {category}
          </Link>
          <ChevronRight size={14} className="select-none" />
        </>
      )}

      <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
        {title}
      </span>
    </nav>
  );
}
