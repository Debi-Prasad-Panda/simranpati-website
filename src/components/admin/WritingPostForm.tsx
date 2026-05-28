"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function WritingPostForm() {
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      body: formData.get("body"),
      coverImageUrl: coverImageUrl || null,
      isPublished: formData.get("isPublished") === "on",
    };

    const response = await fetch("/api/admin/writing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(response.ok ? "Writing post saved." : "Unable to save post.");
    if (response.ok) {
      event.currentTarget.reset();
      setCoverImageUrl("");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="title"
          name="title"
          required
          type="text"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="excerpt"
        >
          Excerpt
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="excerpt"
          name="excerpt"
          rows={3}
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="body"
        >
          Markdown Body
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 font-mono text-xs"
          id="body"
          name="body"
          rows={8}
        />
      </div>
      <ImageUploader label="Cover Image" onUpload={setCoverImageUrl} />
      {coverImageUrl && (
        <p className="text-xs text-on-surface-variant">
          Uploaded URL: {coverImageUrl}
        </p>
      )}
      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-on-surface-variant">
        <input name="isPublished" type="checkbox" />
        Publish immediately
      </label>
      <button
        className="rounded-sm border border-ink-sepia px-6 py-3 text-xs uppercase tracking-[0.3em] text-ink-sepia"
        type="submit"
      >
        Save Writing Post
      </button>
      {message && <p className="text-sm text-on-surface-variant">{message}</p>}
    </form>
  );
}
