import { getServerSession } from "@/lib/getServerSession";
import SignInForm from "./_components/SignInForm";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}
