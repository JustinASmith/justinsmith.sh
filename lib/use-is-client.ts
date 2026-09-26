import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false during SSR and hydration, true once running in the browser. */
export function useIsClient() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
