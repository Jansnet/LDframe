import Link from "next/link";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { parseSessionCookie, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * AppShell — async server component so the nav reflects the session.
 *
 * Reads the session cookie directly (no API roundtrip), looks up minimal
 * user data (name, role) and passes it to the topbar. Logged-out users see
 * "Sign-in"; logged-in users see their name + an admin link if applicable.
 */
export async function AppShell({ children }: { children: ReactNode }) {
  const session = await loadSession();
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar session={session} />
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}

interface SessionInfo {
  loggedIn: boolean;
  name?: string;
  email?: string;
  role?: string;
}

async function loadSession(): Promise<SessionInfo> {
  try {
    const store = await cookies();
    const raw = store.get(SESSION_COOKIE)?.value;
    const userId = parseSessionCookie(raw);
    if (!userId) return { loggedIn: false };
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true },
    });
    if (!user) return { loggedIn: false };
    return {
      loggedIn: true,
      name: user.name ?? undefined,
      email: user.email,
      role: user.role,
    };
  } catch {
    return { loggedIn: false };
  }
}

function TopBar({ session }: { session: SessionInfo }) {
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
          <NavLink href="/plan" label="Mein Plan" />
          <NavLink href="/case-clinic" label="Fallberatung" />
          <NavLink href="/coach" label="Coach" />
          <NavLink href="/manager-loop" label="Manager" />
          {session.role === "admin" && <NavLink href="/admin/org" label="Admin" />}
          {session.loggedIn ? <AccountMenu session={session} /> : <NavLink href="/login" label="Sign-in" />}
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

function AccountMenu({ session }: { session: SessionInfo }) {
  const display = session.name?.trim() || session.email?.split("@")[0] || "Account";
  return (
    <details className="relative">
      <summary className="state-layer rounded-full pl-2 pr-3 h-9 inline-flex items-center gap-2 text-label-lg text-on-surface cursor-pointer list-none">
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-on font-serif text-label-md"
        >
          {display.slice(0, 1).toUpperCase()}
        </span>
        <span className="hidden sm:inline">{display}</span>
      </summary>
      <div className="absolute right-0 mt-2 min-w-56 bg-surface border border-outline-variant rounded-sm shadow-md p-2 z-50">
        <div className="px-3 py-2">
          <p className="text-label-sm text-on-surface-muted">Angemeldet als</p>
          <p className="text-body-md text-on-surface">{session.email}</p>
          {session.role && session.role !== "member" && (
            <p className="text-label-sm font-mono text-primary mt-1">{session.role}</p>
          )}
        </div>
        <hr className="my-1 border-outline-variant" />
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="w-full text-left state-layer rounded-sm px-3 py-2 text-body-md text-on-surface"
          >
            Abmelden
          </button>
        </form>
      </div>
    </details>
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
        <p>
          Selbst gehostet — deine Daten bleiben bei dir.{" "}
          <Link href="/tour" className="text-primary underline">Tour</Link>
        </p>
      </div>
    </footer>
  );
}
