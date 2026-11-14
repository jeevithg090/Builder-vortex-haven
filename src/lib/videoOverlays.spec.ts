import { describe, expect, it } from "vitest";
import {
  getOverlayVisibility,
  isOverlayActive,
  pruneDismissed,
  type VideoOverlay,
} from "./videoOverlays";

describe("isOverlayActive", () => {
  it("is exclusive at both zone boundaries", () => {
    expect(isOverlayActive("testimonial", 0.4)).toBe(false);
    expect(isOverlayActive("testimonial", 0.5)).toBe(true);
    expect(isOverlayActive("testimonial", 0.6)).toBe(false);
  });
});

describe("getOverlayVisibility", () => {
  it("hides every overlay before the section is reached", () => {
    expect(Object.values(getOverlayVisibility(0))).not.toContain(true);
  });

  it("hides every overlay once the section has been scrolled past", () => {
    expect(Object.values(getOverlayVisibility(1))).not.toContain(true);
  });

  it.each<[number, VideoOverlay]>([
    [0.05, "scrollHint"],
    [0.5, "testimonial"],
    [0.7, "stats"],
    [0.9, "actionPanel"],
  ])("shows only the matching overlay at %s", (progress, overlay) => {
    const visibility = getOverlayVisibility(progress);
    const visible = Object.entries(visibility)
      .filter(([, shown]) => shown)
      .map(([key]) => key);
    expect(visible).toEqual([overlay]);
  });

  it("keeps dismissed overlays hidden inside their zone", () => {
    expect(
      getOverlayVisibility(0.5, new Set(["testimonial"])).testimonial,
    ).toBe(false);
  });
});

describe("pruneDismissed", () => {
  it("keeps dismissals while still inside the zone", () => {
    expect(pruneDismissed(0.55, new Set(["testimonial"]))).toEqual(
      new Set(["testimonial"]),
    );
  });

  it("forgets dismissals after leaving the zone", () => {
    expect(pruneDismissed(0.7, new Set(["testimonial"]))).toEqual(new Set());
  });
});
