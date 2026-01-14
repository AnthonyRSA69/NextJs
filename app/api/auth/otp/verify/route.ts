import { prisma } from "@/lib/prisma";
import { verifyTempUserJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  console.log("[OTP VERIFY] Verifying code for email:", email);

  // Verify OTP code
  const otp = await prisma.oTP.findFirst({
    where: { email, code, used: false },
    orderBy: { createdAt: "desc" }
  });

  if (!otp) {
    return NextResponse.json({ error: true, message: "code incorrecte" }, { status: 400 });
  }

  if (otp.expiresAt < new Date()) {
    return NextResponse.json({error: true, message: "code expirée" }, { status: 400 });
  }

  // Mark OTP as used
  await prisma.oTP.update({
    where: { id: otp.id },
    data: { used: true }
  });

// regarde les info du jwt pour creer l'user
  const cookieStore = await cookies();
  const tempToken = cookieStore.get("tempUserToken")?.value;

  if (tempToken) {
    console.log("[OTP VERIFY] Found temp user token, creating account");
    
    const userData = await verifyTempUserJWT(tempToken);

    if (userData) {
      try {
        const user = await prisma.user.create({
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
          },
        });

        console.log("[OTP VERIFY] User created successfully:", user.email);

        // suppresion du temp
        const response = NextResponse.json({ 
          error: false, 
          message: "Compte créé et vérifié!",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
        }, { status: 201 });

        response.cookies.delete("tempUserToken");
        return response;
      } catch (err: any) {
        
        //chcek si l'user exite deja
        if (err.code === "P2002") {
          return NextResponse.json({ 
            error: true, 
            message: "Cet email est déjà utilisé" 
          }, { status: 400 });
        }

        return NextResponse.json({ 
          error: true, 
          message: "Erreur lors de la création du compte" 
        }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ error: false, message: "Validé !" });
}
