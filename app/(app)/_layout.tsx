import { Redirect, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import useLocation from "@/hooks/useLocation";

const AppLayout = () => {
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!auth.user) {
        return <Redirect href='/sign-in' />
    }

    return ( 
        <Stack initialRouteName={location.granted ? "onboarding" : "location"} screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="location" />
            <Stack.Screen name="incoming-ride" />
            <Stack.Screen name="on-ride" />
        </Stack>
     );
};
 
export default AppLayout;