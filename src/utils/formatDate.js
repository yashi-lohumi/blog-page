export function formatDate(dateString) {
  if (!dateString) return "";
  
  // If the date is already in a readable format, return it
  if (isNaN(Date.parse(dateString))) {
    return dateString;
  }
  
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
