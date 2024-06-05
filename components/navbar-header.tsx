"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const parentVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "-4rem" },
};

export default function NavbarHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  function update(latest: number, prev: number): void {
    if (latest < prev) {
      setHidden(false);
    } else if (latest > 100 && latest > prev) {
      setHidden(true);
    }
  }

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    update(latest, prevScroll);
    setPrevScroll(latest);
  });

  return (
    <motion.header
      variants={parentVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.6,
        staggerChildren: 0.05,
      }}
      className={cn(
        "sticky top-0 z-20 bg-background shadow-sm w-full",
        className
      )}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center ml-auto text-lg font-medium space-x-6">
          <Link href="/" className="text-2xl">
            JustinSmith<span className="text-primary">.sh</span>
          </Link>
          {children}
        </div>
      </nav>
    </motion.header>
  );
}
