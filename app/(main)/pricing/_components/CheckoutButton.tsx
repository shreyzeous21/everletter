"use client";

import { useRazorpay } from "@/hooks/use-razorpay";
import { useLoadRazorpay } from "@/hooks/use-load-razorpay";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

export default function CheckoutButton({
  amount,
  plan,
  children,
  className,
}: {
  amount: number | string;
  plan: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const session = authClient.useSession();
  const user = session?.data?.user as any;

  const { createOrder, verifyPayment } = useRazorpay();
  const {
    isLoaded,
    isLoading: isRazorpayLoading,
    error: razorpayError,
  } = useLoadRazorpay();

  useEffect(() => {
    if (razorpayError) {
      toast.error("Failed to load payment gateway. Please refresh the page.");
    }
  }, [razorpayError]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (!isLoaded) {
      toast.error(
        isRazorpayLoading
          ? "Payment gateway is still loading. Please wait..."
          : "Payment gateway failed to load. Please refresh the page."
      );
      return;
    }

    if (typeof window === "undefined" || !(window as any).Razorpay) {
      toast.error("Payment gateway is not available. Please refresh the page.");
      return;
    }

    try {
      const res = await createOrder.mutateAsync({
        userId: user.id,
        amount: Number(amount),
        plan,
      });

      if (!res?.orderId) {
        toast.error("Failed to create order.");
        return;
      }

      const { orderId, currency, key } = res;

      console.log("Opening Razorpay checkout:", {
        orderId,
        amountInRupees: Number(amount),
        expectedDisplay: `₹${Number(amount).toFixed(2)}`,
        currency,
      });

      // When using order_id, Razorpay automatically uses the amount from the order
      // The order was created with amount in paisa (99900 = ₹999.00)
      // Razorpay will automatically display it as ₹999.00 in the checkout modal
      const options = {
        key,
        currency,
        name: "EverLetter",
        description: `${plan} Plan Subscription - ₹${Number(amount).toFixed(
          2
        )}`,
        order_id: orderId, // Razorpay uses order amount automatically
        // IMPORTANT: Do NOT include 'amount' field when using order_id
        // Razorpay will use the amount from the order and display it correctly

        handler: async function (response: any) {
          try {
            // Validate Razorpay response
            if (!response.razorpay_payment_id) {
              throw new Error("Payment ID is missing from Razorpay response");
            }

            if (!plan) {
              throw new Error("Plan information is missing");
            }
            if (!user?.id) {
              throw new Error("User information is missing");
            }

            console.log("Verifying payment:", {
              paymentId: response.razorpay_payment_id,
              hasSignature: !!response.razorpay_signature,
              plan,
              userId: user.id,
            });

            await verifyPayment.mutateAsync({
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan,
              userId: user.id,
            });
            // Don't show toast here - the hook will handle success/error
          } catch (error: any) {
            console.error("Payment verification error:", error);
            toast.error(
              error?.message ||
                "Payment verification failed. Please contact support."
            );
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone?.toString() || "",
        },

        notes: { plan, userId: user.id },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },
      };

      console.log("Razorpay options:", {
        key: options.key ? "Present" : "Missing",
        order_id: options.order_id,
        currency: options.currency,
        name: options.name,
      });

      const razorpay = new (window as any).Razorpay(options);

      // Add error handler for Razorpay
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response);
        toast.error(
          response.error?.description ||
            response.error?.reason ||
            "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error: any) {
      console.error("Checkout error:", {
        message: error?.message,
        error: error?.error,
        stack: error?.stack,
      });
    }
  };

  const isDisabled =
    createOrder.isPending ||
    verifyPayment.isPending ||
    !isLoaded ||
    isRazorpayLoading ||
    !!razorpayError;

  return (
    <Button
      onClick={handleCheckout}
      className={`${className} w-full flex items-center justify-center gap-2`}
      disabled={isDisabled}
    >
      {createOrder.isPending || verifyPayment.isPending
        ? "Processing..."
        : isRazorpayLoading
        ? "Loading..."
        : !isLoaded
        ? "Initializing..."
        : children ?? "Buy Pro"}{" "}
      <SparklesIcon />
    </Button>
  );
}
