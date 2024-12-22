import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import _ from "lodash";

import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FormikHelpers } from "formik";

import * as yup from 'yup';

import { PickerItemModel } from '@/utils/models';
import { Form, FormCheckBox, FormError, FormField, FormPicker, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { MIN_VEHICLE_YEAR } from "@/constants/app";
import { MANUFACTURERS } from "@/utils/data";
import { useAppSelector } from "@/store/hooks";
import { useUpdatePersonalInformationMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";


interface FormValues {
    firstName: string;
    lastName: string;
    gender: PickerItemModel | null;
    isVehicleOwner: boolean;
    vehicleManufacturer: PickerItemModel | null;
    vehicleYear: PickerItemModel | null;
    vehicleColor: PickerItemModel | null;
    vehicleLicensePlate: string;
}

interface Props {
    onFinishStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    firstName: yup.string().min(3).required().label('First Name'),
    lastName: yup.string().min(3).required().label('Last Name'),
    gender: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Gender'),
    isVehicleOwner: yup.bool().required().label('Is vehicle owner'),
    vehicleManufacturer: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Vehicle Manufacturer'),
    vehicleYear: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Vehicle Year'),
    vehicleColor: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Vehicle Color'),
    vehicleLicensePlate: yup.string().length(6).required().label('Vehicle License Plate')
});

const PersonalInformationForm: React.FC<Props> = ({ onFinishStep }) => {
    const { account }= useAppSelector((state) => state.auth);
    const [updatePersonalInformation, result] = useUpdatePersonalInformationMutation()

    const initialValues: FormValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            gender: null,
            isVehicleOwner: false,
            vehicleManufacturer: null,
            vehicleYear: null,
            vehicleColor: null,
            vehicleLicensePlate: '',
        };
    }, []);

    const handleSubmit = useCallback(async (personalInformation: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = {
            firstName: personalInformation.firstName,
            lastName: personalInformation.lastName,
            gender: personalInformation.gender!.value.toString(),
            isVehicleOwner: personalInformation.isVehicleOwner,
            vehicleManufacturer: personalInformation.vehicleManufacturer!.value.toString(),
            vehicleYear: personalInformation.vehicleYear!.value as number,
            vehicleColor: personalInformation.vehicleColor!.value.toString(),
            vehicleLicensePlate: personalInformation.vehicleLicensePlate,
            service: account!.service, 
        };

        try {
            await updatePersonalInformation(payload).unwrap();
            onFinishStep();
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [onFinishStep]);

    return ( 
        <>
            <ActivityIndicator visible={result.isLoading} />
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Personal Information and Vehicle Details</Text>
                <Text style={styles.description}>Only your first name are visible to clients during bookings</Text>
            </View>

            <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                <FormField 
                    autoCapitalize="none" 
                    icon='user' 
                    name="firstName" 
                    label='First name' 
                    placeholder='Enter your first name'
                    keyboardType='name-phone-pad'
                />

                <FormField 
                    autoCapitalize="none" 
                    icon='user' 
                    name="lastName" 
                    label='Last name' 
                    placeholder='Enter your last name'
                    keyboardType='name-phone-pad'
                />
                
                <FormPicker
                    label='Gender'
                    name="gender" 
                    placeholder="Select gender"
                    items={genders}
                    width="100%"
                />

                <View style={styles.bottomMargin}>
                    <FormCheckBox name="isVehicleOwner">
                        <Text style={styles.small}>I have a vehicle to drive. </Text>
                        <Text style={[styles.small, { color: colors.light.black, marginTop: 9 }]}>
                            Have multiple vehicles? <Link href='/' style={[styles.small, { color: colors.light.primary }]}>Sign up as fleet owner</Link>
                        </Text>
                    </FormCheckBox>
                    
                </View>
                
                <FormPicker
                    label='Vehicle manufacturer'
                    name="vehicleManufacturer" 
                    placeholder="Select manufacturer"
                    items={manufacturers}
                    width="100%"
                />

                <Text style={[styles.small, styles.bottomMargin]}>
                    If your vehicle is not on the list, kindly reach out at <Text style={[styles.small, { color: colors.light.primary }]}>info@clickride.com</Text>
                </Text>
                
                <FormPicker
                    label='Vehicle color'
                    name="vehicleColor" 
                    placeholder="Select color"
                    items={vehicleColors}
                    width="100%"
                />
            
                <FormPicker
                    label='Vehicle year'
                    name="vehicleYear" 
                    placeholder="Select year"
                    items={years}
                    width="100%"
                />

                <FormField 
                    name="vehicleLicensePlate" 
                    label='License plate' 
                    placeholder="777 777 1234"
                    maxLength={6}
                />

                <FormError error={getMessageFromError(result.error)} />
                
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

const genders = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female'
    }
];

const vehicleColors = [
    {
        label: 'Red',
        value: 'red',
    }
];

const manufacturers: PickerItemModel[] = MANUFACTURERS.map((manufacturer) => ({
    label: manufacturer,
    value: manufacturer,
}));

const years = _.range(MIN_VEHICLE_YEAR, dayjs().year() + 1).map((year) => ({
    label: year.toString(),
    value: year
}));
 
export default PersonalInformationForm;