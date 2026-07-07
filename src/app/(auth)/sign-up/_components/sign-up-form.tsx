"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ScanBarcode, ExternalLink, AlertCircle, Check } from "lucide-react";
import { setCurrentUser } from "@/lib/auth/client";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Sign up failed. Please try again.");
        setIsLoading(false);
        return;
      }
      setCurrentUser(
        {
          id: "user_" + Date.now(),
          email,
          name,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        },
        data.data.token,
      );
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <ScanBarcode className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-surface-900 dark:text-white">BarcodeGen</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Free forever. No credit card required.</p>
      </div>

      <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/80 dark:border-surface-800/60 shadow-lg p-6 sm:p-8">
        <div className="space-y-2 mb-5">
          <button type="button" className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />Sign up with Google
          </button>
          <button type="button" className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />Sign up with GitHub
          </button>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200 dark:border-surface-700" /></div>
          <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-surface-900 text-surface-400">or with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Full name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input id="name" type="text" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="name" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="email" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="new-password" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-surface-500 dark:text-surface-400 pt-1">
            {[
              "Sync history across devices",
              "Save unlimited favorites",
              "Access to cloud dashboard",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-green-500" />{benefit}
              </div>
            ))}
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/40 text-xs text-red-700 dark:text-red-400">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />{error}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? "Creating account..." : "Create Account"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="text-center text-xs text-surface-500 dark:text-surface-400 mt-5">
          Already have an account? <Link href="/sign-in" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>

      <p className="text-center text-[11px] text-surface-400 mt-5">
        By signing up you agree to our <Link href="/terms" className="hover:underline">Terms</Link> and <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>.
      </p>
    </motion.div>
  );
}
