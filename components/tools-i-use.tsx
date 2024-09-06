import React from "react";
import { InfiniteMovingImages } from "./ui/infinite-moving-images";

type Props = {};

export default function ToolsIUse({}: Props) {
  return (
    <>
      <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-8">
        Tools I Use
      </h2>
      <InfiniteMovingImages
        items={tools}
        direction="right"
        speed="normal"
        className="mb-4"
      />
    </>
  );
}

const tools = [
  {
    url: "https://git-scm.com/",
    src: "/tools/git.svg",
    alt: "Git Logo",
  },
  {
    url: "https://kafka.apache.org/",
    src: "/tools/kafka.svg",
    alt: "Kafka Logo",
  },
  {
    url: "https://nextjs.org/",
    src: "/tools/next.svg",
    alt: "Next.js Logo",
  },
  {
    url: "",
    src: "/tools/jenkins.svg",
    alt: "Jenkins Logo",
  },
  {
    url: "https://www.postgresql.org/",
    src: "/tools/postgres.svg",
    alt: "PostgreSQL Logo",
  },
  {
    url: "https://www.docker.com/",
    src: "/tools/docker.svg",
    alt: "Docker Logo",
  },
  {
    url: "https://vercel.com/",
    src: "/tools/vercel.svg",
    alt: "Vercel Logo",
  },
  {
    url: "https://kubernetes.io/",
    src: "/tools/k8s.svg",
    alt: "Kubernetes Logo",
  },
  {
    url: "https://react.dev/",
    src: "/tools/react.svg",
    alt: "React Logo",
  },
  {
    url: "https://code.visualstudio.com/",
    src: "/tools/vscode.svg",
    alt: "VS Code Logo",
  },
  {
    url: "https://www.python.org/",
    src: "/tools/python.svg",
    alt: "Python Logo",
  },
  {
    url: "https://aws.amazon.com/",
    src: "/tools/aws.svg",
    alt: "Amazon Web Services Logo",
  },
];
