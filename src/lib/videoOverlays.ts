/**
 * Scroll-driven overlays of the video section.
 *
 * `progress` is the section's scroll progress (0 when its top reaches the
 * middle of the viewport, 1 once its bottom has passed the middle). Values
 * are clamped by framer-motion, so 0 also means "not reached yet" and 1 also
 * means "scrolled past" – overlays must therefore be hidden at both ends,
 * otherwise they leak onto neighbouring sections.
 */
export type VideoOverlay =
  | "scrollHint"
  | "testimonial"
  | "stats"
  | "actionPanel";

export const OVERLAY_ZONES: Record<VideoOverlay, readonly [number, number]> = {
  scrollHint: [0, 0.1],
  testimonial: [0.4, 0.6],
  stats: [0.6, 0.8],
  actionPanel: [0.8, 1],
};

export const SCROLL_TO_TOP_THRESHOLD = 0.3;

/** Whether `progress` lies strictly inside the overlay's zone. */
export function isOverlayActive(overlay: VideoOverlay, progress: number) {
  const [start, end] = OVERLAY_ZONES[overlay];
  return progress > start && progress < end;
}

export type OverlayVisibility = Record<VideoOverlay, boolean>;

/**
 * Visibility of every overlay for the given progress. Overlays in
 * `dismissed` stay hidden while their zone is active.
 */
export function getOverlayVisibility(
  progress: number,
  dismissed: ReadonlySet<VideoOverlay> = new Set(),
): OverlayVisibility {
  const visibility = {} as OverlayVisibility;
  for (const overlay of Object.keys(OVERLAY_ZONES) as VideoOverlay[]) {
    visibility[overlay] =
      isOverlayActive(overlay, progress) && !dismissed.has(overlay);
  }
  return visibility;
}

/**
 * Forgets dismissals whose zone has been left, so an overlay can appear
 * again the next time the visitor scrolls back into it.
 */
export function pruneDismissed(
  progress: number,
  dismissed: ReadonlySet<VideoOverlay>,
): Set<VideoOverlay> {
  return new Set(
    [...dismissed].filter((overlay) => isOverlayActive(overlay, progress)),
  );
}
