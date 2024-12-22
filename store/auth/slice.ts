import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "@/utils/models";
import { AppDispatch } from "..";
import { authApi } from "../api/auth";

import storage from "@/utils/storage";

interface AuthState {
    error: string;
    isAuthenticating: boolean;
    token: string;
    account: Account | null;
}

const initialState: AuthState = {
    error: '',
    isAuthenticating: true,
    token: '',
    account: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        },
        setSession: (state, action: PayloadAction<Pick<AuthState, 'account' | 'token'>>) => {
            state.token = action.payload.token;
            state.account = action.payload.account;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.token = action.payload.token;
            state.account = action.payload.account;
        })
        .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            state.token = action.payload.token;
            state.account = action.payload.account;
        });
    }
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setSession({ account: null, token: '' }));
    await storage.removeSession();
};

export const { setAuthenticating, setSession } = authSlice.actions;
export default authSlice.reducer;