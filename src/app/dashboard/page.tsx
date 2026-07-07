import type { Metadata } from "next";
import { DashboardClient } from "./_components/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your BarcodeGen dashboard. View history, favorites, and account settings.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <DashboardClient />
    </div>
  );
}
