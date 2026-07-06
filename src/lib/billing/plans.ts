// ======================
// Subscription Plans
// ======================

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
  currency: string;
  features: string[];
  limits: { barcodes: number; qrcodes: number; batch: number; apiCalls: number; storage: string };
  badge?: string;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For personal use and testing",
    price: { monthly: 0, yearly: 0 },
    currency: "USD",
    features: ["50 barcodes/month", "50 QR codes/month", "Basic formats", "PNG download", "Community support"],
    limits: { barcodes: 50, qrcodes: 50, batch: 0, apiCalls: 0, storage: "10MB" },
  },
  {
    id: "starter",
    name: "Starter",
    description: "For freelancers and small projects",
    price: { monthly: 9, yearly: 89 },
    currency: "USD",
    features: ["500 barcodes/month", "500 QR codes/month", "All formats", "PNG/SVG/PDF", "Batch (100 items)", "API access (1K/mo)", "Email support"],
    limits: { barcodes: 500, qrcodes: 500, batch: 100, apiCalls: 1000, storage: "100MB" },
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses",
    price: { monthly: 29, yearly: 290 },
    currency: "USD",
    badge: "Most Popular",
    popular: true,
    features: ["5,000 barcodes/month", "5,000 QR codes/month", "All formats + custom", "All downloads", "Batch (1,000 items)", "API access (10K/mo)", "Priority support", "Custom branding", "Webhooks"],
    limits: { barcodes: 5000, qrcodes: 5000, batch: 1000, apiCalls: 10000, storage: "1GB" },
  },
  {
    id: "business",
    name: "Business",
    description: "For teams and organizations",
    price: { monthly: 79, yearly: 790 },
    currency: "USD",
    features: ["50,000 barcodes/month", "50,000 QR codes/month", "All formats", "All downloads", "Batch (10,000 items)", "API access (100K/mo)", "Dedicated support", "Custom branding", "Webhooks", "Team (5 users)", "Analytics"],
    limits: { barcodes: 50000, qrcodes: 50000, batch: 10000, apiCalls: 100000, storage: "10GB" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: { monthly: 299, yearly: 2990 },
    currency: "USD",
    badge: "Custom",
    features: ["Unlimited barcodes", "Unlimited QR codes", "All formats", "All downloads", "Unlimited batch", "Unlimited API", "24/7 support", "Custom integrations", "SLA guarantee", "Unlimited team", "White label", "On-premise option"],
    limits: { barcodes: -1, qrcodes: -1, batch: -1, apiCalls: -1, storage: "Unlimited" },
  },
];

export const PAYMENT_GATEWAYS = [
  { id: "stripe", name: "Stripe", icon: "credit-card", supported: ["USD", "EUR", "GBP"] },
  { id: "razorpay", name: "Razorpay", icon: "indian-rupee", supported: ["INR"] },
  { id: "paypal", name: "PayPal", icon: "wallet", supported: ["USD", "EUR", "GBP"] },
  { id: "upi", name: "UPI", icon: "smartphone", supported: ["INR"] },
  { id: "apple_pay", name: "Apple Pay", icon: "apple", supported: ["USD", "EUR", "GBP"] },
  { id: "google_pay", name: "Google Pay", icon: "smartphone", supported: ["USD", "EUR", "GBP", "INR"] },
] as const;

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
