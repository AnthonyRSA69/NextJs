// login route API
import type { NextRequest } from "next/server";
import type { ILogin } from "@/app/interfaces/users";
import { MLogin } from "@/middleware/login";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ArgonVerify } from "@/lib/argon2i";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export async function POST(request: NextRequest) {
    const { email, password}: ILogin = await request.json();
    const middle = MLogin({email, password});
    if (middle.length > 0) {
        return NextResponse.json(middle, { status: 400 });
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
        if (!user) {
            return NextResponse.json(
                { error: true, message: "Email ou mot de passe incorrect", code: "E01" },
                { status: 401 }
            );
        }
        const isValid = await ArgonVerify(user.password, password);
        if (!isValid) {
            return NextResponse.json(
                { error: true, message: "Email ou mot de passe incorrect", code: "E01" },
                { status: 401 }
            );
        }
        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({ error: false, data: { email: user.email } });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });
        return response;
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: true, message: "Erreur serveur", code: "E02" },
            { status: 500 }
        );
    }
}