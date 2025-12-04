"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();

  // Only 3 parameters: payment_id, plan, user_id
  let paymentId = searchParams.get("razorpay_payment_id");
  let plan = searchParams.get("plan");
  let userId = searchParams.get("user_id");

  // Fallback: Try reading from URL directly if searchParams didn't work
  if (typeof window !== "undefined" && (!paymentId || !plan || !userId)) {
    const urlParams = new URLSearchParams(window.location.search);
    paymentId = paymentId || urlParams.get("razorpay_payment_id");
    plan = plan || urlParams.get("plan");
    userId = userId || urlParams.get("user_id");
  }

  // Debug: Log parameters to console
  if (typeof window !== "undefined") {
    console.log("Success page params:", { paymentId, plan, userId });
    console.log("Full URL:", window.location.href);
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-primary">
            Payment Successful!
          </h1>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Thank you for your payment. Your subscription has been activated
            successfully.
          </p>

          {/* Display only essential info */}
          {paymentId && plan && (
            <div className="bg-muted/30 rounded-lg p-4 text-left text-sm space-y-2">
              <p>
                <strong>Payment ID:</strong> {paymentId}
              </p>
              <p>
                <strong>Plan:</strong> {plan}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString()}
              </p>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full" size="lg">
                Go to Dashboard
              </Button>
            </Link>

            <Link href="/pricing" className="block">
              <Button variant="outline" className="w-full" size="lg">
                View Plans
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            If you have any questions, please contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="flex items-center gap-3">
            <p className="text-lg font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
