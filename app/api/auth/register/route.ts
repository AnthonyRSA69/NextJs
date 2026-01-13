import type { NextRequest } from "next/server";
import type { IRegister } from "@/app/interfaces/users";
import { MRegister } from "@/middleware/register";
import { prisma } from "@/lib/prisma";
import { ArgonHash } from "@/lib/argon2i";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { firstName, lastName, email, password, confirmPassword }: IRegister = await request.json();
    
    const errors = MRegister({ firstName, lastName, email, password, confirmPassword });
    if (errors.length > 0) {
        return NextResponse.json(errors, { status: 400 });
    }
    
    try {
        const hashedPassword = await ArgonHash(password);
        
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        
        return NextResponse.json({ 
            error: false, 
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ 
            error: true, 
            message: "Erreur lors de l'enregistrement", 
            code: "E02" 
        }, { status: 500 });
    }
}