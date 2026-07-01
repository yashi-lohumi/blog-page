import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "../ui/Badge";
import { CAROUSEL_INTERVAL } from "../../data/constants";

export default function HeroBanner({ featuredBlogs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const total = featuredBlogs.length;

  // Auto-advance timer
  useEffect(() => {
    if (total <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [total, isHovered]);

  if (total === 0) return null;

  const currentBlog = featuredBlogs[activeIndex];

  const goTo = useCallback((idx, e) => {
    e?.stopPropagation();
    if (isTransitioning) return;
    setActiveIndex((idx + total) % total);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [total, isTransitioning]);

  const handleNext = (e) => goTo(activeIndex + 1, e);
  const handlePrev = (e) => goTo(activeIndex - 1, e);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext(e);
    else if (e.key === "ArrowLeft") handlePrev(e);
  };

  const handleReadClick = (e) => {
    e.stopPropagation();
    navigate(`/blog/${currentBlog.slug}`);
  };

  return (
    <section
      className="mb-stack-lg relative overflow-hidden rounded-xl h-[360px] sm:h-[420px] md:h-[480px] border border-outline-variant/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-action-orange group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Featured Articles Carousel, ${total} slides. Use arrow keys to navigate.`}
      aria-roledescription="carousel"
      role="region"
    >
      {/* ── Slide Track: each slide is 100% wide, we translate by activeIndex × 100% ── */}
      {/* Using absolute positioning so every slide occupies the full section */}
      {featuredBlogs.map((blog, idx) => {
        const offset = idx - activeIndex;
        // Clamp large offsets for a tight 3-slide window (prev | active | next)
        // All inactive slides sit off-screen left or right via translateX
        return (
          <div
            key={blog.id}
            aria-hidden={idx !== activeIndex}
            className="absolute inset-0 transition-transform duration-700 ease-in-out will-change-transform cursor-pointer"
            style={{
              transform: `translateX(${offset * 100}%)`,
            }}
            onClick={() => idx === activeIndex && navigate(`/blog/${blog.slug}`)}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear"
              style={{
                backgroundImage: `url(${blog.coverImage})`,
                transform: idx === activeIndex ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            {/* Slide text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pb-28 sm:pb-32 select-none">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="orange">Featured Story</Badge>
                <Badge variant="primary">{blog.category}</Badge>
              </div>
              <h2 className="font-display-lg text-xl sm:text-3xl md:text-[2rem] text-white mb-2 sm:mb-3 line-clamp-2 leading-tight font-bold max-w-3xl">
                {blog.title}
              </h2>
              <p className="hidden sm:block text-white/80 text-[14px] mb-0 max-w-2xl line-clamp-2 font-light leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          </div>
        );
      })}

      {/* ── Bottom Controls Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-6 sm:px-10 py-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">

        {/* Left: Author + reading time */}
        <div className="flex items-center gap-2 text-white/85 text-[12px] font-medium select-none min-w-0 shrink truncate">
          <span className="truncate">
            By {currentBlog.authorId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
          <span className="flex-shrink-0">{currentBlog.readTime} min read</span>
        </div>

        {/* Centre: Dot indicators */}
        <div className="flex items-center gap-1.5 flex-shrink-0" role="tablist" aria-label="Slide navigation">
          {featuredBlogs.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={(e) => goTo(idx, e)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange cursor-pointer ${
                activeIndex === idx
                  ? "w-7 bg-action-orange"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Right: Read Article CTA */}
        <button
          onClick={handleReadClick}
          className="flex-shrink-0 bg-action-orange hover:bg-orange-500 text-white font-bold px-4 py-1.5 rounded-lg text-[12px] transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 shadow"
          aria-label={`Read article: ${currentBlog.title}`}
        >
          Read Article
          <ArrowRight size={14} />
        </button>
      </div>

      {/* ── Left / Right Arrow Buttons ── */}
      {total > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous featured article"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-black/30 hover:bg-action-orange text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next featured article"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-black/30 hover:bg-action-orange text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </section>
  );
}
