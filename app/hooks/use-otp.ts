"use client"
import { useState } from "react";
/*const [OptCodeUser, setCodeUser] = useState("");*/

export function useOTP(email :string,code :string) {
  async function send() {
    await fetch("/api/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async function verify() {
    await fetch("/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email,/* OptCodeUser: */code }),
    });
  }

  return { email, code, send, verify/*, setCodeUser, OptCodeUser */};
}
