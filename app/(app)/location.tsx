import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LocationSwitch from "@/components/maps/LocationSwitch";

import { Button, Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from "@/constants";

const LocationPage = () => {
    const { width } = useWindowDimensions();
    const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

    return ( 
        <View style={[styles.flex, { paddingTop, paddingBottom }]}>
            <ImageBackground 
                source={require('@/assets/images/location.png')} 
                contentFit="cover"
                style={styles.image}
                blurRadius={1}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.navigation}>
                        <AntDesign
                            name="arrowleft"
                            size={icons.SIZES.SMALL} 
                            color={colors.light.white}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>Ride</Text>

                    <LocationSwitch />
                </View>

                <View style={[styles.center, styles.flex]}>
                    <View style={styles.center}>
                        <FontAwesome name="map-marker" size={100} color={colors.light.primary} />
                    </View>

                    <Text style={styles.label}>Enable Location</Text>

                    <Text style={[styles.description, { maxWidth: width * 0.68 }]}>
                        To enhance your location based-experience, 
                        please enable the location service  
                        for easy access to your current location.
                    </Text>
                </View>

                <Button 
                    label="Continue" 
                    onPress={() => router.push('/incoming-ride')} 
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    description: {
        color: colors.light.gray,
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
    },
    flex: { flex: 1 },
    navigation: {
        width: 40,
        height: 40,
        backgroundColor: colors.light.primary,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    header: { alignItems: "center", justifyContent: "flex-start", flexDirection: "row" },
    image: { flex: 1, padding: 16 },
    label: {
        marginTop: 24,
        marginBottom: 6,
        fontSize: 30,
        lineHeight: 36,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: "center"
    },
    title: {
        fontSize: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        lineHeight: 28,
        marginLeft: 16,
        flex: 1,
    },
});
 
export default LocationPage;