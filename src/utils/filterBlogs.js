export function filterBlogs(blogs, category, searchQuery) {
  if (!Array.isArray(blogs)) return [];
  
  return blogs.filter(blog => {
    // 1. Filter by category
    const matchesCategory =
      !category ||
      category === "All Topics" ||
      blog.category.toLowerCase() === category.toLowerCase();
      
    // 2. Filter by search query
    const cleanQuery = (searchQuery || "").trim().toLowerCase();
    const matchesSearch =
      !cleanQuery ||
      blog.title.toLowerCase().includes(cleanQuery) ||
      blog.excerpt.toLowerCase().includes(cleanQuery) ||
      (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(cleanQuery))) ||
      blog.category.toLowerCase().includes(cleanQuery);
      
    return matchesCategory && matchesSearch;
  });
}
