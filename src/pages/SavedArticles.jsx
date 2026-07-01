import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Lock, SearchX } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/ui/SearchBar";
import { useAuth } from "../context/AuthContext";
import { blogs } from "../data/blogs";
import { filterBlogs } from "../utils/filterBlogs";

function EmptyAuthenticated() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-action-orange/10 flex items-center justify-center mb-6">
        <Bookmark size={40} className="text-action-orange" fill="currentColor" strokeWidth={1} />
      </div>
      <h2 className="font-display-lg text-2xl font-bold text-primary mb-3">
        No saved articles yet
      </h2>
      <p className="text-on-surface-variant text-body-md font-light leading-relaxed mb-8">
        You haven't saved any articles yet. Browse our blog and save articles you'd like to read later.
      </p>
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 bg-action-orange text-white font-bold px-6 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange focus-visible:ring-offset-2"
      >
        <span>Browse Articles</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function EmptyUnauthenticated() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <Lock size={40} className="text-on-surface-variant" strokeWidth={1} />
      </div>
      <h2 className="font-display-lg text-2xl font-bold text-primary mb-3">
        Log in to view saved articles
      </h2>
      <p className="text-on-surface-variant text-body-md font-light leading-relaxed mb-8">
        Save articles you love and access them anytime. Sign in to get started.
      </p>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-action-orange transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange focus-visible:ring-offset-2"
      >
        Log In
      </Link>
    </div>
  );
}

export default function SavedArticles() {
  const { isAuthenticated, savedArticles } = useAuth();
  const [searchVal, setSearchVal] = useState("");

  // Map saved slugs to blog objects
  const savedBlogs = blogs.filter((blog) => savedArticles.includes(blog.slug));
  const filteredBlogs = filterBlogs(savedBlogs, "All Topics", searchVal);

  return (
    <PageContainer>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-sm text-left">

        {/* Page Header */}
        <section className="mb-stack-md">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark size={28} className="text-action-orange" fill="currentColor" strokeWidth={1.5} />
            <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary leading-tight">
              Saved Articles
            </h1>
          </div>
          <p className="font-body-lg text-body-md text-on-surface-variant max-w-2xl font-light">
            {isAuthenticated && savedBlogs.length > 0
              ? `${savedBlogs.length} article${savedBlogs.length === 1 ? "" : "s"} saved to your reading list.`
              : "Your curated reading list, ready when you are."}
          </p>
        </section>

        {/* Content: auth-gated */}
        {!isAuthenticated ? (
          <EmptyUnauthenticated />
        ) : savedBlogs.length === 0 ? (
          <EmptyAuthenticated />
        ) : (
          <>
            {/* Search within saved */}
            <div className="max-w-sm mb-stack-md">
              <SearchBar
                value={searchVal}
                onChange={setSearchVal}
                placeholder="Search saved articles…"
              />
            </div>

            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-on-surface-variant">
                <SearchX size={40} className="text-outline-variant mb-4 mx-auto block" strokeWidth={1.5} />
                <p className="text-body-md font-light">No saved articles match your search.</p>
                <button
                  onClick={() => setSearchVal("")}
                  className="mt-4 text-action-orange font-semibold text-label-md hover:underline focus:outline-none"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
