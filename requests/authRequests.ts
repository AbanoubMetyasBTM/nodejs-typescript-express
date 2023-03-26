import {User} from "../types";

// @ts-ignore
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'password'>;

export interface SignInRequest {
    login: string;
    password: string;
}

