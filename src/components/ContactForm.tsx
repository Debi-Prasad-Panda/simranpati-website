"use client";

import { useState } from "react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: "loading" });

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setState({ status: "success", message: "Message sent successfully." });
      event.currentTarget.reset();
      return;
    }

    const data = await response.json().catch(() => ({}));
    setState({
      status: "error",
      message: data?.error ?? "Unable to send message.",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 focus:border-accent-doodle focus:outline-none"
          id="name"
          name="name"
          required
          type="text"
        />
      </div>
      <input
        aria-hidden="true"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="company"
        >
          Company / Project
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 focus:border-accent-doodle focus:outline-none"
          id="company"
          name="company"
          type="text"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 focus:border-accent-doodle focus:outline-none"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 focus:border-accent-doodle focus:outline-none"
          id="message"
          name="message"
          required
          rows={4}
        />
      </div>
      <button
        className="inline-flex items-center justify-center rounded-sm bg-accent-doodle px-6 py-3 text-xs uppercase tracking-[0.3em] text-paper-foundation transition-opacity hover:opacity-90"
        disabled={state.status === "loading"}
        type="submit"
      >
        {state.status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
      {state.status !== "idle" && (
        <p className="text-sm text-on-surface-variant">{state.message}</p>
      )}
    </form>
  );
}
