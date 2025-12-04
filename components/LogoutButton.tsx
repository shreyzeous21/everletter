"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2, LogOut } from "lucide-react";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);
    const { error } = await authClient.revokeSessions();
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to log out everywhere");
    } else {
      toast.success("Logged out from all devices");
      router.push("/sign-in");
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleLogoutEverywhere}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          Log out <LogOut className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}
