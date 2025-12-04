import ProfilePage from "@/components/dashboard/profile/ProfilePage";
import { getServerAuth } from "@/lib/getServerSession";

export default async function page() {
  const session = await getServerAuth();
  const user = session.user;

  return <ProfilePage user={user} />;
}
