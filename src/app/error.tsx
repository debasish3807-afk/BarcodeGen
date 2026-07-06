"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <div className="text-center py-16">
          <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-6" />
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">
            Something Went Wrong
          </h1>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-8">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" leftIcon={<Home className="h-4 w-4" />}>
                Back to Home
              </Button>
            </Link>
          </div>
          {error.digest && (
            <p className="mt-6 text-xs text-surface-400">Error ID: {error.digest}</p>
          )}
        </div>
      </Container>
    </Section>
  );
}
