import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ error: false, message: "Déconnecté" });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  return response;
}
