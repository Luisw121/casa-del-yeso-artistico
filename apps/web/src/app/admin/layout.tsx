import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import AdminShell from "./_components/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <AdminShell email={session.user?.email} signOutAction={signOutAction}>
      {children}
    </AdminShell>
  );
}
