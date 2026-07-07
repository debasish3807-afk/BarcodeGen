import type { Metadata } from "next";
import { SettingsClient } from "./_components/settings-client";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your BarcodeGen account settings, change password, and preferences.",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SettingsClient />
    </div>
  );
}
