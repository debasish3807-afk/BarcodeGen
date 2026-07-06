import { NextResponse } from "next/server";
import { getHealthStatus } from "@/lib/monitoring";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const health = await getHealthStatus();
  const status = health.status === "healthy" ? 200 : health.status === "degraded" ? 200 : 503;
  return NextResponse.json(health, { status });
}
