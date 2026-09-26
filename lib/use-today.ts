import { useSyncExternalStore } from "react";

const noop = () => () => {};
const today = () => new Date().toISOString().slice(0, 10);

/**
 * Today's date as "YYYY-MM-DD" (UTC). During SSR and hydration it returns `builtOn`,
 * the date the page was rendered, so time-sensitive bits of a static page can
 * quietly hide themselves once they go stale.
 */
export function useToday(builtOn: string) {
  return useSyncExternalStore(noop, today, () => builtOn);
}
