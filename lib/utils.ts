type ClassValue = string | false | null | undefined;

/** Joins conditional class names, dropping falsy entries. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return currency.format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
