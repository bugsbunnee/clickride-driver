import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormError, FormField, FormPicker, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { useGetCitiesQuery } from "@/store/api/services";
import { useAppSelector } from "@/store/hooks";
import { FormikHelpers } from "formik";
import { useUpdateRouteDetailsMutation } from "@/store/api/onboarding";

import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";
import { PickerItemModel } from "@/utils/models";
import { saveUserSession } from "@/utils/database";

interface FormValues {
    route: PickerItemModel | null;
    price: number;
}

const schema = yup.object<FormValues>().shape({
    route: yup.object().required().label('Route'),
    price: yup.number().positive().required().label('Price of trip'),
});

const RouteDetailsForm: React.FC = () => {
    const { user, profile } = useAppSelector((state) => state.auth.account!);
    const { data = [], isLoading } = useGetCitiesQuery(user!.city);
    const [updateRouteDetails, { isLoading: isUpdating, error }] = useUpdateRouteDetailsMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            route: null,
            price: 0,
        };
    }, []);

    const handleSubmit = useCallback(async (route: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = {
            route: route.route!.value!.toString(),
            price: parseFloat(route.price.toString())
        }

        try {
            const response = await updateRouteDetails(payload).unwrap();
            await saveUserSession(response);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, []);

    const routes = useMemo(() => {
        let baseRoutes = profile.routeDetails && profile.routeDetails.length > 0 ? profile.routeDetails.map((route) => ({ label: route.route, value: route.route })) : [];
        let routeDifference = _.differenceBy(data, baseRoutes, 'value');

        return routeDifference;
    }, [profile.routeDetails, data]);

    return ( 
        <>
            <ActivityIndicator visible={isLoading || isUpdating} />

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Route Details</Text>
                    <Text style={styles.description}>Enter route details</Text>
                </View>

                <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    <FormPicker
                        name="route" 
                        label='Route' 
                        items={routes}
                        placeholder='Select a route'
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