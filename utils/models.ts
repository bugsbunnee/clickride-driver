export interface AuthResponse {
    token: string;
    account: Account
}

export interface DocumentUpload {
    name?: string | null;
    type?: string;
    uri: string;
}

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

export interface VehicleDocuments {
    license: string;
    display: string;
    interior: string;
    exterior: string;
    ownership: string;
    roadWorthiness: string;
    insurance: string;
    lasrra: string;
    lasdri: string;
}

export interface CarPersonalInformation {
    gender: string;
    isVehicleOwner: boolean;
    numberOfSeats: number;
    vehicleManufacturer: string;
    vehicleYear: number;
    vehicleColor: string;
    vehicleLicensePlate: string;
}

export interface BusPersonalInformation {
    companyName: string;
    companyLogo: string;
}

export interface LocalRidePersonalInformation {
    profilePhotoUrl: string;
    localRideType: string;
}

export interface TripDetails {
    origin: string;
    destination: string;
    originCity: string;
    destinationCity: string;
    price: number;
    isRoundTrip: boolean;
    departureDates: number[];
    departureTime: string;
    returnDates: number[];
    returnTime: string;
    busType: string;
    busCapacity: number;
    airConditioning: boolean;
}

export interface RouteDetails {
    route: string;
    price: number;
}

export interface Profile {
    carPersonalInformation: CarPersonalInformation;
    busPersonalInformation: BusPersonalInformation;
    localRidePersonalInformation: LocalRidePersonalInformation;
    paymentDetails: PaymentDetails;
    vehicleDocuments?: VehicleDocuments;
    tripDetails?: TripDetails[];
    routeDetails: RouteDetails[];
    inspectionUrl?: string;
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
    rating: number;
    lastLogin: Date | null,
    isEmailVerified: boolean;
    coords: Coordinates;
}

export interface IService {
    name: string;
    code: string;
    description: string;
    color: string;
    image: string;
    driver: string;
}

export interface Account {
    _id: string;
    service: IService;
    user: User;
    profile: Profile;
}

export interface ApiFormError {
    fieldErrors: Record<string, [string]>;
}