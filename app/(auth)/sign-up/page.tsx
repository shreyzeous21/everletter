import React from "react";
import SignUpForm from "./_components/SignUpForm";
import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUpForm />
    </div>
  );
}
