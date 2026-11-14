import { useEffect } from "react";

export const SITE_NAME = "The Agency";

/** Formats a document title as "Page · Site", or just the site name. */
export function formatPageTitle(page?: string): string {
  const trimmed = page?.trim();
  return trimmed ? `${trimmed} · ${SITE_NAME}` : SITE_NAME;
}

/** Sets `document.title` for the lifetime of the calling component. */
export function usePageTitle(page?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = formatPageTitle(page);
    return () => {
      document.title = previous;
    };
  }, [page]);
}
