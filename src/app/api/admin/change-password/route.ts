import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/password";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !session.user.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Passwords must be at least 8 characters long." }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    // Fetch the user's current password hash
    const { rows } = await sql<{ password_hash: string }>`
      SELECT password_hash FROM users WHERE email = ${session.user.email} LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password matches
    const isValid = await verifyPassword(currentPassword, user.password_hash);
    if (!isValid) {
      return Response.json({ error: "Incorrect current password" }, { status: 400 });
    }

    // Hash new password and update
    const newHash = await hashPassword(newPassword);
    await sql`
      UPDATE users SET password_hash = ${newHash} WHERE email = ${session.user.email}
    `;

    return Response.json({ success: true, message: "Password updated successfully." });
  } catch (error: any) {
    return Response.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
