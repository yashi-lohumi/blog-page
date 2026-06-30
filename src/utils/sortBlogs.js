export function sortBlogs(blogs, sortBy) {
  if (!Array.isArray(blogs)) return [];
  
  const sorted = [...blogs];
  
  switch (sortBy) {
    case "Latest":
      return sorted.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    case "Most Popular":
      return sorted.sort((a, b) => b.views - a.views);
    case "Trending":
      // Trending can prioritize views or a special trend flag
      return sorted.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.views - a.views;
      });
    default:
      return sorted;
  }
}
