import {UserDao} from "../dao/UserDao";
import {User} from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";


export class UserModel implements UserDao {

    async createUser(user: User): Promise<string> {

        let insertedRow = await DatabaseConnection.query(
            "INSERT INTO `users`(`email`, `firstName`, `lastName`, `userName`, `password`) VALUES (?,?,?,?,?)",
            [
                user.email,
                user.firstName,
                user.lastName,
                user.userName,
                user.password,
            ]
        )

        return insertedRow.insertId;

    }

    getUsers(): Promise<User[]> {

        return DatabaseConnection.query(
            "SELECT * FROM `users`"
        );

    }

    getUserByEmail(email: string): Promise<User> {

        return DatabaseConnection.getRow(
            "SELECT * FROM `users` WHERE email=?",
            [
                email
            ]
        );

    }

    getUserById(id: string): Promise<User> {
        return DatabaseConnection.getRow(
            "SELECT * FROM `users` WHERE id=?",
            [
                id
            ]
        );

    }

    getUserByUsername(username: string): Promise<User> {
        return DatabaseConnection.getRow(
            "SELECT * FROM `users` WHERE userName=?",
            [
                username
            ]
        );
    }

}

export let UserModelObj: UserModel = new UserModel();
