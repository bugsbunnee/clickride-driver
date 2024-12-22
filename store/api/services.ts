import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PickerItemModel } from '@/utils/models'

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getServices: builder.query<PickerItemModel[], undefined>({
        query: () => ({ url: '/services/driver' }),
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi