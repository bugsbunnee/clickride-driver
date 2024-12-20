import React, { useCallback, useState } from 'react';
import Animated from 'react-native-reanimated';
import _ from 'lodash';

import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors, icons, styles as defaultStyles } from '@/constants'
import { Image, Text } from '@/components/ui';

import PersonalInformationForm from '@/components/onboarding/PersonalInformationForm';

const OnboardingPage: React.FC = () => {
    const focusValue = useSharedValue<number>(1);
    
    const { height } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    
    const stepStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(focusValue.value, [1, 4], [colors.light.dewDark, colors.light.primary, colors.light.dewDark, colors.light.primary])
    }));

    const handleIncrementStep = useCallback(() => {
        const timing = withTiming(focusValue.get() + 1, { duration: 500 });
        focusValue.set(timing);
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
                            <View style={styles.steps}>
                                {_.range(1, 5).map((step) => (
                                    <Animated.View 
                                        key={step} 
                                        style={[styles.step, stepStyle]} 
                                    />
                                ))}
                            </View>
                            <Text style={styles.title}>Personal Information and Vehicle Details</Text>
                            <Text style={styles.description}>Only your first name are visible to clients during bookings</Text>
                        </View>

                        <PersonalInformationForm onFinishStep={handleIncrementStep} />
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
    description: { 
        textAlign: 'center', 
        fontSize: 10, 
        lineHeight: 15,
        color: colors.light.graySemi,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
        marginTop: 4,
        maxWidth: '80%'
    },
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

export default OnboardingPage;
