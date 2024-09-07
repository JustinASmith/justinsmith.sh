import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import MainNavbar from "@/components/main-navbar";
import SocialLinks from "@/components/social-links";
import MobileNav from "@/components/mobile-navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Justin Smith - Full-Stack Engineer",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="relative min-h-screen font-sans antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainNavbar />
          <MobileNav />
          <main>{children}</main>
          <SocialLinks />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
