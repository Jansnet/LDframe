import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const Body = z.object({
  userId: z.string().optional(), // wired through auth in production
  skillSlug: z.string(),
  level: z.coerce.number().int().min(1).max(4),
  rationale: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Accept both JSON and form posts (the discover page uses a form for progressive enhancement).
  const contentType = req.headers.get("content-type") ?? "";
  const raw = contentType.includes("application/json")
    ? await req.json()
    : Object.fromEntries(await req.formData());

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = parsed.data.userId ?? "demo";
  const { skillSlug, level, rationale } = parsed.data;

  await prisma.skillLevel.upsert({
    where: { userId_skillSlug: { userId, skillSlug } },
    update: { level, rationale },
    create: { userId, skillSlug, level, rationale },
  });

  // For form posts, redirect back to the skill page. For JSON, return JSON.
  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL(`/skills/${skillSlug}`, req.url), { status: 303 });
}
