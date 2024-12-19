import React, { useCallback, useEffect, useRef } from 'react';
import Svg, { Line } from 'react-native-svg';

import { router } from 'expo-router';
import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { MapMarkerProps } from 'react-native-maps';

import LocationMap from '@/components/maps/LocationMap';
import LocationSwitch from '@/components/maps/LocationSwitch';

import { colors, icons, styles as defaultStyles } from '@/constants';
import { Button, Image, Text } from '@/components/ui';

const IncomingRidePage = () => {
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleOpenSheet = useCallback(() => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.present();
        }
    }, []);

    const handleAcceptRide = useCallback(() => {
        router.push('/on-ride');
    }, []);
    
    const handleRejectRide = useCallback(() => {
        router.push('/on-ride');
    }, []);

    useEffect(() => {
        handleOpenSheet();
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.map}>
                        <LocationMap markers={nearbyRiders} />
                    </View>
                
                    <View style={[styles.header, { top: insets.top, position: 'absolute' }]}>
                        <TouchableOpacity onPress={router.back} style={styles.navigation}>
                            <AntDesign
                                name="arrowleft"
                                size={icons.SIZES.SMALL} 
                                color={colors.light.white}
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>Incoming Ride</Text>

                        <LocationSwitch />
                    </View>

                    <TouchableOpacity onPress={handleOpenSheet} style={[styles.navigation, styles.gps]}>
                        <Ionicons 
                            name='locate' 
                            size={icons.SIZES.NORMAL} 
                            color={colors.light.white} 
                        />
                    </TouchableOpacity>
                </View>

                <BottomSheetModal style={styles.curved} animateOnMount enablePanDownToClose={false} ref={bottomSheetRef} >
                    <BottomSheetView style={styles.verticalPadding}>
                        <View style={[styles.horizontalMargin, styles.user]}>
                            <Image
                                src='https://picsum.photos/seed/696/3000/2000'
                                style={styles.display}
                                contentFit='cover'
                            />

                            <View style={styles.flex}>
                                <Text style={styles.name}>Joseph Ogbaji</Text>

                                <View style={styles.rating}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <AntDesign 
                                            key={rating} 
                                            name='star' 
                                            color='#FFC822' 
                                            size={14} 
                                        />
                                    ))}

                                    <Text style={styles.ratingValue}>(5.0)</Text>
                                </View>
                            </View>

                            <View style={styles.ride}>
                                <Image
                                    src='https://png.pngtree.com/png-clipart/20220625/ourmid/pngtree-car-sports-car-transportation-png-image_5320963.png'
                                    style={styles.vehicle}
                                    contentFit='contain'
                                />
                            </View>
                        </View>

                        <View style={styles.horizontalMargin}>
                            <View style={styles.location}>
                                <View>
                                    <MaterialCommunityIcons 
                                        name='map-marker-circle' 
                                        color={colors.light.primary} 
                                        size={icons.SIZES.NORMAL}
                                    />
                                </View>

                                <View style={[styles.locationDetails, styles.locationBorder]}>
                                    <View style={styles.flex}>
                                        <Text style={styles.locationTitle}>My Location</Text>
                                        <Text style={styles.locationAddress}>Lekki scheme 2, Ajah</Text> 
                                    </View>

                                    <Text style={styles.locationTime}>
                                        02:00PM
                                    </Text>
                                </View>
                            </View>
                            
                            <View style={styles.location}>
                                <Svg height="145" width="2" style={styles.line}>
                                    <Line x1="0" y1="0" x2="0" y2="145" stroke="#EBEBEB" strokeWidth="2" />
                                </Svg>

                                <View>
                                    <MaterialCommunityIcons 
                                        name='map-marker' 
                                        color={colors.light.primary} 
                                        size={icons.SIZES.NORMAL}
                                    />
                                </View>

                                <View style={[styles.locationDetails, styles.locationBorder]}>
                                    <View style={styles.flex}>
                                        <Text style={styles.locationTitle}>Passenger Location</Text>
                                        <Text style={styles.locationAddress}>Ojaja Mall, Ogombo Road</Text> 
                                    </View>

                                    <Text style={styles.locationTime}>
                                        02:30PM
                                    </Text>
                                </View>
                            </View>
                           
                            <View style={styles.location}>                                    
                                <View>
                                    <MaterialCommunityIcons 
                                        name='map-marker' 
                                        color={colors.light.primary} 
                                        size={icons.SIZES.NORMAL}
                                    />
                                </View>

                                <View style={[styles.locationDetails, styles.locationBorder]}>
                                    <View style={styles.flex}>
                                        <Text style={styles.locationTitle}>Destination</Text>
                                        <Text style={styles.locationAddress}>Festac Town, Amuwo Odofin</Text> 
                                    </View>

                                    <Text style={styles.locationTime}>
                                        05:30PM
                                    </Text>
                                </View>
                            
                            </View>

                        </View>

                        <View style={[styles.buttons, styles.horizontalMargin]}>
                            <View style={styles.flex}>
                                <Button 
                                    label='Accept' 
                                    onPress={handleAcceptRide} 
                                />
                            </View>

                            <View style={styles.flex}>
                                <Button 
                                    backgroundColor={colors.light.dew}
                                    color={colors.light.primary}
                                    label='Decline' 
                                    onPress={handleRejectRide} />
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const nearbyRiders: MapMarkerProps[] = [
    {
      identifier: 'joseph-ahmed',
      title: 'Joseph Ahmed',
      description: 'Currently at Ajah',
      image: require('@/assets/images/rider-map-pin.png'),
      coordinate: {
        latitude: 6.4683108,
        longitude: 3.5237379
      },
    },
    {
      identifier: 'michael-rako',
      title: 'Michael Rako',
      description: 'Currently at Abraham Adesanya',
      image: require('@/assets/images/rider-map-pin.png'),
      coordinate: {
        latitude: 6.4657128,
        longitude: 3.5489286
      },
    },
];

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 13,
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.light.modalOpaque,
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.light.white
    },
    curved: { 
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    display: { width: 44, height: 44, borderRadius: 44 },
    gps: { right: 16, position: 'absolute', top: '30%' },
    header: { 
        alignItems: "center", 
        justifyContent: "flex-start", 
        flexDirection: "row", 
        flex: 1,
        padding: 16,
        width: "100%"
    },
    horizontalMargin: { marginHorizontal: 17 },
    line: { position: 'absolute', left: 11, zIndex: -1 },
    verticalPadding: { paddingVertical: 16 },
    flex: { flex: 1 },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        gap: 17,
    },
    locationTitle: {
        color: colors.light.borderMid,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 13,
        lineHeight: 24
    },
    locationAddress: {
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 15,
        lineHeight: 24
    },
    locationDetails: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        paddingVertical: 16,
    },
    locationTime: {
        color: colors.light.placeholder,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 12,
    },
    locationBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.borderLight,
    },
    map: {
        flex: 1,
        width: '100%'
    },
    name: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        color: colors.light.dark,
    },
    navigation: {
        width: 40,
        height: 40,
        backgroundColor: colors.light.primary,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    rating: { 
        gap: 2, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginTop: 7
    },
    ratingValue: {
        color: colors.light.placeholder,
        fontSize: 11,
        lineHeight: 16,
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
    },
    ride: {
        width: 74,
        height: 74,
        backgroundColor: '#EDEDED',
        borderRadius: 74,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    title: {
        fontSize: 24,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.dark,
        lineHeight: 28,
        marginLeft: 16,
        flex: 1,
    },
    user: { 
        gap: 12, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingBottom: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    vehicle: { width: 72, height: 40 },
});

export default IncomingRidePage;