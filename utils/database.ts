import * as SQLite from 'expo-sqlite';
import { Account } from './models';

interface Session {
    account: Account;
    token: string;
}

const DATABASE_NAME = 'clickride-driver-db';

export const setUpDatabase = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT);`)
};

export const saveUserSession = async (session: Session) => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    db.runAsync(`INSERT INTO users (token) VALUES (?);'`, [JSON.stringify(session)]);
};

export const getUserSession = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const user: { token: string } | null = await db.getFirstAsync('SELECT * FROM users');

    return user ? JSON.parse(user.token) : user;
};

export const removeUserSession = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync('DELETE * FROM users');
};