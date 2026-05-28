import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional().nullable(),
  email: z.string().email(),
  message: z.string().min(10),
  website: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const allowed = rateLimit(`contact:${ip}`, 5, 60_000);

  if (!allowed) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email service not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, company, email, message } = parsed.data;

  await resend.emails.send({
    from: "Art & Words <onboarding@resend.dev>",
    to: [siteConfig.contactEmail],
    reply_to: email,
    subject: `New inquiry from ${name}`,
    text: `Name: ${name}\nCompany: ${company ?? ""}\nEmail: ${email}\n\n${message}`,
  });

  return Response.json({ ok: true });
}
