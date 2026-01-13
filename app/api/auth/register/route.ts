import type { NextRequest } from "next/server";
import type { IRegister } from "@/app/interfaces/users";
import { MRegister } from "@/middleware/register";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ArgonHash } from "@/lib/argon2i";

export async function POST(request: NextRequest) {
    const {firstName, lastName, email, password, confirmPassword} : IRegister = await request.json();
    const middle = MRegister({firstName, lastName, email, password, confirmPassword});
    if (middle.length >= 0) {
        return Response.json(middle);
    }
    try {
        const ps : string | undefined = await ArgonHash(password);
        prisma.user.create({
            data: {
                firstName : firstName,
                lastName : lastName,
                email: email,
                password: ps as string
            },
        })
        return Response.json({ error: false, data:{
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: ps as string
        }})
    } catch (e) {
        console.log(e);
        return Response.json({ error: true, message:"error",code:"E02"  })
    }
    return Response.json({ message: "Register route is working!" });
}