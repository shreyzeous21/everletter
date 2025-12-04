import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="space-y-6 w-full">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
