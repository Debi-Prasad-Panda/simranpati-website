import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(2),
  overview: z.string().min(10),
  role: z.string().optional().nullable(),
  tools: z.array(z.string()).optional().default([]),
  year: z.string().optional().nullable(),
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
    SELECT id, title, slug, year, is_published AS "isPublished"
    FROM design_projects
    ORDER BY year DESC
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

  const { title, overview, role, tools, year, coverImageUrl, isPublished } =
    parsed.data;
  const slug = slugify(title);

  const { rows } = await sql`
    INSERT INTO design_projects (title, slug, overview, role, tools, year, cover_image_url, gallery_images, is_published)
    VALUES (${title}, ${slug}, ${overview}, ${role ?? ""}, ${tools as any}, ${year ?? ""}, ${coverImageUrl ?? ""}, ${[] as any}, ${isPublished})
    RETURNING id
  `;

  return Response.json({ id: rows[0]?.id });
}
