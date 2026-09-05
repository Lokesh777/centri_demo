/**
 * Shape of the demo-request form state.
 *
 * This lives outside `actions.ts` on purpose: a `"use server"` module may only
 * export async functions, so the initial value cannot be declared there.
 */
export type ContactState = {
  readonly status: "idle" | "success" | "error";
  readonly message: string;
  readonly fieldErrors: Readonly<Record<string, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
