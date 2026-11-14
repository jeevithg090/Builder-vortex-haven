import { describe, expect, it } from "vitest";
import { PAGE_SECTIONS, getNavItems, hrefToId } from "./navigation";

describe("PAGE_SECTIONS", () => {
  it("has unique section ids", () => {
    const ids = PAGE_SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses ids that are valid URL fragments", () => {
    for (const { id } of PAGE_SECTIONS) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});

describe("getNavItems", () => {
  it("returns only sections flagged for the nav, in page order", () => {
    const items = getNavItems();
    const expected = PAGE_SECTIONS.filter((s) => s.inNav).map((s) => s.label);
    expect(items.map((item) => item.label)).toEqual(expected);
  });

  it("points every link at an existing section", () => {
    const ids = new Set<string>(PAGE_SECTIONS.map((section) => section.id));
    for (const item of getNavItems()) {
      expect(item.href.startsWith("#")).toBe(true);
      expect(ids.has(hrefToId(item.href))).toBe(true);
    }
  });

  it("supports a custom section list", () => {
    expect(
      getNavItems([
        { id: "a", label: "A", inNav: true },
        { id: "b", label: "B", inNav: false },
      ]),
    ).toEqual([{ label: "A", href: "#a" }]);
  });
});

describe("hrefToId", () => {
  it("strips a leading hash", () => {
    expect(hrefToId("#pricing")).toBe("pricing");
  });

  it("leaves bare ids untouched", () => {
    expect(hrefToId("pricing")).toBe("pricing");
  });
});
