import * as SecureStore from 'expo-secure-store';
import { User } from './models';

const key = "trips-nd-fare-user";

const storeUser = async (user: User) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(user));
    } catch (error) {
        console.log('Error storing the user', error);
    }
};

const retrieveUser = async () => {
    try {
        const user =  await SecureStore.getItemAsync(key);
        if (user) return JSON.parse(user);

        return null;
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

const removeUser = async () => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

export default { storeUser, retrieveUser, removeUser };

