import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * First-run seed for self-hosted deployments.
 *
 * Creates a single default organization and demo user so the platform is
 * immediately usable after `docker compose up`. Skill content lives in
 * src/content/skills/ (in-code) and is loaded at runtime — no DB seed needed.
 */
async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      slug: "default",
      name: "Default Organization",
      locale: "de",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "demo@skillhacker.local" },
    update: {},
    create: {
      email: "demo@skillhacker.local",
      name: "Demo User",
      organizationId: org.id,
      roleText: "Product Manager im B2B-SaaS",
      roleTags: { industry: "SaaS", seniority: "senior", context: "remote-first" },
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded org "${org.slug}" and user ${user.email}`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
