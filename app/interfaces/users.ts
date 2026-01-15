export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    password: string;
    confirmPassword: string;
}

