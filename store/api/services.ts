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
    getServices: builder.query<PickerItemModel[], void>({
        query: () => ({ url: '/services/driver' }),
    }),
    getStates: builder.query<PickerItemModel[], void>({
      query: () => '/locations/states',
    }),
    getCities: builder.query<PickerItemModel[], string>({
      query: (state: string) => ({
        url: '/locations/cities',
        method: 'POST',
        body: { state },
      })
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

export const { useGetServicesQuery, useGetStatesQuery, useGetCitiesQuery, useUpdateLocationMutation } = serviceApi