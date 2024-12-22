import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppSelector } from '@/store/hooks';
import { colors, icons, styles as defaultStyles } from '@/constants'
import { Image } from '@/components/ui';

import DocumentsForm from '@/components/onboarding/car/DocumentsForm';
import PersonalInformationForm from '@/components/onboarding/car/PersonalInformationForm';
import PaymentDetailsForm from '@/components/onboarding/car/PaymentDetailsForm';
import VehicleInspectionDocumentsForm from '@/components/onboarding/car/VehicleInspectionForm';

const KEYS = {
    personalInformation: 'personal-information',
    vehicleDocuments: 'vehicle-documents',
    paymentDetails: 'payment-details',
    vehicleInspection: 'vehicle-inspection',
};

const CarPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(KEYS.personalInformation);

    const { account } = useAppSelector((state) => state.auth);
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const Steps = useMemo(() => {
        return {
            [KEYS.personalInformation]: <PersonalInformationForm />,
            [KEYS.vehicleDocuments]: <DocumentsForm onPreviouStep={() => setCurrentStep(KEYS.personalInformation)} />,
            [KEYS.paymentDetails]: <PaymentDetailsForm onPreviouStep={() => setCurrentStep(KEYS.vehicleDocuments)} />,
            [KEYS.vehicleDocuments]: <VehicleInspectionDocumentsForm />,
        }
    }, []);
    
    useEffect(() => {
        function determineNextStep() {
            if (!account || !account.profile || !account.profile.personalInformation) {
                return setCurrentStep(KEYS.personalInformation);
            }

            if (!account.profile.vehicleDocuments) {
                return setCurrentStep(KEYS.vehicleDocuments);
            }

            if (!account.profile.paymentDetails) {
                return setCurrentStep(KEYS.paymentDetails);
            }

            if (!account.profile.inspectionUrl) {
                return setCurrentStep(KEYS.vehicleInspection);
            }

            router.push('/location');
        }

        determineNextStep();
    }, [account]);

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
                        src={require('@/assets/images/driver.png')}
                        style={styles.image}
                    />
                </View>
                
                <View style={styles.content}>
                    <View style={[styles.form, defaultStyles.shadow]}>
                        <View style={styles.steps}>
                            {Object.keys(Steps).map((step) => (
                                <View
                                    key={step} 
                                    style={[styles.step, { backgroundColor: step === currentStep ? colors.light.primary : colors.light.dewDark }]} 
                                />
                            ))}
                        </View>

                        {Steps[currentStep]}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 20,
        zIndex: 1000000,
        elevation: 4,
        marginTop: '-75%',
        overflow: 'hidden',
        paddingTop: 20
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
    step: {
        width: 22,
        height: 2,
        borderRadius: 5,
    },
    steps: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 10
    },
});

export default CarPage;
