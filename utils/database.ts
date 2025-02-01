import * as SQLite from 'expo-sqlite';
import { Account } from './models';

interface Session {
    account: Account;
    token: string;
}

interface User {
    id: number;
    token: string;
}

const DATABASE_NAME = 'clickride-driver-db';

export const setUpDatabase = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT);`)
};

export const saveUserSession = async (session: Session) => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync(`INSERT INTO users (token) VALUES (?);'`, [JSON.stringify(session)]);
};

export const getUserSession = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const user: User | null = await db.getFirstAsync('SELECT * FROM users');

    if (user) {
        return {
            sessionId: user.id,
            user: JSON.parse(user.token),
        };
    }

    return null;
};

export const updateUserSession = async (session: Session) => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    const userSession = await getUserSession();

    if (userSession) {
        await db.runAsync('UPDATE users SET token = ? WHERE id = ?', [JSON.stringify(session), userSession.sessionId]);
    } else {
        await saveUserSession(session);
    }
};

export const removeUserSession = async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.runAsync('DELETE FROM users');
};