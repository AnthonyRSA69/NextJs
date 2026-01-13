import argon2i from "argon2";

export const ArgonHash = async (password: string): Promise<string> => {
    try {
        const hashed = await argon2i.hash(password);
        return hashed;
    } catch (e) {
        console.error(e);
        throw new Error("Erreur lors du hachage du password");
    }
}

export const ArgonVerify = async (hash: string, password: string): Promise<boolean> => {
    try {
        const isValid = await argon2i.verify(hash, password);
        return isValid;
    } catch (e) {
        console.error(e);
        return false;
    }
}