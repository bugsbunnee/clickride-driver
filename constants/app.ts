import { UserRide } from "@/utils/models";

export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';

export const SORT_ORDER = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
];

export const RIDES: UserRide[] = [
    {
      id: "1",
      driverName: "Albert Akang",
      carSeats: 4,
      date: "2023-10-20 04:55",
      status: 'paid',
      fromAddress: "Ogombo road, Ajah",
      toAddress: "Lekki scheme 2. Lagos",
      price: 3000,
      type: 'jetty'
    },
    {
      id: "2",
      driverName: "Albert Akang",
      carSeats: 4,
      date: "2023-10-20 04:55",
      status: 'paid',
      fromAddress: "Ogombo road, Ajah",
      toAddress: "Lekki scheme 2. Lagos",
      price: 3000,
      type: 'bus'
    }
];

export const BOOKING_TYPES = [
  {
    label: "One Way",
    value: 1,
  }, 
  {
    label: "Round Trip",
    value: 2,
  }
];

export const CURRENCY = {
  NGN: {
    CODE: 'NGN',
    SYMBOL: '₦'
  }
};

export const DATE_FORMAT = {
  DATE_MID: 'MMM. DD, YYYY',
}