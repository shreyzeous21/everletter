"use client";
import { Newspaper, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/sign-in");
    toast.success("Logged out successfully");
  };

  const isDashboard = usePathname().includes("/dashboard");

  return isDashboard ? null : (
    <header className="sticky top-2 z-50 w-full px-4">
      <div className="mx-auto flex h-14 container items-center justify-between rounded-2xl border bg-background/70  shadow-sm backdrop-blur-md transition-all hover:shadow-md px-2">
        {/* Logo Section */}
        <Link href="/" className="group">
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
              <Newspaper size={20} />
            </div>
            <span>EverLetter</span>
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/docs"
                className="text-sm font-bold hover:text-primary transition-colors "
              >
                <Button variant="ghost" size="sm">
                  Docs
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary transition-colors "
              >
                Pricing
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href="/contact-us"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0).toUpperCase() || "❤️"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "No name"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="default"
                  className="rounded-full px-6 font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
