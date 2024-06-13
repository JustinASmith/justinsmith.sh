import React from "react";
import { InfiniteMovingImages } from "./ui/infinite-moving-images";

type Props = {};

export default function ToolsIUse({}: Props) {
  return (
    <>
      <h2 className="text-left text-balance text-2xl font-semibold tracking-[-0.015em] text-white mb-8">
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
    alt: "Git Icon",
  },
  {
    url: "https://kafka.apache.org/",
    src: "/tools/kafka.svg",
    alt: "Kafka Icon",
  },
  {
    url: "",
    src: "/tools/jenkins.svg",
    alt: "Jenkins Icon",
  },
  {
    url: "https://www.postgresql.org/",
    src: "/tools/postgres.svg",
    alt: "PostgreSQL Icon",
  },
  {
    url: "https://code.visualstudio.com/",
    src: "/tools/vscode.svg",
    alt: "VS Code Icon",
  },
  {
    url: "https://www.python.org/",
    src: "/tools/python.svg",
    alt: "Python Icon",
  },
  {
    url: "https://www.rabbitmq.com/",
    src: "/tools/rabbitmq.svg",
    alt: "RabbitMQ Icon",
  },
  {
    url: "https://www.postman.com/",
    src: "/tools/postman.svg",
    alt: "Postman Icon",
  },
];
