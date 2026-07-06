// ======================
// Coupon & Promo System
// ======================

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "trial_days";
  value: number;
  maxUses: number;
  usedCount: number;
  minPurchase: number;
  applicablePlans: string[];
  expiresAt: string | null;
  isActive: boolean;
}

export interface ReferralReward {
  referrerId: string;
  referredId: string;
  rewardType: "credits" | "discount" | "free_month";
  rewardValue: number;
  status: "pending" | "claimed" | "expired";
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  source: "referral" | "promo" | "refund" | "purchase" | "admin";
  description: string;
  createdAt: string;
}

// Demo coupons
export const DEMO_COUPONS: Coupon[] = [
  { id: "1", code: "WELCOME20", type: "percentage", value: 20, maxUses: 1000, usedCount: 342, minPurchase: 0, applicablePlans: ["starter", "professional", "business"], expiresAt: "2025-12-31", isActive: true },
  { id: "2", code: "LAUNCH50", type: "percentage", value: 50, maxUses: 100, usedCount: 89, minPurchase: 0, applicablePlans: ["professional", "business"], expiresAt: "2025-06-30", isActive: true },
  { id: "3", code: "TRIAL14", type: "trial_days", value: 14, maxUses: 500, usedCount: 123, minPurchase: 0, applicablePlans: ["starter", "professional"], expiresAt: null, isActive: true },
  { id: "4", code: "FLAT10", type: "fixed", value: 10, maxUses: 200, usedCount: 67, minPurchase: 29, applicablePlans: ["professional", "business", "enterprise"], expiresAt: "2025-09-30", isActive: true },
];

export function validateCoupon(code: string, planId: string): { valid: boolean; coupon?: Coupon; message: string } {
  const coupon = DEMO_COUPONS.find((c) => c.code === code.toUpperCase());
  if (!coupon) return { valid: false, message: "Invalid coupon code" };
  if (!coupon.isActive) return { valid: false, message: "Coupon is no longer active" };
  if (coupon.usedCount >= coupon.maxUses) return { valid: false, message: "Coupon usage limit reached" };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return { valid: false, message: "Coupon has expired" };
  if (!coupon.applicablePlans.includes(planId)) return { valid: false, message: "Coupon not valid for this plan" };
  return { valid: true, coupon, message: `${coupon.type === "percentage" ? `${coupon.value}% off` : coupon.type === "fixed" ? `$${coupon.value} off` : `${coupon.value} days free trial`} applied!` };
}
