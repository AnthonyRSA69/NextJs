import type { NextRequest } from "next/server";
import { sendOTP } from "@/lib/otp";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { email }: { email: string } = await request.json();

    if (!email) {
        return NextResponse.json({ error: true, message: "Email requis" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        // For security, don't reveal if email exists or not
        return NextResponse.json({
            error: false,
            message: "Si un compte existe avec cet email, un code OTP a été envoyé."
        }, { status: 200 });
    }

    // Send OTP
    const otpResult = await sendOTP(email);
    if (!otpResult.code) {
        return NextResponse.json({
            error: true,
            message: "Erreur lors de l'envoi de l'OTP",
            code: "E03"
        }, { status: 500 });
    }

    const response = NextResponse.json({
        error: false,
        message: "OTP envoyé. Vérifiez votre email.",
        email
    }, { status: 200 });

    return response;
}