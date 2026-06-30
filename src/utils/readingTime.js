export function calculateReadingTime(contentArray, wordsPerMinute = 200) {
  if (!Array.isArray(contentArray)) return 5;
  
  let totalWords = 0;
  
  contentArray.forEach(block => {
    if (block.type === "p" || block.type === "h2" || block.type === "quote") {
      totalWords += (block.text || "").split(/\s+/).length;
    } else if (block.type === "list" && Array.isArray(block.items)) {
      block.items.forEach(item => {
        totalWords += (item || "").split(/\s+/).length;
      });
    } else if (block.type === "table" && Array.isArray(block.rows)) {
      block.rows.forEach(row => {
        row.forEach(cell => {
          totalWords += (cell || "").split(/\s+/).length;
        });
      });
    }
  });
  
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}
