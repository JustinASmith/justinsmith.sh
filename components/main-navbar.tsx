"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NavbarHeader from "./navbar-header";

interface NavLink {
  title: string;
  url: string;
}

const NavLinks = [
  { title: "Who am I?", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Blog", url: "#blog" },
  { title: "Contact", url: "#contact" },
];

const childVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "-2rem" },
};

export default function MainNavbar() {
  return (
    <NavbarHeader className="hidden md:block">
      <div className="flex justify-between items-center space-x-6">
        {NavLinks.map((link: NavLink) => (
          <Button
            key={link.title}
            variant={"link"}
            className="text-lg font-medium text-inherit m-0 p-0 no-underline hover:text-primary"
            asChild
          >
            <motion.div
              variants={childVariants}
              transition={{
                ease: [0.1, 0.25, 0.3, 1],
                duration: 0.6,
              }}
            >
              <Link href={link.url}>{link.title}</Link>
            </motion.div>
          </Button>
        ))}
        <motion.div
          variants={childVariants}
          transition={{
            ease: [0.1, 0.25, 0.3, 1],
            duration: 0.6,
          }}
        >
          <ModeToggle />
        </motion.div>
      </div>
    </NavbarHeader>
  );
}
