export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getCategoryLabel(value: string) {
  const labels: Record<string, string> = {
    "agentic-coding": "Agentic Coding",
    "software-engineering": "Software Engineering",
    career: "Career",
    tools: "Tools & Workflow",
    thoughts: "Thoughts",
  };
  return labels[value] ?? value;
}
