import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { validate, loginSchema } from "@/lib/api/validation";
import { signToken } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting
  const { allowed } = await checkRateLimit(req, { windowMs: 60000, maxRequests: 10 });
  if (!allowed) return apiError("Too many login attempts. Try again later.", 429);

  try {
    const body = await req.json();
    const result = validate(loginSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production, verify against database
    // const user = await prisma.user.findUnique({ where: { email: result.data.email } });
    // const valid = await bcrypt.compare(result.data.password, user.password);

    // Demo: generate token for admin
    const token = await signToken({
      sub: "demo-user-id",
      email: result.data.email,
      role: "admin",
    });

    return apiSuccess({ token, expiresIn: "7d" });
  } catch {
    return apiError("Internal server error", 500);
  }
}
