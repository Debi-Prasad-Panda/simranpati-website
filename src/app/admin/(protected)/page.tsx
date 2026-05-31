import AdminDashboardTabs from "@/components/admin/AdminDashboardTabs";
import { getSiteSettings } from "@/lib/content";

export default async function AdminDashboardPage() {
  const settings = await getSiteSettings();

  return (
    <div className="w-full">
      <AdminDashboardTabs settings={settings} />
    </div>
  );
}
