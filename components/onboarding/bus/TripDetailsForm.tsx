import React, { useCallback, useMemo } from "react";
import _ from "lodash";

import { View, StyleSheet } from "react-native";
import * as yup from 'yup';

import { PickerItemModel, TripDetails } from '@/utils/models';
import { BUS_TYPES } from "@/utils/data";

import { colors, styles as defaultStyles } from '@/constants'
import { Form, FormCheckBox, FormField, FormMultiCheckBox, FormMultiPicker, FormPicker, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { FormikHelpers } from "formik";
import { useUpdateTripDetailsMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError } from "@/utils/lib";
import { SEAT_CAPACITY } from "@/constants/app";
import { saveUserSession } from "@/utils/database";

import TripLocations from "./TripLocations";

interface FormValues {
    origin: PickerItemModel | null;
    destination: PickerItemModel | null;
    originCity: PickerItemModel | null;
    destinationCity: PickerItemModel | null;
    price: number;
    isRoundTrip: boolean;
    departureDates: PickerItemModel[];
    departureTime: PickerItemModel | null;
    returnDates: PickerItemModel[];
    returnTime: PickerItemModel | null;
    busType: PickerItemModel | null;
    busCapacity: PickerItemModel | null;
    airConditioning: number;
}

const schema = yup.object<FormValues>().shape({
    origin: yup.object().required().label('From'),
    destination: yup.object().required().test({
        name: 'is-not-same-as-origin',
        skipAbsent: true,
        message: 'Origin must be different from destination',
        test: (destination, ctx) => {
            if (destination && ctx.parent.origin) {
                const destinationValue = _.get(destination, 'value');
                const originValue = _.get(ctx.parent.origin, 'value');

                return originValue !== destinationValue;
            }

            return false;
        }
    }).label('To'),
    originCity: yup.object().required().label('From (City)'),
    destinationCity: yup.object().required().label('To (City)'),
    price: yup.number().positive().required().label('Price'),
    isRoundTrip: yup.bool().required().label('Is Round Trip'),
    departureDates: yup.array().min(1, 'Please select at least one day').required().label('Departure Date'),
    departureTime: yup.object().required().label('Departure Time'),
    returnDates: yup.array().min(1, 'Please select at least one day').required().label('Return Date'),
    returnTime: yup.object().required().label('Return Time'),
    busType: yup.object().required().label('Bus Type'),
    busCapacity: yup.object().required().label('Bus Capacity'),
    airConditioning: yup.string().required().label('Air conditioning')
});

const TripDetailsForm: React.FC = () => {
    const [updateTripDetails, { isLoading: isUpdating }] = useUpdateTripDetailsMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            origin: null,
            destination: null,
            originCity: null,
            destinationCity: null,
            price: 0,
            isRoundTrip: false,
            departureDates: [],
            departureTime: null,
            returnDates: [],
            returnTime: null,
            busType: null,
            busCapacity: null,
            airConditioning: 0,
        };
    }, []);

    const handleSubmit = useCallback(async (tripDetails: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload: TripDetails = {
            origin: tripDetails.origin!.value.toString(),
            destination: tripDetails.destination!.value.toString(),
            originCity: tripDetails.originCity!.value.toString(),
            destinationCity: tripDetails.destinationCity!.value.toString(),
            price: parseFloat(tripDetails.price.toString()),
            isRoundTrip: tripDetails.isRoundTrip,
            departureDates: tripDetails.departureDates.map((date) => date.value as number),
            returnDates: tripDetails.returnDates.map((date) => date.value as number),
            departureTime: tripDetails.departureTime!.value.toString(),
            returnTime: tripDetails.returnTime!.value.toString(),
            busType: tripDetails.busType!.value.toString(),
            busCapacity: tripDetails.busCapacity!.value as number,
            airConditioning: tripDetails.airConditioning === 1,
        }

        try {
            const response = await updateTripDetails(payload).unwrap();
            await saveUserSession(response);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [updateTripDetails]);

    return ( 
        <>
            <ActivityIndicator visible={isUpdating} />

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Trip Details</Text>
                    <Text style={styles.description}>Enter trip details to list your transport</Text>
                </View>

                <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    <TripLocations />

                    <FormField 
                        name="price" 
                        label='Price of trip' 
                        placeholder='Enter price'
                        keyboardType='numeric'
                    />

                    <View style={styles.bottomMargin}>
                        <FormCheckBox name="isRoundTrip">
                            <Text style={styles.roundTrip}>Check the box if price is round trip</Text>
                        </FormCheckBox>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.flex}>
                            <FormMultiPicker
                                name="departureDates" 
                                label='Departure dates' 
                                placeholder='Select dates'
                                items={dates}
                                width="100%"
                            />
                        </View>
                    
                        <View style={styles.flex}>
                            <FormMultiPicker
                                name="returnDates" 
                                label='Return dates' 
                                placeholder='Select dates'
                                items={dates}
                                width="100%"
                            />
                        </View>
                    </View>
                    
                    <View style={styles.row}>
                        <View style={styles.flex}>
                            <FormPicker
                                name="departureTime" 
                                label='Departure time' 
                                placeholder='Select time'
                                items={times}
                                width="100%"
                            />
                        </View>
                    
                        <View style={styles.flex}>
                            <FormPicker
                                name="returnTime" 
                                label='Return time' 
                                placeholder='Select time'
                                items={times}
                                width="100%"
                            />
                        </View>
                    </View>

                    <FormPicker
                        name="busType" 
                        label='Bus type' 
                        placeholder='Select bus type'
                        items={BUS_TYPES}
                        width="100%"
                    />
                    
                    <FormPicker
                        name="busCapacity" 
                        label='Bus capacity' 
                        placeholder='Select bus capacity'
                        items={SEAT_CAPACITY}
                        width="100%"
                    />

                    <FormMultiCheckBox name="airConditioning" options={airConditioningOptions} />

                    <View style={styles.buttonContainer}>
                        <SubmitButton label="List Bus Trip" />
                    </View>
                </Form>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomMargin: { marginBottom: 18 },
    buttonContainer: { marginTop: 14 },
    content: {
        flex: 1,
        paddingHorizontal: 23,
        paddingBottom: 20,
    },
    description: { 
        textAlign: 'center', 
        fontSize: 10, 
        lineHeight: 15,
        color: colors.light.graySemi,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
        marginTop: 4,
        maxWidth: '80%'
    },
    flex: { flex: 1 },
    row: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10,
    },
    roundTrip: {
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        fontSize: 9,
        lineHeight: 20,
        color: colors.light.gray
    },
    title: { 
        textAlign: 'center', 
        fontSize: 18, 
        lineHeight: 22,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dew,
        paddingBottom: 5,
        marginBottom: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const times: PickerItemModel[] = _.range(0, 24).map((time) => {
    const formattedTime = time.toFixed(2).replace('.', ':').padStart(5, '0');

    return {
        label: formattedTime,
        value: formattedTime,
    }
});

const dates: PickerItemModel[] = [
    {
        label: 'Monday',
        value: 0
    },
    {
        label: 'Tuesday',
        value: 1
    },
    {
        label: 'Wednesday',
        value: 2
    },
    {
        label: 'Thursday',
        value: 3
    },
    {
        label: 'Friday',
        value: 4
    },
    {
        label: 'Saturday',
        value: 5
    },
    {
        label: 'Sunday',
        value: 6
    },
];

const airConditioningOptions: PickerItemModel[] = [
    {
        label: 'AC',
        value: 1
    },
    {
        label: 'NO-AC',
        value: 0
    },
];

export default TripDetailsForm;