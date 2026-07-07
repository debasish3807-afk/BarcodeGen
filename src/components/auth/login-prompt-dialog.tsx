"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Cloud, Mail, ArrowRight, ExternalLink } from "lucide-react";

interface LoginPromptContextValue {
  promptLogin: (message?: string) => void;
}

const LoginPromptContext = createContext<LoginPromptContextValue>({ promptLogin: () => {} });

export function useLoginPrompt() {
  return useContext(LoginPromptContext);
}

export function LoginPromptProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState<string | undefined>();

  const promptLogin = (message?: string) => {
    setCustomMessage(message);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <LoginPromptContext.Provider value={{ promptLogin }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-prompt-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-surface-900 rounded-2xl shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-white" />
              </div>

              <h2 id="login-prompt-title" className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                Save your work forever
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-6 leading-relaxed">
                {customMessage || "Create a free BarcodeGen account to sync your history, favorites and downloads across all your devices."}
              </p>

              <div className="space-y-2">
                <Link
                  href="/sign-in?provider=google"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Continue with Google
                </Link>
                <Link
                  href="/sign-in?provider=github"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-semibold text-surface-900 dark:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Continue with GitHub
                </Link>
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-shadow"
                >
                  <Mail className="h-4 w-4" />
                  Continue with Email
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-3 text-xs text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
              >
                Not now
              </button>

              <p className="text-[10px] text-surface-400 text-center mt-4">
                No credit card required. Free forever.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoginPromptContext.Provider>
  );
}
