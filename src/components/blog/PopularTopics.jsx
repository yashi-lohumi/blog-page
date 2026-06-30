import React from "react";

export default function PopularTopics({ blogs = [], onTopicSelect }) {
  // Dynamically derive category counts from the current blog list
  const categoryCounts = blogs.reduce((acc, blog) => {
    const cat = blog.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const topics = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  if (topics.length === 0) return null;

  return (
    <section aria-labelledby="sidebar-popular-topics">
      <h4 
        id="sidebar-popular-topics"
        className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 flex items-center gap-1.5 font-bold select-none"
      >
        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
        Popular Topics
      </h4>
      <div className="space-y-1">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => onTopicSelect && onTopicSelect(topic.name)}
            className="w-full flex justify-between items-center group py-1.5 border-b border-surface-container-high text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded px-1"
          >
            <span className="text-[13px] text-primary font-medium group-hover:text-action-orange transition-colors leading-tight">
              {topic.name}
            </span>
            <span className="text-outline text-[10px] font-medium bg-surface-container px-1.5 py-0.5 rounded transition-all duration-300 group-hover:bg-primary group-hover:text-white select-none whitespace-nowrap">
              {topic.count} {topic.count === 1 ? "article" : "articles"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
