import { cn } from "@/lib/utils";

/** Five-star row shown above pull quotes. Decorative — the rating is not data. */
export function StarRating({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <p aria-hidden="true" className={cn("flex items-center gap-2.5 text-lg", className)}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index}>★</span>
      ))}
    </p>
  );
}
