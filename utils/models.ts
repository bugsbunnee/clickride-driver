export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface PickerItemModel {
    label: string;
    value: string | number;
}

export interface PaymentDetails {
    billingType:string;
    address:string;
    accountName:string;
    accountNumber: string;
    bankName:string;
}

export interface Profile {
    paymentDetails: PaymentDetails;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    city: string;
    deviceToken: string;
    email: string;
    phoneNumber: string;
    password: string;
    lastLogin: Date | null,
    isEmailVerified: boolean;
    coords: Coordinates;
}

export interface Account {
    service: string;
    user: User;
    profile: Profile;
}

export interface ApiFormError {
    fieldErrors: Record<string, [string]>;
}