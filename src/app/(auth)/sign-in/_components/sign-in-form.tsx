"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ScanBarcode, ExternalLink, AlertCircle } from "lucide-react";
import { setCurrentUser } from "@/lib/auth/client";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Sign in failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }
      setCurrentUser(
        {
          id: "user_" + Date.now(),
          email,
          name: email.split("@")[0],
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

  const handleOAuth = (provider: string) => {
    // In production: window.location.href = `/api/auth/oauth/${provider}`;
    setError(`${provider} sign-in requires OAuth configuration. Please use email sign-in.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <ScanBarcode className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-surface-900 dark:text-white">BarcodeGen</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Sign in to sync your work across devices.</p>
      </div>

      <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/80 dark:border-surface-800/60 shadow-lg p-6 sm:p-8">
        {/* OAuth Providers */}
        <div className="space-y-2 mb-5">
          <button onClick={() => handleOAuth("Google")} className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />Continue with Google
          </button>
          <button onClick={() => handleOAuth("GitHub")} className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors">
            <ExternalLink className="h-4 w-4" />Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200 dark:border-surface-700" /></div>
          <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-surface-900 text-surface-400">or with email</span></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="email" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-surface-700 dark:text-surface-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" autoComplete="current-password" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-400">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500/20" />
            Remember me for 7 days
          </label>

          {error && (
            <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/40 text-xs text-red-700 dark:text-red-400">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />{error}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="text-center text-xs text-surface-500 dark:text-surface-400 mt-5">
          Don&apos;t have an account? <Link href="/sign-up" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign up free</Link>
        </p>
      </div>

      <p className="text-center text-[11px] text-surface-400 mt-5">
        By signing in you agree to our <Link href="/terms" className="hover:underline">Terms</Link> and <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>.
      </p>
    </motion.div>
  );
}
