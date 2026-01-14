import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOtp() {
    // on va génèrer un code à 6 chiffre aléatoire
    return Math.floor(Math.random() * 900000 + 99999).toString();
}

export async function sendOTP(email: string) {
  const code = generateOtp();
  console.log("Send OTP appele dans la console", code)
  const expiresAt = new Date(Date.now() + 10 /*Pour le nombre de minutes*/ * 60/*minutes*/ * 1000 /*milisecindes*/);

  try {
    await prisma.oTP.create({
      data: { email, code, expiresAt },
    });
    
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Code de vérification",
      html: `<p>Votre code de vérif est le suivant : <strong>${code}</strong><br/>Valable 10 minutes.</p>`,
    });

    console.log("Email envoye avec succes !");
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'OTP :", err);
  }

  return { code, email };
}