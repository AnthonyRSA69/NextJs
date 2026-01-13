import type { NextRequest } from "next/server";
import type { IRegister } from "@/app/interfaces/users";
import { MRegister } from "@/middleware/register";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
export async function POST(request: NextRequest) {

    const {firstName, lastName, email, password, confirmPassword} : IRegister = await request.json();
    const middle = MRegister({firstName, lastName, email, password, confirmPassword});

    if (middle.length >= 0) {
        return Response.json(middle);
    }

    try {
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
            },
        });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "Register route is working!" });
    }
    return Response.json({ message: "Register route is working!" });

}