"use server";

import type { ContactState } from "@/app/contact/contact-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a demo request. This design study has no CRM behind it, so a valid
 * submission simply resolves — swap the body for your transport of choice.
 */
export async function submitDemoRequest(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Tell us who you are.";
  if (!email) fieldErrors.email = "We need somewhere to reply.";
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "That does not look like an email.";
  if (!company) fieldErrors.company = "Which company is this for?";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  return {
    status: "success",
    message: `Thanks ${name} — we will be in touch at ${email} within one working day.`,
    fieldErrors: {},
  };
}
