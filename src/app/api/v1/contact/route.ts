import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { validate, contactSchema } from "@/lib/api/validation";
import { checkRateLimit } from "@/lib/api/rate-limit";

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req, { windowMs: 60000, maxRequests: 3 });
  if (!allowed) return apiError("Too many messages. Please try later.", 429);

  try {
    const body = await req.json();
    const result = validate(contactSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production: save to database
    // await prisma.contactMessage.create({ data: result.data });

    return apiSuccess({ message: "Message sent successfully" }, 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}
