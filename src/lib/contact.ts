import { z } from "zod";

export const BUDGET_OPTIONS = [
  { value: "5k-10k", label: "$5k - $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-50k", label: "$25k - $50k" },
  { value: "50k+", label: "$50k+" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-2months", label: "1-2 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "6months+", label: "6+ months" },
] as const;

const optionValues = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as [
    T[number]["value"],
    ...T[number]["value"][],
  ];

const optionalEnum = <T extends readonly { value: string }[]>(options: T) =>
  z.union([z.literal(""), z.enum(optionValues(options))]);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  company: z.string().trim().max(100, "Company name is too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[\d\s()+.-]*$/, "Phone number contains invalid characters"),
  budget: optionalEnum(BUDGET_OPTIONS),
  timeline: optionalEnum(TIMELINE_OPTIONS),
  service: z.string().trim().max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(5000, "Message is too long"),
});

export type ContactFormData = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
export type ContactField = keyof ContactFormData;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  budget: "",
  timeline: "",
  service: "",
  message: "",
};

export type ValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; errors: ContactErrors };

/** Validates raw form values, returning the first error message per field. */
export function validateContact(values: ContactFormData): ValidationResult {
  const result = contactSchema.safeParse(values);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return { success: false, errors };
}

const labelFor = (
  options: readonly { value: string; label: string }[],
  value: string,
) => options.find((option) => option.value === value)?.label ?? value;

/** Builds a `mailto:` URL containing the enquiry, for setups without a backend. */
export function buildMailtoLink(to: string, data: ContactPayload): string {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    data.phone && `Phone: ${data.phone}`,
    data.service && `Service: ${data.service}`,
    data.budget && `Budget: ${labelFor(BUDGET_OPTIONS, data.budget)}`,
    data.timeline && `Timeline: ${labelFor(TIMELINE_OPTIONS, data.timeline)}`,
    "",
    data.message,
  ].filter((line): line is string => typeof line === "string");

  const subject = `Project enquiry from ${data.name}`;
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export interface ContactConfig {
  /** HTTPS endpoint that accepts a JSON POST (Formspree, a serverless function, ...). */
  endpoint?: string;
  /** Address used for the `mailto:` fallback when no endpoint is configured. */
  email: string;
}

export const DEFAULT_CONTACT_EMAIL = "hello@theagency.com";

/** Reads contact settings from Vite env vars (see `.env.example`). */
export function getContactConfig(
  env: Record<string, string | undefined> = import.meta.env,
): ContactConfig {
  const endpoint = env.VITE_CONTACT_ENDPOINT?.trim();
  const email = env.VITE_CONTACT_EMAIL?.trim();
  return {
    endpoint: endpoint ? endpoint : undefined,
    email: email ? email : DEFAULT_CONTACT_EMAIL,
  };
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "mailto"; href: string };

export class ContactSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmitError";
  }
}

/**
 * Delivers an enquiry. With an endpoint configured it POSTs JSON and throws
 * `ContactSubmitError` on failure; otherwise it returns a `mailto:` link the
 * UI can open in the visitor's mail client.
 */
export async function submitContact(
  data: ContactPayload,
  config: ContactConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!config.endpoint) {
    return { status: "mailto", href: buildMailtoLink(config.email, data) };
  }

  let response: Response;
  try {
    response = await fetchImpl(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ContactSubmitError(
      "We couldn't reach the server. Check your connection and try again.",
    );
  }

  if (!response.ok) {
    throw new ContactSubmitError(
      `Your message couldn't be sent (error ${response.status}). Please try again or email us directly.`,
    );
  }

  return { status: "sent" };
}
