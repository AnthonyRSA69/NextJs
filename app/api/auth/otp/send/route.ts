import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/otp";

export async function POST(req: Request) {
  console.log("Je suis rentre dans Send route.ts ");
  const { email } = await req.json();
  console.log("Request to send OTP for email:", email);
  if (!email) {
    return NextResponse.json({ error: true, message: "Email requis" }, { status: 400 });
  }

  await sendOTP(email);

  return NextResponse.json({ error: false, message: "OTP envoyé" });
}
