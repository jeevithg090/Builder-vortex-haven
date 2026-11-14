import { z } from "zod";

export const newsletterSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email")
  .email("Please enter a valid email address")
  .max(254, "Email is too long");

export type NewsletterValidation =
  | { success: true; email: string }
  | { success: false; error: string };

export function validateNewsletterEmail(value: string): NewsletterValidation {
  const result = newsletterSchema.safeParse(value);
  return result.success
    ? { success: true, email: result.data }
    : { success: false, error: result.error.issues[0].message };
}

export interface NewsletterConfig {
  /** HTTPS endpoint that accepts `{ "email": "..." }` as a JSON POST. */
  endpoint?: string;
  /** Address that receives subscribe requests when no endpoint is set. */
  email: string;
}

export function getNewsletterConfig(
  env: Record<string, string | undefined>,
  fallbackEmail: string,
): NewsletterConfig {
  const endpoint = env.VITE_NEWSLETTER_ENDPOINT?.trim();
  return { endpoint: endpoint ? endpoint : undefined, email: fallbackEmail };
}

export type NewsletterResult =
  | { status: "subscribed" }
  | { status: "mailto"; href: string };

/**
 * Subscribes an address: POSTs it to the configured endpoint, or returns a
 * `mailto:` link asking to be added to the list. Throws an `Error` with a
 * user-facing message when the endpoint fails.
 */
export async function subscribeToNewsletter(
  email: string,
  config: NewsletterConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<NewsletterResult> {
  if (!config.endpoint) {
    const subject = encodeURIComponent("Newsletter subscription");
    const body = encodeURIComponent(
      `Please add ${email} to the newsletter list.`,
    );
    return {
      status: "mailto",
      href: `mailto:${encodeURIComponent(config.email)}?subject=${subject}&body=${body}`,
    };
  }

  let response: Response;
  try {
    response = await fetchImpl(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });
  } catch {
    throw new Error("We couldn't reach the server. Please try again.");
  }
  if (!response.ok) {
    throw new Error(
      `Subscription failed (error ${response.status}). Please try again.`,
    );
  }
  return { status: "subscribed" };
}
