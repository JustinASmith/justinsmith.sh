import type { Config } from "tailwindcss";

// Colors are RGB triplets defined in app/globals.css so they can flip
// between the light "paper" theme and the dark "night on the lake" theme.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: token("paper"), 2: token("paper-2") },
        card: token("card"),
        ink: { DEFAULT: token("ink"), 2: token("ink-2"), 3: token("ink-3") },
        rule: token("rule"),
        accent: { DEFAULT: token("accent"), ink: token("accent-ink") },
        "on-accent": token("on-accent"),
        pine: token("pine"),
        gold: token("gold"),
        lake: token("lake"),
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        page: "1180px",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        ring: {
          "0%": { boxShadow: "0 0 0 0 rgb(var(--accent) / 0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgb(var(--accent) / 0)" },
          "100%": { boxShadow: "0 0 0 0 rgb(var(--accent) / 0)" },
        },
        drift: { from: { transform: "translateY(0)" }, to: { transform: "translateY(var(--drift, 12px))" } },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(3px) rotate(3deg)" },
        },
        ripple: {
          from: { transform: "scale(0.4)", opacity: "0.8" },
          to: { transform: "scale(2.2)", opacity: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-14deg)" },
          "40%": { transform: "rotate(12deg)" },
          "60%": { transform: "rotate(-8deg)" },
          "80%": { transform: "rotate(5deg)" },
        },
        "stripe-slide": { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "28px 0" } },
        "grow-x": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
        "spin-slow": "spin 28s linear infinite",
        ring: "ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bob: "bob 2.6s ease-in-out infinite",
        ripple: "ripple 2.4s ease-out infinite",
        wiggle: "wiggle 0.6s ease-in-out",
        "stripe-slide": "stripe-slide 1.2s linear infinite",
        "grow-x": "grow-x 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "fade-up": "fade-up 0.35s ease-out both",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--ink-2))",
            "--tw-prose-headings": "rgb(var(--ink))",
            "--tw-prose-lead": "rgb(var(--ink-2))",
            "--tw-prose-links": "rgb(var(--accent-ink))",
            "--tw-prose-bold": "rgb(var(--ink))",
            "--tw-prose-counters": "rgb(var(--ink-3))",
            "--tw-prose-bullets": "rgb(var(--accent))",
            "--tw-prose-hr": "rgb(var(--rule))",
            "--tw-prose-quotes": "rgb(var(--ink))",
            "--tw-prose-quote-borders": "rgb(var(--accent))",
            "--tw-prose-captions": "rgb(var(--ink-3))",
            "--tw-prose-code": "rgb(var(--ink))",
            "--tw-prose-pre-code": "rgb(var(--ink))",
            "--tw-prose-pre-bg": "rgb(var(--card))",
            "--tw-prose-th-borders": "rgb(var(--rule))",
            "--tw-prose-td-borders": "rgb(var(--rule))",
            maxWidth: "68ch",
            "h1, h2, h3": { fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500" },
            a: { textUnderlineOffset: "3px", textDecorationThickness: "1px" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

export default config;
