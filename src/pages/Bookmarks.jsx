import React, { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/ui/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { blogs } from "../data/blogs";
import { filterBlogs } from "../utils/filterBlogs";

export default function Bookmarks() {
  const [bookmarks] = useLocalStorage("martechadda_bookmarks", []);
  const [searchVal, setSearchVal] = useState("");

  // Map slugs back to blog objects
  const bookmarkedBlogs = blogs.filter((blog) => bookmarks.includes(blog.slug));
  
  // Filter bookmarked blogs by search text
  const filteredBookmarks = filterBlogs(bookmarkedBlogs, "All Topics", searchVal);

  return (
    <PageContainer>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-sm text-left">
        <section className="mb-stack-md">
          <h1 className="font-display-lg text-4xl sm:text-5xl font-bold mb-4 text-primary leading-tight">
            Bookmarked Insights
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">
            Your curated collection of articles, insights, and guides from MarTech Adda.
          </p>
        </section>

        {bookmarkedBlogs.length > 0 ? (
          <>
            {/* Search within bookmarks bar */}
            <div className="max-w-md mb-stack-md">
              <SearchBar 
                value={searchVal} 
                onChange={setSearchVal} 
                placeholder="Search bookmarks..." 
              />
            </div>

            {filteredBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filteredBookmarks.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Matches Found"
                description="We couldn't find any bookmarks matching your search keyword."
                onAction={() => setSearchVal("")}
                actionLabel="Clear Search"
              />
            )}
          </>
        ) : (
          <EmptyState
            title="No Bookmarks Saved"
            description="You haven't saved any articles yet. Explore the blog landing page and click the bookmark icon on any post details page to build your collection."
            actionLabel="Browse All Articles"
            onAction={() => window.location.href = "/blog"}
            icon="bookmark"
          />
        )}
      </div>
    </PageContainer>
  );
}
