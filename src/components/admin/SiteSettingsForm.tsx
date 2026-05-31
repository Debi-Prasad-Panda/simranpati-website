"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { TimelineItem } from "@/lib/content";

type SiteSettingsFormProps = {
  initial: {
    heroTitle: string;
    heroTagline: string;
    aboutText: string;
    contactEmail: string;
    aboutPhotoUrl?: string | null;
    resumeUrl?: string | null;
    linkedinUrl?: string | null;
    timelineData?: TimelineItem[] | null;
  };
};

export default function SiteSettingsForm({ initial }: SiteSettingsFormProps) {
  const [form, setForm] = useState({
    heroTitle: initial.heroTitle || "",
    heroTagline: initial.heroTagline || "",
    aboutText: initial.aboutText || "",
    contactEmail: initial.contactEmail || "",
    aboutPhotoUrl: initial.aboutPhotoUrl || "",
    resumeUrl: initial.resumeUrl || "",
    linkedinUrl: initial.linkedinUrl || "",
    timelineData: initial.timelineData || [],
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPhoto = (url: string) => {
    setForm((prev) => ({ ...prev, aboutPhotoUrl: url }));
  };

  const handleUploadResume = (url: string) => {
    setForm((prev) => ({ ...prev, resumeUrl: url }));
  };

  const handleTimelineChange = (
    id: string,
    field: keyof TimelineItem,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      timelineData: prev.timelineData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addTimelineEntry = () => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      type: "work",
      period: "2025 — Present",
      title: "New Role/Degree",
      organization: "Company/University Name",
      description: "Describe responsibilities or coursework here.",
    };
    setForm((prev) => ({
      ...prev,
      timelineData: [...prev.timelineData, newItem],
    }));
  };

  const deleteTimelineEntry = (id: string) => {
    setForm((prev) => ({
      ...prev,
      timelineData: prev.timelineData.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const response = await fetch("/api/admin/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setMessage(response.ok ? "Settings saved successfully." : "Unable to save settings.");
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Basic Text Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="heroTitle"
          >
            Hero Title
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="heroTitle"
            name="heroTitle"
            onChange={handleChange}
            type="text"
            value={form.heroTitle}
            required
          />
        </div>
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
            htmlFor="contactEmail"
          >
            Contact Email
          </label>
          <input
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            id="contactEmail"
            name="contactEmail"
            onChange={handleChange}
            type="email"
            value={form.contactEmail}
            required
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="heroTagline"
        >
          Hero Tagline
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="heroTagline"
          name="heroTagline"
          onChange={handleChange}
          rows={2}
          value={form.heroTagline}
          required
        />
      </div>

      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="aboutText"
        >
          About Paragraph
        </label>
        <textarea
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="aboutText"
          name="aboutText"
          onChange={handleChange}
          rows={6}
          value={form.aboutText}
          required
        />
      </div>

      <hr className="border-outline-variant/30" />

      {/* Files & Socials Section */}
      <h3 className="font-display text-xl text-ink-sepia">Files &amp; Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <ImageUploader label="About Page Profile Portrait" onUpload={handleUploadPhoto} />
          {form.aboutPhotoUrl && (
            <div className="mt-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block">Preview:</span>
              <img
                src={form.aboutPhotoUrl}
                alt="Profile Preview"
                className="mt-1 w-24 h-24 object-cover border border-outline-variant rounded"
              />
              <span className="text-xs text-on-surface-variant break-all mt-1 block">{form.aboutPhotoUrl}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <ImageUploader label="Resume Document (PDF)" onUpload={handleUploadResume} />
          {form.resumeUrl && (
            <div className="mt-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block">Current File:</span>
              <a
                href={form.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-accent-doodle underline break-all mt-1 block"
              >
                {form.resumeUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          htmlFor="linkedinUrl"
        >
          LinkedIn Profile URL
        </label>
        <input
          className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
          id="linkedinUrl"
          name="linkedinUrl"
          onChange={handleChange}
          type="url"
          value={form.linkedinUrl}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <hr className="border-outline-variant/30" />

      {/* Interactive Timeline Builder */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl text-ink-sepia">Journey Timeline</h3>
            <p className="text-xs text-on-surface-variant mt-1">Manage the experiences and degrees displayed on the about page.</p>
          </div>
          <button
            type="button"
            onClick={addTimelineEntry}
            className="rounded border border-ink-sepia/70 px-4 py-2 text-xs uppercase tracking-wider text-ink-sepia hover:bg-ink-sepia hover:text-paper-foundation transition-colors cursor-pointer"
          >
            Add New Entry
          </button>
        </div>

        <div className="space-y-6 mt-4">
          {form.timelineData.map((item, index) => (
            <div key={item.id} className="p-4 border border-outline-variant/40 rounded bg-surface/50 relative space-y-3">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-xs font-mono font-bold text-accent-doodle">Entry #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => deleteTimelineEntry(item.id)}
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Type</label>
                  <select
                    value={item.type}
                    onChange={(e) => handleTimelineChange(item.id, "type", e.target.value as any)}
                    className="mt-1 w-full rounded border border-outline-variant bg-paper-foundation px-2 py-1.5 text-xs text-ink-sepia focus:outline-none"
                  >
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Period / Years</label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => handleTimelineChange(item.id, "period", e.target.value)}
                    className="mt-1 w-full rounded border border-outline-variant bg-paper-foundation px-2 py-1 text-xs text-ink-sepia focus:outline-none"
                    placeholder="e.g. 2025 — Present"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Organization / Location</label>
                  <input
                    type="text"
                    value={item.organization}
                    onChange={(e) => handleTimelineChange(item.id, "organization", e.target.value)}
                    className="mt-1 w-full rounded border border-outline-variant bg-paper-foundation px-2 py-1 text-xs text-ink-sepia focus:outline-none"
                    placeholder="e.g. St. Xavier's University"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Title / Position</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleTimelineChange(item.id, "title", e.target.value)}
                  className="mt-1 w-full rounded border border-outline-variant bg-paper-foundation px-3 py-1 text-xs text-ink-sepia focus:outline-none"
                  placeholder="e.g. MA in English Literature"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Description Details</label>
                <textarea
                  value={item.description}
                  onChange={(e) => handleTimelineChange(item.id, "description", e.target.value)}
                  className="mt-1 w-full rounded border border-outline-variant bg-paper-foundation px-3 py-1.5 text-xs text-ink-sepia focus:outline-none"
                  rows={2}
                  placeholder="Describe your role, key responsibilities, or honors..."
                />
              </div>
            </div>
          ))}

          {form.timelineData.length === 0 && (
            <p className="text-center text-xs text-on-surface-variant py-8 border border-dashed border-outline-variant rounded">No timeline entries found. Click "Add New Entry" to create one.</p>
          )}
        </div>
      </div>

      <hr className="border-outline-variant/30" />

      <div className="pt-4 flex items-center gap-4">
        <button
          className="rounded bg-accent-doodle text-paper-foundation px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          type="submit"
        >
          Save All Settings
        </button>
        {message && <p className="text-sm font-semibold text-accent-doodle">{message}</p>}
      </div>
    </form>
  );
}
