import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import BookmarkButton from "../article/BookmarkButton";
import { formatDate } from "../../utils/formatDate";

function RelatedCard({ blog }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="flex-shrink-0 w-72 sm:w-80 rounded-xl overflow-hidden border border-outline-variant/15 bg-surface-alt cursor-pointer group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
      tabIndex={0}
      role="link"
      aria-label={`Read related article: ${blog.title}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/blog/${blog.slug}`)}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-high flex-shrink-0">
        <img
          src={blog.coverImage}
          alt={`Cover for ${blog.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 right-2.5 z-10" onClick={(e) => e.stopPropagation()}>
          <BookmarkButton slug={blog.slug} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <Badge variant="violet">{blog.category}</Badge>
        </div>
        <h4 className="text-[14px] font-bold text-primary leading-snug line-clamp-2 mb-2 group-hover:text-action-orange transition-colors duration-200">
          {blog.title}
        </h4>
        <p className="text-[12px] text-on-surface-variant font-light line-clamp-2 leading-relaxed mb-3">
          {blog.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between text-[11px] text-outline pt-3 border-t border-outline-variant/10">
          <span>{formatDate(blog.publishDate)} · {blog.readTime} min read</span>
          <span className="material-symbols-outlined text-[16px] group-hover:text-action-orange group-hover:translate-x-0.5 transition-all">arrow_forward</span>
        </div>
      </div>
    </article>
  );
}

export default function RelatedArticles({ currentBlog, allBlogs = [] }) {
  const scrollRef = useRef(null);

  if (!currentBlog || allBlogs.length === 0) return null;

  const related = allBlogs
    .filter((b) => b.id !== currentBlog.id)
    .sort((a, b) => {
      if (a.category === currentBlog.category && b.category !== currentBlog.category) return -1;
      if (a.category !== currentBlog.category && b.category === currentBlog.category) return 1;
      return b.views - a.views;
    })
    .slice(0, 6); // show up to 6 in horizontal scroll

  if (related.length === 0) return null;

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Prevent scrolling the page if the container has no overflow
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (maxScrollLeft <= 0) return;

    // Prevent scrolling if already at the edge to avoid page shift
    if (dir === -1 && el.scrollLeft <= 0) return;
    if (dir === 1 && el.scrollLeft >= maxScrollLeft) return;

    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="mt-stack-lg border-t border-outline-variant/20 pt-stack-lg text-left" aria-labelledby="related-heading">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <h3 id="related-heading" className="font-headline-md text-xl font-bold text-primary">
          Related Articles
        </h3>
        {/* Scroll arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll related articles left"
            className="w-8 h-8 rounded-full border border-outline-variant/25 bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-action-orange hover:border-action-orange/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll related articles right"
            className="w-8 h-8 rounded-full border border-outline-variant/25 bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-action-orange hover:border-action-orange/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {related.map((blog) => (
          <RelatedCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Fade indicators at edges (purely decorative) */}
      <div className="relative -mt-4 h-1 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
