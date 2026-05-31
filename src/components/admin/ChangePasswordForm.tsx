"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }

      setSuccess("Your password was updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            placeholder="•••••••• (min 8 chars)"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-sm border border-outline-variant bg-paper-foundation px-4 py-2 text-ink-sepia text-sm focus:outline-none focus:border-accent-doodle"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-accent-doodle text-paper-foundation px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
        {success && <p className="text-xs font-semibold text-accent-doodle">{success}</p>}
      </div>
    </form>
  );
}
