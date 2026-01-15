import { prisma } from "@/lib/prisma";
import { verifyTempUserJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

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
        
        //check si l'user existe deja
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

  // Cas où on ne crée pas d'utilisateur (réinitialisation de mot de passe)
  return NextResponse.json({ error: false, message: "Validé !" });
  } catch (error) {
    console.error("Erreur dans l'API OTP verify:", error);
    return NextResponse.json({ error: true, message: "Erreur serveur" }, { status: 500 });
  }
}
