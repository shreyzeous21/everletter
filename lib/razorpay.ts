import Razorpay from "razorpay";

// Validate environment variables before initializing
if (!process.env.RAZORPAY_ID || !process.env.RAZORPAY_SECRET) {
  console.warn(
    "⚠️  Razorpay credentials are missing. Payment functionality will not work."
  );
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});
