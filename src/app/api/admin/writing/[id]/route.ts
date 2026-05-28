import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { estimateReadingTime } from "@/lib/reading-time";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(2).optional(),
  excerpt: z.string().optional(),
  body: z.string().min(20).optional(),
  coverImageUrl: z.string().url().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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
  const readingTime = body ? estimateReadingTime(body) : undefined;

  await sql`
    UPDATE writing_posts
    SET title = COALESCE(${title}, title),
        excerpt = COALESCE(${excerpt}, excerpt),
        body = COALESCE(${body}, body),
        cover_image_url = COALESCE(${coverImageUrl}, cover_image_url),
        reading_time = COALESCE(${readingTime ?? null}, reading_time),
        is_published = COALESCE(${isPublished}, is_published)
    WHERE id = ${id}
  `;

  return Response.json({ ok: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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

  await sql`
    DELETE FROM writing_posts
    WHERE id = ${id}
  `;

  return Response.json({ ok: true });
}
