/**
 * Factory for creating domain-level bookmark objects.
 * Normalises API responses, provides display helpers, etc.
 */
export const BookmarkFactory = {
  /** Extract a displayable domain from a full URL */
  getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  },

  /** Format the created_at timestamp for display */
  formatDate(isoDate: string): string {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(isoDate));
  },
} as const;
