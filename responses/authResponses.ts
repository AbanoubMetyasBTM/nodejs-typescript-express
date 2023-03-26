import {User} from "../types";

export interface SignUpResponse {
    jwt: string;
}

export type SingInResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>,
    jwt: string
};