import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE_NAME, formatPageTitle, usePageTitle } from "./usePageTitle";

describe("formatPageTitle", () => {
  it("returns the site name when no page is given", () => {
    expect(formatPageTitle()).toBe(SITE_NAME);
    expect(formatPageTitle("   ")).toBe(SITE_NAME);
  });

  it("prefixes the page name", () => {
    expect(formatPageTitle("Page not found")).toBe(
      `Page not found · ${SITE_NAME}`,
    );
  });
});

describe("usePageTitle", () => {
  it("sets the title and restores the previous one on unmount", () => {
    document.title = "Before";
    const { unmount } = renderHook(() => usePageTitle("Pricing"));
    expect(document.title).toBe(`Pricing · ${SITE_NAME}`);
    unmount();
    expect(document.title).toBe("Before");
  });
});
