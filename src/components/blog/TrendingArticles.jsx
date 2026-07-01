import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Eye } from "lucide-react";

export default function TrendingArticles({ blogs = [] }) {
  const navigate = useNavigate();

  // Filter or sort by trending, and slice first 3
  const trendingBlogs = [...blogs]
    .filter((blog) => blog.trending)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  if (trendingBlogs.length === 0) return null;

  return (
    <section aria-labelledby="sidebar-trending-articles">
      <h4 
        id="sidebar-trending-articles"
        className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 flex items-center gap-1.5 font-bold select-none"
      >
        <TrendingUp size={15} className="text-action-orange select-none" />
        Trending Now
      </h4>
      <div className="space-y-2">
        {trendingBlogs.map((blog, idx) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/blog/${blog.slug}`);
              }
            }}
            className="block group text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded p-1"
            tabIndex={0}
            role="link"
            aria-label={`Read trending article ${idx + 1}: ${blog.title}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-[18px] font-bold text-surface-container-highest group-hover:text-action-orange/30 transition-colors select-none leading-none pt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h5 className="text-[12px] font-semibold text-primary group-hover:text-action-orange transition-colors duration-300 leading-snug line-clamp-2">
                  {blog.title}
                </h5>
                <p className="text-[11px] text-outline mt-1 flex items-center gap-1 font-light">
                  <Eye size={12} className="select-none" />
                  {(blog.views / 1000).toFixed(1)}k views
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
