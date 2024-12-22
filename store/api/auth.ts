import { Account, AuthResponse, Profile, User } from '@/utils/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Credentials {
    email: string;
    password: string;
}

interface NewUser {
    email: string;
    phoneNumber: string;
    city: string;
    service: string;
    password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Credentials>({
        query: (credentials) => ({
          url: '/auth/driver/login',
          method: 'POST',
          body: credentials,
        }),
    }),
    register: builder.mutation<AuthResponse, NewUser>({
        query: (user) => ({
          url: '/users/driver',
          method: 'POST',
          body: user,
        }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi