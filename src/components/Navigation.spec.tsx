import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import { describe, expect, it } from "vitest";
import Navigation from "./Navigation";
import { getNavItems } from "@/lib/navigation";

const renderNav = () =>
  render(
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Navigation />
    </ThemeProvider>,
  );

describe("Navigation", () => {
  it("renders a link for every nav section", () => {
    renderNav();
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const item of getNavItems()) {
      const link = Array.from(nav.querySelectorAll("a")).find(
        (a) => a.textContent === item.label,
      );
      expect(link).toHaveAttribute("href", item.href);
    }
  });

  it("toggles the mobile menu and exposes its state", async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("mobile-navigation")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(document.getElementById("mobile-navigation")).toBeNull();
  });

  it("switches theme from the toggle button", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(
      await screen.findByRole("button", { name: "Switch to light mode" }),
    );
    expect(
      await screen.findByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
  });
});
