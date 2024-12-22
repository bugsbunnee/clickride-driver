import _ from 'lodash';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

export interface Response {
    message: string;
}

export interface PersonalInformationPayload {
    service: string;
    firstName: string;
    lastName: string;
    gender: string;
    isVehicleOwner: boolean;
    vehicleManufacturer: string;
    vehicleYear: number;
    vehicleColor: string;
    vehicleLicensePlate: string;
}

export const onboardingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('x-access-token', token);
      
      return headers
    },
  }),
  endpoints: (builder) => ({
    updatePersonalInformation: builder.mutation<Response, PersonalInformationPayload>({
      query: (payload: PersonalInformationPayload) => ({
        url: '/profile/' + payload.service + '/personal-information',
        method: 'POST',
        body: _.omit(payload, ['service']),
      }),
    }),
  }),
});

export const { useUpdatePersonalInformationMutation } = onboardingApi
