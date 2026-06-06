"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";

interface NavItem {
  href: Route;
  label: string;
  adminOnly?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    label: "Mein Zyklus",
    items: [
      { href: "/start", label: "Start" },
      { href: "/plan", label: "Plan" },
      { href: "/coach", label: "Coach" },
      { href: "/manager-loop", label: "Manager" },
    ],
  },
  {
    label: "Atlas",
    items: [{ href: "/", label: "Karte" }],
  },
  {
    label: "Zusammen",
    items: [
      { href: "/circles", label: "Learning Circles" },
      { href: "/case-clinic", label: "Fallrunde" },
    ],
  },
  {
    label: "Ruhig",
    items: [
      { href: "/snapshot", label: "Snapshot" },
      { href: "/tour", label: "Tour" },
      { href: "/admin/org", label: "Admin", adminOnly: true },
    ],
  },
];

/**
 * Left sidebar — primary navigation.
 *
 * Desktop (md+): persistent column on the left.
 * Mobile (<md): hidden, opens as a drawer via the hamburger in TopBar.
 *
 * The drawer state is owned here and broadcast via a custom event so the
 * TopBar's hamburger can stay decoupled. Closing on route change is wired
 * via the pathname effect.
 */
export function Sidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = role === "admin";

  // Listen for hamburger toggle requests from the TopBar.
  useEffect(() => {
    function toggle() {
      setIsOpen((o) => !o);
    }
    window.addEventListener("sidebar:toggle", toggle);
    return () => window.removeEventListener("sidebar:toggle", toggle);
  }, []);

  // Close drawer when route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          aria-label="Menü schließen"
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-on-surface/40 backdrop-blur-sm"
        />
      )}

      <aside
        className={`
          flex flex-col w-60 shrink-0 border-r border-outline-variant bg-surface
          fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-emphasized
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:z-auto
        `}
      >
        <div className="px-5 py-5 border-b border-outline-variant flex items-center justify-between">
          <Link href="/" className="font-serif text-title-lg text-on-surface tracking-tight">
            Skill Hacker
            <span className="ml-2 font-mono text-label-sm text-primary">v0.1</span>
          </Link>
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setIsOpen(false)}
            className="md:hidden state-layer rounded-full w-8 h-8 inline-flex items-center justify-center text-on-surface"
          >
            ×
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 space-y-6">
          {GROUPS.map((group) => {
            const items = group.items.filter((i) => !i.adminOnly || isAdmin);
            if (items.length === 0) return null;
            return (
              <div key={group.label}>
                <p className="px-5 mb-1.5 font-mono text-label-sm uppercase tracking-wide text-on-surface-muted">
                  {group.label}
                </p>
                <ul>
                  {items.map((item) => {
                    const isActive = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between gap-2 px-5 py-2 text-body-md state-layer ${
                            isActive
                              ? "text-on-surface font-medium border-l-2 border-primary -ml-px"
                              : "text-on-surface-muted hover:text-on-surface"
                          }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/** Hamburger button — for use in the TopBar on mobile. */
export function SidebarToggle() {
  return (
    <button
      type="button"
      aria-label="Menü öffnen"
      onClick={() => window.dispatchEvent(new Event("sidebar:toggle"))}
      className="md:hidden state-layer rounded-full w-9 h-9 inline-flex items-center justify-center text-on-surface"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
