import {Connection} from 'mysql2';

export let db: Connection;

export class DatabaseConnection {

    private constructor() {

    }

    static async initializeConnection() {
        if (db !== undefined) {
            return;
        }

        db = await this.initialMysql();
    }

    private static async initialMysql() {
        const mysql = require('mysql2/promise');

        const connection = await mysql.createConnection({
            host: process.env.mysqlDBHost,
            user: process.env.mysqlDBUser,
            password: process.env.mysqlDBPass,
            database: process.env.mysqlDBDatabase
        });

        return connection;

    }

    static async query(sql: string, options?: unknown) {
        // @ts-ignore
        const [rows] = await db.query(sql, options);
        return rows;
    }

    static async getRow(sql: string, options?: unknown) {
        // @ts-ignore
        const [rows] = await db.query(sql, options);
        return rows[0];
    }


}

