import type { IExemple } from "@/app/interfaces/exemple";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: IExemple) {

    console.log((await params).url)

    return Response.json({ message: "Register route is working!" });

}

