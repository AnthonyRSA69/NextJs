import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/otp";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: true, message: "Email requis" }, { status: 400 });
  }

  await sendOTP(email);

  return NextResponse.json({ error: false, message: "OTP envoyé" });
}
