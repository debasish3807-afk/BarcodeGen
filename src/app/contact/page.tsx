import type { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the BarcodeGen team. We're here to help with questions, support, and feedback.",
};

export default function ContactPage() {
  return (
    <>
      <Section variant="muted" spacing="lg" className="pt-28">
        <Container>
          <SectionHeader
            badge="Contact"
            title="Get in Touch"
            subtitle="Have questions or feedback? We'd love to hear from you."
          />
        </Container>
      </Section>

      <Section variant="default" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">Email</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                      support@barcodegen.com
                    </p>
                  </div>
                </div>
              </Card>
              <Card padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary-50 dark:bg-secondary-950/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">Location</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                      San Francisco, CA, USA
                    </p>
                  </div>
                </div>
              </Card>
              <Card padding="lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">Phone</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-5" action="#">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Full Name" placeholder="John Doe" />
                    <Input label="Email" type="email" placeholder="john@example.com" />
                  </div>
                  <Input label="Subject" placeholder="How can we help?" />
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                      aria-label="Message"
                    />
                  </div>
                  <Button size="lg" leftIcon={<Send className="h-4 w-4" />}>
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
