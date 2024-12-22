import React, { useCallback, useMemo } from 'react';
import { FormikHelpers } from 'formik';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import * as yup from 'yup';

import { colors, icons, styles as defaultStyles } from '@/constants'
import { Form, FormError, FormField, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Image, Text } from '@/components/ui';
import { useLoginMutation } from '@/store/api/auth';
import { getFieldErrorsFromError, getMessageFromError } from '@/utils/lib';

import storage from '@/utils/storage';

interface FormValues {
    email: string;
    password: string;
}

const authSchema = yup.object<FormValues>().shape({
	email: yup.string().email().required().label('Email Address'),
	password: yup.string().required().label('Password'),
});

const SignInPage: React.FC = () => {
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = useCallback(async (credentials: FormValues, helpers: FormikHelpers<FormValues>) => {
        try {
            const result = await login(credentials).unwrap();
            storage.storeSession(result);
            router.push('/location');
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [login]);

    const initialValues: FormValues = useMemo(() => {
        return {
            email: '',
            password: '',
        };
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator visible={isLoading} />

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
                        src={require('@/assets/images/sign-in.png')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.content}>
                    <View style={[styles.form, defaultStyles.shadow]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Login</Text>
                        </View>

                        <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={authSchema}>
                            <FormField 
                                autoCapitalize="none" 
                                icon='envelope' 
                                name="email" 
                                label='Email' 
                                placeholder="Enter email address"
                                keyboardType='email-address'
                            />

                            <FormField 
                                icon='lock' 
                                name="password" 
                                label='Password' 
                                placeholder="Enter password"
                                secureTextEntry
                            />

                            <FormError error={getMessageFromError(error)} />
                            
                            <View style={styles.buttonContainer}>
                                <SubmitButton label="Sign in" />
                            </View>
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
        zIndex: 10000000000,
        elevation: 4,
        flex: 1,
        marginTop: '-50%'
    },
    imageContainer: { 
        overflow: 'hidden', 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40
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

export default SignInPage;
