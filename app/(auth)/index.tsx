import React from "react";
import Screen from "@/components/ui/Screen";

import { StyleSheet, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { Button, Image, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from "@/constants";

const OnboardingPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return ( 
        <Screen style={styles.container}>
            <View style={styles.content}>
                <Image 
                    src={require('@/assets/images/logo.png')}
                    style={styles.image}
                    contentFit="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={[styles.text, { maxWidth: width * 0.4 }]}>
                        Drive with Click Ride
                        Earn money driving
                    </Text>
                </View>
            </View>

            <Button 
                label="Log in" 
                onPress={() => router.push('/sign-in')} 
            />

            <View style={styles.buttons}>
                <Button
                    label="Sign up" 
                    backgroundColor={colors.light.dew} 
                    color={colors.light.primary} 
                    onPress={() => router.push('/sign-up')} 
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    buttons: { marginTop: 6 },
    container: { backgroundColor: colors.light.white, padding: 25 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: 265, height: 110 },
    text: {
        maxWidth: 149, 
        color: colors.light.graySemi,
        fontSize: 15,
        lineHeight: 23,
        textAlign: 'center',
        fontFamily: defaultStyles.jakartaBold.fontFamily,
        marginTop: 108
    },
    textContainer: { 
        justifyContent: 'center',
        alignItems: 'center',
    },
});
 
export default OnboardingPage;