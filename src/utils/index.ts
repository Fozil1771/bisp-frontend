export function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}


export const truncateText = (text: string, maxLength: number) => {
  if (text) {
    if (text.length <= maxLength) {
      return text;
    }
    // Truncate text and add ellipsis
    return text.slice(0, maxLength) + '...';
  }
  return;
};


export const estimateReadingTime = (content, readingSpeed = 200) => {
  // Calculate the number of words in the content (assuming words are separated by spaces)
  const words = content.trim().split(/\s+/).length;
  // Calculate the estimated reading time in minutes
  const minutes = Math.ceil(words / readingSpeed);
  return minutes;
}