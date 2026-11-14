import { describe, expect, it, vi } from "vitest";
import {
  ContactSubmitError,
  DEFAULT_CONTACT_EMAIL,
  EMPTY_CONTACT_FORM,
  buildMailtoLink,
  getContactConfig,
  submitContact,
  validateContact,
  type ContactFormData,
  type ContactPayload,
} from "./contact";

const validForm: ContactFormData = {
  ...EMPTY_CONTACT_FORM,
  name: "  Ada Lovelace ",
  email: "ada@example.com",
  message: "We need a brand refresh for our launch.",
};

const validPayload = (): ContactPayload => {
  const result = validateContact(validForm);
  if (!result.success) throw new Error("fixture should be valid");
  return result.data;
};

describe("validateContact", () => {
  it("accepts a minimal valid enquiry and trims values", () => {
    const result = validateContact(validForm);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ada Lovelace");
    }
  });

  it("reports required fields on an empty form", () => {
    const result = validateContact(EMPTY_CONTACT_FORM);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual(
        ["email", "message", "name"].sort(),
      );
    }
  });

  it("rejects malformed emails", () => {
    const result = validateContact({ ...validForm, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toMatch(/valid email/i);
    }
  });

  it("rejects phone numbers with letters", () => {
    const result = validateContact({ ...validForm, phone: "call me" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.phone).toBeDefined();
  });

  it("accepts common phone formats", () => {
    expect(
      validateContact({ ...validForm, phone: "+1 (555) 123-4567" }).success,
    ).toBe(true);
  });

  it("rejects budget/timeline values outside the offered options", () => {
    const result = validateContact({
      ...validForm,
      budget: "1M" as ContactFormData["budget"],
      timeline: "yesterday" as ContactFormData["timeline"],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.budget).toBeDefined();
      expect(result.errors.timeline).toBeDefined();
    }
  });

  it("only reports the first error per field", () => {
    const result = validateContact({ ...validForm, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBe("Please enter your email");
    }
  });
});

describe("buildMailtoLink", () => {
  it("encodes recipient, subject and body", () => {
    const href = buildMailtoLink("team@example.com", {
      ...validPayload(),
      budget: "10k-25k",
      company: "Analytical Engines & Co",
    });
    const url = new URL(href);

    expect(url.protocol).toBe("mailto:");
    expect(decodeURIComponent(url.pathname)).toBe("team@example.com");
    expect(url.searchParams.get("subject")).toBe(
      "Project enquiry from Ada Lovelace",
    );
    const body = url.searchParams.get("body") ?? "";
    expect(body).toContain("Company: Analytical Engines & Co");
    expect(body).toContain("Budget: $10k - $25k");
    expect(body).toContain("We need a brand refresh");
  });

  it("omits optional fields that were left blank", () => {
    const body =
      new URL(buildMailtoLink("a@b.co", validPayload())).searchParams.get(
        "body",
      ) ?? "";
    expect(body).not.toContain("Company:");
    expect(body).not.toContain("Phone:");
  });
});

describe("getContactConfig", () => {
  it("falls back to the default email and no endpoint", () => {
    expect(getContactConfig({})).toEqual({
      endpoint: undefined,
      email: DEFAULT_CONTACT_EMAIL,
    });
  });

  it("reads and trims configured values", () => {
    expect(
      getContactConfig({
        VITE_CONTACT_ENDPOINT: " https://example.com/form ",
        VITE_CONTACT_EMAIL: "hi@example.com",
      }),
    ).toEqual({
      endpoint: "https://example.com/form",
      email: "hi@example.com",
    });
  });

  it("treats blank values as unset", () => {
    expect(
      getContactConfig({ VITE_CONTACT_ENDPOINT: "  ", VITE_CONTACT_EMAIL: "" }),
    ).toEqual({ endpoint: undefined, email: DEFAULT_CONTACT_EMAIL });
  });
});

describe("submitContact", () => {
  it("returns a mailto link when no endpoint is configured", async () => {
    const fetchImpl = vi.fn();
    const result = await submitContact(
      validPayload(),
      { email: "team@example.com" },
      fetchImpl,
    );
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(result.status).toBe("mailto");
  });

  it("POSTs JSON to the configured endpoint", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 200 }));
    const payload = validPayload();

    const result = await submitContact(
      payload,
      { endpoint: "https://example.com/form", email: "x@y.z" },
      fetchImpl,
    );

    expect(result).toEqual({ status: "sent" });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/form",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );
  });

  it("throws a friendly error on non-2xx responses", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 500 }));
    await expect(
      submitContact(
        validPayload(),
        { endpoint: "https://example.com/form", email: "x@y.z" },
        fetchImpl,
      ),
    ).rejects.toThrow(/error 500/);
  });

  it("throws a friendly error on network failures", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(
      submitContact(
        validPayload(),
        { endpoint: "https://example.com/form", email: "x@y.z" },
        fetchImpl,
      ),
    ).rejects.toBeInstanceOf(ContactSubmitError);
  });
});
