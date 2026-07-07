import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ScanBarcode, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your BarcodeGen account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50 dark:from-primary-950/20 dark:via-surface-950 dark:to-accent-950/10">
      <Container size="sm">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <ScanBarcode className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-surface-900 dark:text-white">BarcodeGen</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">Reset password</h1>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Enter your email and we&apos;ll send you a reset link.</p>
          </div>

          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/80 dark:border-surface-800/60 shadow-lg p-6 sm:p-8">
            <form className="space-y-4" action="#">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Email address</label>
                <input id="email" type="email" required placeholder="you@example.com" className="w-full px-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="email" />
              </div>
              <button type="submit" className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all">
                Send Reset Link
              </button>
            </form>
            <Link href="/sign-in" className="mt-5 flex items-center justify-center gap-2 text-xs text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />Back to sign in
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
