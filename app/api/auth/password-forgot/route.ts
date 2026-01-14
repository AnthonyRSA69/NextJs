import type { NextRequest } from "next/server";
import { createTempUserJWT } from "@/lib/jwt";
import { sendOTP } from "@/lib/otp";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // On récupère l'email afin d'envoyer le code au bon correspondant
    const { email }: {email: string} = await request.json();

    try {
        // on lance la procedure de l'envoie de l'otp
        const envoiOTP = await sendOTP(email);

        //on verifei que le code a bien été envoye
        if (!envoiOTP.code) {
            return NextResponse.json({ 
                error: true, 
                message: "Erreur lors de l'envoi de l'OTP", 
                code: "E03" 
            }, { status: 500 });
        }
        // si tout est bon alors on envoie la reponse
        const reponse = NextResponse.json({ 
            error: false, 
            message: "OTP envoyé, verifiez votre boite mail",
            email
        }, { status: 200 });

    } catch (e) {
    }
}