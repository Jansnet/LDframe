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
          Future Skills
          <span className="ml-2 font-mono text-label-sm text-primary">v0.1</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink href="/" label="Atlas" />
          <NavLink href="/assessment" label="Assessment" />
          <NavLink href="/plan" label="Mein Plan" />
          <NavLink href="/coach" label="Coach" />
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
      <div className="mx-auto max-w-6xl px-6 py-8 text-body-md text-on-surface-muted flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>
          Basierend auf dem Future-Skills-Framework 2030 (Stifterverband).
        </span>
        <span>Selbst gehostet, deine Daten bleiben bei dir.</span>
      </div>
    </footer>
  );
}
