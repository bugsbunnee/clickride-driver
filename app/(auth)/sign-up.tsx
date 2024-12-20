import React, { useCallback, useMemo } from 'react';

import { isValidPhoneNumber } from 'libphonenumber-js';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as yup from 'yup';

import { colors, icons, styles as defaultStyles } from '@/constants'
import { Form, FormCheckBox, FormField, FormPicker, SubmitButton } from '@/components/forms';
import { Image, Text } from '@/components/ui';
import { PickerItemModel } from '@/utils/models';

interface FormValues {
    email: string;
    phoneNumber: string;
    city: string;
    category: PickerItemModel | null;
    consent: boolean;
}

const registrationSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
    phoneNumber: yup.string().test({
        name: 'is-valid-phone',
        skipAbsent: true,
        test: (value, ctx) => {
            if (value) {
                const isValid = isValidPhoneNumber(value, 'NG');
                console.log('is valid', isValid);
                if (!isValid) return ctx.createError({ message: 'Invalid phone number.' });
                
                return true
            }

            return ctx.createError({ message: 'Please provide a valid phone number' });
        }
    }),
    city: yup.string().required().label('City'),
    category: yup.object().required().label('Category'),
    consent: yup.bool().oneOf([true], 'Terms and conditions must be accepted').required().label('Consent')
});

const SignUpPage: React.FC = () => {
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const initialValues: FormValues = useMemo(() => {
        return {
            email: '',
            phoneNumber: '',
            city: '',
            category: null,
            consent: false,
        };
    }, []);

    const handleSubmit = useCallback((auth: FormValues) => {
        console.log(auth);
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
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
                    <View style={styles.form}>
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
                            />
                            
                            <FormField 
                                icon='location-pin' 
                                name="city" 
                                label='City' 
                                placeholder="Lagos"
                            />
                            
                            <FormPicker
                                label='I am joining Click Ride as:'
                                name="category" 
                                placeholder="Car driver"
                                items={types}
                                width="100%"
                            />
                            
                            <FormCheckBox name="consent">
                                By registering, you agree to our <Text style={styles.link}>Terms of Service</Text> and 
                                <Text style={styles.link}> Privacy policy</Text>, commit to comply with obligations under the 
                                European Union and local legislation and provide only legal 
                                services and content on the Bolt Platform.
                            </FormCheckBox>
                            
                            <View style={styles.buttonContainer}>
                                <SubmitButton label="Sign up" />
                            </View>
                        </Form>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const types = [
    {
        label: 'One',
        value: '1',
    }
];

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 14 },
    container: { flex: 1, backgroundColor: colors.light.white },
    content: { flex: 1, paddingHorizontal: 31 },
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
