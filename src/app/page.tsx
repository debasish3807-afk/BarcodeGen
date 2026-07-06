import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  WhyChooseSection,
  BarcodeTypesSection,
  QRTypesSection,
  HowItWorksSection,
  TestimonialsSection,
  BlogSection,
  FAQSection,
  CTASection,
} from "@/components/sections";

// ======================
// Homepage
// ======================

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhyChooseSection />
      <BarcodeTypesSection />
      <QRTypesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
