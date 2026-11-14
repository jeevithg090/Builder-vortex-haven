import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const Boom = (): never => {
  throw new Error("boom");
};

describe("ErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("shows a fallback when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByRole("button", { name: /reload page/i })).toBeVisible();
  });
});
