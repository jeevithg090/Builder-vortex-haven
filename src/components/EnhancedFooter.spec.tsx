import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import EnhancedFooter from "./EnhancedFooter";

describe("EnhancedFooter newsletter", () => {
  it("has a labelled email field", () => {
    render(<EnhancedFooter />);
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "type",
      "email",
    );
  });

  it("validates the email instead of submitting the page", async () => {
    const user = userEvent.setup();
    render(<EnhancedFooter />);

    await user.type(screen.getByLabelText("Email address"), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a valid email address",
    );
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("clears the error once the user edits the field", async () => {
    const user = userEvent.setup();
    render(<EnhancedFooter />);

    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter your email",
    );
    await user.type(screen.getByLabelText("Email address"), "a");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("links footer items to real sections", () => {
    render(<EnhancedFooter />);
    expect(screen.getByRole("link", { name: "Case Studies" })).toHaveAttribute(
      "href",
      "#showcase",
    );
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute(
      "href",
      "#home",
    );
  });
});
