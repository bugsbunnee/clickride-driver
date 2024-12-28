import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormError, FormField, FormMultiPicker, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { useGetCitiesQuery } from "@/store/api/services";
import { useAppSelector } from "@/store/hooks";
import { FormikHelpers } from "formik";
import { useUpdateRouteDetailsMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";
import { PickerItemModel, RouteDetails } from "@/utils/models";

import storage from "@/utils/storage";

interface FormValues {
    routes: PickerItemModel[];
    price: number;
}

const schema = yup.object<FormValues>().shape({
    routes: yup.array().min(1, 'Please enter at least one route').required().label('Routes'),
    price: yup.number().positive().required().label('Price of trip'),
});

const RouteDetailsForm: React.FC = () => {
    const { city } = useAppSelector((state) => state.auth.account!.user!);
    const { data = [], isLoading } = useGetCitiesQuery(city);
    const [updateRouteDetails, { isLoading: isUpdating, error }] = useUpdateRouteDetailsMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            routes: [],
            price: 0,
        };
    }, []);

    const handleSubmit = useCallback(async (routeDetails: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload: RouteDetails = {
            routes: routeDetails.routes.map((route) => route.value.toString()),
            price: parseFloat(routeDetails.price.toString()),
        };

        try {
            const response = await updateRouteDetails(payload).unwrap();
            storage.storeSession(response);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [updateRouteDetails]);

    return ( 
        <>
            <ActivityIndicator visible={isLoading || isUpdating} />

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Route Details</Text>
                    <Text style={styles.description}>Enter route details</Text>
                </View>

                <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    <FormMultiPicker
                        name="routes" 
                        label='Routes' 
                        items={data}
                        placeholder='Enter your routes location'
                    />

                    <FormField 
                        name="price" 
                        label='Price of trip' 
                        placeholder='Enter your Price'
                        keyboardType='numeric'
                    />

                    <FormError error={getMessageFromError(error)} />

                    <View style={styles.buttonContainer}>
                        <SubmitButton label="List Bus Stop" />
                    </View>
                </Form>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    bottomMargin: { marginBottom: 16 },
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
    link: {
        color: colors.light.primary,
        textDecorationLine: 'underline',
        fontSize: 10,
        lineHeight: 14,
        fontFamily: defaultStyles.jakartaRegular.fontFamily
    },
    small: {
        color: colors.light.graySemi,
        fontSize: 10,
        lineHeight: 12,
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        flex: 1,
        width: '100%'
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

export default RouteDetailsForm;