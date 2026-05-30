"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function DesignProjectForm() {
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title"),
      overview: formData.get("overview"),
      role: formData.get("role"),
      tools: String(formData.get("tools") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      year: formData.get("year"),
      coverImageUrl: coverImageUrl || null,
      galleryImages: galleryImages,
      isPublished: formData.get("isPublished") === "on",
    };

    const response = await fetch("/api/admin/design", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(
      response.ok ? "Design project saved." : "Unable to save project.",
    );
    if (response.ok) {
      event.currentTarget.reset();
      setCoverImageUrl("");
      setGalleryImages([]);
    }
  };

  const handleAddGalleryImage = (url: string) => {
    setGalleryImages((prev) => [...prev, url]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
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
          htmlFor="overview"
        >
          Overview
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="overview"
          name="overview"
          rows={3}
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="role"
        >
          Role & Strategy
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="role"
          name="role"
          type="text"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="tools"
        >
          Tools (comma separated)
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="tools"
          name="tools"
          type="text"
        />
      </div>
      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant"
          htmlFor="year"
        >
          Year
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2"
          id="year"
          name="year"
          type="text"
        />
      </div>
      <ImageUploader label="Cover Image" onUpload={setCoverImageUrl} />
      {coverImageUrl && (
        <p className="text-xs text-on-surface-variant">
          Uploaded URL: {coverImageUrl}
        </p>
      )}

      <ImageUploader label="Add Gallery Image" onUpload={handleAddGalleryImage} />
      {galleryImages.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant">
            Gallery Images ({galleryImages.length})
          </label>
          <div className="grid grid-cols-2 gap-2 border border-outline-variant/30 p-2 rounded">
            {galleryImages.map((imgUrl, index) => (
              <div key={index} className="flex items-center justify-between gap-2 p-2 bg-container-warm border border-outline-variant/10 rounded">
                <span className="text-[10px] text-on-surface-variant truncate max-w-[70%]">
                  {imgUrl}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(index)}
                  className="text-xs text-red-500 font-bold uppercase tracking-wider hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-on-surface-variant">
        <input name="isPublished" type="checkbox" />
        Publish immediately
      </label>
      <button
        className="rounded-sm border border-ink-sepia px-6 py-3 text-xs uppercase tracking-[0.3em] text-ink-sepia"
        type="submit"
      >
        Save Project
      </button>
      {message && <p className="text-sm text-on-surface-variant">{message}</p>}
    </form>
  );
}
