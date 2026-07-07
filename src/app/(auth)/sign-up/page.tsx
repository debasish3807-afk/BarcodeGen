import type { Metadata } from "next";
import { SignUpForm } from "./_components/sign-up-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free BarcodeGen account to sync your history, favorites and downloads across all your devices.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50 dark:from-primary-950/20 dark:via-surface-950 dark:to-accent-950/10">
      <Container size="sm">
        <SignUpForm />
      </Container>
    </div>
  );
}
