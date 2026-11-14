/**
 * Single source of truth for the landing page's sections.
 *
 * `Index` renders a `<section id={id}>` for every entry and `Navigation`
 * builds its links from the entries flagged with `inNav`, so menu links can
 * never point at an anchor that does not exist.
 */
export interface PageSection {
  id: string;
  label: string;
  inNav: boolean;
}

export const PAGE_SECTIONS = [
  { id: "home", label: "Home", inNav: true },
  { id: "testimonials", label: "Testimonials", inNav: true },
  { id: "client-stories", label: "Clients", inNav: false },
  { id: "pricing", label: "Pricing", inNav: true },
  { id: "video", label: "Video", inNav: true },
  { id: "brandkits-stats", label: "Features", inNav: true },
  { id: "vision", label: "Vision", inNav: true },
  { id: "showcase", label: "Showcase", inNav: true },
  { id: "team-about", label: "Team", inNav: true },
  { id: "interactive", label: "Interactive", inNav: false },
  { id: "contact", label: "Contact", inNav: true },
] as const satisfies readonly PageSection[];

export type SectionId = (typeof PAGE_SECTIONS)[number]["id"];

export interface NavItem {
  label: string;
  href: `#${string}`;
}

/** Links shown in the navigation bar, in page order. */
export function getNavItems(
  sections: readonly PageSection[] = PAGE_SECTIONS,
): NavItem[] {
  return sections
    .filter((section) => section.inNav)
    .map((section) => ({ label: section.label, href: `#${section.id}` }));
}

/** Converts `#section` (or `section`) into a bare id. */
export function hrefToId(href: string): string {
  return href.startsWith("#") ? href.slice(1) : href;
}
