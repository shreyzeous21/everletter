"use client";

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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const updateEmailSchema = z.object({
  newEmail: z.email({ message: "Enter a valid email" }),
});

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: currentEmail,
    },
  });

  async function onSubmit({ newEmail }: UpdateEmailValues) {
    setStatus(null);
    setError(null);

    const { error } = await authClient.changeEmail({
      newEmail,
      callbackURL: "/email-verified",
    });

    if (error) {
      setError(error.message || "Failed to initiate email change");
    } else {
      setStatus("Verification email sent to your current address");
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="border-2 transition-all hover:border-primary/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <MailIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="">Change Email</CardTitle>
            <CardDescription className="">
              Update your email address. A verification email will be sent to
              confirm the change.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Email Display */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Current Email
              </p>
              <p className="text-sm font-medium">{currentEmail}</p>
            </div>

            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex items-center gap-2">
                    <MailIcon className="h-4 w-4" />
                    New Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your new email address"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    We'll send a verification link to your current email to
                    confirm this change.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Messages */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {status && (
              <div
                role="status"
                className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{status}</span>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending verification...
                </>
              ) : (
                <>
                  <MailIcon className="h-4 w-4" />
                  Request Email Change
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
