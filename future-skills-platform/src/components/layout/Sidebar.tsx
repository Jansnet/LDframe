"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Left sidebar — primary navigation.
 *
 * Four groups, each with the surfaces that belong to a different rhythm of use:
 *   MEIN ZYKLUS — what's running now (plan, coach session, manager loop)
 *   ATLAS — where am I, where could I go (skill map)
 *   ZUSAMMEN — with others (learning circles, case clinic)
 *   RUHIG — quarterly / once-off (snapshot, tour, admin)
 *
 * Mobile: hidden behind a hamburger drawer, handled by the AppShell wrapper.
 */
interface NavItem {
  href: string;
  label: string;
  comingSoon?: boolean;
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
    items: [
      { href: "/", label: "Karte" },
    ],
  },
  {
    label: "Zusammen",
    items: [
      { href: "/circles", label: "Learning Circles", comingSoon: true },
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

export function Sidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const isAdmin = role === "admin";

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-outline-variant bg-surface">
      <div className="px-5 py-5 border-b border-outline-variant">
        <Link href="/" className="font-serif text-title-lg text-on-surface tracking-tight">
          Skill Hacker
          <span className="ml-2 font-mono text-label-sm text-primary">v0.1</span>
        </Link>
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
                        {item.comingSoon && (
                          <span className="font-mono text-label-sm text-primary">bald</span>
                        )}
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
  );
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
