"use client";

import { useEffect, useState } from "react";

type WritingItem = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  isPublished: boolean;
};

type DesignItem = {
  id: string;
  title: string;
  slug: string;
  year: string;
  isPublished: boolean;
};

export default function AdminInventory() {
  const [writing, setWriting] = useState<WritingItem[]>([]);
  const [design, setDesign] = useState<DesignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const [writingRes, designRes] = await Promise.all([
          fetch("/api/admin/writing"),
          fetch("/api/admin/design"),
        ]);

        if (!active) return;

        if (!writingRes.ok || !designRes.ok) {
          throw new Error("Failed to fetch inventory data.");
        }

        const writingData = await writingRes.json();
        const designData = await designRes.json();

        setWriting(writingData);
        setDesign(designData);
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "An error occurred.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const handleDeleteWriting = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the writing post: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/writing/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post.");
      }

      setWriting((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete post.");
    }
  };

  const handleDeleteDesign = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the design project: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/design/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project.");
      }

      setDesign((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete project.");
    }
  };

  if (loading) {
    return <div className="text-sm text-on-surface-variant font-mono">Loading inventory...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500 font-mono">Error: {error}</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Writing Section */}
      <div className="rounded-sm border border-outline-variant bg-paper-foundation p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
          <h3 className="font-display text-xl text-ink-sepia">Existing Writing</h3>
          <span className="text-xs bg-container-warm px-2 py-1 rounded text-on-surface-variant font-mono">
            {writing.length} Posts
          </span>
        </div>
        {writing.length === 0 ? (
          <p className="text-xs text-on-surface-variant italic">No posts found.</p>
        ) : (
          <div className="divide-y divide-outline-variant/20 max-h-[400px] overflow-y-auto pr-2">
            {writing.map((post) => (
              <div key={post.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-ink-sepia truncate" title={post.title}>
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                    post.isPublished 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {post.isPublished ? "Public" : "Draft"}
                  </span>
                  <button
                    onClick={() => handleDeleteWriting(post.id, post.title)}
                    className="text-xs text-red-500 font-bold uppercase tracking-wider hover:underline"
                    aria-label={`Delete ${post.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Design Section */}
      <div className="rounded-sm border border-outline-variant bg-paper-foundation p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
          <h3 className="font-display text-xl text-ink-sepia">Existing Designs</h3>
          <span className="text-xs bg-container-warm px-2 py-1 rounded text-on-surface-variant font-mono">
            {design.length} Projects
          </span>
        </div>
        {design.length === 0 ? (
          <p className="text-xs text-on-surface-variant italic">No projects found.</p>
        ) : (
          <div className="divide-y divide-outline-variant/20 max-h-[400px] overflow-y-auto pr-2">
            {design.map((project) => (
              <div key={project.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-ink-sepia truncate" title={project.title}>
                    {project.title}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                    Year: {project.year || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                    project.isPublished 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {project.isPublished ? "Public" : "Draft"}
                  </span>
                  <button
                    onClick={() => handleDeleteDesign(project.id, project.title)}
                    className="text-xs text-red-500 font-bold uppercase tracking-wider hover:underline"
                    aria-label={`Delete ${project.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
