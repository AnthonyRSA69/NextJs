import { IRegister } from "@/app/interfaces/users";

export const MRegister = (user : IRegister) => {
    const { firstName, lastName, email, password, confirmPassword } = user;
    const a = []


    if (!(firstName.length >= 2 && firstName.length <= 20)) {
        a.push({ error :true, message: "First name is not correct", code: "E01"})
    }
    if (!(lastName.length >= 2 && lastName.length <= 20)) {
        a.push({ error :true, message: "Last name is not correct", code: "E02"})
    }
    if (!(email.length >= 2 && email.length <= 40 && email.includes("@"))) {
        a.push({ error :true, message: "Email is not correct", code: "E03"})
    }
    if (!(password.length >= 2 && password.length <= 20)) {
        a.push({ error :true, message: "Password is not correct", code: "E04"})
    }
    if (password !== confirmPassword) {
        a.push({ error :true, message: "Password is not correct", code: "E05"})
    }
 return a;
}