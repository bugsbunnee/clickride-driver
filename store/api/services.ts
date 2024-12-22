import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Coordinates, PickerItemModel } from '@/utils/models';
import { RootState } from '..';

interface LocationUpdateResponse {
  message: string;
}

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) headers.set('x-auth-token', token);
        
        return headers;
      },
  }),
  endpoints: (builder) => ({
    getServices: builder.query<PickerItemModel[], undefined>({
        query: () => ({ url: '/services/driver' }),
    }),
    getStates: builder.query<PickerItemModel[], void>({
      query: () => '/locations/states',
    }),
    updateLocation: builder.mutation<LocationUpdateResponse, Coordinates>({
      query: (payload: Coordinates) => ({
        url: '/users/me/location',
        method: 'PATCH',
        body: payload,
      })
    }),
  }),
});

export const { useGetServicesQuery, useGetStatesQuery, useUpdateLocationMutation } = serviceApi