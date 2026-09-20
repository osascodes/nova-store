import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 lg:py-24 text-center space-y-5">
      <h1 className="text-3xl font-semibold tracking-tight">
        Forgot password?
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Password reset is not available in this demo. Use a demo account or
        create a new one.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link href="/auth/login">
          <Button>Back to Sign In</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="outline">Create Account</Button>
        </Link>
      </div>
    </div>
  );
}