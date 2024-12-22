import _ from 'lodash';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'
import { AuthResponse, PaymentDetails, CarPersonalInformation, TripDetails } from '@/utils/models';

export interface CarPersonalInformationPayload extends CarPersonalInformation {
    service: string;
    firstName: string;
    lastName: string;
}

export interface BusPersonalInformationPayload { 
  payload: FormData; 
  service: string;
}

export const onboardingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('x-auth-token', token);
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateCarPersonalInformation: builder.mutation<AuthResponse, CarPersonalInformationPayload>({
      query: (payload: CarPersonalInformationPayload) => ({
        url: '/profile/' + payload.service + '/personal-information',
        method: 'PUT',
        body: _.omit(payload, ['service']),
      }),
    }),
    updateBusPersonalInformation: builder.mutation<AuthResponse, BusPersonalInformationPayload>({
      query: ({ payload, service }: BusPersonalInformationPayload) => ({
        url: '/profile/' + service + '/personal-information',
        method: 'PUT',
        body: payload,
      }),
    }),
    updatePaymentDetails: builder.mutation<AuthResponse, PaymentDetails>({
      query: (payload: PaymentDetails) => ({
        url: '/profile/payment-details',
        method: 'PUT',
        body: payload,
      })
    }),
    updateVehicleDocuments: builder.mutation<AuthResponse, FormData>({
      query: (payload: FormData) => ({
        url: '/profile/vehicle-documents',
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: payload,
      })
    }),
    updateVehicleInspection: builder.mutation<AuthResponse, FormData>({
      query: (payload: FormData) => ({
        url: '/profile/vehicle-inspection',
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: payload,
      })
    }),
    updateTripDetails: builder.mutation<AuthResponse, TripDetails>({
      query: (payload: TripDetails) => ({
        url: '/profile/trip-details',
        method: 'PUT',
        body: payload,
      })
    }),
  }),
});

export const { 
  useUpdateCarPersonalInformationMutation, 
  useUpdateBusPersonalInformationMutation,
  useUpdatePaymentDetailsMutation,
  useUpdateVehicleInspectionMutation,
  useUpdateVehicleDocumentsMutation,
  useUpdateTripDetailsMutation,
} = onboardingApi;
