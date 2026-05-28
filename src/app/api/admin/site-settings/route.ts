import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  heroTitle: z.string().min(2),
  heroTagline: z.string().min(2),
  aboutText: z.string().min(10),
  contactEmail: z.string().email(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`admin:${ip}`, 30, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const { rows } = await sql`
    SELECT hero_title AS "heroTitle", hero_tagline AS "heroTagline", about_text AS "aboutText", contact_email AS "contactEmail"
    FROM site_settings
    WHERE id = 1
    LIMIT 1
  `;

  return Response.json(rows[0] ?? null);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`admin:${ip}`, 30, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { heroTitle, heroTagline, aboutText, contactEmail } = parsed.data;

  await sql`
    INSERT INTO site_settings (id, hero_title, hero_tagline, about_text, contact_email)
    VALUES (1, ${heroTitle}, ${heroTagline}, ${aboutText}, ${contactEmail})
    ON CONFLICT (id)
    DO UPDATE SET hero_title = ${heroTitle}, hero_tagline = ${heroTagline}, about_text = ${aboutText}, contact_email = ${contactEmail}
  `;

  return Response.json({ ok: true });
}
