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