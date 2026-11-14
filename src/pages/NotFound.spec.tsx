import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NotFound from "./NotFound";
import { SITE_NAME } from "@/lib/usePageTitle";

describe("NotFound", () => {
  it("renders a 404 message with a link home and sets the title", () => {
    render(
      <MemoryRouter initialEntries={["/missing"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /return to home/i }),
    ).toHaveAttribute("href", "/");
    expect(document.title).toBe(`Page not found · ${SITE_NAME}`);
  });
});
