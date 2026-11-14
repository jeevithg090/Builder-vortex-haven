import { describe, expect, it, vi } from "vitest";
import {
  getNewsletterConfig,
  subscribeToNewsletter,
  validateNewsletterEmail,
} from "./newsletter";

describe("validateNewsletterEmail", () => {
  it("accepts and trims a valid address", () => {
    expect(validateNewsletterEmail("  ada@example.com ")).toEqual({
      success: true,
      email: "ada@example.com",
    });
  });

  it.each([
    ["", "Please enter your email"],
    ["nope", "Please enter a valid email address"],
  ])("rejects %j", (value, error) => {
    expect(validateNewsletterEmail(value)).toEqual({ success: false, error });
  });
});

describe("getNewsletterConfig", () => {
  it("uses the endpoint when set and the fallback email otherwise", () => {
    expect(getNewsletterConfig({}, "hi@x.co")).toEqual({
      endpoint: undefined,
      email: "hi@x.co",
    });
    expect(
      getNewsletterConfig(
        { VITE_NEWSLETTER_ENDPOINT: " https://n.example " },
        "hi@x.co",
      ),
    ).toEqual({ endpoint: "https://n.example", email: "hi@x.co" });
  });
});

describe("subscribeToNewsletter", () => {
  it("falls back to a mailto link", async () => {
    const result = await subscribeToNewsletter("ada@example.com", {
      email: "list@example.com",
    });
    expect(result.status).toBe("mailto");
    if (result.status === "mailto") {
      const url = new URL(result.href);
      expect(decodeURIComponent(url.pathname)).toBe("list@example.com");
      expect(url.searchParams.get("body")).toContain("ada@example.com");
    }
  });

  it("POSTs the email to the endpoint", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 201 }));
    await expect(
      subscribeToNewsletter(
        "ada@example.com",
        { endpoint: "https://n.example", email: "x@y.z" },
        fetchImpl,
      ),
    ).resolves.toEqual({ status: "subscribed" });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://n.example",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "ada@example.com" }),
      }),
    );
  });

  it("surfaces HTTP and network failures", async () => {
    const config = { endpoint: "https://n.example", email: "x@y.z" };
    await expect(
      subscribeToNewsletter(
        "a@b.co",
        config,
        vi
          .fn<typeof fetch>()
          .mockResolvedValue(new Response(null, { status: 422 })),
      ),
    ).rejects.toThrow(/error 422/);
    await expect(
      subscribeToNewsletter(
        "a@b.co",
        config,
        vi.fn<typeof fetch>().mockRejectedValue(new TypeError("offline")),
      ),
    ).rejects.toThrow(/couldn't reach/);
  });
});
