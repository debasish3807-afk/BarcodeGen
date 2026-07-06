import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <div className="text-center py-16">
          <h1 className="text-8xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved. Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button leftIcon={<Home className="h-4 w-4" />}>
                Back to Home
              </Button>
            </Link>
            <Link href="/barcode-generator">
              <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Barcode Generator
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
