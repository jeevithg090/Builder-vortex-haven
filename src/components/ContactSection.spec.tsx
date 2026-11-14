import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ContactSection from "./ContactSection";

describe("ContactSection", () => {
  it("shows field errors and does not submit an invalid form", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText("Please enter your name"),
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText(/^Name/)).toHaveFocus();
  });

  it("clears a field's error as soon as the user edits it", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));
    await user.type(screen.getByLabelText(/^Name/), "Ada");

    expect(screen.queryByText("Please enter your name")).toBeNull();
    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
  });

  it("marks service cards as toggle buttons", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const card = screen.getByRole("button", { name: /brand identity/i });
    expect(card).toHaveAttribute("aria-pressed", "false");
    await user.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");
  });
});
