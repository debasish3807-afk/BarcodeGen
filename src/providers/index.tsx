"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { I18nProvider } from "@/lib/i18n/i18n-context";
import { ToastProvider } from "@/components/ui/toast";
import { LoginPromptProvider } from "@/components/auth/login-prompt-dialog";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ToastProvider>
          <LoginPromptProvider>{children}</LoginPromptProvider>
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
