import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getServerAuth } from "@/lib/getServerSession";
import { redirect, unauthorized } from "next/navigation";
import { ResendVerificationButton } from "./_components/ResendVerificationButton";

export default async function VerifyEmailPage() {
  const session = await getServerAuth();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.emailVerified) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Verify your email</h1>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We've sent you an email to verify your email address. Click the link
            in the email to verify your email address.
          </p>

          <p className="text-sm text-muted-foreground pt-4">
            If you didn't receive the email, you can resend it below.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <ResendVerificationButton email={user.email} />
        </CardFooter>
      </Card>
    </div>
  );
}
