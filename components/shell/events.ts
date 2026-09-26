export const SHELL_OPEN_EVENT = "shell:open";

export function openShell() {
  window.dispatchEvent(new Event(SHELL_OPEN_EVENT));
}
