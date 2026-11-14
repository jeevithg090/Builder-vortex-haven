import { act, render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Index from "./Index";
import { getNavItems } from "@/lib/navigation";

// The sections are exercised by their own tests; stub them so this test
// focuses on the page shell (loader hand-off, landmarks and anchors).
vi.mock("@/components/RippleEffect", () => ({ default: () => null }));
vi.mock("@/components/EnhancedFooter", () => ({
  default: () => <footer>footer</footer>,
}));
for (const name of [
  "TestimonialsSection",
  "ClientCarousel",
  "PricingSection",
  "ScrollVideoSection",
  "BrandKitsWithStats",
  "ParallaxVision",
  "ShowcaseWork",
  "TeamAboutSection",
  "StrikingBackground",
  "ContactSection",
]) {
  vi.doMock(`@/components/${name}`, () => ({
    default: () => <div data-testid={name} />,
  }));
}

describe("Index page", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        "setTimeout",
        "clearTimeout",
        "requestAnimationFrame",
        "cancelAnimationFrame",
        "performance",
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the loader, then the page with a section for every nav link", async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("progressbar", { name: "Loading site" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("main")).toBeNull();

    // Progress phase (1.5s) + break-apart phases (~1.1s).
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    vi.useRealTimers();

    const main = await screen.findByRole("main");
    expect(
      screen.getByRole("heading", { level: 1, name: /the agency/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).toBeNull();

    for (const item of getNavItems()) {
      expect(main.querySelector(item.href)).not.toBeNull();
    }
    expect(await screen.findByTestId("ContactSection")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
  });
});
