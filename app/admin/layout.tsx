import ProtectedLayout from "@/src/features/shared/components/ProtectedLayout";
import AppShell from "@/src/features/layout/components/AppShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <AppShell>{children}</AppShell>
    </ProtectedLayout>
  );
}