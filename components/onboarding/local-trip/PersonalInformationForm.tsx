import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import _ from "lodash";
import * as yup from 'yup';

import { Form, FormField, FormUpload, SubmitButton } from '@/components/forms';
import { Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'

interface FormValues {
    firstName: string;
    lastName: string;
    profilePhoto: string[];
}

interface Props {
    onFinishStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    firstName: yup.string().min(3).required().label('First Name'),
    lastName: yup.string().min(3).required().label('Last Name'),
    profilePhoto: yup.array().length(1, 'Please select exactly one image').required().label('Profile Photo'),
});

const PersonalInformationForm: React.FC<Props> = ({ onFinishStep }) => {
    const initialValues: FormValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            profilePhoto: [],
        };
    }, []);

    const handleSubmit = useCallback((personalInformation: FormValues) => {
        console.log(personalInformation);
        onFinishStep();
    }, [onFinishStep]);

    return ( 
        <>
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
               
                
                <FormUpload
                    label='Profile photo'
                    description="Kindly upload a clear passport photo of your self"
                    name="profilePhoto" 
                    supportedMimeTypes={['image/jpeg', 'image/png']}
                />

                <View style={styles.buttonContainer}>
                    <SubmitButton label="Next" />
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

export default PersonalInformationForm;