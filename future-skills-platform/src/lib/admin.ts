import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

/**
 * Org-admin authorization.
 *
 * Two-step check: resolve the session user, then verify role=admin. The
 * caller decides what to do on failure — page components 404, API routes
 * return 403. This keeps admin endpoints opaque to non-admins.
 */
export class NotAdminError extends Error {
  constructor() {
    super("Not an organization admin.");
    this.name = "NotAdminError";
  }
}

export async function requireOrgAdmin(): Promise<{ userId: string; organizationId: string }> {
  const userId = await getSessionUserId();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, organizationId: true },
  });
  if (!user || user.role !== "admin") throw new NotAdminError();
  return { userId: user.id, organizationId: user.organizationId };
}
