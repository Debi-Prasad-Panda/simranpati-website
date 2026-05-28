"use client";

import { useState } from "react";

type SiteSettingsFormProps = {
  initial: {
    heroTitle: string;
    heroTagline: string;
    aboutText: string;
    contactEmail: string;
  };
};

export default function SiteSettingsForm({ initial }: SiteSettingsFormProps) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const response = await fetch("/api/admin/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setMessage(response.ok ? "Saved." : "Unable to save.");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="heroTitle"
        >
          Hero Title
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="heroTitle"
          name="heroTitle"
          onChange={handleChange}
          type="text"
          value={form.heroTitle}
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="heroTagline"
        >
          Hero Tagline
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="heroTagline"
          name="heroTagline"
          onChange={handleChange}
          type="text"
          value={form.heroTagline}
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="aboutText"
        >
          About Text
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="aboutText"
          name="aboutText"
          onChange={handleChange}
          rows={4}
          value={form.aboutText}
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="contactEmail"
        >
          Contact Email
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="contactEmail"
          name="contactEmail"
          onChange={handleChange}
          type="email"
          value={form.contactEmail}
        />
      </div>
      <button
        className="rounded-sm border border-ink-sepia px-6 py-3 text-xs uppercase tracking-[0.3em] text-ink-sepia"
        type="submit"
      >
        Save Settings
      </button>
      {message && <p className="text-sm text-on-surface-variant">{message}</p>}
    </form>
  );
}
