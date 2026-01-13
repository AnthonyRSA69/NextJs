import type { NextRequest } from "next/server";
import type { IRegister } from "@/app/interfaces/users";
import { MRegister } from "@/middleware/register";
export async function POST(request: NextRequest) {

    const {firstName, lastName, email, password, confirmPassword} : IRegister = await request.json();
    const middle = MRegister({firstName, lastName, email, password, confirmPassword});

    if (middle.length >= 0) {
        return Response.json(middle);
    }
    return Response.json({ message: "Register route is working!" });

}