"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import NavbarHeader from "./navbar-header";

interface NavLink {
  title: string;
  url: string;
}

const navLinks = [
  { title: "Who am I?", url: "#about" },
  { title: "Projects", url: "#projects" },
  { title: "Blog", url: "#blog" },
  { title: "Contact", url: "#contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <NavbarHeader className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-col items-start">
              {navLinks.map((link: NavLink) => (
                <Button
                  key={link.title}
                  variant="link"
                  className="text-lg font-medium text-inherit m-0 p-0 no-underline hover:text-primary"
                  asChild
                >
                  <Link href={link.url}>{link.title}</Link>
                </Button>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-6 w-full mx-auto">
              <Link
                title="Justin Smith's Github Profile"
                href="https://github.com/JustinASmith"
                target="_blank"
                className="text-secondary-foreground scale-110 rounded link-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="dark:fill-secondary-foreground hover:fill-primary dark:hover:fill-primary"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  ></path>
                </svg>
              </Link>
              <Link
                title="Justin Smith's LinkedIn Profile"
                href="https://www.linkedin.com/in/justin-a-smith662/"
                target="_blank"
                className="scale-110 rounded link-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="dark:fill-secondary-foreground hover:fill-primary dark:hover:fill-primary"
                >
                  <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                </svg>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </NavbarHeader>
  );
}
