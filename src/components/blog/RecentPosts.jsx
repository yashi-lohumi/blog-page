import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function RecentPosts({ blogs = [] }) {
  const navigate = useNavigate();

  // Get the 3 most recent articles based on publishDate
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 3);

  if (recentBlogs.length === 0) return null;

  return (
    <section aria-labelledby="sidebar-recent-posts">
      <h4 
        id="sidebar-recent-posts"
        className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 flex items-center gap-1.5 font-bold select-none"
      >
        <span className="w-1.5 h-1.5 bg-action-orange rounded-full"></span>
        Recent Updates
      </h4>
      <div className="space-y-3">
        {recentBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/blog/${blog.slug}`);
              }
            }}
            className="flex gap-4 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded p-1"
            tabIndex={0}
            role="link"
            aria-label={`Read recent update: ${blog.title}`}
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded bg-surface-container flex-shrink-0 overflow-hidden relative border border-outline-variant/10">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                src={blog.coverImage}
                alt=""
                loading="lazy"
              />
            </div>
            {/* Title and Date */}
            <div className="text-left">
              <h5 className="text-[12px] font-semibold text-primary group-hover:text-action-orange transition-colors duration-300 line-clamp-2 leading-tight">
                {blog.title}
              </h5>
              <p className="text-[11px] text-outline mt-1 font-light">
                {formatDate(blog.publishDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
