"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  MapPin,
  Send,
} from "lucide-react";

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

const ContactSection: React.FC = () => {
  const email = "contact" + "@" + "justinsmith.sh";

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 lg:p-16"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <MapPin className="h-4 w-4" />
                Based in Mississippi, USA
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              >
                Let&apos;s work{" "}
                <span className="text-gradient">together</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg max-w-xl mb-8"
              >
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Button asChild size="lg" className="group">
                  <a href={`mailto:${email}?subject=Let's%20Connect`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send me an email
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <span className="text-muted-foreground text-sm">or</span>
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
              </motion.div>
            </div>

            {/* Right decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center rotate-12 shadow-xl">
                  <Send className="h-12 w-12 text-white -rotate-12" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-muted/50 -z-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Designed and built by Justin Smith.{" "}
            <Link
              href="https://github.com/JustinASmith/justinsmith.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View source
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
