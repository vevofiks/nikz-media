import { AdminApp } from "@/components/admin-app";

export default function AdminPage() {
  return (
    <main className="admin-page">
      <AdminApp authed={false} />
    </main>
  );
}
