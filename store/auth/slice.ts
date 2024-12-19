import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/utils/models";
import { AppDispatch } from "..";

import storage from "@/utils/storage";

interface AuthState {
    error: string;
    isAuthenticating: boolean;
    user: User | null;
}

const initialState: AuthState = {
    error: '',
    isAuthenticating: true,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setUser(null));
    await storage.removeUser();
};

export const { setAuthenticating, setUser } = authSlice.actions;
export default authSlice.reducer;