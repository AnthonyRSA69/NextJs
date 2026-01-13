import { ILogin } from "@/app/interfaces/users";

export const MLogin = (user : ILogin) => {
    const { email, password } = user;
    const a = []

    if (email.length < 5 || email.length > 100) {
        a.push({ error: true, message: "Email is not correct", code: "E03" })
    }
    
    if (password.length < 2 || password.length > 100) {
        a.push({ error: true, message: "Password is not correct", code: "E04" })
    }
    
    return a;
}