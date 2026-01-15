import { IResetPassword } from "@/app/interfaces/users";

export const MResetPassword = (user : IResetPassword) => {
    const { email, password, confirmPassword } = user;
    const a = []

    if (!(email.length >= 2 && email.length <= 40 && email.includes("@"))) {
        a.push({ error :true, message: "Email is not correct", code: "E03"})
    }
    if (!(password.length >= 2 && password.length <= 20)) {
        a.push({ error :true, message: "Password must be between 2 and 20 characters", code: "E04"})
    }
    if (password !== confirmPassword) {
        a.push({ error :true, message: "Passwords do not match", code: "E05"})
    }
 return a;
}