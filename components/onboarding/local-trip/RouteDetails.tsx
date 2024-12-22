import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormField, FormMultiPicker, SubmitButton } from '@/components/forms';
import { Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'

interface FormValues {
    routes: string[];
    price: number;
}

interface Props {
    onFinishStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    routes: yup.array().min(1, 'Please enter at least one route').required().label('Routes'),
    price: yup.number().positive().required().label('Price of trip'),
});

const RouteDetailsForm: React.FC<Props> = ({ onFinishStep }) => {
    const initialValues: FormValues = useMemo(() => {
        return {
            routes: [],
            price: 0,
        };
    }, []);

    const handleSubmit = useCallback((personalInformation: FormValues) => {
        console.log(personalInformation);
        onFinishStep();
    }, [onFinishStep]);

    return ( 
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Route Details</Text>
                <Text style={styles.description}>Enter route details</Text>
            </View>

            <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                <FormMultiPicker
                    name="routes" 
                    label='Routes' 
                    items={[]}
                    placeholder='Enter your routes location'
                />

                <FormField 
                    name="price" 
                    label='Price of trip' 
                    placeholder='Enter your Price'
                    keyboardType='numeric'
                />

                <View style={styles.buttonContainer}>
                    <SubmitButton label="List Bus Stop" />
                </View>
            </Form>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    bottomMargin: { marginBottom: 16 },
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