"use client";

import { useEffect, useState } from "react";

export function useLoadRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      // Script is already in the DOM, wait for it to load
      existingScript.addEventListener("load", () => {
        setIsLoaded(true);
        setIsLoading(false);
      });
      existingScript.addEventListener("error", () => {
        setError("Failed to load Razorpay script");
        setIsLoading(false);
      });
      return;
    }

    // Load the script
    setIsLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      setError(null);
    };

    script.onerror = () => {
      setError("Failed to load Razorpay script");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: don't remove the script as it might be used elsewhere
    };
  }, []);

  return { isLoaded, isLoading, error };
}

