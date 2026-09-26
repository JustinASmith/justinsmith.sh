import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);

export const ArrowDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Stroke>
);

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const Copy = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
  </Stroke>
);

export const Check = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Stroke>
);

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </Stroke>
);

export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Stroke>
);

export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Stroke>
);

export const Terminal = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 7 5 5-5 5M12.5 17.5H19" />
  </Stroke>
);

export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
);

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const Pin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Stroke>
);

export const DiscGolf = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3v18M8.5 21h7" />
    <path d="M5.5 5.5h13" />
    <path d="M7 5.5 9 12M17 5.5 15 12M10 5.5l1 6.5M14 5.5l-1 6.5" />
    <path d="M6 12h12l-1.6 3.2H7.6Z" />
  </Stroke>
);

export const Fish = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M2.5 12c3.2-5 10.3-6.2 15-.2-4.7 6.2-11.8 5.1-15 .2Z" />
    <path d="M17.5 11.8 21.5 8v8l-4-4.2Z" />
    <path d="M12.5 8.4c.8 1.1 1.2 2.3 1.2 3.6s-.4 2.5-1.2 3.6" />
    <circle cx="7" cy="11" r="0.6" fill="currentColor" />
  </Stroke>
);

export const Paw = (p: IconProps) => (
  <Stroke {...p}>
    <ellipse cx="6.5" cy="10.5" rx="1.6" ry="2.1" />
    <ellipse cx="10" cy="6.2" rx="1.6" ry="2.1" />
    <ellipse cx="14" cy="6.2" rx="1.6" ry="2.1" />
    <ellipse cx="17.5" cy="10.5" rx="1.6" ry="2.1" />
    <path d="M12 11.5c-2.7 0-5.2 2.8-5.2 5.2 0 1.6 1.2 2.6 2.7 2.6 1 0 1.5-.6 2.5-.6s1.5.6 2.5.6c1.5 0 2.7-1 2.7-2.6 0-2.4-2.5-5.2-5.2-5.2Z" />
  </Stroke>
);

export const Roller = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3.5" y="3.5" width="14" height="5.5" rx="1.6" />
    <path d="M17.5 6.2h2.8v5.3h-8.3v2.8" />
    <rect x="10.5" y="14.3" width="3" height="7" rx="1" />
  </Stroke>
);

export const Cowbell = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9.5 3.5h5v3h-5Z" />
    <path d="M8.2 6.5h7.6L18.5 18h-13Z" />
    <path d="M11 20.5h2" />
  </Stroke>
);

export const Github = ({ size = 20, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
    />
  </svg>
);

export const LinkedIn = ({ size = 20, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
  </svg>
);

export const XLogo = ({ size = 20, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Heart = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  </Stroke>
);

export const Sparkle = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z" />
    <path d="M19 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
  </Stroke>
);

export const Hammer = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14.5 5.5l4 4-2.2 2.2-4-4z" />
    <path d="M12.3 7.7 4 16a1.9 1.9 0 0 0 2.7 2.7L15 10.4" />
    <path d="M14.5 5.5l1.2-1.2a2.8 2.8 0 0 1 4 4l-1.2 1.2" />
  </Stroke>
);
