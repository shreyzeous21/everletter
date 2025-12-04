import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EmailVerifiedPage() {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary">
            Email Verified Successfully!
          </h1>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Thank you for verifying your email address. Your account is now
            fully activated and ready to use.
          </p>

          <div className="pt-4 space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full" size="lg">
                Go to Dashboard
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            You can now access all features of your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
