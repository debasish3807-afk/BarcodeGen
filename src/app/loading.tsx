import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <Container size="sm">
        <div className="text-center space-y-6">
          {/* Skeleton pulse animation */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 dark:bg-primary-900/30 animate-pulse" />
          <div className="space-y-3 max-w-sm mx-auto">
            <div className="h-6 bg-surface-200 dark:bg-surface-800 rounded-lg animate-pulse" />
            <div className="h-4 bg-surface-100 dark:bg-surface-800/50 rounded-lg animate-pulse w-3/4 mx-auto" />
          </div>
          <div className="flex justify-center gap-3">
            <div className="h-10 w-32 bg-surface-200 dark:bg-surface-800 rounded-xl animate-pulse" />
            <div className="h-10 w-32 bg-surface-100 dark:bg-surface-800/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </Container>
    </div>
  );
}
