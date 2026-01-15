// REGISTER incsripiton API 
import type { NextRequest } from "next/server";
import type { IRegister } from "@/app/interfaces/users";
import { MRegister } from "@/middleware/register";
import { ArgonHash } from "@/lib/argon2i";
import { createTempUserJWT } from "@/lib/jwt";
import { sendOTP } from "@/lib/otp";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { firstName, lastName, email, password, confirmPassword }: IRegister = await request.json();

    // Validation des infos d'inscription via le middleware
    const errors = MRegister({ firstName, lastName, email, password, confirmPassword });
    if (errors && errors.length > 0) {
        return NextResponse.json({ error: true, validation: errors }, { status: 400 });
    }

    try {
        const hashedPassword = await ArgonHash(password);

        // creation jwt temporaire
        const tempToken = await createTempUserJWT({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

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

        response.cookies.set("tempUserToken", tempToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 900, // 15 minutes en secondes
        });

        return response;
    } catch (e) {
        console.error("Register error:", e);
        return NextResponse.json({ 
            error: true, 
            message: "Erreur lors de l'enregistrement", 
            code: "E02" 
        }, { status: 500 });
    }
}