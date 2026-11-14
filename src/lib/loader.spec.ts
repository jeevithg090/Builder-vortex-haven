import { describe, expect, it } from "vitest";
import { LOADER_DURATION_MS, getLoaderProgress } from "./loader";

describe("getLoaderProgress", () => {
  it("starts at 0 and finishes at 1", () => {
    expect(getLoaderProgress(0)).toBe(0);
    expect(getLoaderProgress(LOADER_DURATION_MS)).toBe(1);
  });

  it("progresses linearly", () => {
    expect(getLoaderProgress(LOADER_DURATION_MS / 2)).toBeCloseTo(0.5);
    expect(getLoaderProgress(250, 1000)).toBeCloseTo(0.25);
  });

  it("clamps out-of-range times", () => {
    expect(getLoaderProgress(-100)).toBe(0);
    expect(getLoaderProgress(LOADER_DURATION_MS * 3)).toBe(1);
  });

  it("completes immediately for invalid input instead of hanging", () => {
    expect(getLoaderProgress(Number.NaN)).toBe(1);
    expect(getLoaderProgress(100, 0)).toBe(1);
  });
});
