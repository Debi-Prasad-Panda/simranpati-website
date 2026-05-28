import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col justify-center px-6">
      <h1 className="font-display text-3xl text-ink-sepia">Admin Sign In</h1>
      <p className="mt-2 text-sm text-on-surface-variant">
        Use your admin email and password to manage content.
      </p>
      <div className="mt-8 rounded-sm border border-outline-variant bg-paper-foundation p-6">
        <AdminLoginForm />
      </div>
    </div>
  );
}
