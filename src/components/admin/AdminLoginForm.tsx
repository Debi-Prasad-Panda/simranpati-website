"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (response?.error) {
      setError("Invalid credentials.");
      return;
    }

    router.push("/admin");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      <button
        className="rounded-sm bg-accent-doodle px-6 py-3 text-xs uppercase tracking-[0.3em] text-paper-foundation"
        type="submit"
      >
        Sign In
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
