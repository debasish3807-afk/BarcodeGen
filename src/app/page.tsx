import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  WhyChooseSection,
  BarcodeTypesSection,
  QRTypesSection,
  HowItWorksSection,
  InteractiveDemoSection,
  ComparisonSection,
  TestimonialsSection,
  BlogSection,
  FAQSection,
  NewsletterSection,
  CTASection,
} from "@/components/sections";
import { WebsiteSchema, FAQSchema } from "@/components/seo/schema-org";
import { FAQS } from "@/constants/content";
import { SITE_CONFIG } from "@/constants/site";

// ======================
// Homepage
// ======================

export default function HomePage() {
  return (
    <>
      <WebsiteSchema url={SITE_CONFIG.url} name={SITE_CONFIG.name} description={SITE_CONFIG.description} />
      <FAQSchema items={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <WhyChooseSection />
      <BarcodeTypesSection />
      <QRTypesSection />
      <HowItWorksSection />
      <ComparisonSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
