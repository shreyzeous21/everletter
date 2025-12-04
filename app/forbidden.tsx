"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full ">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">403 - Forbidden</h1>
            <p className="text-muted-foreground text-lg">
              You don&apos;t have access to this page.
            </p>
            <p className="text-sm text-muted-foreground pt-2">
              Please contact your administrator for access.
            </p>
          </div>

          <div className=" pt-4">
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            If you believe this is an error, please contact support.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
