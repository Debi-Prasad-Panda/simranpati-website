import { put } from "@vercel/blob";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`admin:${ip}`, 20, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Storage not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "File missing" }, { status: 400 });
  }

  const { url } = await put(file.name, file, { access: "public" });
  return Response.json({ url });
}
