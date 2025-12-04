import ManageDashboardPage from "@/components/dashboard/manage-dashboard/ManageDashboardPage";
import { Role } from "@/lib/generated/prisma/enums";
import { getServerAuth } from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerAuth();
  if (
    session.user.role !== Role.SUPERADMIN &&
    session.user.role !== Role.ADMIN
  ) {
    redirect("/dashboard");
  }
  return <ManageDashboardPage />;
}
