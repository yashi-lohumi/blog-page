import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import HeroBanner from "../components/blog/HeroBanner";
import CategoryChips from "../components/blog/CategoryChips";
import SortDropdown from "../components/blog/SortDropdown";
import BlogCard from "../components/blog/BlogCard";
import Sidebar from "../components/blog/Sidebar";
import Pagination from "../components/blog/Pagination";
import NewsletterCTA from "../components/blog/NewsletterCTA";
import SearchBar from "../components/ui/SearchBar";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import EmptyState from "../components/ui/EmptyState";

import { blogs } from "../data/blogs";
import { filterBlogs } from "../utils/filterBlogs";
import { sortBlogs } from "../utils/sortBlogs";
import { useDebounce } from "../hooks/useDebounce";

export default function BlogLanding() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL Param Syncing
  const categoryParam = searchParams.get("category") || "All Topics";
  const searchParam = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchVal, setSearchVal] = useState(searchParam);
  const debouncedSearch = useDebounce(searchVal, 300);
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category and search states with URL parameters
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchVal(searchParam);
  }, [searchParam]);

  // Handle mock skeleton loader when filters or search change
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    
    // Simulate Edge latency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [activeCategory, debouncedSearch, sortBy]);

  // Update URL parameters
  const updateURLParams = (category, search) => {
    const params = {};
    if (category && category !== "All Topics") params.category = category;
    if (search) params.search = search;
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    updateURLParams(category, searchVal);
  };

  const handleSearchChange = (val) => {
    setSearchVal(val);
    updateURLParams(activeCategory, val);
  };

  // Perform filtering & sorting
  const filteredBlogs = filterBlogs(blogs, activeCategory, debouncedSearch);
  const sortedBlogs = sortBlogs(filteredBlogs, sortBy);

  // Pagination Settings: 6 articles per page
  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const featuredBlogs = blogs.filter((b) => b.featured);

  return (
    <PageContainer>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-sm text-left">
        
        {/* Insights Title & Tagline Section */}
        <section className="mb-stack-md">
          <h1 className="font-display-lg text-4xl sm:text-5xl font-bold mb-4 text-primary leading-tight">
            Marketing Insights &amp; Expert Perspectives
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
            Discover actionable strategies, industry trends, and expert perspectives on digital marketing, SEO, branding, content, AI, automation, and business growth—all curated to help marketers and businesses make smarter decisions.
          </p>
        </section>

        {/* Dynamic Carousel Hero Banner */}
        {featuredBlogs.length > 0 && !searchVal && activeCategory === "All Topics" && (
          <HeroBanner featuredBlogs={featuredBlogs} />
        )}

        {/* Controls Container: Search & Sort Dropdowns */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-stack-sm w-full">
          <div className="w-full sm:max-w-md">
            <SearchBar value={searchVal} onChange={handleSearchChange} />
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </section>

        {/* Scrollable Category Filter Chips */}
        <CategoryChips
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Main Content Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-stack-md">
          
          {/* Left Column: Blog Cards — dominant focus (9 of 12 cols) */}
          <section className="lg:col-span-9 flex flex-col gap-gutter">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <SkeletonLoader type="card" count={6} />
              </div>
            ) : paginatedBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState
                onAction={() => {
                  handleCategoryChange("All Topics");
                  handleSearchChange("");
                }}
                actionLabel="Clear All Filters"
              />
            )}
          </section>

          {/* Right Column: Compact Sidebar — supporting context (3 of 12 cols) */}
          <div className="lg:col-span-3">
            <Sidebar blogs={blogs} onTopicSelect={handleCategoryChange} />
          </div>
        </div>
      </div>

      {/* Primary Newsletter Subscription Box */}
      <div className="mt-stack-lg">
        <NewsletterCTA />
      </div>
    </PageContainer>
  );
}
