import { Redirect, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import useLocation from "@/hooks/useLocation";

const AppLayout = () => {
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!auth.account) {
        return <Redirect href='/sign-in' />
    }

    return ( 
        <Stack initialRouteName={location.granted ? "local-trip" : "location"} screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="car" />
            <Stack.Screen name="bus" />
            <Stack.Screen name="local-trip" />
            <Stack.Screen name="location" />
            <Stack.Screen name="incoming-ride" />
            <Stack.Screen name="on-ride" />
        </Stack>
     );
};
 
export default AppLayout;