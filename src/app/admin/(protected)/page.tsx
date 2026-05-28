import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import WritingPostForm from "@/components/admin/WritingPostForm";
import DesignProjectForm from "@/components/admin/DesignProjectForm";
import { getSiteSettings } from "@/lib/content";

export default async function AdminDashboardPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-10">
      <section className="rounded-sm border border-outline-variant bg-paper-foundation p-6">
        <h2 className="font-display text-2xl text-ink-sepia">Site Settings</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Update hero copy, about text, and contact email.
        </p>
        <div className="mt-6">
          <SiteSettingsForm initial={settings} />
        </div>
      </section>

      <section className="rounded-sm border border-outline-variant bg-paper-foundation p-6">
        <h2 className="font-display text-2xl text-ink-sepia">
          New Writing Post
        </h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Draft and publish long-form articles in Markdown.
        </p>
        <div className="mt-6">
          <WritingPostForm />
        </div>
      </section>

      <section className="rounded-sm border border-outline-variant bg-paper-foundation p-6">
        <h2 className="font-display text-2xl text-ink-sepia">
          New Design Project
        </h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Add visual design case studies and metadata.
        </p>
        <div className="mt-6">
          <DesignProjectForm />
        </div>
      </section>
    </div>
  );
}
