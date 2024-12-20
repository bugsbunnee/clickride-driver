import React, { useCallback, useState } from 'react';
import _ from 'lodash';

import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, icons, styles as defaultStyles } from '@/constants'
import { Image } from '@/components/ui';

import DocumentsForm from '@/components/onboarding/car/DocumentsForm';
import PersonalInformationForm from '@/components/onboarding/car/PersonalInformationForm';
import PaymentDetailsForm from '@/components/onboarding/car/PaymentDetailsForm';
import VehicleInspectionDocumentsForm from '@/components/onboarding/car/VehicleInspectionForm';

const STEPS ={
    MIN: 1,
    MAX: 4,
};

const CarPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.MIN);

    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    
    const handleIncrementStep = useCallback(() => {
        setCurrentStep((previousValue) =>  {
            const nextStep = previousValue + 1;
            return nextStep <= STEPS.MAX ? nextStep : previousValue;
        });
    }, []);

    const handleDecrementStep = useCallback(() => {
        setCurrentStep((previousValue) =>  {
            const previousStep = previousValue - 1;
            return previousStep >= STEPS.MIN ? previousStep : previousValue;
        });
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
                        src={require('@/assets/images/driver.png')}
                        style={styles.image}
                    />
                </View>
                
                <View style={styles.content}>
                    <View style={[styles.form, defaultStyles.shadow]}>
                        <View style={styles.steps}>
                            {_.range(STEPS.MIN, STEPS.MAX + 1).map((step) => (
                                <View
                                    key={step} 
                                    style={[styles.step, { backgroundColor: step === currentStep ? colors.light.primary : colors.light.dewDark }]} 
                                />
                            ))}
                        </View>

                        {currentStep === STEPS.MIN && <PersonalInformationForm onFinishStep={handleIncrementStep} />}
                        {currentStep === 2 && <DocumentsForm onFinishStep={handleIncrementStep} onPreviouStep={handleDecrementStep} />}
                        {currentStep === 3 && <PaymentDetailsForm onFinishStep={handleIncrementStep} onPreviouStep={handleDecrementStep} />}
                        {currentStep === STEPS.MAX && <VehicleInspectionDocumentsForm onFinishStep={handleIncrementStep} />}
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
