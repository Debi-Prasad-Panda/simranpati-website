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
      response.ok ? "Design project saved successfully." : "Unable to save project.",
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="title"
          >
            Project Title
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="title"
            name="title"
            required
            type="text"
            placeholder="e.g. Coincidence & Fate"
          />
        </div>
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="year"
          >
            Year
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="year"
            name="year"
            type="text"
            placeholder="e.g. 2024"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="role"
          >
            Role & Strategy
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="role"
            name="role"
            type="text"
            placeholder="e.g. Editorial Design, Typography"
          />
        </div>
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="tools"
          >
            Tools used (comma separated)
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="tools"
            name="tools"
            type="text"
            placeholder="Figma, Adobe InDesign, Illustrator"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="overview"
        >
          Project Overview
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2.5 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="overview"
          name="overview"
          rows={4}
          placeholder="Describe the case study, visual layout, and methodology..."
        />
      </div>

      <hr className="border-outline-variant/30" />

      <h3 className="font-display text-lg text-ink-sepia">Project Media</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cover Image Upload */}
        <div className="space-y-4">
          <ImageUploader label="Cover Image" onUpload={setCoverImageUrl} />
          {coverImageUrl && (
            <div className="mt-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block">Preview:</span>
              <img
                src={coverImageUrl}
                alt="Cover Preview"
                className="mt-1 w-full max-w-[280px] h-40 object-cover border border-outline-variant rounded"
              />
            </div>
          )}
        </div>

        {/* Gallery Upload */}
        <div className="space-y-4">
          <ImageUploader label="Add Project Gallery Image" onUpload={handleAddGalleryImage} />
          {galleryImages.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block font-bold">
                Gallery Previews ({galleryImages.length})
              </span>
              <div className="grid grid-cols-3 gap-2 border border-outline-variant/30 p-2 rounded bg-surface/50 max-h-[180px] overflow-y-auto">
                {galleryImages.map((imgUrl, index) => (
                  <div key={index} className="relative group border border-outline-variant/30 rounded overflow-hidden h-16">
                    <img
                      src={imgUrl}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="absolute inset-0 bg-red-600/90 text-paper-foundation text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="border-outline-variant/30" />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold cursor-pointer select-none">
          <input
            name="isPublished"
            type="checkbox"
            className="w-4 h-4 rounded border-outline-variant text-accent-doodle focus:ring-accent-doodle cursor-pointer"
          />
          <span>Publish immediately</span>
        </label>
      </div>

      <hr className="border-outline-variant/30" />

      <div className="flex items-center gap-4">
        <button
          className="rounded bg-accent-doodle text-paper-foundation px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          type="submit"
        >
          Save Design Project
        </button>
        {message && <p className="text-sm font-semibold text-accent-doodle">{message}</p>}
      </div>
    </form>
  );
}
