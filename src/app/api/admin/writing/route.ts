import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { estimateReadingTime } from "@/lib/reading-time";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(2),
  excerpt: z.string().optional().nullable(),
  body: z.string().min(20),
  coverImageUrl: z.string().url().optional().nullable(),
  isPublished: z.boolean().optional().default(false),
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
  if (!rateLimit(`admin:${ip}`, 60, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const { rows } = await sql`
    SELECT id, title, slug, published_at AS "publishedAt", is_published AS "isPublished"
    FROM writing_posts
    ORDER BY published_at DESC
  `;

  return Response.json(rows);
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

  const { title, excerpt, body, coverImageUrl, isPublished } = parsed.data;
  const slug = slugify(title);
  const readingTime = estimateReadingTime(body);

  const { rows } = await sql`
    INSERT INTO writing_posts (title, slug, excerpt, body, cover_image_url, reading_time, is_published, published_at)
    VALUES (${title}, ${slug}, ${excerpt ?? ""}, ${body}, ${coverImageUrl ?? ""}, ${readingTime}, ${isPublished}, NOW())
    RETURNING id
  `;

  return Response.json({ id: rows[0]?.id });
}
