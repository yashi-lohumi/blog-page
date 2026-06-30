import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import BookmarkButton from "../article/BookmarkButton";
import { formatDate } from "../../utils/formatDate";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/blog/${blog.slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigation();
    }
  };

  return (
    <Card
      onClick={handleNavigation}
      className="group flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="link"
      aria-label={`Read article: ${blog.title}`}
    >
      {/* Cover Image with Bookmark Overlay */}
      <div className="aspect-[16/10] overflow-hidden relative bg-surface-container-high flex-shrink-0">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={blog.coverImage}
          alt={`Cover image for ${blog.title}`}
          loading="lazy"
        />
        {/* Bookmark button — top-right, stops card click propagation */}
        <div className="absolute top-3 right-3 z-10">
          <BookmarkButton slug={blog.slug} size="sm" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <div className="mb-2">
          <Badge variant="violet">{blog.category}</Badge>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-action-orange transition-colors duration-300 line-clamp-2 leading-snug">
          {blog.title}
        </h3>
        <p className="text-on-surface-variant text-body-md line-clamp-2 mb-4 font-light text-sm">
          {blog.excerpt}
        </p>

        {/* Card Footer */}
        <div className="mt-auto pt-3 border-t border-outline-variant/10">
          <div className="flex items-center justify-between text-outline text-label-sm">
            <span>{formatDate(blog.publishDate)} · {blog.readTime} min read</span>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-action-orange group-hover:translate-x-1 transition-all select-none text-[18px]">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
