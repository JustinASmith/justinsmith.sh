"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import NavbarHeader from "./navbar-header";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  title: string;
  url: string;
}

const navLinks = [
  { title: "About", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Blog", url: "#blog" },
  { title: "Contact", url: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/JustinASmith",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/JustinASmith",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/JustinASmith",
    icon: Twitter,
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <NavbarHeader className="md:hidden">
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full sm:w-80 p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-xl font-bold tracking-tight"
                >
                  Justin<span className="text-primary">Smith</span>
                  <span className="text-muted-foreground">.sh</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  {navLinks.map((link: NavLink, index) => (
                    <motion.li
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.url}
                        onClick={() => setOpen(false)}
                        className="flex items-center py-3 px-4 rounded-lg text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer with Social Links */}
              <div className="p-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with me
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </NavbarHeader>
  );
}
