"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Buttondown embed subscribe endpoint
      const res = await fetch(
        "https://buttondown.com/api/emails/embed-subscribe/justinsmith",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }).toString(),
        }
      );

      if (res.ok || res.status === 303) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-primary">
        Thanks! Check your email to confirm your subscription.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="max-w-xs"
        disabled={status === "submitting"}
      />
      <Button type="submit" size="sm" disabled={status === "submitting"}>
        {status === "submitting" ? "..." : "Subscribe"}
      </Button>
      {status === "error" && (
        <p className="self-center text-xs text-destructive">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
