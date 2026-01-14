// app/api/otp/verify/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const otp = await prisma.oTP.findFirst({
    where: { email, code, used: false },
    orderBy: { createdAt: "desc" }
  });
// S'il ne trouve rien alors on renvoie une erreur
  if (!otp) {
    return NextResponse.json({ error: true, message: "code incorrecte" }, { status: 400 });
  }
// On verifie qye le code n'est pas expire
  if (otp.expiresAt < new Date()) {
    return NextResponse.json({error: true, message: "code expirée" }, { status: 400 });
  }
// on met à jour la bdd car le code a été utilisé
  await prisma.oTP.update({
    where: { id: otp.id },
    data: { used: true }
  });

  return NextResponse.json({ error: false, message: "Validé !" });
}
