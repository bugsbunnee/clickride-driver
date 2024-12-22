import * as SecureStore from 'expo-secure-store';
import { Account } from './models';

const key = "click-ride-user";

interface Session {
    account: Account;
    token: string;
}

const storeSession = async (session: Session) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(session));
    } catch (error) {
        console.log('Error storing the user', error);
    }
};

const getSession = async () => {
    try {
        const user =  await SecureStore.getItemAsync(key);
        if (user) return JSON.parse(user);

        return null;
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

const removeSession = async () => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

export default { storeSession, getSession, removeSession };

