import React, { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

import { Redirect, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";

import useLocation from "@/hooks/useLocation";

const AppLayout: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();

    const requestPermission = async () => {
        const { granted }= await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

    useEffect(() => {
        requestPermission();
    }, []);

    if (!auth.account) {
        return <Redirect href='/(auth)' />
    }

    return ( 
        <Stack initialRouteName={location.granted ? "local" : "location"} screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="car" />
            <Stack.Screen name="bus" />
            <Stack.Screen name="local" />
            <Stack.Screen name="location" />
            <Stack.Screen name="incoming-ride" />
            <Stack.Screen name="on-ride" />
        </Stack>
     );
};
 
export default AppLayout;