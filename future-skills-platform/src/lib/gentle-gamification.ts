import { prisma } from "@/lib/db";

/**
 * Gentle gamification — explicitly designed against the empirical
 * anti-patterns (Duolingo-style streak shame, badge spam, radar-KPI eye candy).
 *
 * Streaks:
 *   - Weekly cadence by default (artefact_weekly, reflection_weekly).
 *     A weekly cadence avoids the "I'm stressed, missed a day, now I quit"
 *     trap that daily streaks trigger.
 *   - Each user gets 3 monthly "freezes" — a missed week does not reset the
 *     streak, it consumes one freeze.
 *   - Streaks can be explicitly paused (vacation, sickness) via pausedUntil.
 *
 * Badges:
 *   - Only awarded for substantive achievements (first artefact, identity
 *     statement fulfilled, cycle completed, case clinic facilitated).
 *   - Idempotent — one badge per user per slug.
 *   - Never appear as the primary surface (no "badge dashboard" → that's
 *     the Duolingo anti-pattern). Just a quiet sidebar entry in /plan.
 */

type StreakKind = "artefact_weekly" | "reflection_weekly" | "cycle_progress";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function bumpStreak(userId: string, kind: StreakKind): Promise<void> {
  const existing = await prisma.streak.findUnique({
    where: { userId_kind: { userId, kind } },
  });
  const now = new Date();

  if (!existing) {
    await prisma.streak.create({
      data: { userId, kind, current: 1, longest: 1, lastEventAt: now },
    });
    return;
  }

  // Respect pause.
  if (existing.pausedUntil && existing.pausedUntil > now) {
    return;
  }

  // Compute weeks elapsed since last event.
  const sinceLast = existing.lastEventAt
    ? Math.floor((now.getTime() - existing.lastEventAt.getTime()) / WEEK_MS)
    : 0;

  let current = existing.current;
  let freezes = existing.freezesAvailable;

  if (sinceLast === 0) {
    // Same week — don't double-count.
    current = Math.max(current, 1);
  } else if (sinceLast === 1) {
    // Next week, bump.
    current += 1;
  } else {
    // Missed weeks. Consume freezes if we have them.
    const missed = sinceLast - 1;
    if (missed <= freezes) {
      freezes -= missed;
      current += 1; // freeze covered the gap
    } else {
      // Streak resets, but gently — no shame copy.
      current = 1;
    }
  }

  await prisma.streak.update({
    where: { userId_kind: { userId, kind } },
    data: {
      current,
      longest: Math.max(existing.longest, current),
      freezesAvailable: freezes,
      lastEventAt: now,
    },
  });
}

export async function pauseStreak(userId: string, kind: StreakKind, until: Date): Promise<void> {
  await prisma.streak.update({
    where: { userId_kind: { userId, kind } },
    data: { pausedUntil: until },
  });
}

const BADGE_LABELS: Record<string, string> = {
  first_artefact: "Erstes Artefakt — du bist gestartet.",
  five_artefact_week: "Fünf Artefakte in einer Woche.",
  identity_fulfilled: "Identity Statement bestätigt.",
  cycle_completed: "Zyklus abgeschlossen.",
  case_clinic_owner: "Eigenen Fall geöffnet — kollegial beraten lassen.",
  case_clinic_facilitator: "Fallrunde moderiert.",
};

export async function awardBadgeIfFirst(
  userId: string,
  slug: keyof typeof BADGE_LABELS,
  context?: object,
): Promise<{ awarded: boolean }> {
  const existing = await prisma.badge.findUnique({ where: { userId_slug: { userId, slug } } });
  if (existing) return { awarded: false };
  await prisma.badge.create({
    data: { userId, slug, context: context ?? undefined },
  });
  return { awarded: true };
}

export function describeBadge(slug: string): string {
  return BADGE_LABELS[slug] ?? slug;
}
