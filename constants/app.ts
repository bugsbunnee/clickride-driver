import _ from "lodash";

export const CURRENCY = {
  NGN: {
    CODE: 'NGN',
    SYMBOL: '₦'
  }
};

export const DATE_FORMAT = {
  DATE_MID: 'MMM. DD, YYYY',
};

export const TASKS = {
  LOCATION_UPDATES: 'click-ride-location-updates'
};

export const SEAT_CAPACITY = _.range(1, 21).map((seat) => ({
    label: seat.toString(),
    value: seat
}));

export enum Service {
  Car = 'car',
  Bus = 'bus',
  LOCAL = 'local'
}

export const BYTE_SIZE_IN_MB = 1_000_000;
export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
export const MAX_FILE_SIZE_IN_MB = 2;
export const MIN_VEHICLE_YEAR = 1990;