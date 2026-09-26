"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/lib/site";
import { career } from "@/lib/career";
import { facts, fish } from "@/lib/life";
import { guessStatus, starkvilleNow } from "@/lib/time";
import { ringCowbell } from "@/lib/cowbell";
import { SHELL_OPEN_EVENT } from "./events";

type Line = { id: number; kind: "in" | "out" | "err"; content: ReactNode };

const SECTIONS = ["work", "projects", "life", "contact"];
const LINKS: Record<string, string> = {
  github: site.links.github,
  linkedin: site.links.linkedin,
  origin: site.company.url,
  source: site.links.source,
};
const FILES = ["about.txt", "resume.txt", "contact.txt"];
const THEMES = ["light", "dark", "system"];

const HELP: [string, string][] = [
  ["help", "list commands"],
  ["whoami", "the short version"],
  ["ls", "see what's here"],
  ["cd <section>", "jump to work, projects, life, or contact"],
  ["cat <file>", "print about.txt, resume.txt, or contact.txt"],
  ["open <link>", "github, linkedin, origin, or source"],
  ["email", "copy my email address"],
  ["date", "the time in Starkville, and what I'm probably doing"],
  ["theme <mode>", "light, dark, or system"],
  ["fish", "cast a line"],
  ["neofetch", "system info, sort of"],
  ["scout", "meet the dog"],
  ["cowbell", "you know what to do"],
  ["clear", "clear the screen"],
  ["exit", "close the shell"],
];

const COMMAND_NAMES = [...HELP.map(([c]) => c.split(" ")[0]), "history", "echo", "pwd", "sudo", "hire", "pet"];

const DOG_ART = ["      __", " (___()'`;", " /,    /`", ' \\\\"--\\\\'].join("\n");

const fmtMonth = (ym?: string) => {
  if (!ym) return "now";
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

function resumeText() {
  const rows = career
    .filter((s) => s.id !== "career" && s.id !== "camgian")
    .slice()
    .reverse()
    .map((s) => {
      const left = `${s.title.split(",")[0]}, ${s.org.replace("Mississippi State University", "Mississippi State")}`;
      const right = `${fmtMonth(s.start)} – ${fmtMonth(s.end)}`;
      return `${left} ${".".repeat(Math.max(2, 58 - left.length))} ${right}`;
    });
  return [`JUSTIN SMITH · ${site.locationShort}`, "", ...rows, "", "the full story: cd work"].join("\n");
}

const NEOFETCH_ART = String.raw`        \   |   /
    '.   .-"""-.   .'
  --    /       \    --
~~~~~~~~~~~~~~~~~~~~~~~~
   ~~~~  ~~~~~~~  ~~~~
       ~~~~   ~~~~`;

function catchSomething() {
  const total = fish.reduce((sum, f) => sum + f.weight, 0);
  let roll = Math.random() * total;
  const f = fish.find((x) => (roll -= x.weight) < 0) ?? fish[0];
  const lbs = f.max ? (f.min + Math.random() * (f.max - f.min)).toFixed(1) : null;
  const fact = facts[Math.floor(Math.random() * facts.length)];
  return lbs
    ? `you caught a ${lbs} lb ${f.name}!\nfun fact: ${fact}`
    : `you reeled in an old boot. 404: fish not found.\ncast again with 'fish'.`;
}

let nextId = 0;
const line = (kind: Line["kind"], content: ReactNode): Line => ({ id: nextId++, kind, content });

const WELCOME = () => [
  line(
    "out",
    <>
      <span className="text-[#FF8A6E]">justinsmith.sh</span> · a tiny shell for the curious.{"\n"}Type{" "}
      <span className="text-[#E3B04B]">help</span> to see what it can do. Press <span className="text-[#E3B04B]">esc</span> to leave.
    </>,
  ),
];

export function Shell() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setLines((prev) => (prev.length ? prev : WELCOME()));
    dialog.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el?.closest("input, textarea, select, [contenteditable='true']");
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        open();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(SHELL_OPEN_EVENT, open);
    const pending = timers.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SHELL_OPEN_EVENT, open);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, [open, close]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const print = (...out: Line[]) => setLines((prev) => [...prev, ...out]);

  const goTo = (id: string) => {
    close();
    if (pathname === "/") {
      const el = id === "top" ? document.body : document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", id === "top" ? "/" : `/#${id}`);
    } else {
      router.push(id === "top" ? "/" : `/#${id}`);
    }
  };

  function run(raw: string): Line[] {
    const input = raw.trim();
    if (!input) return [];
    const [cmd, ...args] = input.split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    const out = (content: ReactNode) => [line("out", content)];
    const err = (content: ReactNode) => [line("err", content)];

    switch (cmd.toLowerCase()) {
      case "help":
        return out(HELP.map(([c, d]) => `${c.padEnd(16)} ${d}`).join("\n"));
      case "whoami":
        return out(
          `Justin Smith, software engineer in ${site.locationShort}.\nFounding forward-deployed engineer at Origin. Previously Estuary and Camgian.\nBuilds data-heavy software, usually right next to the customer.`,
        );
      case "ls":
        return out(
          <>
            {SECTIONS.map((s) => (
              <span key={s} className="text-[#79B0D2]">
                {s}/{"  "}
              </span>
            ))}
            {FILES.join("  ")}
          </>,
        );
      case "pwd":
        return out("/home/guest/justinsmith.sh");
      case "cd": {
        if (!arg || ["~", "/", "..", "top", "home"].includes(arg)) {
          goTo("top");
          return [];
        }
        const target = arg.replace(/\/$/, "");
        if (SECTIONS.includes(target)) {
          goTo(target);
          return [];
        }
        if (target === "notes") {
          close();
          router.push("/notes");
          return [];
        }
        return err(`cd: no such section: ${arg}. try 'ls'.`);
      }
      case "cat": {
        if (arg === "about.txt")
          return out(
            "Born in Michigan, raised in Northeast Mississippi, and a Starkville local since my Mississippi State days.\nMy cousin helped me build my first computer, a Core 2 Duo desktop. I wanted it for games; I stayed for the software.\nThese days: data systems, customer problems, disc golf, bass fishing, and Scout, our Springer Spaniel.",
          );
        if (arg === "resume.txt") return out(resumeText());
        if (arg === "contact.txt")
          return out(`email     ${site.email}\nlinkedin  ${site.links.linkedin}\ngithub    ${site.links.github}`);
        return err(arg ? `cat: ${arg}: no such file` : "cat: which file? try 'ls'.");
      }
      case "open": {
        const url = LINKS[arg];
        if (!url) return err(`open: try one of ${Object.keys(LINKS).join(", ")}`);
        window.open(url, "_blank", "noopener,noreferrer");
        return out(`opening ${arg}…`);
      }
      case "email":
      case "contact": {
        navigator.clipboard?.writeText(site.email).catch(() => {});
        return out(`${site.email} (copied to your clipboard)`);
      }
      case "hire":
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Let's work together")}`;
        return out("great idea. opening your mail client…");
      case "date":
      case "time":
      case "status": {
        const now = starkvilleNow();
        return out(`${now.label} ${now.zone} in ${site.locationShort}\nstatus: ${guessStatus(now)}`);
      }
      case "theme": {
        if (!arg) return out(`current theme: ${theme ?? "system"}. usage: theme <light|dark|system>`);
        if (!THEMES.includes(arg)) return err(`theme: unknown mode '${arg}'`);
        setTheme(arg);
        return out(`theme set to ${arg}.`);
      }
      case "fish": {
        const t = window.setTimeout(
          () => print(line("out", catchSomething())),
          900 + Math.random() * 1400,
        );
        timers.current.push(t);
        return out("casting… 🎣");
      }
      case "neofetch":
        return out(
          <span className="flex flex-wrap gap-x-8 gap-y-3">
            <span className="text-[#FF6B4A]">{NEOFETCH_ART}</span>
            <span>
              <span className="text-[#FF8A6E]">guest</span>@<span className="text-[#FF8A6E]">justinsmith.sh</span>
              {"\n"}---------------------{"\n"}
              {[
                ["role", "founding fde @ origin"],
                ["location", `${site.locationShort} (CT)`],
                ["uptime", "5+ years shipping"],
                ["langs", "python, typescript, rust, sql"],
                ["hobbies", "disc golf, bass fishing, diy"],
                ["dog", "scout, springer spaniel"],
              ].map(([k, v]) => (
                <span key={k}>
                  <span className="text-[#E3B04B]">{k.padEnd(9)}</span>
                  {v}
                  {"\n"}
                </span>
              ))}
            </span>
          </span>,
        );
      case "scout":
        return out(
          <span className="flex flex-wrap items-end gap-x-6 gap-y-2">
            <span className="text-[#E3B04B]">{DOG_ART}</span>
            <span>
              Scout · Springer Spaniel · born 2024-09-01{"\n"}
              drove 3.5 hours to bring him home.{"\n"}
              <span className="text-[#7FC2A6]">status: good boy</span> (try &apos;pet&apos;)
            </span>
          </span>,
        );
      case "pet":
        return out("Scout leans in for more. tail.wag_rate: high");
      case "cowbell":
        ringCowbell();
        return out("🔔 clank! more cowbell. Hail State!");
      case "sudo":
        return err("guest is not in the sudoers file. this incident will be reported… to Justin, who would love to hear from you. try 'email'.");
      case "rm":
        return err("nice try.");
      case "vim":
      case "vi":
      case "nano":
      case "emacs":
        return out("no editors here. you're safe.");
      case "echo":
        return out(args.join(" "));
      case "history":
        return out(history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "(empty)");
      case "hello":
      case "hi":
      case "hey":
        return out("hey! 👋 type 'help' to see what I can do.");
      case "exit":
      case "quit":
      case ":q":
        close();
        return [];
      default:
        return err(`command not found: ${cmd}. try 'help'.`);
    }
  }

  function submit() {
    const input = value;
    setValue("");
    setCursor(-1);
    if (input.trim()) setHistory((h) => [...h, input.trim()]);
    if (["clear", "cls"].includes(input.trim().toLowerCase())) {
      setLines([]);
      return;
    }
    const echo = line("in", input);
    const out = run(input);
    setLines((prev) => [...prev, echo, ...out]);
  }

  function complete() {
    const parts = value.split(/\s+/);
    if (parts.length <= 1) {
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(parts[0] ?? ""));
      if (matches.length === 1) setValue(`${matches[0]} `);
      else if (matches.length > 1) print(line("out", matches.join("  ")));
      return;
    }
    const [cmd, partial = ""] = parts;
    const options =
      cmd === "cd" ? SECTIONS.map((s) => `${s}/`) : cmd === "cat" ? FILES : cmd === "open" ? Object.keys(LINKS) : cmd === "theme" ? THEMES : [];
    const matches = options.filter((o) => o.startsWith(partial));
    if (matches.length === 1) setValue(`${cmd} ${matches[0]}`);
    else if (matches.length > 1) print(line("out", matches.join("  ")));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor < 0) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Shell"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="m-auto w-[min(720px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#15130F] p-0 text-[#ECE5D6] shadow-2xl backdrop:bg-[#0b0a08]/50 backdrop:backdrop-blur-[2px] open:animate-fade-up"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[0.72rem] text-[#928B7C]">
        <span>guest@justinsmith.sh: ~</span>
        <button type="button" onClick={close} className="rounded px-1.5 py-0.5 hover:bg-white/10 hover:text-[#ECE5D6]">
          esc
        </button>
      </div>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        onClick={() => inputRef.current?.focus()}
        className="h-[min(440px,60vh)] overflow-y-auto px-4 py-3 font-mono text-[0.82rem] leading-relaxed"
      >
        {lines.map((l) => (
          <div key={l.id} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <>
                <span className="text-[#7FC2A6]">guest</span>
                <span className="text-[#928B7C]">:~$ </span>
                {l.content}
              </>
            ) : (
              <span className={l.kind === "err" ? "text-[#FF8A6E]" : "text-[#D8D0BF]"}>{l.content}</span>
            )}
          </div>
        ))}
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor="shell-input" className="shrink-0">
            <span className="text-[#7FC2A6]">guest</span>
            <span className="text-[#928B7C]">:~$&nbsp;</span>
          </label>
          <input
            id="shell-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Command"
            className="w-full min-w-0 flex-1 bg-transparent caret-[#FF6B4A] outline-none"
          />
        </form>
      </div>
    </dialog>
  );
}
