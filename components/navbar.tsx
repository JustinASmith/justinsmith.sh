import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

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

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between items-center ml-auto text-lg font-medium space-x-6">
        <Link href="/" className="text-2xl">
          JustinSmith<span className="text-primary">.sh</span>
        </Link>
        <div className="flex justify-between items-center space-x-6">
          {NavLinks.map((link: NavLink) => (
            <Button
              variant={"link"}
              className="text-lg font-medium text-inherit m-0 p-0 no-underline hover:text-primary"
              asChild
            >
              <Link href={link.url}>{link.title}</Link>
            </Button>
          ))}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
