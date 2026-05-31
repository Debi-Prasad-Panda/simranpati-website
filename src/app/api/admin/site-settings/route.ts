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
  aboutPhotoUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  resumeUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  linkedinUrl: z.string().url().or(z.string().length(0)).optional().nullable(),
  timelineData: z.array(z.object({
    id: z.string(),
    type: z.enum(["work", "education"]),
    period: z.string(),
    title: z.string(),
    organization: z.string(),
    description: z.string(),
  })).optional().nullable(),
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
    SELECT 
      hero_title AS "heroTitle", 
      hero_tagline AS "heroTagline", 
      about_text AS "aboutText", 
      contact_email AS "contactEmail",
      about_photo_url AS "aboutPhotoUrl",
      resume_url AS "resumeUrl",
      linkedin_url AS "linkedinUrl",
      timeline_data AS "timelineData"
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
    return Response.json({ error: "Invalid payload", details: parsed.error.format() }, { status: 400 });
  }

  const { heroTitle, heroTagline, aboutText, contactEmail, aboutPhotoUrl, resumeUrl, linkedinUrl, timelineData } = parsed.data;
  const timelineJson = JSON.stringify(timelineData || []);

  await sql`
    INSERT INTO site_settings (id, hero_title, hero_tagline, about_text, contact_email, about_photo_url, resume_url, linkedin_url, timeline_data)
    VALUES (1, ${heroTitle}, ${heroTagline}, ${aboutText}, ${contactEmail}, ${aboutPhotoUrl}, ${resumeUrl}, ${linkedinUrl}, ${timelineJson})
    ON CONFLICT (id)
    DO UPDATE SET 
      hero_title = ${heroTitle}, 
      hero_tagline = ${heroTagline}, 
      about_text = ${aboutText}, 
      contact_email = ${contactEmail},
      about_photo_url = ${aboutPhotoUrl},
      resume_url = ${resumeUrl},
      linkedin_url = ${linkedinUrl},
      timeline_data = ${timelineJson}
  `;

  return Response.json({ ok: true });
}
