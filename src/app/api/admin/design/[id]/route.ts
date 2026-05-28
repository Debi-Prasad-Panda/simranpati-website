import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(2).optional(),
  overview: z.string().min(10).optional(),
  role: z.string().optional(),
  tools: z.array(z.string()).optional(),
  year: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  galleryImages: z.array(z.string()).optional(),
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

  const {
    title,
    overview,
    role,
    tools,
    year,
    coverImageUrl,
    galleryImages,
    isPublished,
  } = parsed.data;

  await sql`
    UPDATE design_projects
    SET title = COALESCE(${title}, title),
        overview = COALESCE(${overview}, overview),
        role = COALESCE(${role}, role),
        tools = COALESCE(${(tools ?? null) as any}, tools),
        year = COALESCE(${year}, year),
        cover_image_url = COALESCE(${coverImageUrl}, cover_image_url),
        gallery_images = COALESCE(${(galleryImages ?? null) as any}, gallery_images),
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
    DELETE FROM design_projects
    WHERE id = ${id}
  `;

  return Response.json({ ok: true });
}
