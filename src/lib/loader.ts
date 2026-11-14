/** Duration of the loader's progress phase, in milliseconds. */
export const LOADER_DURATION_MS = 1500;

/** Width the progress fill reaches at 100%, in pixels. */
export const BAR_MAX_WIDTH_PX = 200;

/**
 * Linear progress (0–1) for a given elapsed time, clamped so negative or
 * overshooting timestamps never produce out-of-range values.
 */
export function getLoaderProgress(
  elapsedMs: number,
  durationMs: number = LOADER_DURATION_MS,
): number {
  if (!Number.isFinite(elapsedMs) || durationMs <= 0) return 1;
  return Math.min(Math.max(elapsedMs / durationMs, 0), 1);
}
