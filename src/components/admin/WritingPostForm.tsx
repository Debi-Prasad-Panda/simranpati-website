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

    setMessage(response.ok ? "Writing post saved successfully." : "Unable to save post.");
    if (response.ok) {
      event.currentTarget.reset();
      setCoverImageUrl("");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="title"
          name="title"
          required
          type="text"
          placeholder="e.g. The Architecture of Silence"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="excerpt"
        >
          Excerpt / Summary
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="excerpt"
          name="excerpt"
          rows={3}
          placeholder="A brief overview of the post..."
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="body"
        >
          Markdown Body
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 font-mono text-xs text-ink-sepia focus:outline-none focus:border-accent-doodle"
          id="body"
          name="body"
          rows={12}
          placeholder="Write your article in Markdown here..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-2">
          <ImageUploader label="Cover Image" onUpload={setCoverImageUrl} />
          {coverImageUrl && (
            <div className="mt-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block">Preview:</span>
              <img
                src={coverImageUrl}
                alt="Cover Preview"
                className="mt-1 w-32 h-20 object-cover border border-outline-variant rounded"
              />
            </div>
          )}
        </div>

        <div className="py-2">
          <label className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold cursor-pointer select-none">
            <input
              name="isPublished"
              type="checkbox"
              className="w-4 h-4 rounded border-outline-variant text-accent-doodle focus:ring-accent-doodle cursor-pointer"
            />
            <span>Publish immediately</span>
          </label>
        </div>
      </div>

      <hr className="border-outline-variant/30" />

      <div className="flex items-center gap-4">
        <button
          className="rounded bg-accent-doodle text-paper-foundation px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          type="submit"
        >
          Save Writing Post
        </button>
        {message && <p className="text-sm font-semibold text-accent-doodle">{message}</p>}
      </div>
    </form>
  );
}
