import Link from "next/link";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { parseSessionCookie, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Sidebar, SidebarToggle } from "./Sidebar";
import { CoachPane } from "@/components/coach/CoachPane";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

/**
 * AppShell — async server component so the nav reflects the session.
 *
 * Layout: persistent Sidebar (left, desktop) + slim TopBar with breadcrumb +
 * account menu + main content. The Coach floating pane is mounted via a
 * separate component the pages opt into.
 */
export async function AppShell({ children }: { children: ReactNode }) {
  const session = await loadSession();
  const coachableSkills = listSkills().map((s) => ({ slug: s.slug, name: t(s.name) }));
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar role={session.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar session={session} />
        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
        <Footer />
      </div>
      {session.loggedIn && <CoachPane skills={coachableSkills} />}
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
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-4">
        {/* Mobile: hamburger + compact logo since sidebar is hidden. Desktop: empty space for future breadcrumbs. */}
        <div className="md:hidden flex items-center gap-2">
          <SidebarToggle />
          <Link
            href="/"
            className="font-serif text-title-lg text-on-surface tracking-tight"
          >
            Skill Hacker
          </Link>
        </div>
        <div className="hidden md:block" />
        <nav className="flex items-center gap-1">
          {session.loggedIn ? <AccountMenu session={session} /> : <Link
            href="/login"
            className="state-layer rounded-full px-4 h-9 inline-flex items-center text-label-lg text-on-surface"
          >
            Sign-in
          </Link>}
        </nav>
      </div>
    </header>
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
      <div className="mx-auto max-w-5xl px-6 py-8 text-body-md text-on-surface-muted flex flex-wrap gap-x-8 gap-y-4 justify-between">
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
