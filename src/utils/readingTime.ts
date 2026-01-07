/**
 * Calculate reading time from content
 * @param content - The markdown/text content
 * @param wordsPerMinute - Reading speed (default 200 wpm)
 * @returns Reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string | undefined, wordsPerMinute = 200): number {
  if (!content) return 1;
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
