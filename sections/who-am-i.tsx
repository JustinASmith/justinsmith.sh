"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Database,
  Cloud,
  Code2,
  Layers,
  Cpu,
  Globe,
  Sparkles,
  Zap,
} from "lucide-react";

const skills = [
  { name: "Python", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Globe },
  { name: "Next.js", icon: Globe },
  { name: "PostgreSQL", icon: Database },
  { name: "Kafka", icon: Layers },
  { name: "Docker", icon: Cpu },
  { name: "Kubernetes", icon: Cloud },
  { name: "AWS", icon: Cloud },
];

const tools = [
  { src: "/tools/python.svg", alt: "Python" },
  { src: "/tools/react.svg", alt: "React" },
  { src: "/tools/next.svg", alt: "Next.js" },
  { src: "/tools/postgres.svg", alt: "PostgreSQL" },
  { src: "/tools/kafka.svg", alt: "Kafka" },
  { src: "/tools/docker.svg", alt: "Docker" },
  { src: "/tools/k8s.svg", alt: "Kubernetes" },
  { src: "/tools/aws.svg", alt: "AWS" },
  { src: "/tools/git.svg", alt: "Git" },
  { src: "/tools/vscode.svg", alt: "VS Code" },
  { src: "/tools/vercel.svg", alt: "Vercel" },
  { src: "/tools/jenkins.svg", alt: "Jenkins" },
];

const BentoCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={cn(
      "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5",
      className
    )}
  >
    {children}
  </motion.div>
);

export function WhoAmISection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate engineer with expertise in building scalable data
            systems and modern web applications.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Main About Card - Spans 2 columns */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Who am I?
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Senior Data Engineer at Camgian
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Originally from Michigan, I&apos;m a self-taught programmer who
                discovered my passion for technology through building and
                breaking things. Now based in Mississippi, I specialize in
                architecting distributed systems and transforming complex data
                into actionable insights.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me playing disc golf,
                exploring new places with my wife, or diving into the latest
                tech trends.
              </p>
            </div>
            {/* Decorative gradient */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </BentoCard>

          {/* Skills Card */}
          <BentoCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Core Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <skill.icon className="h-4 w-4" />
                  {skill.name}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Tools Grid Card */}
          <BentoCard className="lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Tech Stack
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.alt}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Image
                    src={tool.src}
                    alt={tool.alt}
                    width={40}
                    height={40}
                    className="w-8 h-8 object-contain dark:invert dark:brightness-0 dark:contrast-200"
                  />
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Architecture Card */}
          <BentoCard className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Database className="h-5 w-5 text-violet-500" />
              </div>
              <span className="text-sm font-medium text-violet-500/80">
                Data Architecture
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-2">
              Scalable Systems
            </h4>
            <p className="text-sm text-muted-foreground">
              Designing robust, future-proof data pipelines and distributed
              systems that handle millions of events.
            </p>
          </BentoCard>

          {/* Engineering Card */}
          <BentoCard className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Code2 className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-blue-500/80">
                Full-Stack
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-2">
              Modern Development
            </h4>
            <p className="text-sm text-muted-foreground">
              Building elegant frontends and powerful backends with modern
              frameworks and best practices.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
