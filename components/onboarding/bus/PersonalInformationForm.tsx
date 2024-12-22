import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { FormikHelpers } from "formik";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormError, FormField, FormUpload, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { useUpdateBusPersonalInformationMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";
import { DocumentUpload } from "@/utils/models";
import { useAppSelector } from "@/store/hooks";

import storage from "@/utils/storage";

interface FormValues {
    firstName: string;
    lastName: string;
    companyName: string;
    companyLogo: DocumentUpload[];
}

const schema = yup.object<FormValues>().shape({
    firstName: yup.string().min(3).required().label('First Name'),
    lastName: yup.string().min(3).required().label('Last Name'),
    companyName: yup.string().min(3).required().label('Company Name'),
    companyLogo: yup.array().length(1, 'Please select exactly one image').required().label('Company Logo'),
});

const PersonalInformationForm: React.FC = () => {
    const { account } = useAppSelector((state) => state.auth);
    const [updateBusPersonalInformation, { isLoading, error }] = useUpdateBusPersonalInformationMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            companyName: '',
            companyLogo: [],
        };
    }, []);

    const handleSubmit = useCallback(async (personalInformation: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = new FormData();

        // @ts-ignore
        payload.append('companyLogo', {
            name: personalInformation.companyLogo[0].name,
            type: personalInformation.companyLogo[0].type,
            uri: personalInformation.companyLogo[0].uri,
        });

        try {
            const result = await updateBusPersonalInformation({ payload, service: account!.service }).unwrap();
            storage.storeSession(result);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [account, updateBusPersonalInformation]);

    return ( 
        <>
           <ActivityIndicator visible={isLoading} />
           
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
                
                    <FormField 
                        autoCapitalize="none" 
                        name="companyName" 
                        label='Company name' 
                        placeholder='Enter your company name'
                    />
                    
                    <FormUpload
                        label='Company logo'
                        description="Kindly upload company logo"
                        name="companyLogo" 
                        supportedMimeTypes={['image/jpeg', 'image/png']}
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