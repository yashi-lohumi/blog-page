import React from "react";
import { Link } from "react-router-dom";

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
      <span className="material-symbols-outlined text-[14px] select-none">chevron_right</span>
      
      <Link 
        to="/blog" 
        className="hover:text-action-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
      >
        Blog
      </Link>
      <span className="material-symbols-outlined text-[14px] select-none">chevron_right</span>

      {category && (
        <>
          <Link 
            to={`/blog?category=${encodeURIComponent(category)}`}
            className="hover:text-action-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
          >
            {category}
          </Link>
          <span className="material-symbols-outlined text-[14px] select-none">chevron_right</span>
        </>
      )}

      <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
        {title}
      </span>
    </nav>
  );
}
