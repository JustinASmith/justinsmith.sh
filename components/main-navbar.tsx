"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";
import NavbarHeader from "./navbar-header";
import { cn } from "@/lib/utils";

interface NavLink {
  title: string;
  url: string;
}

const NavLinks = [
  { title: "About", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Blog", url: "#blog" },
  { title: "Contact", url: "#contact" },
];

const childVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "-1rem" },
};

export default function MainNavbar() {
  return (
    <NavbarHeader className="hidden md:block">
      <div className="flex items-center gap-1">
        {NavLinks.map((link: NavLink) => (
          <motion.div
            key={link.title}
            variants={childVariants}
            transition={{
              ease: [0.1, 0.25, 0.3, 1],
              duration: 0.6,
            }}
          >
            <Link
              href={link.url}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground",
                "rounded-full hover:bg-muted"
              )}
            >
              {link.title}
            </Link>
          </motion.div>
        ))}
        <motion.div
          variants={childVariants}
          transition={{
            ease: [0.1, 0.25, 0.3, 1],
            duration: 0.6,
          }}
          className="ml-2"
        >
          <ModeToggle />
        </motion.div>
      </div>
    </NavbarHeader>
  );
}
