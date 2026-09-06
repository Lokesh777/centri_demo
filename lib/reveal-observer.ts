/**
 * IntersectionObservers shared by every `<Reveal>` on the page, one per
 * distinct threshold.
 *
 * A single observer watching many targets is markedly cheaper than one observer
 * per element: the browser batches all the intersection work into one callback
 * rather than scheduling dozens. In practice the site uses two thresholds, so
 * two observers cover the whole page. Targets unobserve themselves once
 * revealed, so each set shrinks as the visitor scrolls.
 */
const observers = new Map<number, IntersectionObserver>();

function getObserver(threshold: number): IntersectionObserver {
  const existing = observers.get(threshold);
  if (existing) return existing;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.visible = "true";
        observer.unobserve(entry.target);
      }
    },
    { threshold, rootMargin: "0px 0px -8% 0px" },
  );

  observers.set(threshold, observer);
  return observer;
}

/**
 * Starts watching `element`; returns a cleanup that stops watching it.
 * `amount` is the fraction of the element that must be visible to trigger.
 */
export function observeReveal(element: Element, amount = 0.15): () => void {
  const observer = getObserver(amount);
  observer.observe(element);
  return () => observer.unobserve(element);
}
