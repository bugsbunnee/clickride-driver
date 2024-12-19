import React from "react";

import { NotificationContentInput, scheduleNotificationAsync } from "expo-notifications";
import { LocationObjectCoords } from "expo-location";
import { captureRef } from 'react-native-view-shot';

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { CURRENCY } from "@/constants/app";

dayjs.extend(duration);

export const formatDate = (date: string | number |  Date, format: string = 'DD MMMM YYYY, HH:mm A') => {
    return dayjs(date).format(format);
};

export const formatAmount = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY.NGN.CODE, unitDisplay: 'narrow' }).format(amount);
    return formattedAmount.replace(CURRENCY.NGN.CODE, CURRENCY.NGN.SYMBOL);
};

export const getCountDown = (startDate: string | Date | number, endDate: string | Date | number) => {
    const endTime = new Date(endDate).getTime();
    const startTime = new Date(startDate).getTime();

    const timeDifference = endTime - startTime;

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export const getCoords = ({ latitude, longitude, accuracy, speed, ...others }: LocationObjectCoords) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = accuracy! / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = accuracy! / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
  
    return {
    ...others,
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      accuracy,
      speed,
    };
};

export const getTimeFromDate = (date: string | Date | number) => {
    return dayjs(date).format('hh:mmA');
}

export const generateScreenshot = (view: number | React.RefObject<unknown>) => {
    return captureRef(view, {
        quality: 1,
        format: 'png',
    })
};

export const sendLocalNotification = (content: NotificationContentInput) => {
    scheduleNotificationAsync({ content, trigger: null });
};

