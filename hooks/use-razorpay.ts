"use client";

import {
  createRazorpayOrder,
  getUserSubscriptions,
  verifyRazorpayPayment,
} from "@/actions/razorpay-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRazorpay() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createOrder = useMutation({
    mutationFn: async (data: {
      userId: string;
      amount: number;
      plan: string;
    }) => createRazorpayOrder(data.userId, data.amount, data.plan),

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to create order");
    },
  });

  const verifyPayment = useMutation({
    mutationFn: async (data: {
      paymentId: string;
      signature: string;
      plan: string;
      userId: string;
    }) => {
      // Validate required parameters before calling
      if (!data.paymentId || !data.signature || !data.plan || !data.userId) {
        throw new Error("Missing required payment verification parameters");
      }

      return verifyRazorpayPayment({
        razorpay_payment_id: data.paymentId,
        razorpay_signature: data.signature,
        plan: data.plan,
        userId: data.userId,
      });
    },

    onSuccess: (subscription: any, variables: any) => {
      toast.success("Payment verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });

      // Only 3 parameters: payment_id, plan, user_id
      // URL encode the parameters to handle special characters
      const params = new URLSearchParams({
        razorpay_payment_id: variables.paymentId,
        plan: variables.plan,
        user_id: variables.userId,
      });

      router.push(`/pricing/success?${params.toString()}`);
    },

    onError: (error: any) => {
      console.error("Payment verification error:", error);
      toast.error(error?.message ?? "Payment verification failed");
    },
  });

  const getUserSubscriptionsMutation = useMutation({
    mutationFn: async (userId: string) => await getUserSubscriptions(userId),
    onSuccess: (subscription: any) => {
      return subscription;
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to fetch subscription");
    },
  });

  return {
    createOrder,
    verifyPayment,
    getUserSubscriptionsMutation,
    isLoading: getUserSubscriptionsMutation.isPending,
  };
}
