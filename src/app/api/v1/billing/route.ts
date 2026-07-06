import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { authenticateRequest } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { z } from "zod";
import { validate } from "@/lib/api/validation";

const subscribeSchema = z.object({
  planId: z.enum(["free", "starter", "professional", "business", "enterprise"]),
  billing: z.enum(["monthly", "yearly"]),
  gateway: z.enum(["stripe", "razorpay", "paypal", "upi", "apple_pay", "google_pay"]),
  couponCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const result = validate(subscribeSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production: Create payment session via gateway
    // const session = await stripe.checkout.sessions.create({ ... });

    const subscription = {
      id: `sub_${Date.now()}`,
      userId: user.sub,
      planId: result.data.planId,
      billing: result.data.billing,
      gateway: result.data.gateway,
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return apiSuccess(subscription, 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  // In production: fetch from database
  return apiSuccess({
    subscription: { planId: "professional", status: "active", billing: "monthly" },
    usage: { barcodes: 2340, qrcodes: 1560, apiCalls: 46480 },
    wallet: { balance: 25.00, currency: "USD" },
  });
}
