import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ArgonHash } from "@/lib/argon2i";
import { NextResponse } from "next/server";
import { MResetPassword } from "@/middleware/reset-password";
import type { IResetPassword } from "@/app/interfaces/users";


export async function POST(req: Request) {
    try {
        const { email, password, confirmPassword }: IResetPassword = await req.json();

        // Validation
        const errors = MResetPassword({ email, password, confirmPassword });
        if (errors && errors.length > 0) {
            return NextResponse.json({ error: true, validation: errors }, { status: 400 });
        }

        // On va verifier que le user existe
        const user = await prisma.user.findUnique({
        where: { email }
        });

        if (!user) {
        return NextResponse.json({
            error: true,
            message: "Utilisateur non trouvé"
        }, { status: 404 });
        }

        //On hash le nouveau mot de passe
        const hashedPassword = await ArgonHash(password);

        // Et onn met a jour le mdp
        await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
        });

        return NextResponse.json({
        error: false,
        message: "Mot de passe mis à jour avec succès"
        }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe : ", error);
    return NextResponse.json({
      error: true,
      message: "Erreur serveur"
    }, { status: 500 });
  }
}