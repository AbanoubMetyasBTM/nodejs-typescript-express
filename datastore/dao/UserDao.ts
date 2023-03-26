import {User} from "../../types";

export interface UserDao {

    createUser(user: User): Promise<string>;

    getUsers(id: string): Promise<User[]>;

    getUserById(id: string): Promise<User>;

    getUserByEmail(email: string): Promise<User>;

    getUserByUsername(username: string): Promise<User>;
}