import { headers } from "next/headers";
import { auth } from "./auth";
import { forbidden, redirect } from "next/navigation";

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getServerAuth = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (
    session.user.hasWebsitePermission === false ||
    session.user.isBanned === true
  ) {
    forbidden();
  }

  return session;
};
