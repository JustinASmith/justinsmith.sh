import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Shell } from "@/components/shell/shell";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Justin Smith · Software engineer in Starkville, MS",
    template: "%s · Justin Smith",
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "justinsmith.sh",
    title: "Justin Smith · Software engineer in Starkville, MS",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Smith · Software engineer in Starkville, MS",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE5" },
    { media: "(prefers-color-scheme: dark)", color: "#111513" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#content"
            className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <Shell />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
