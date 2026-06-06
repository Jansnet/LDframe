import Link from "next/link";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-outline-variant">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-title-lg text-on-surface tracking-tight">
          Skill Hacker
          <span className="ml-2 font-mono text-label-sm text-primary">v0.1</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink href="/start" label="Start" />
          <NavLink href="/" label="Atlas" />
          <NavLink href="/blind-spots" label="Blinde Flecken" />
          <NavLink href="/plan" label="Mein Plan" />
          <NavLink href="/coach" label="Coach" />
          <NavLink href="/frameworks" label="Frameworks" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="state-layer rounded-full px-4 h-9 inline-flex items-center text-label-lg text-on-surface"
    >
      {label}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline-variant mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-body-md text-on-surface-muted flex flex-wrap gap-x-8 gap-y-4 justify-between">
        <p className="max-w-2xl">
          Strukturell basierend auf dem{" "}
          <a className="text-primary underline" href="https://www.stifterverband.org/medien/future-skills-2030" target="_blank" rel="noopener noreferrer">
            Future-Skills-Framework 2030
          </a>{" "}
          des Stifterverbands (CC BY-SA 4.0). Definitionen, Übungen und Coach-Texte sind eigene Inhalte.{" "}
          <Link href="/license" className="text-primary underline">Lizenzdetails</Link>.
        </p>
        <p>Selbst gehostet — deine Daten bleiben bei dir.</p>
      </div>
    </footer>
  );
}
