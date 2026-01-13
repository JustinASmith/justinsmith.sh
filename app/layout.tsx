import "./globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import MainNavbar from "@/components/main-navbar";
import MobileNav from "@/components/mobile-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Justin Smith - Senior Data Engineer & Full-Stack Developer",
    template: "%s | Justin Smith",
  },
  description:
    "Senior Data Engineer and Full-Stack Developer specializing in building scalable distributed systems, data pipelines, and modern web applications.",
  keywords: [
    "Data Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Kafka",
    "PostgreSQL",
    "AWS",
  ],
  authors: [{ name: "Justin Smith" }],
  creator: "Justin Smith",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://justinsmith.sh",
    siteName: "Justin Smith",
    title: "Justin Smith - Senior Data Engineer & Full-Stack Developer",
    description:
      "Senior Data Engineer and Full-Stack Developer specializing in building scalable distributed systems, data pipelines, and modern web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Smith - Senior Data Engineer & Full-Stack Developer",
    description:
      "Senior Data Engineer and Full-Stack Developer specializing in building scalable distributed systems, data pipelines, and modern web applications.",
    creator: "@JustinASmith",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen font-sans antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNavbar />
          <MobileNav />
          <main>{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
