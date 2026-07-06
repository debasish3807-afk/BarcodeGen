import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { validate, newsletterSchema } from "@/lib/api/validation";
import { checkRateLimit } from "@/lib/api/rate-limit";

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req, { windowMs: 60000, maxRequests: 5 });
  if (!allowed) return apiError("Too many requests.", 429);

  try {
    const body = await req.json();
    const result = validate(newsletterSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production: save to database, check duplicates
    // await prisma.newsletterSubscriber.upsert({ where: { email }, create: { email }, update: {} });

    return apiSuccess({ message: "Subscribed successfully" }, 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}
