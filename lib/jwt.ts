import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

export interface TempUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  [key: string]: string;
}

export async function createTempUserJWT(userData: TempUserData): Promise<string> {
  return new SignJWT(userData)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(secret);
}

export async function verifyTempUserJWT(
  token: string
): Promise<TempUserData | null> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as TempUserData;
  } catch {
    return null;
  }
}
