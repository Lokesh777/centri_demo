"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { submitDemoRequest } from "@/app/contact/actions";
import { initialContactState } from "@/app/contact/contact-state";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ContactForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [state, formAction] = useActionState(submitDemoRequest, initialContactState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card bg-cream p-8 sm:p-10">
        <span className="grid size-11 place-items-center rounded-full bg-white text-red">
          <CheckIcon width={20} height={20} />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Request received</h2>
        <p className="leading-relaxed text-ink/60 text-pretty">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-5 rounded-card bg-cream p-8 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" error={state.fieldErrors.name} autoComplete="name" />
        <Field
          label="Work email"
          name="email"
          type="email"
          error={state.fieldErrors.email}
          autoComplete="email"
          defaultValue={defaultEmail}
        />
      </div>

      <Field
        label="Company"
        name="company"
        error={state.fieldErrors.company}
        autoComplete="organization"
      />

      <Field label="What are you trying to fix?" name="message" multiline />

      {state.status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-deep">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />

      <p className="text-xs text-ink/65">
        By submitting you agree to our privacy policy. No card details are collected here.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="self-start">
      {pending ? "Sending…" : "Request a demo"}
    </Button>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
  defaultValue?: string;
};

function Field({
  label,
  name,
  type = "text",
  error,
  multiline,
  autoComplete,
  defaultValue,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const controlClass = cn(
    "w-full rounded-card border bg-white px-4 py-3 text-ink transition-colors duration-200",
    error ? "border-red" : "border-ink/15 focus:border-ink",
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          className={cn(controlClass, "resize-y")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={controlClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
