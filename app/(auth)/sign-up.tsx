import React, { useCallback, useMemo } from 'react';

import { isValidPhoneNumber } from 'libphonenumber-js';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as yup from 'yup';
import yupPassword from 'yup-password';
import storage from '@/utils/storage';

import { colors, icons, styles as defaultStyles } from '@/constants'
import { Form, FormCheckBox, FormError, FormField, FormPicker, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Image, Text } from '@/components/ui';
import { PickerItemModel } from '@/utils/models';
import { useGetServicesQuery, useGetStatesQuery } from '@/store/api/services';
import { useRegisterMutation } from '@/store/api/auth';
import { FormikHelpers } from 'formik';
import { getFieldErrorsFromError, getMessageFromError } from '@/utils/lib';

yupPassword(yup);

interface FormValues {
    email: string;
    phoneNumber: string;
    city: PickerItemModel | null;
    service: PickerItemModel | null;
    consent: boolean;
    password: string;
}

const registrationSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
    phoneNumber: yup.string().test({
        name: 'is-valid-phone',
        skipAbsent: true,
        test: (value, ctx) => {
            if (value) {
                const isValid = isValidPhoneNumber(value, 'NG');
                if (!isValid) return ctx.createError({ message: 'Invalid phone number.' });
                
                return true
            }

            return ctx.createError({ message: 'Please provide a valid phone number' });
        }
    }),
    city: yup.object().required().label('City'),
    service: yup.object().required().label('Service'),
    consent: yup.boolean().oneOf([true], 'Terms and conditions must be accepted').required().label('Consent'),
    password: yup.string()
            .minLowercase(1, 'Please enter at least one lowercase character')
            .minUppercase(1, 'Please enter at least one uppercase character')
            .minNumbers(1, 'Please enter at least one number')
            .minSymbols(1, 'Please enter at least one special character')
            .required()
            .label('Password')
});

const SignUpPage: React.FC = () => {
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const [register, { isLoading: isRegistering, error: registrationError }] = useRegisterMutation();
    const { isLoading: isFetchingServices, data: services = [], error, status, fulfilledTimeStamp } = useGetServicesQuery();
    const { isLoading: isFetchingStates, data: states = [] } = useGetStatesQuery();

    const initialValues: FormValues = useMemo(() => {
        return {
            email: '',
            phoneNumber: '',
            city: null,
            service: null,
            consent: false,
            password: '',
        };
    }, []);

    const handleSubmit = useCallback(async (user: FormValues, helpers: FormikHelpers<FormValues>) => {
        const payload = {
            email: user.email,
            phoneNumber: user.phoneNumber,
            city: user.city!.value.toString(),
            service: user.service!.value.toString(),
            password: user.password
        };

        try {
            const result = await register(payload).unwrap();
            storage.storeSession(result); // @ts-ignore
            router.push(result.account.service.code);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [register]);

    return (
        <View style={styles.container}>
            <ActivityIndicator visible={isFetchingServices || isFetchingStates || isRegistering} />

            <KeyboardAwareScrollView bounces={false}>
                <TouchableOpacity style={[styles.navigation, { top }]} onPress={() => router.back()}>
                    <MaterialCommunityIcons 
                        name='arrow-left' 
                        color={colors.light.primary} 
                        size={icons.SIZES.NORMAL} 
                    />
                </TouchableOpacity>

                <View style={[styles.imageContainer, { height: height * 0.5 }]}>
                    <Image
                        src={require('@/assets/images/sign-up.png')}
                        style={styles.image}
                    />
                </View>
                
                <View style={styles.content}>
                    <View style={[styles.form, defaultStyles.shadow]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Sign up</Text>
                        </View>

                        <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registrationSchema}>
                            <FormField 
                                autoCapitalize="none" 
                                icon='envelope' 
                                name="email" 
                                label='Email' 
                                placeholder="Enter email address"
                                keyboardType='email-address'
                            />

                            <FormField 
                                icon='phone' 
                                name="phoneNumber" 
                                label='Phone' 
                                placeholder="+234 999 999 9999"
                                keyboardType='phone-pad'
                            />
                            
                            <FormPicker
                                label='City'
                                name="city" 
                                icon='location-pin' 
                                placeholder="Lagos"
                                items={states}
                                width="100%"
                            />
                            
                            <FormPicker
                                label='I am joining Click Ride as:'
                                name="service" 
                                placeholder="Car driver"
                                items={services}
                                width="100%"
                            />
                            
                            <FormField
                                label='Password'
                                name="password" 
                                placeholder="Enter password"
                                width="100%"
                                secureTextEntry
                            />

                            <FormError error={getMessageFromError(registrationError)} />
                            
                            <FormCheckBox name="consent">
                                <Text style={styles.text}>
                                    By registering, you agree to our <Text style={styles.link}>Terms of Service</Text> and 
                                    <Text style={styles.link}> Privacy policy</Text>, commit to comply with obligations under the 
                                    European Union and local legislation and provide only legal 
                                    services and content on the Bolt Platform.

                                </Text>
                            </FormCheckBox>

                            <View style={styles.buttonContainer}>
                                <SubmitButton label="Sign up" />
                            </View>

                            <Link href='/sign-in' asChild>
                                <TouchableOpacity style={styles.signinContainer}>
                                    <Text style={styles.signinText}>
                                        Already have an account? <Text style={styles.sigininTextCTA}>Sign in</Text>
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </Form>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    container: { flex: 1, backgroundColor: colors.light.white },
    content: { flex: 1, paddingHorizontal: 31, marginBottom: 50 },
    image: {
      height: '100%',
      width: '100%',
    },
    form: {
        backgroundColor: colors.light.white,
        borderWidth: 1,
        borderColor: 'rgba(224, 224, 224, 0.62)',
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderRadius: 20,
        zIndex: 1000000,
        elevation: 4,
        marginTop: '-75%'
    },
    imageContainer: { 
        overflow: 'hidden', 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40
    },
    link: {
        color: colors.light.primary,
        textDecorationLine: 'underline',
        fontSize: 10,
        lineHeight: 14,
        fontFamily: defaultStyles.jakartaRegular.fontFamily
    },
    navigation: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.light.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        left: 23
    },
    signinContainer: { marginTop: 31, marginBottom: 12 },
    signinText: { fontFamily: defaultStyles.jakartaSemibold.fontFamily, fontSize: 14, color: colors.light.dark, textAlign: 'center' },
    sigininTextCTA: { fontFamily: defaultStyles.jakartaSemibold.fontFamily, fontSize: 14, color: colors.light.primary },
    text: {
        fontSize: 10,
        color: colors.light.graySemi,
        lineHeight: 16,
    },
    title: { 
        textAlign: 'center', 
        fontSize: 20, 
        lineHeight: 25,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dew,
        paddingBottom: 5,
        marginBottom: 14,
    },
});

export default SignUpPage;
