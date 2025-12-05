"use server";

import { PaymentStatus } from "@/lib/generated/prisma/enums"; // Adjust import path if needed
import { sendEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function createRazorpayOrder(
  userId: string,
  amount: number,
  plan: string
) {
  try {
    if (!process.env.RAZORPAY_ID || !process.env.RAZORPAY_SECRET) {
      throw new Error("Razorpay configuration error. Please contact support.");
    }

    if (!userId || !amount || !plan) {
      throw new Error("Missing required parameters: userId, amount, or plan");
    }

    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: "ACTIVE",
      },
    });

    if (activeSubscription) {
      throw new Error("You already have an active subscription");
    }

    // 1. Ensure amount is a number (Rupees)
    const amountInRupees = Number(amount);

    // 2. Convert to Paisa for Razorpay (Multiply by 100 and round to avoid float errors)
    const amountInPaisa = Math.round(amountInRupees * 100);

    const options = {
      amount: amountInPaisa, // Razorpay takes Paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan,
        userId,
        type: "one_time",
      },
    };

    console.log("Creating Razorpay Order:", {
      amountInRupees: amountInRupees,
      amountInPaisa: amountInPaisa,
      currency: options.currency,
      plan: options.notes.plan,
    });

    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (razorpayError: any) {
      console.error("Razorpay API Error:", {
        message: razorpayError?.message,
        error: razorpayError?.error,
        description: razorpayError?.error?.description,
        code: razorpayError?.error?.code,
        field: razorpayError?.error?.field,
      });
      throw new Error(
        razorpayError?.error?.description ||
          razorpayError?.error?.message ||
          razorpayError?.message ||
          "Failed to create Razorpay order"
      );
    }

    if (!order?.id) {
      console.error("Invalid order response:", order);
      throw new Error("Failed to create order: Invalid response from Razorpay");
    }

    // Verify the order amount matches what we sent
    const orderAmountInPaisa = Number(order.amount);
    if (orderAmountInPaisa !== amountInPaisa) {
      console.warn("⚠️ Amount mismatch detected:", {
        sent: amountInPaisa,
        received: orderAmountInPaisa,
        difference: orderAmountInPaisa - amountInPaisa,
      });
    }

    console.log("Order created successfully:", {
      orderId: order.id,
      orderAmountInPaisa: orderAmountInPaisa,
      orderAmountInRupees: orderAmountInPaisa / 100,
      orderCurrency: order.currency,
      expectedAmountInRupees: amountInRupees,
    });

    // 3. Store in DB in RUPEES (Matches your Plan UI: 999)
    // This ensures your dashboard shows "999" and not "99900"
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: amountInRupees, // Storing 999
        currency: "INR",
        status: PaymentStatus.CREATED,
        userId,
      },
    });

    return {
      orderId: order.id,
      amount: amountInPaisa, // Send paisa to frontend for Razorpay options
      currency: order.currency,
      key: process.env.RAZORPAY_ID,
      paymentRecordId: payment.id,
    };
  } catch (error: any) {
    console.error("Razorpay order creation error: ", error.message);

    throw new Error(
      error.message || "Failed to create Razorpay order. Please try again."
    );
  }
}

export async function verifyRazorpayPayment({
  razorpay_payment_id,
  razorpay_signature,
  plan,
  userId,
}: {
  razorpay_payment_id: string;
  razorpay_signature: string;
  plan: string;
  userId: string;
}) {
  try {
    if (!process.env.RAZORPAY_SECRET) {
      throw new Error("Payment verification configuration error.");
    }

    // Validate required parameters
    if (!razorpay_payment_id) {
      throw new Error("Payment ID is required for verification");
    }
    if (!razorpay_signature) {
      throw new Error("Payment signature is required for verification");
    }
    if (!plan) {
      throw new Error("Plan information is required");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }

    // 1️⃣ Fetch order details from Razorpay API
    const paymentInfo = await razorpay.payments.fetch(razorpay_payment_id);

    if (!paymentInfo || !paymentInfo.order_id) {
      throw new Error("Unable to fetch order details from Razorpay");
    }

    const razorpay_order_id = paymentInfo.order_id;

    // 2️⃣ Create server-side signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // 3️⃣ Compare signatures
    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch");
      throw new Error("Invalid signature, payment verification failed");
    }

    // 4️⃣ Find payment record in DB
    const existingPayment = await prisma.payment.findFirst({
      where: { orderId: razorpay_order_id },
    });

    if (!existingPayment) {
      throw new Error("Payment record not found in database");
    }

    // 5️⃣ Update payment status to SUCCESS
    const updatedPayment = await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: PaymentStatus.SUCCESS,
      },
    });

    // 6️⃣ Create subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days

    const subscription = await prisma.subscription.create({
      data: {
        plan,
        status: "ACTIVE",
        startDate,
        endDate,
        userId,
        paymentId: updatedPayment.id,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "Payment Successful – Your Subscription is Active 🎉",
        text: `
            Dear ${user.name || "User"},
            Your payment for the <strong>${plan}</strong> plan was successful.
            Your subscription is now ACTIVE from: <strong>${startDate.toDateString()}</strong> to <strong>${endDate.toDateString()}</strong> <strong>ACTIVE</strong>.
            Thank you for choosing <strong>Everletter</strong>!
          `,
      });
    }

    return subscription;
  } catch (error: any) {
    console.error("Verification error: ", error.message);

    // ♻️ Mark payment as failed
    try {
      if (razorpay_payment_id) {
        const paymentInfo = await razorpay.payments.fetch(razorpay_payment_id);
        if (paymentInfo?.order_id) {
          const failedPayment = await prisma.payment.findFirst({
            where: { orderId: paymentInfo.order_id },
          });

          if (failedPayment) {
            await prisma.payment.update({
              where: { id: failedPayment.id },
              data: { status: PaymentStatus.FAILED },
            });
          }
        }
      }
    } catch (dbError) {
      console.error("Failed to mark payment as failed in DB");
    }

    throw new Error(error.message || "Payment verification failed");
  }
}

export async function getUserSubscriptions(userId: string) {
  const subscriptions = await prisma.subscription.findFirst({
    where: { userId },
  });
  return subscriptions;
}

export async function getPaymentsLogs() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });
  return payments;
}
