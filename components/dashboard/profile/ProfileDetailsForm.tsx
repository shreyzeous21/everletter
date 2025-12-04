"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  XIcon,
  UserIcon,
  CheckCircle2,
  AlertCircle,
  Mail,
  MailIcon,
  CalendarDaysIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  image: z.string().optional().nullable(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

interface ProfileDetailsFormProps {
  user: User;
}

export function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const router = useRouter();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? null,
    },
  });

  async function onSubmit({ name, image }: UpdateProfileValues) {
    setStatus(null);
    setError(null);

    const { error } = await authClient.updateUser({ name, image });

    if (error) {
      setError(error.message || "Failed to update profile");
    } else {
      setStatus("Profile updated");
      router.refresh();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setValue("image", base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  }

  const imagePreview = form.watch("image");
  const loading = form.formState.isSubmitting;

  // -----------------------------
  // 🔥 SEND EMAIL VERIFICATION
  // -----------------------------
  async function sendVerification() {
    setEmailStatus(null);
    setEmailError(null);
    setEmailLoading(true);

    const { error } = await authClient.sendVerificationEmail({
      email: user.email,
      callbackURL: "/email-verified",
    });

    setEmailLoading(false);

    if (error) {
      setEmailError(error.message || "Failed to send verification email");
    } else {
      setEmailStatus("Verification email sent! Check your inbox.");
    }
  }

  return (
    <Card className="border-2 transition-all hover:border-primary/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="">Profile Details</CardTitle>
            <CardDescription className="">
              Update your personal information and profile picture
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex items-start gap-6 pb-6 border-b">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="size-24 rounded-xl border border-primary/20 shadow-sm">
                  <AvatarImage
                    src={imagePreview || user.image || undefined}
                    alt={user.name}
                    className="aspect-square object-cover"
                  />
                  <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary rounded-xl">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                {imagePreview && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 size-7 rounded-full shadow-lg border"
                    onClick={() => form.setValue("image", null)}
                  >
                    <XIcon className="size-3" />
                  </Button>
                )}
              </div>

              {/* User Details Card */}
              <Card className="flex-1 p-5 bg-background/60 rounded-2xl shadow-sm border flex flex-col gap-5">
                {/* Name + Email */}
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold tracking-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                {/* Email Status */}
                <div className="flex items-center gap-2 text-xs font-medium">
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Email Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <AlertCircle className="h-3 w-3" />
                      Email Not Verified
                    </span>
                  )}
                </div>

                {/* Role */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Role:</span>{" "}
                  {user.role}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border" />

                {/* Member Since */}
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <CalendarDaysIcon className="size-4" />
                    Member Since
                  </div>
                  <p className="font-medium text-sm">
                    {format(user.createdAt, "MMMM d, yyyy")}
                  </p>
                </div>
              </Card>
            </div>

            {/* 🔥 EMAIL VERIFICATION SECTION */}
            {!user.emailVerified && (
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-300">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-yellow-700" />
                  <p className="font-medium text-yellow-800">
                    Your email is not verified
                  </p>
                </div>

                <p className="text-sm text-yellow-700 mb-3">
                  Verify your email to secure your account and unlock all
                  features.
                </p>

                <Button onClick={sendVerification} disabled={emailLoading}>
                  {emailLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <MailIcon className="h-4 w-4" />
                      Send Verification Email
                    </>
                  )}
                </Button>

                {emailError && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </div>
                )}

                {emailStatus && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    {emailStatus}
                  </div>
                )}
              </div>
            )}

            {/* FORM FIELDS */}
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* STATUS */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {status && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                {status}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
