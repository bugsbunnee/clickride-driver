import { Redirect, Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import useLocation from "@/hooks/useLocation";
import { useEffect } from "react";
import { logout } from "@/store/auth/slice";

const AppLayout = () => {
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [])

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