/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional HTTPS endpoint that receives contact-form submissions as JSON. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Optional address for the contact section and the mailto fallback. */
  readonly VITE_CONTACT_EMAIL?: string;
  /** Optional HTTPS endpoint that receives newsletter sign-ups as JSON. */
  readonly VITE_NEWSLETTER_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
