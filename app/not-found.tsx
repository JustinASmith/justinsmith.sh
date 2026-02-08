import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Go home
        </Link>
      </section>
    </Container>
  );
}
