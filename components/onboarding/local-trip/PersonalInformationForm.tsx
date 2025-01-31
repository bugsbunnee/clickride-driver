import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { FormikHelpers } from "formik";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormError, FormField, FormPicker, FormUpload, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { useAppSelector } from "@/store/hooks";
import { useUpdateLocalPersonalInformationMutation } from "@/store/api/onboarding";
import { useGetLocalRideTypesQuery } from "@/store/api/services";

import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";
import { DocumentUpload, PickerItemModel } from "@/utils/models";
import { saveUserSession } from "@/utils/database";

interface FormValues {
    firstName: string;
    lastName: string;
    localRideType: PickerItemModel | null;
    profilePhoto: DocumentUpload[];
}

const schema = yup.object<FormValues>().shape({
    firstName: yup.string().min(3).required().label('First Name'),
    lastName: yup.string().min(3).required().label('Last Name'),
    localRideType: yup.object().required().label('Local Ride Type'),
    profilePhoto: yup.array().length(1, 'Please select exactly one image').required().label('Profile Photo'),
});

const PersonalInformationForm: React.FC = () => {
    const { account } = useAppSelector((state) => state.auth);
    const { data = [], isLoading: isFetchingRideTypes } = useGetLocalRideTypesQuery();
    const [updateLocalPersonalInformation, { isLoading, error }] = useUpdateLocalPersonalInformationMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            localRideType: null,
            profilePhoto: [],
        };
    }, []);

    const handleSubmit = useCallback(async (personalInformation: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = new FormData();

        payload.append('firstName', personalInformation.firstName);
        payload.append('lastName', personalInformation.lastName);
        payload.append('localRideType', personalInformation.localRideType!.value.toString());  // @ts-ignore
        payload.append('profilePhoto', {
            name: personalInformation.profilePhoto[0].name,
            type: personalInformation.profilePhoto[0].type,
            uri: personalInformation.profilePhoto[0].uri,
        });

        try {
            const result = await updateLocalPersonalInformation(payload).unwrap();
            await saveUserSession(result);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [account, updateLocalPersonalInformation]);

    return ( 
        <>
           <ActivityIndicator visible={isLoading || isFetchingRideTypes} />

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Personal Information</Text>
                    <Text style={styles.description}>Only your first name are visible to clients during bookings</Text>
                </View>

                <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    <FormField 
                        icon='user' 
                        name="firstName" 
                        label='First name' 
                        placeholder='Enter your first name'
                        keyboardType='name-phone-pad'
                    />

                    <FormField 
                        icon='user' 
                        name="lastName" 
                        label='Last name' 
                        placeholder='Enter your last name'
                        keyboardType='name-phone-pad'
                    />
                    
                    <FormPicker 
                        items={data}
                        name="localRideType" 
                        label="Local Ride Type" 
                        placeholder="Select ride type"
                        width="100%"
                    />
                    
                    <FormUpload
                        label='Profile photo'
                        description="Kindly upload a clear passport photo of your self"
                        name="profilePhoto" 
                    />

                    <FormError error={getMessageFromError(error)} />

                    <View style={styles.buttonContainer}>
                        <SubmitButton label="Next" />
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

export default PersonalInformationForm;